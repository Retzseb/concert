<?php

namespace Database\Seeders;

use App\Models\Concert;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\Seat;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Seat::factory(15)->create();     
        Reservation::factory(15)->create(); 
        Ticket::factory(15)->create();          

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
