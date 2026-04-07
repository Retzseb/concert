<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PlaceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'city' => $this->faker->city(),
            'address' => $this->faker->streetAddress(),
        ];
    }
}
