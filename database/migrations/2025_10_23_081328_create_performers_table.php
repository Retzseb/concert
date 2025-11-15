<?php

use App\Models\Performer;
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
        Schema::create('performers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->foreignId('genre')->default(1)->constrained();
            $table->string('description')->nullable();
            $table->string('country', 20); 
            $table->timestamps();
        });
        Performer::create([
            'name' => 'Fish!',
            'genre' => '1',
            'description' => '',
            'country' => 'magyar'
        ]);
        Performer::create([
            'name' => 'Kowalsky meg a Vega!',
            'genre' => '1',
            'description' => '',
            'country' => 'magyar'
        ]);
        Performer::create([
            'name' => 'Borbély Péter',
            'genre' => '1',
            'description' => '',
            'country' => 'magyar'
        ]);
        Performer::create([
            'name' => 'Budapest Ragtime Band',
            'genre' => '1',
            'description' => '',
            'country' => 'magyar'
        ]);
        Performer::create([
            'name' => 'Ossian!',
            'genre' => '1',
            'description' => '',
            'country' => 'magyar'
        ]);
        Performer::create([
            'name' => 'Moby Dick',
            'genre' => '1',
            'description' => '',
            'country' => 'magyar'
        ]);
        Performer::create([
            'name' => 'Deák Bill Blues Band',
            'genre' => '1',
            'description' => '',
            'country' => 'magyar'
        ]);
        Performer::create([
            'name' => 'Budafoki Dohnányi Ernő Szimfonikus Zenekar',
            'genre' => '1',
            'description' => '',
            'country' => 'magyar'
        ]);
        Performer::create([
            'name' => 'Győri Filharmonikus Zenekar',
            'genre' => '1',
            'description' => '',
            'country' => 'magyar'
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('performers');
    }
};
