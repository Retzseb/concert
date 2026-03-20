<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;

class TicketController extends Controller
{
    public function index()
    {
        return Ticket::all();
    }

    public function store(StoreTicketRequest $request)
    {
        //
    }

    public function show($reservation_id, $seat_id)
    {
        $lending = Ticket::where('reservation_id', $reservation_id)
            ->where('seat_id', $seat_id)
            ->get();
        return $lending[0];
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        //
    }

    public function destroy(Ticket $ticket)
    {
        $user = request()->user();
        $ticket->loadMissing('reservation.user');
        $reservation = $ticket->reservation;

        if (!$reservation) {
            return response()->json(['message' => 'A jegyhez nem található foglalás.'], 404);
        }

        if (!$user->isAdmin() && (int) $reservation->user_id !== (int) $user->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $ticket->delete();

        if ($reservation->tickets()->count() === 0) {
            $reservation->delete();
            return response()->json([
                'message' => 'A jegy törölve lett, és mivel ez volt az utolsó, a teljes foglalás is törlődött.',
                'reservation_deleted' => true,
            ]);
        }

        return response()->json([
            'message' => 'A jegy sikeresen törölve lett.',
            'reservation_deleted' => false,
        ]);
    }
}
