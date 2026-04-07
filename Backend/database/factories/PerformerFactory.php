<?php

namespace Database\Factories;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

class PerformerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->company(),
            'genre' => Genre::query()->inRandomOrder()->value('id') ?? Genre::factory(),
            'description' => fake()->sentence(),
            'country' => 'magyar',
        ];
    }
}
