<?php

namespace Database\Seeders;

use App\Models\Performer;
use Illuminate\Database\Seeder;

class PerformerSeeder extends Seeder
{
    public function run(): void
    {
        $performers = [
            ['name' => 'Fish!', 'genre' => 3, 'description' => 'Energikus magyar alternatív rockzenekar, amely lendületes koncertjeiről és szókimondó szövegeiről ismert. Dalaik egyszerre szórakoztatóak és elgondolkodtatóak.', 'country' => 'magyar'],
            ['name' => 'Kowalsky meg a Vega!', 'genre' => 2, 'description' => 'Egyedi hangzásvilágú zenekar, amely a rockot, popot és alternatív elemeket ötvözi. Pozitív üzenetű szövegeik és erős színpadi jelenlétük miatt rendkívül népszerűek.', 'country' => 'magyar'],
            ['name' => 'LGT', 'genre' => 2, 'description' => 'A magyar rockzene egyik meghatározó legendája. Időtálló dalaik generációk óta meghatározó részét képezik a hazai zenei kultúrának.', 'country' => 'magyar'],
            ['name' => 'Budapest Ragtime Band', 'genre' => 1, 'description' => 'A tradicionális jazz és ragtime stílus hazai képviselői, akik vidám, szórakoztató előadásaikkal minden korosztályt megszólítanak.', 'country' => 'magyar'],
            ['name' => 'Ossian!', 'genre' => 6, 'description' => 'Klasszikus magyar heavy metal zenekar, amely évtizedek óta stabil helyet foglal el a hazai rockszíntéren. Erőteljes hangzás és szenvedélyes előadás jellemzi őket.', 'country' => 'magyar'],
            ['name' => 'Moby Dick', 'genre' => 6, 'description' => 'Thrash metal zenekar, amely kemény riffjeiről és lendületes koncertjeiről ismert. Zenéjük a műfaj rajongóinak igazi csemege.', 'country' => 'magyar'],
            ['name' => 'Deák Bill Blues Band', 'genre' => 4, 'description' => 'A magyar blues egyik legismertebb képviselője, karizmatikus előadással és mély érzelmekkel teli dalokkal. A „magyar blueskirály” zenekara.', 'country' => 'magyar'],
            ['name' => 'Budafoki Dohnányi Ernő Szimfonikus Zenekar', 'genre' => 5, 'description' => 'Nemzetközi szinten is elismert szimfonikus zenekar, amely klasszikus és modern művek előadásában egyaránt kiemelkedő.', 'country' => 'magyar'],
            ['name' => 'Győri Filharmonikus Zenekar', 'genre' => 5, 'description' => 'Magas színvonalú klasszikus zenei produkciók jellemzik, repertoárjuk a barokktól a kortárs művekig terjed.', 'country' => 'magyar'],
            ['name' => 'Tankcsapda', 'genre' => 2, 'description' => 'Az egyik legismertebb magyar rockzenekar, akik több évtizede uralják a hazai színpadokat. Nyers energiájuk és ikonikus dalaik miatt hatalmas rajongótáborral rendelkeznek.', 'country' => 'magyar'],
            ['name' => 'Halott Pénz', 'genre' => 7, 'description' => 'Modern pop és rap elemeket ötvöző formáció, amely fülbemászó dallamaival és személyes hangvételű szövegeivel hódít.', 'country' => 'magyar'],
            ['name' => 'Quimby', 'genre' => 10, 'description' => 'Alternatív zenei világ, költői szövegek és különleges hangzás jellemzi őket. Az egyik legkarakteresebb magyar zenekar.', 'country' => 'magyar'],
            ['name' => 'Analog Balaton', 'genre' => 8, 'description' => 'Elektronikus és alternatív elemeket vegyítő duó, amely modern, atmoszferikus hangzásával tűnik ki.', 'country' => 'magyar'],
            ['name' => 'Parno Graszt', 'genre' => 9, 'description' => 'Autentikus cigányzenei együttes, akik energikus előadásaikkal és hagyományőrző stílusukkal világszerte ismertek.', 'country' => 'magyar'],
            ['name' => 'Hot Jazz Band', 'genre' => 1, 'description' => 'A klasszikus jazz korszak hangulatát idéző zenekar, amely igényes és szórakoztató előadásaival régóta a műfaj meghatározó szereplője.', 'country' => 'magyar'],
        ];

        foreach ($performers as $performer) {
            Performer::query()->firstOrCreate(['name' => $performer['name']], $performer);
        }
    }
}
