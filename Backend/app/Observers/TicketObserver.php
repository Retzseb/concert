<?php

namespace App\Observers;

use App\Models\Ticket;

class TicketObserver
{
    public function deleted(Ticket $ticket): void
    {
        $reservation = $ticket->reservation()->withCount('tickets')->first();

        if ($reservation && $reservation->tickets_count === 0) {
            $reservation->delete();
        }
    }
}
