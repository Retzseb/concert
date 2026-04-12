<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Http\Requests\StorePlaceRequest;
use App\Http\Requests\UpdatePlaceRequest;

class PlaceController extends Controller
{
    public function index()
    {
        return Place::orderBy('name')->get();
    }

    public function store(StorePlaceRequest $request)
    {
        $place = Place::create($request->validated());

        return response()->json([
            'message' => 'Place created',
            'place' => $place,
        ], 201);
    }

    public function show(string $id)
    {
        return Place::find($id);
    }

    public function update(UpdatePlaceRequest $request, Place $place)
    {
        $place->update($request->validated());
        return $place;
    }

    public function destroy(Place $place)
    {
        $place->delete();
        return response()->noContent();
    }

    //admin
    public function adminShow(string $id)
    {
        return Place::find($id);
    }

    public function adminUpdate(UpdatePlaceRequest $request, Place $place)
    {
        $place->update($request->validated());

        return response()->json([
            'message' => 'Place updated',
            'place' => $place->fresh(),
        ]);
    }

    public function adminDestroy(Place $place)
    {
        $place->delete();

        return response()->json([
            'message' => 'Place deleted',
        ], 200);
    }

    //Search főoldal
    public function placeList()
    {
        return Place::orderBy('name')->get();
    }
}
