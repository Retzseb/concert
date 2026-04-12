<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Http\Requests\StoreGenreRequest;
use App\Http\Requests\UpdateGenreRequest;

class GenreController extends Controller
{
    public function index()
    {
        return Genre::orderBy('name')->get();
    }

    public function store(StoreGenreRequest $request)
    {
        $genre = Genre::create($request->validated());
        return response()->json($genre, 201);
    }

    public function show(string $id)
    {
        return Genre::find($id);
    }

    public function update(UpdateGenreRequest $request, Genre $genre)
    {
        $genre->update($request->validated());
        return response()->json($genre);
    }

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
