<?php

use App\Models\Place;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('city', 20);
            $table->string('address');
            $table->timestamps();
        });

        Place::create([
            'name' => 'A38',
            'city' => 'Budapest',
            'address' => 'Petőfi híd, budai hídfő'
        ]);     
        Place::create([
            'name' => 'Budapest Park',
            'city' => 'Budapest',
            'address' => '1095 Budapest, Fábián Juli tér 1.'
        ]);   
        Place::create([
            'name' => 'Dürer Kert',
            'city' => 'Budapest',
            'address' => '1117, Budapest, Öböl utca 1.'
        ]);       
        Place::create([
            'name' => 'Müpa',
            'city' => 'Budapest',
            'address' => '1095 Budapest, Komor Marcell u. 1.'
        ]);
        Place::create([
            'name' => 'Papp László Sportaréna',
            'city' => 'Budapest',
            'address' => '1143 Budapest, Stefánia út 2.'
        ]);    
        Place::create([
            'name' => 'Gyulai Várszínház',
            'city' => 'Gyula',
            'address' => '5700 Gyula, Kossuth u. 13.'
        ]);                 
        Place::create([
            'name' => 'Tokaj Fesztiválkatlan',
            'city' => 'Tokaj',
            'address' => '3910 Tokaj, Rákóczi út'
        ]);    
        Place::create([
            'name' => 'Kultkikötő',
            'city' => 'Balatonboglár',
            'address' => '8630 Balatonboglár, Parti sétány 11.'
        ]);            
        Place::create([
            'name' => 'Boglári Nagyszínpad',
            'city' => 'Balatonboglár',
            'address' => '8630 Balatonboglár, Parti sétány 11.'
        ]);                         
        Place::create([
            'name' => 'SunCity',
            'city' => 'Balatonfüred',
            'address' => '8230 Balatonfüred, Fürdő u. 35.'
        ]);      
        Place::create([
            'name' => 'Barba Negra',
            'city' => 'Budapest',
            'address' => '1211 Budapest, Szállító u. 3.'
        ]);                   
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
