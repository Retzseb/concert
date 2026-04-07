<?php

namespace App\Http\Controllers;

use App\Models\Ticket;

class TicketController extends Controller
{
    public function destroy(Ticket $ticket)
    {
        $user = request()->user();
        $ticket->loadMissing('reservation.user');
        $reservation = $ticket->reservation;

        if (! $reservation) {
            return response()->json(['message' => 'A jegyhez nem található foglalás.'], 404);
        }

        if (! $user->isAdmin() && (int) $reservation->user_id !== (int) $user->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $ticket->delete();

        return response()->json([
            'message' => 'A jegy sikeresen törölve lett.',
        ]);
    }
}
