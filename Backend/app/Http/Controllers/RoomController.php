<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Room::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoomRequest $request)
    {
        $room = Room::create($request->validated());

        $room->syncSeats();   

        return response()->json($room, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Room::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        $room->update($request->validated());

        $room->syncSeats(); 

        return response()->json($room);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function adminIndex()
    {
        return Room::all();
    }

    public function adminShow(Room $room)
    {
        return $room;
    }

    public function adminStore(StoreRoomRequest $request)
    {
        return $this->store($request);
    }

    public function adminUpdate(UpdateRoomRequest $request, Room $room)
    {
        return $this->update($request, $room);
    }

    public function adminDestroy(Room $room)
    {
        return $this->destroy($room);
    }
}
