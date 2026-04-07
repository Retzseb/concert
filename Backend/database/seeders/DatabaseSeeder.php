<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            GenreSeeder::class,
            PerformerSeeder::class,
            PlaceSeeder::class,
            RoomSeeder::class,
            DiscountSeeder::class,
            ConcertSeeder::class,
        ]);

        Room::query()->each(function (Room $room) {
            $room->syncSeats(false);
        });
    }
}
