<?php

namespace Database\Factories;

use App\Models\Discount;
use App\Models\Reservation;
use App\Models\Seat;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    public function definition(): array
    {
        return [
            'reservation_id' => Reservation::query()->inRandomOrder()->value('id') ?? Reservation::factory(),
            'seat_id' => Seat::query()->inRandomOrder()->value('id') ?? Seat::factory(),
            'discount_type' => Discount::query()->orderBy('id')->value('id') ?? Discount::factory(),
        ];
    }
}
