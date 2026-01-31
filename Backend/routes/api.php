<?php

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

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/users", [UserController::class, "index"]);
Route::get("/concerts", [ConcertController::class, "index"]);
Route::get("/discounts", [DiscountController::class, "index"]);
Route::get("/genres", [GenreController::class, "index"]);
Route::get("/performers", [PerformerController::class, "index"]);
Route::get("/places", [PlaceController::class, "index"]);
Route::get("/reservations", [ReservationController::class, "index"]);
Route::get("/rooms", [RoomController::class, "index"]);
Route::get("/seats", [SeatController::class, "index"]);
Route::get("/tickets", [TicketController::class, "index"]);

Route::get("/users/{id}", [UserController::class, "show"]);
Route::get("/concerts/{performer_id}/{name}/{room_id}", [ConcertController::class, "show"]);
Route::get("/discounts/{id}", [DiscountController::class, "show"]);
Route::get("/genres/{id}", [GenreController::class, "show"]);
Route::get("/performers/{id}", [PerformerController::class, "show"]);
Route::get("/places/{id}", [PlaceController::class, "show"]);
Route::get("/rooms/{place_id}/{name}", [RoomController::class, "show"]);
