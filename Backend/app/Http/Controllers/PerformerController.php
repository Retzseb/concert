<?php

namespace App\Http\Controllers;

use App\Models\Performer;
use App\Http\Requests\StorePerformerRequest;
use App\Http\Requests\UpdatePerformerRequest;

class PerformerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Performer::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePerformerRequest $request)
    {
        $performer = Performer::create($request->validated());
        return response()->json($performer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Performer::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePerformerRequest $request, Performer $performer)
    {
        $performer->update($request->validated());
        return response()->json($performer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Performer $performer)
    {
        $performer->delete();
        return response()->json(['message' => 'Deleted']);
    }

    //admin
    public function adminShow(Performer $performer)
    {
        return $performer;
    }

    public function adminStore(StorePerformerRequest $request)
    {
        return $this->store($request);
    }

    public function adminUpdate(UpdatePerformerRequest $request, Performer $performer)
    {
        return $this->update($request, $performer);
    }

    public function adminDestroy(Performer $performer)
    {
        return $this->destroy($performer);
    }
}
