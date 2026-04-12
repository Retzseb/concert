<?php

namespace App\Http\Controllers;

use App\Models\Performer;
use App\Http\Requests\StorePerformerRequest;
use App\Http\Requests\UpdatePerformerRequest;

class PerformerController extends Controller
{
    public function index()
    {
        return Performer::all();
    }

    public function store(StorePerformerRequest $request)
    {
        $performer = Performer::create($request->validated());
        return response()->json($performer, 201);
    }

    public function show(string $id)
    {
        return Performer::find($id);
    }

    public function update(UpdatePerformerRequest $request, Performer $performer)
    {
        $performer->update($request->validated());
        return response()->json($performer);
    }

    public function destroy(Performer $performer)
    {
        $performer->delete();
        return response()->json(['message' => 'Deleted']);
    }

    //admin

    public function adminIndex()
    {
        return Performer::all();
    }

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
