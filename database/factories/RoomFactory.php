<?php

namespace Database\Factories;

use App\Models\Place;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'place_id' => Place::all()->random()->id,
            'name' => $this->faker->unique()->numberBetween(1, 100),
            'total_rows' => rand(5, 20),
            'total_columns' => rand(5, 20),
        ];
    }
}
