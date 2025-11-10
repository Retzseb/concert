<?php

namespace Database\Factories;

use App\Models\Concert;
use App\Models\Reservation;
use App\Models\Seat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reservation_id' => Reservation::all()->random()->id,
            'seat_id' => Seat::all()->random()->id,            
            'discount_type' => rand(0,2),
            'qr_code' => fake()->sentence(),
        ];
    }
}