<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            ['place_id' => 1, 'serial_number' => 1, 'total_rows' => 10, 'total_columns' => 12],
            ['place_id' => 1, 'serial_number' => 2, 'total_rows' => 8, 'total_columns' => 10],
            ['place_id' => 2, 'serial_number' => 1, 'total_rows' => 12, 'total_columns' => 14],
            ['place_id' => 3, 'serial_number' => 1, 'total_rows' => 10, 'total_columns' => 10],
            ['place_id' => 3, 'serial_number' => 2, 'total_rows' => 6, 'total_columns' => 8],
            ['place_id' => 4, 'serial_number' => 1, 'total_rows' => 14, 'total_columns' => 16],
            ['place_id' => 4, 'serial_number' => 2, 'total_rows' => 10, 'total_columns' => 12],
            ['place_id' => 5, 'serial_number' => 1, 'total_rows' => 8, 'total_columns' => 10],
            ['place_id' => 6, 'serial_number' => 1, 'total_rows' => 10, 'total_columns' => 12],
            ['place_id' => 7, 'serial_number' => 1, 'total_rows' => 6, 'total_columns' => 10],
            ['place_id' => 8, 'serial_number' => 1, 'total_rows' => 6, 'total_columns' => 8],
            ['place_id' => 9, 'serial_number' => 1, 'total_rows' => 10, 'total_columns' => 10],
            ['place_id' => 10, 'serial_number' => 1, 'total_rows' => 12, 'total_columns' => 10],
        ];

        foreach ($rooms as $room) {
            Room::query()->firstOrCreate(['place_id' => $room['place_id'], 'serial_number' => $room['serial_number']], $room);
        }
    }
}
