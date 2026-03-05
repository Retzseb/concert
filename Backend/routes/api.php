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
Route::get('/reservations/{id}', [ReservationController::class, 'show']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::get('/seats/{id}', [SeatController::class, 'show']);
Route::get('/tickets/{id}', [TicketController::class, 'show']);

Route::get('/concerts/all', [ConcertController::class, 'concertAllDataList']);
Route::get('/place/all', [PlaceController::class, 'index']);
Route::get('/genre/all', [GenreController::class, 'index']);



//AUTH (protected)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn (Request $request) => $request->user());
    Route::put('/me', [UserController::class, 'updateMe']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

//ADMIN
Route::middleware('admin')->group(function () {
    //concert
    Route::get('/admin/concerts', [ConcertController::class, 'index']);
    Route::get('/admin/concerts/{concert}', [ConcertController::class, 'adminShow']);
    Route::post('/admin/concerts', [ConcertController::class, 'store']);
    Route::put('/admin/concerts/{concert}', [ConcertController::class, 'adminUpdate']);
    Route::delete('/admin/concerts/{concert}', [ConcertController::class, 'adminDestroy']);

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
    Route::get('/performers', [PerformerController::class, 'adminIndex']);
    Route::get('/performers/{performer}', [PerformerController::class, 'adminShow']);
    Route::post('/performers', [PerformerController::class, 'adminStore']);
    Route::put('/performers/{performer}', [PerformerController::class, 'adminUpdate']);
    Route::delete('/performers/{performer}', [PerformerController::class, 'adminDestroy']);

    // Rooms
    Route::get('/rooms', [RoomController::class, 'adminIndex']);
    Route::get('/rooms/{room}', [RoomController::class, 'adminShow']);
    Route::post('/rooms', [RoomController::class, 'adminStore']);
    Route::put('/rooms/{room}', [RoomController::class, 'adminUpdate']);
    Route::delete('/rooms/{room}', [RoomController::class, 'adminDestroy']);
});
});
