<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'seat_id',
        'discount_type',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class);
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class, 'discount_type');
    }

    public function getFinalPriceAttribute(): float
    {
        $this->loadMissing(['reservation.concert', 'seat', 'discount']);

        $basePrice = (float) ($this->reservation?->concert?->base_price ?? 0);
        $multiplier = (float) ($this->seat?->price_multiplier ?? 1);
        $discountPercent = (float) ($this->discount?->value ?? 100);

        return round($basePrice * $multiplier * ($discountPercent / 100), 2);
    }
}
