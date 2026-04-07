<?php

namespace App\Http\Controllers;

use App\Models\Concert;
use App\Http\Requests\StoreConcertRequest;
use App\Http\Requests\UpdateConcertRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ConcertController extends Controller
{
    private function markExpiredConcertsAsSoftDeleted(): void
    {
        Concert::query()
            ->where('date', '<', now())
            ->where('soft_delete', false)
            ->update(['soft_delete' => true]);
    }

    private function affectedBuyersPayload(Concert $concert): array
    {
        $reservations = $concert->reservations()
            ->with('user:id,name,email')
            ->get();

        return $reservations
            ->map(fn ($reservation) => [
                'reservation_id' => $reservation->id,
                'user_id' => $reservation->user?->id,
                'name' => $reservation->user?->name,
                'email' => $reservation->user?->email,
            ])
            ->unique(fn ($row) => ($row['user_id'] ?? 'x') . '|' . ($row['email'] ?? ''))
            ->values()
            ->all();
    }

    private function adminConcertQuery()
    {
        return DB::table('concerts')
            ->join('performers', 'performers.id', '=', 'concerts.performer_id')
            ->join('rooms', 'rooms.id', '=', 'concerts.room_id')
            ->join('places', 'places.id', '=', 'rooms.place_id')
            ->leftJoin('genres', 'genres.id', '=', 'performers.genre')
            ->select([
                'concerts.id',
                'concerts.picture',
                'concerts.name',
                'concerts.date',
                'concerts.base_price',
                'concerts.description',
                'concerts.status',
                'concerts.soft_delete',
                'concerts.performer_id',
                'performers.name as performer_name',
                'performers.description as performer_description',
                'concerts.room_id',
                'rooms.serial_number as room_serial_number',
                'rooms.total_rows as room_total_rows',
                'rooms.total_columns as room_total_columns',
                'places.id as place_id',
                'places.name as place_name',
                'places.city as place_city',
                'genres.id as genre_id',
                'genres.name as genre_name',
            ]);
    }

    public function index()
    {
        $this->markExpiredConcertsAsSoftDeleted();

        return Concert::query()
            ->where('soft_delete', false)
            ->where('date', '>=', now())
            ->orderBy('date')
            ->get();
    }

    public function store(StoreConcertRequest $request)
    {
        $concert = new Concert();
        $concert->fill($request->validated());
        $concert->save();

        return response()->json($concert, 201);
    }

    public function show($performer_id, $name, $room_id)
    {
        $this->markExpiredConcertsAsSoftDeleted();

        return Concert::query()
            ->where('soft_delete', false)
            ->where('date', '>=', now())
            ->where('performer_id', $performer_id)
            ->where('name', $name)
            ->where('room_id', $room_id)
            ->firstOrFail();
    }

    public function update(UpdateConcertRequest $request, $concert_id, $performer_id, $name, $room_id)
    {
        // unused route in current project
    }

    public function destroy(Concert $concert)
    {
        // unused route in current project
    }

    public function concertAllDataList(Request $request)
    {
        $this->markExpiredConcertsAsSoftDeleted();

        $conc = $request->query('conc');
        $date = $request->query('date');
        $performerId = $request->query('performer_id');
        $roomId = $request->query('room_id');
        $placeId = $request->query('place_id');
        $genreId = $request->query('genre_id');

        $query = $this->adminConcertQuery()
            ->where('concerts.soft_delete', false)
            ->where('concerts.date', '>=', now());

        if ($performerId) $query->where('concerts.performer_id', $performerId);
        if ($roomId) $query->where('concerts.room_id', $roomId);
        if ($placeId) $query->where('places.id', $placeId);
        if ($genreId) $query->where('genres.id', $genreId);

        if ($date) {
            $query->whereDate('concerts.date', $date);
        }

        if ($conc) {
            $query->where(function ($w) use ($conc) {
                $w->where('concerts.name', 'like', "%$conc%")
                    ->orWhere('performers.name', 'like', "%$conc%");
            });
        }

        return $query->orderBy('concerts.date')->get();
    }

    public function seats(Concert $concert)
    {
        $reservedSeatIds = DB::table('tickets')
            ->join('reservations', 'reservations.id', '=', 'tickets.reservation_id')
            ->where('reservations.concert_id', $concert->id)
            ->pluck('tickets.seat_id')
            ->map(fn ($id) => (int) $id)
            ->all();

        return DB::table('seats')
            ->select(['id', 'room_id', 'row_number', 'column_number', 'price_multiplier'])
            ->where('room_id', $concert->room_id)
            ->orderBy('row_number')
            ->orderBy('column_number')
            ->get()
            ->map(function ($seat) use ($reservedSeatIds) {
                $seat->reserved = in_array((int) $seat->id, $reservedSeatIds, true);
                return $seat;
            })
            ->values();
    }

    public function adminIndex()
    {
        return $this->adminConcertQuery()->orderBy('concerts.date')->get();
    }

    public function adminShow(Concert $concert)
    {
        return response()->json($concert, 200);
    }

    public function adminUpdate(UpdateConcertRequest $request, Concert $concert)
    {
        $beforeStatus = (int) $concert->status;
        $beforeSoftDelete = (bool) $concert->soft_delete;
        $payload = $request->validated();

        $concert->fill($payload);
        $concert->save();

        $shouldNotify = (($payload['status'] ?? $beforeStatus) == 1 && $beforeStatus !== 1)
            || (($payload['soft_delete'] ?? $beforeSoftDelete) && !$beforeSoftDelete);

        $response = [
            'message' => 'A koncert frissítve lett.',
            'concert' => $concert->fresh(),
        ];

        if ($shouldNotify) {
            $response['notify_buyers'] = $this->affectedBuyersPayload($concert->fresh());
            $response['notification_reason'] = (($payload['status'] ?? $beforeStatus) == 1) ? 'cancelled' : 'removed';
        }

        return response()->json($response, 200);
    }

    public function adminDestroy(Concert $concert)
    {
        $notify = $this->affectedBuyersPayload($concert);
        $concertName = $concert->name;
        $concert->delete();

        return response()->json([
            'message' => 'A koncert törölve lett.',
            'deleted_concert_name' => $concertName,
            'notify_buyers' => $notify,
            'notification_reason' => 'deleted',
        ]);
    }
}
