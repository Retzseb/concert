<?php

namespace App\Http\Controllers;

use App\Models\Concert;
use App\Http\Requests\StoreConcertRequest;
use App\Http\Requests\UpdateConcertRequest;

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
        $lending = Concert::where('performer_id',"=", $performer_id)
        ->where('performer_id', $performer_id)
        ->where('name', $name)
        ->where('room_id', $room_id)
        ->get();
        return $lending[0]; 
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
}
