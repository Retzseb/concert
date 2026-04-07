<?php

namespace Database\Factories;

use App\Models\Place;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    public function definition(): array
    {
        return [
            'place_id' => Place::factory(),
            'serial_number' => $this->faker->numberBetween(1, 10),
            'total_rows' => $this->faker->numberBetween(5, 12),
            'total_columns' => $this->faker->numberBetween(6, 14),
        ];
    }
}
