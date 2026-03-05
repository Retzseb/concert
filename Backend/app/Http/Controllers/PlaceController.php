<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Http\Requests\StorePlaceRequest;
use App\Http\Requests\UpdatePlaceRequest;
use Symfony\Component\HttpFoundation\JsonResponse;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Place::orderBy('name')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlaceRequest $request)
    {
        $place = Place::create($request->validated());

        return response()->json([
            'message' => 'Place created',
            'place' => $place,
        ], 201);
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
        $place->update($request->validated());
        return $place;
    }

    //admin update
    public function adminUpdate(UpdatePlaceRequest $request, Place $place): JsonResponse
    {
        $place->update($request->validated());

        return response()->json([
            'message' => 'Place updated',
            'place' => $place->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        $place->delete();
        return response()->noContent();
    }

    //admin törlés
    public function adminDestroy(Place $place): JsonResponse
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
