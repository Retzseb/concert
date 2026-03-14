<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'concert_id',
        'reservation_date',
        'status',
    ];


    protected function casts(): array
    {
        return [
            'reservation_date' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function concert()
    {
        return $this->belongsTo(Concert::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function getTotalPriceAttribute(): float
    {
        $this->loadMissing(['concert', 'tickets.seat', 'tickets.discount']);

        $basePrice = (float) ($this->concert?->base_price ?? 0);

        return round($this->tickets->sum(function (Ticket $ticket) use ($basePrice) {
            $multiplier = (float) ($ticket->seat?->price_multiplier ?? 1);
            $discountPercent = (float) ($ticket->discount?->value ?? 100);

            return $basePrice * $multiplier * ($discountPercent / 100);
        }), 2);
    }
}
