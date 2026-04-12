<?php

namespace Tests\Project;

use App\Models\Concert;
use App\Models\Discount;
use App\Models\Genre;
use App\Models\Performer;
use App\Models\Place;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\Seat;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_reservation(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $place = Place::factory()->create([
            'name' => 'Teszt helyszín',
            'city' => 'Budapest',
            'address' => '1234 Teszt város, Teszt cím',
        ]);

        $room = Room::factory()->create([
            'place_id' => $place->id,
            'serial_number' => 1,
            'total_rows' => 5,
            'total_columns' => 7,
        ]);

        $genre = Genre::factory()->create([
            'name' => 'Teszt műfaj',
        ]);

        $performer = Performer::factory()->create([
            'name' => 'Teszt előadó',
            'genre' => 1,
            'country' => 'magyar',
        ]);

        $concert = Concert::factory()->create([
            'name' => 'Teszt koncert',
            'performer_id' => $performer->id,
            'room_id' => $room->id,
            'date' => now()->addDays(3),
            'base_price' => 12990,
            'status' => 0,
            'soft_delete' => 0,
        ]);

        $seat = Seat::factory()->create([
            'room_id' => $room->id,
            'row_number' => 1,
            'column_number' => 1,
            'price_multiplier' => 1,
        ]);

        $discount = Discount::factory()->create();

        $payload = [
            'concert_id' => $concert->id,
            'seat_ids' => [$seat->id],
            'discount_id' => $discount->id,
        ];

        $response = $this->postJson('/api/reservations', $payload);

        $response->assertStatus(201);

        $response->assertJsonStructure([
            'id',
            'total_price',
            'user',
            'concert',
        ]);

        $this->assertDatabaseHas('reservations', [
            'user_id' => $user->id,
            'concert_id' => $concert->id,
        ]);
    }

    public function test_cannot_reserve_already_reserved_seat(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $place = Place::factory()->create([
            'name' => 'Teszt helyszín',
            'city' => 'Budapest',
            'address' => '1234 Teszt város, Teszt cím',
        ]);

        $room = Room::factory()->create([
            'place_id' => $place->id,
            'serial_number' => 1,
            'total_rows' => 5,
            'total_columns' => 7,
        ]);

        $genre = Genre::factory()->create([
            'name' => 'Teszt műfaj',
        ]);

        $performer = Performer::factory()->create([
            'name' => 'Teszt előadó',
            'genre' => 1,
            'country' => 'magyar',
        ]);

        $concert = Concert::factory()->create([
            'name' => 'Teszt koncert',
            'performer_id' => $performer->id,
            'room_id' => $room->id,
            'date' => now()->addDays(3),
            'base_price' => 12990,
            'status' => 0,
            'soft_delete' => 0,
        ]);

        $seat = Seat::factory()->create([
            'room_id' => $room->id,
            'row_number' => 1,
            'column_number' => 1,
            'price_multiplier' => 1,
        ]);

        $reservation = Reservation::factory()->create([
            'user_id' => $user->id,
            'concert_id' => $concert->id,
        ]);

        Ticket::factory()->create([
            'reservation_id' => $reservation->id,
            'seat_id' => $seat->id,
        ]);

        $payload = [
            'concert_id' => $concert->id,
            'seat_ids' => [$seat->id],
        ];

        $response = $this->postJson('/api/reservations', $payload);

        $response->assertStatus(409);
    }
}