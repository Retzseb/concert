<?php

namespace Database\Factories;

use App\Models\Discount;
use App\Models\Performer;
use App\Models\Place;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;
use PhpParser\Node\Expr\Cast\String_;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Concert>
 */
class ConcertFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'performer_id' => Performer::all()->random()->id,
            'room_id' => Room::all()->random()->id,
            'date' => fake()->dateTime(),
            'base_price' => rand(15000,148000),
            'description' => fake()->sentence(),
            'status' => rand(0,2)
        ];
    }
}