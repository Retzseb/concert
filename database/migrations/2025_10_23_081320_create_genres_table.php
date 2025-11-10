<?php

use App\Models\Genre;
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
        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();            
        });
        Genre::create([
            'name' => 'jazz',
        ]);   
        Genre::create([
            'name' => 'rock',
        ]);
        Genre::create([
            'name' => 'pop',   
        ]);               
        Genre::create([
            'name' => 'blues',   
        ]);  
        Genre::create([
            'name' => 'klasszikus',   
        ]);          
        Genre::create([
            'name' => 'metál',   
        ]); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('genres');
    }
};
