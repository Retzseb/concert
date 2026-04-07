<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['jazz', 'rock', 'pop', 'blues', 'klasszikus', 'metál', 'hip-hop', 'elektronikus', 'folk', 'alternatív'] as $name) {
            Genre::query()->firstOrCreate(['name' => $name]);
        }
    }
}
