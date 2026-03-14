<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Concert;
use App\Models\Discount;
use App\Models\Reservation;
use App\Models\Seat;
use App\Models\Ticket;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function index()
    {
        return Reservation::all();
    }

    public function store(StoreReservationRequest $request)
    {
        $user = $request->user();
        $validated = $request->validated();

        $concert = Concert::query()->with('room')->findOrFail($validated['concert_id']);
        $items = $this->normalizeItems($validated);
        $seatIds = $items->pluck('seat_id')->map(fn ($id) => (int) $id)->unique()->values();
        $discountIds = $items->pluck('discount_id')->map(fn ($id) => (int) $id)->unique()->values();

        $seats = Seat::query()->whereIn('id', $seatIds)->get()->keyBy('id');
        if ($seats->count() !== $seatIds->count()) {
            return response()->json(['message' => 'Van nem létező szék a kérésben.'], 422);
        }

        $discounts = Discount::query()->whereIn('id', $discountIds)->get()->keyBy('id');
        if ($discounts->count() !== $discountIds->count()) {
            return response()->json(['message' => 'Van nem létező kedvezmény a kérésben.'], 422);
        }

        $wrongRoomSeatIds = $seatIds->filter(function (int $seatId) use ($seats, $concert) {
            return (int) $seats[$seatId]->room_id !== (int) $concert->room_id;
        })->values();

        if ($wrongRoomSeatIds->isNotEmpty()) {
            return response()->json([
                'message' => 'Csak a koncert terméhez tartozó székek foglalhatók.',
                'seat_ids' => $wrongRoomSeatIds,
            ], 422);
        }

        $alreadyReservedSeatIds = Ticket::query()
            ->join('reservations', 'reservations.id', '=', 'tickets.reservation_id')
            ->where('reservations.concert_id', $concert->id)
            ->whereIn('tickets.seat_id', $seatIds)
            ->pluck('tickets.seat_id')
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values();

        if ($alreadyReservedSeatIds->isNotEmpty()) {
            return response()->json([
                'message' => 'A kiválasztott székek között már foglalt is van.',
                'seat_ids' => $alreadyReservedSeatIds,
            ], 409);
        }

        $reservation = DB::transaction(function () use ($user, $concert, $items) {
            $reservation = Reservation::create([
                'user_id' => $user->id,
                'concert_id' => $concert->id,
                'reservation_date' => now(),
                'status' => 0,
            ]);

            foreach ($items as $item) {
                Ticket::create([
                    'reservation_id' => $reservation->id,
                    'seat_id' => (int) $item['seat_id'],
                    'discount_type' => (int) $item['discount_id'],
                ]);
            }

            $reservation->load([
                'user',
                'concert',
                'tickets.seat',
                'tickets.discount',
            ]);

            $reservation->append('total_price');
            $reservation->tickets->each->append('final_price');

            return $reservation;
        });

        return response()->json($reservation, 201);
    }

    public function myReservations()
    {
        $user = request()->user();

        $reservations = Reservation::query()
            ->with(['concert', 'tickets.seat', 'tickets.discount'])
            ->where('user_id', $user->id)
            ->orderByDesc('reservation_date')
            ->get();

        $reservations->each(function (Reservation $reservation) {
            $reservation->append('total_price');
            $reservation->tickets->each->append('final_price');
        });

        return $reservations;
    }

    public function adminIndex()
    {
        $reservations = Reservation::query()
            ->with(['user', 'concert', 'tickets.seat', 'tickets.discount'])
            ->orderByDesc('reservation_date')
            ->get();

        $reservations->each(function (Reservation $reservation) {
            $reservation->append('total_price');
            $reservation->tickets->each->append('final_price');
        });

        return $reservations;
    }

    public function show(Reservation $reservation)
    {
        $reservation->load(['user', 'concert', 'tickets.seat', 'tickets.discount']);
        $reservation->append('total_price');
        $reservation->tickets->each->append('final_price');

        return $reservation;
    }

    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        //
    }

    public function destroy(Reservation $reservation)
    {
        $user = request()->user();

        if (!$user->isAdmin() && (int) $reservation->user_id !== (int) $user->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $reservation->delete();

        return response()->noContent();
    }

    private function normalizeItems(array $validated): Collection
    {
        if (!empty($validated['items'])) {
            return collect($validated['items'])
                ->map(fn (array $item) => [
                    'seat_id' => (int) $item['seat_id'],
                    'discount_id' => (int) $item['discount_id'],
                ])
                ->unique(fn (array $item) => $item['seat_id'])
                ->values();
        }

        $defaultDiscountId = (int) (Discount::query()
            ->whereRaw('LOWER(type) = ?', ['normál'])
            ->orWhereRaw('LOWER(type) = ?', ['normal'])
            ->value('id')
            ?? Discount::query()->orderBy('id')->value('id'));

        return collect($validated['seat_ids'] ?? [])
            ->map(fn ($seatId) => [
                'seat_id' => (int) $seatId,
                'discount_id' => $defaultDiscountId,
            ])
            ->unique(fn (array $item) => $item['seat_id'])
            ->values();
    }
}
