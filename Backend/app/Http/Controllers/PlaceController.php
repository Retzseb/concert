<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Http\Requests\StorePlaceRequest;
use App\Http\Requests\UpdatePlaceRequest;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Place::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlaceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Place::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlaceRequest $request, Place $place)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        //
    }
}
