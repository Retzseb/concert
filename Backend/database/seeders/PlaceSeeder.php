<?php

namespace Database\Seeders;

use App\Models\Place;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    public function run(): void
    {
        $places = [
            ['name' => 'A38 Hajó', 'city' => 'Budapest', 'address' => 'Petőfi híd budai hídfő'],
            ['name' => 'Akvárium Klub', 'city' => 'Budapest', 'address' => 'Erzsébet tér 12.'],
            ['name' => 'Barba Negra', 'city' => 'Budapest', 'address' => 'Szállító utca 3.'],
            ['name' => 'Budapest Park', 'city' => 'Budapest', 'address' => 'Soroksári út 60.'],
            ['name' => 'Erkel Színház', 'city' => 'Budapest', 'address' => 'II. János Pál pápa tér 30.'],
            ['name' => 'Művészetek Palotája', 'city' => 'Budapest', 'address' => 'Komor Marcell utca 1.'],
            ['name' => 'Müpa Fesztivál Színház', 'city' => 'Budapest', 'address' => 'Komor Marcell utca 1.'],
            ['name' => 'Papp László Sportaréna', 'city' => 'Budapest', 'address' => 'Stefánia út 2.'],
            ['name' => 'Vigadó', 'city' => 'Budapest', 'address' => 'Vigadó tér 2.'],
            ['name' => 'Várkert Bazár', 'city' => 'Budapest', 'address' => 'Ybl Miklós tér 2-6.'],
        ];

        foreach ($places as $place) {
            Place::query()->firstOrCreate(['name' => $place['name']], $place);
        }
    }
}
