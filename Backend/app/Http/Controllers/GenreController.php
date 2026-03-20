<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Http\Requests\StoreGenreRequest;
use App\Http\Requests\UpdateGenreRequest;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Genre::orderBy('name')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGenreRequest $request)
    {
        $genre = Genre::create($request->validated());
        return response()->json($genre, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Genre::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGenreRequest $request, Genre $genre)
    {
        $genre->update($request->validated());
        return response()->json($genre);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        $genre->delete();
        return response()->json(['message' => 'Deleted']);
    }

    //Search főoldal
    public function genreList()
    {
        return Genre::orderBy('name')->get();
    }

    // admin
    public function adminIndex()
    {
        return $this->index();
    }

    public function adminShow(Genre $genre)
    {
        return response()->json($genre, 200);
    }

    public function adminStore(StoreGenreRequest $request)
    {
        return $this->store($request);
    }

    public function adminUpdate(UpdateGenreRequest $request, Genre $genre)
    {
        return $this->update($request, $genre);
    }

    public function adminDestroy(Genre $genre)
    {
        return $this->destroy($genre);
    }
}
