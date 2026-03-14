<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ConcertController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\PerformerController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//AUTH (public)
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

//PUBLIC data 
Route::get('/concerts', [ConcertController::class, 'index']);
Route::get('/discounts', [DiscountController::class, 'index']);
Route::get('/genres', [GenreController::class, 'index']);
Route::get('/performers', [PerformerController::class, 'index']);
Route::get('/places', [PlaceController::class, 'index']);
Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/seats', [SeatController::class, 'index']);
Route::get('/tickets', [TicketController::class, 'index']);

Route::get('/concerts/{performer_id}/{name}/{room_id}', [ConcertController::class, 'show']);
Route::get('/discounts/{id}', [DiscountController::class, 'show']);
Route::get('/genres/{id}', [GenreController::class, 'show']);
Route::get('/performers/{id}', [PerformerController::class, 'show']);
Route::get('/places/{id}', [PlaceController::class, 'show']);
Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::get('/seats/{id}', [SeatController::class, 'show']);
Route::get('/tickets/{id}', [TicketController::class, 'show']);

Route::get('/concerts/all', [ConcertController::class, 'concertAllDataList']);
Route::get('/concerts/{concert}/seats', [ConcertController::class, 'seats']);
Route::get('/place/all', [PlaceController::class, 'index']);
Route::get('/genre/all', [GenreController::class, 'index']);

//AUTH (protected)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn (Request $request) => $request->user());
    Route::put('/me', [UserController::class, 'updateMe']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::get('/my-reservations', [ReservationController::class, 'myReservations']);
    Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);

//ADMIN
Route::middleware('admin')->group(function () {
    Route::get('/admin/reservations', [ReservationController::class, 'adminIndex']);

    //concert
    Route::get('/admin/concerts/{concert}', [ConcertController::class, 'adminShow']);
    Route::post('/admin/concerts', [ConcertController::class, 'store']);
    Route::put('/admin/concerts/{concert}', [ConcertController::class, 'adminUpdate']);
    Route::delete('/admin/concerts/{concert}', [ConcertController::class, 'adminDestroy']);
    Route::get('/admin/concerts', [ConcertController::class, 'adminIndex']);

    //place
    Route::get('/admin/places', [PlaceController::class, 'index']);
    Route::get('/admin/places/{place}', [PlaceController::class, 'adminShow']);
    Route::post('/admin/places', [PlaceController::class, 'store']);
    Route::put('/admin/places/{place}', [PlaceController::class, 'adminUpdate']);
    Route::delete('/admin/places/{place}', [PlaceController::class, 'adminDestroy']);

    //user
    Route::get('/users/all', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::put('/users/{id}/role', [UserController::class, 'updateRole']);
    Route::put('/users/{id}/password', [UserController::class, 'updatePassword']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Performers
    Route::get('/admin/performers', [PerformerController::class, 'adminIndex']);
    Route::get('/admin/performers/{performer}', [PerformerController::class, 'adminShow']);
    Route::post('/admin/performers', [PerformerController::class, 'adminStore']);
    Route::put('/admin/performers/{performer}', [PerformerController::class, 'adminUpdate']);
    Route::delete('/admin/performers/{performer}', [PerformerController::class, 'adminDestroy']);

    // Rooms
    Route::get('/admin/rooms', [RoomController::class, 'adminIndex']);
    Route::get('/admin/rooms/{room}', [RoomController::class, 'adminShow']);
    Route::post('/admin/rooms', [RoomController::class, 'adminStore']);
    Route::put('/admin/rooms/{room}', [RoomController::class, 'adminUpdate']);
    Route::delete('/admin/rooms/{room}', [RoomController::class, 'adminDestroy']);

    // Seats
    Route::get('/admin/seats', [SeatController::class, 'adminIndex']);
    Route::get('/admin/seats/{seat}', [SeatController::class, 'adminShow']);
    Route::post('/admin/seats', [SeatController::class, 'adminStore']);
    Route::put('/admin/seats/{seat}', [SeatController::class, 'adminUpdate']);
    Route::delete('/admin/seats/{seat}', [SeatController::class, 'adminDestroy']);
    });
});
