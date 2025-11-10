<?php

namespace Database\Factories;

use App\Models\Concert;
use App\Models\Seat;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::all()->random()->id,
            'concert_id' => Concert::all()->random()->id,
            'seat_id' => Seat::all()->random()->id,
            'discount_type' => rand(0,2),
            'reservation_date' => fake()->dateTime(),
            'status' => rand(0,2),
        ];
    }
}