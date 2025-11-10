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
            $table->foreignId('genre_id')->constrained('genres');
            $table->string('description');
            $table->string('country', 20); 
            $table->timestamps();
        });
        // Performer::create([
        //     'name' => 'Fish!',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
        // Performer::create([
        //     'name' => 'Kowalsky meg a Vega!',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
        // Performer::create([
        //     'name' => 'Borbély Péter',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
        // Performer::create([
        //     'name' => 'Budapest Ragtime Band',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
        // Performer::create([
        //     'name' => 'Budapest Ragtime Band',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
        // Performer::create([
        //     'name' => 'Ossian!',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
        // Performer::create([
        //     'name' => 'Moby Dick',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
        // Performer::create([
        //     'name' => 'Deák Bill Blues Band',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
        // Performer::create([
        //     'name' => 'Budafoki Dohnányi Ernő Szimfonikus Zenekar',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
        // Performer::create([
        //     'name' => 'Győri Filharmonikus Zenekar',
        //     'description' => '',
        //     'country' => 'magyar'
        // ]);
            }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('performers');
    }
};
