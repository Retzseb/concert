<?php

namespace Database\Factories;

use App\Models\Performer;
use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConcertFactory extends Factory
{
    public function definition(): array
    {
        return [
            'picture' => null,
            'name' => $this->faker->sentence(3),
            'performer_id' => Performer::query()->inRandomOrder()->value('id') ?? Performer::factory(),
            'room_id' => Room::query()->inRandomOrder()->value('id') ?? Room::factory(),
            'date' => $this->faker->dateTimeBetween('+1 day', '+1 year'),
            'base_price' => $this->faker->numberBetween(5000, 30000),
            'description' => $this->faker->sentence(),
            'status' => 0,
            'soft_delete' => false,
        ];
    }
}
