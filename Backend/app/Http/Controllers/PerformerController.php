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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Performer $performer)
    {
        //
    }
}
