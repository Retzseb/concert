<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seat>
 */
class SeatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
    $room = Room::inRandomOrder()->first()
            ??Room::factory()->create();

    return [
        'room_id' => $room->id,
        'row_number' => $this->faker->numberBetween(1, $room->total_rows),
        'column_number' => $this->faker->numberBetween(1, $room->total_columns),
        'price_multiplier' => $this->faker->randomFloat(2, 1.00, 2.00)
    ];
    }
}
