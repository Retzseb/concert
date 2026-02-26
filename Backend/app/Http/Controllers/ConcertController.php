<?php

namespace App\Http\Controllers;

use App\Models\Concert;
use App\Http\Requests\StoreConcertRequest;
use App\Http\Requests\UpdateConcertRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ConcertController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Concert::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConcertRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($performer_id, $name, $room_id)
    {
        $data = Concert::where('performer_id',"=", $performer_id)
        ->where('performer_id', $performer_id)
        ->where('name', $name)
        ->where('room_id', $room_id)
        ->get();
        return $data[0]; 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConcertRequest $request, Concert $concert)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Concert $concert)
    {
        //
    }

public function concertAllDataList(Request $request)
{
    $conc = $request->query('conc');          
    $date = $request->query('date');       
    $performerId = $request->query('performer_id');
    $roomId = $request->query('room_id');
    $placeId = $request->query('place_id');
    $genreId = $request->query('genre_id');

    $query = DB::table('concerts')
        ->join('performers', 'performers.id', '=', 'concerts.performer_id')
        ->join('rooms', 'rooms.id', '=', 'concerts.room_id')
        ->join('places', 'places.id', '=', 'rooms.place_id')
        ->leftJoin('genres', 'genres.id', '=', 'performers.genre')
        ->select([
            'concerts.id',
            'concerts.name',
            'concerts.date',
            'concerts.base_price',
            'concerts.description',
            'concerts.status',
            'concerts.performer_id',
            'performers.name as performer_name',
            'concerts.room_id',
            'rooms.name as room_name',
            'places.id as place_id',
            'places.name as place_name',
            'places.city as place_city',
            'genres.id as genre_id',
            'genres.name as genre_name',
        ]);

    if ($performerId) $query->where('concerts.performer_id', $performerId);
    if ($roomId) $query->where('concerts.room_id', $roomId);
    if ($placeId) $query->where('places.id', $placeId);
    if ($genreId) $query->where('genres.id', $genreId);

    if ($date) {
        $query->whereDate('concerts.date', $date);
    }

    if ($conc) {
        $query->where(function ($w) use ($conc) {
            $w->where('concerts.name', 'like', "%$conc%")
              ->orWhere('performers.name', 'like', "%$conc%");
        });
    }

    return $query->orderBy('concerts.date')->get();
}
}
