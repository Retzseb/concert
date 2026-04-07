<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class SeatFactory extends Factory
{
    public function definition(): array
    {
        return [
            'room_id' => Room::factory(),
            'row_number' => $this->faker->numberBetween(1, 10),
            'column_number' => $this->faker->numberBetween(1, 12),
            'price_multiplier' => $this->faker->randomFloat(2, 1, 2),
        ];
    }
}
