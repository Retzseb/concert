<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DiscountFactory extends Factory
{
    public function definition(): array
    {
        return [
            'type' => $this->faker->unique()->randomElement(['normál'.'-'.$this->faker->numberBetween(1,9999), 'diák'.'-'.$this->faker->numberBetween(1,9999), 'nyugdíjas'.'-'.$this->faker->numberBetween(1,9999), 'vip'.'-'.$this->faker->numberBetween(1,9999), 'promo'.'-'.$this->faker->numberBetween(1,9999)]),
            'value' => $this->faker->randomElement([100, 50, 45, 25, 10]),
        ];
    }
}
