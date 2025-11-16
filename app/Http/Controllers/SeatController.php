<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use App\Http\Requests\StoreSeatRequest;
use App\Http\Requests\UpdateSeatRequest;

class SeatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSeatRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($room_id, $row_number, $column_number)
    {
        $lending = Seat::where('room_id',"=", $room_id)
        ->where('room_id', $room_id)
        ->where('row_number', $row_number)
        ->where('column_number', $column_number)
        ->get();
        return $lending[0];    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSeatRequest $request, Seat $seat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seat $seat)
    {
        //
    }
}
