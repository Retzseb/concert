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
        return Seat::query()
            ->orderBy('room_id')
            ->orderBy('row_number')
            ->orderBy('column_number')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSeatRequest $request)
    {
        $seat = Seat::create($request->validated());
        return response()->json($seat, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Seat::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSeatRequest $request, Seat $seat)
    {
        $seat->fill($request->validated());
        $seat->save();

        return response()->json($seat, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seat $seat)
    {
        $seat->delete();

        return response()->noContent();
    }

    //admin
        public function adminIndex()
    {
        return $this->index();
    }

    public function adminShow(Seat $seat)
    {
        return $seat;
    }

    public function adminStore(StoreSeatRequest $request)
    {
        $seat = Seat::create($request->validated());

        return response()->json($seat, 201);
    }

    public function adminUpdate(UpdateSeatRequest $request, Seat $seat)
    {
        $seat->fill($request->validated());
        $seat->save();

        return response()->json($seat, 200);
    }

    public function adminDestroy(Seat $seat)
    {
        $seat->delete();

        return response()->noContent();
    }

    public function userShow(Seat $seat)
    {
        return $seat;
    }
}
