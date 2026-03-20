<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use App\Models\Ticket;

class RoomController extends Controller
{
    public function index()
    {
        return Room::all();
    }

    public function store(StoreRoomRequest $request)
    {
        $room = Room::create($request->validated());
        $room->syncSeats();
        return response()->json($room, 201);
    }

    public function show(string $id)
    {
        return Room::find($id);
    }

    public function update(UpdateRoomRequest $request, Room $room)
    {
        $room->update($request->validated());
        $room->syncSeats();
        return response()->json($room);
    }

    public function destroy(Room $room)
    {
        $room->loadMissing(['seats', 'place']);

        $concertCount = $room->concerts()->count();
        if ($concertCount > 0) {
            return response()->json([
                'message' => 'A terem nem törölhető, mert még koncert tartozik hozzá.',
                'concert_count' => $concertCount,
            ], 422);
        }

        $seatIds = $room->seats->pluck('id');
        $ticketCount = $seatIds->isEmpty() ? 0 : Ticket::query()->whereIn('seat_id', $seatIds)->count();
        if ($ticketCount > 0) {
            return response()->json([
                'message' => 'A terem nem törölhető, mert a székeihez már tartozik jegy.',
                'ticket_count' => $ticketCount,
            ], 422);
        }

        $room->seats()->delete();
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
