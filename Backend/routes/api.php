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

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::get('/concerts/all', [ConcertController::class, 'concertAllDataList']);
Route::get('/concerts/{concert}/seats', [ConcertController::class, 'seats']);
Route::get('/discounts', [DiscountController::class, 'index']);
Route::get('/genres', [GenreController::class, 'index']);
Route::get('/places', [PlaceController::class, 'index']);
Route::get('/seats', [SeatController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn (Request $request) => $request->user());
    Route::put('/me', [UserController::class, 'updateMe']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::get('/my-reservations', [ReservationController::class, 'myReservations']);
    Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);
    Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy']);

    Route::middleware('admin')->group(function () {
        Route::get('/admin/reservations', [ReservationController::class, 'adminIndex']);

        Route::get('/admin/concerts', [ConcertController::class, 'adminIndex']);
        Route::get('/admin/concerts/{concert}', [ConcertController::class, 'adminShow']);
        Route::post('/admin/concerts', [ConcertController::class, 'store']);
        Route::put('/admin/concerts/{concert}', [ConcertController::class, 'adminUpdate']);
        Route::delete('/admin/concerts/{concert}', [ConcertController::class, 'adminDestroy']);

        Route::get('/admin/places', [PlaceController::class, 'index']);
        Route::post('/admin/places', [PlaceController::class, 'store']);
        Route::put('/admin/places/{place}', [PlaceController::class, 'adminUpdate']);
        Route::delete('/admin/places/{place}', [PlaceController::class, 'adminDestroy']);

        Route::get('/users/all', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}/role', [UserController::class, 'updateRole']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        Route::get('/admin/performers', [PerformerController::class, 'adminIndex']);
        Route::post('/admin/performers', [PerformerController::class, 'adminStore']);
        Route::put('/admin/performers/{performer}', [PerformerController::class, 'adminUpdate']);
        Route::delete('/admin/performers/{performer}', [PerformerController::class, 'adminDestroy']);

        Route::get('/admin/rooms', [RoomController::class, 'adminIndex']);
        Route::post('/admin/rooms', [RoomController::class, 'adminStore']);
        Route::put('/admin/rooms/{room}', [RoomController::class, 'adminUpdate']);
        Route::delete('/admin/rooms/{room}', [RoomController::class, 'adminDestroy']);

        Route::get('/admin/seats', [SeatController::class, 'adminIndex']);
        Route::put('/admin/seats/{seat}', [SeatController::class, 'adminUpdate']);

        Route::get('/admin/genres', [GenreController::class, 'adminIndex']);
        Route::post('/admin/genres', [GenreController::class, 'adminStore']);
        Route::put('/admin/genres/{genre}', [GenreController::class, 'adminUpdate']);
        Route::delete('/admin/genres/{genre}', [GenreController::class, 'adminDestroy']);
    });
});
