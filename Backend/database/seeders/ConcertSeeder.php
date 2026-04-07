<?php

namespace Database\Seeders;

use App\Models\Concert;
use Illuminate\Database\Seeder;

class ConcertSeeder extends Seeder
{
    public function run(): void
    {
        $picture = 'https://bdz.hu/wp-content/uploads/2019/10/zenekar.jpg';

        $concerts = [
            ['picture' => $picture, 'name' => 'Tankcsapda – Tavaszi koncert', 'performer_id' => 10, 'room_id' => 1, 'date' => '2026-03-12 20:00:00', 'base_price' => 12990, 'description' => 'A legendás debreceni rocktrió ismét színpadra lép egy energikus tavaszi koncert erejéig. A jól ismert slágerek mellett új dalokkal is készülnek, garantált a pörgős hangulat és a telt házas élmény.', 'status' => 1, 'soft_delete' => false],
            ['picture' => $picture, 'name' => 'Halott Pénz – Turnéállomás', 'performer_id' => 11, 'room_id' => 3, 'date' => '2026-04-05 19:30:00', 'base_price' => 14990, 'description' => 'A Halott Pénz egy újabb állomásához érkezik országos turnéjának. Dallamos pop-rap hangzás, közönségkedvenc dalok és felejthetetlen hangulat vár minden látogatót.', 'status' => 0, 'soft_delete' => false],
            ['picture' => $picture, 'name' => 'Quimby – Akusztik', 'performer_id' => 12, 'room_id' => 4, 'date' => '2026-03-22 19:00:00', 'base_price' => 11990, 'description' => 'Egy különleges, bensőséges hangulatú este a Quimbyvel. Az ismert dalok akusztikus feldolgozásban csendülnek fel, új oldalról mutatva meg a zenekar egyedi világát.', 'status' => 0, 'soft_delete' => false],
            ['picture' => $picture, 'name' => 'Analog Balaton – Elektronikus est', 'performer_id' => 13, 'room_id' => 2, 'date' => '2026-02-28 21:00:00', 'base_price' => 9990, 'description' => 'Modern elektronikus hangzás és atmoszferikus dallamok találkozása egy különleges éjszakán. Az Analog Balaton egyedi stílusával garantáltan magával ragadja a közönséget.', 'status' => 0, 'soft_delete' => false],
            ['picture' => $picture, 'name' => 'Jazz Night', 'performer_id' => 4, 'room_id' => 6, 'date' => '2026-03-01 19:00:00', 'base_price' => 8990, 'description' => 'Egy elegáns este a jazz szerelmeseinek. Kiváló zenészek, improvizáció és hamisítatlan klubhangulat várja az érdeklődőket.', 'status' => 0, 'soft_delete' => false],
            ['picture' => $picture, 'name' => 'Akarsz-e játszani?', 'performer_id' => 15, 'room_id' => 8, 'date' => '2026-04-18 18:30:00', 'base_price' => 6990, 'description' => 'Egy különleges zenei és irodalmi est, ahol a dallamok és a szövegek együtt kelnek életre. Intim hangulat, elgondolkodtató pillanatok és művészi élmény egy helyen.', 'status' => 0, 'soft_delete' => false],
            ['picture' => $picture, 'name' => 'Világok találkozása – Megérthető zene', 'performer_id' => 8, 'room_id' => 7, 'date' => '2026-05-02 19:00:00', 'base_price' => 10990, 'description' => 'Ez az est a különböző zenei stílusok találkozását mutatja be közérthető és élvezetes formában. Klasszikus és modern elemek ötvözete egy izgalmas koncertélményben.', 'status' => 0, 'soft_delete' => false],
        ];

        foreach ($concerts as $concert) {
            Concert::query()->firstOrCreate(['name' => $concert['name'], 'room_id' => $concert['room_id'], 'date' => $concert['date']], $concert);
        }
    }
}
