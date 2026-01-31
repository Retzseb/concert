<?php

use App\Models\Room;
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
    Schema::create('rooms', function (Blueprint $table) {
        $table->id(); 

        $table->foreignId('place_id')->constrained('places');
        $table->integer('name');

        $table->integer('total_rows');
        $table->integer('total_columns');

        $table->timestamps();

        $table->unique(['place_id', 'name']);
        });
        Room::create([
        'place_id' => '1',            
        'name' => '1',
        'total_rows' => '10',
        'total_columns' => '12'
        ]); 
        Room::create([
        'place_id' => '1',            
        'name' => '2',
        'total_rows' => '8',
        'total_columns' => '10'
        ]); 
        Room::create([
        'place_id' => '2',            
        'name' => '1',
        'total_rows' => '12',
        'total_columns' => '14'
        ]);
        Room::create([
        'place_id' => '3',            
        'name' => '1',
        'total_rows' => '10',
        'total_columns' => '10'
        ]);             
        Room::create([
        'place_id' => '3',            
        'name' => '2',
        'total_rows' => '6',
        'total_columns' => '8'
        ]); 
        Room::create([
        'place_id' => '4',            
        'name' => '1',
        'total_rows' => '14',
        'total_columns' => '16'
        ]);       
        Room::create([
        'place_id' => '4',            
        'name' => '2',
        'total_rows' => '10',
        'total_columns' => '12'
        ]);  
        Room::create([
        'place_id' => '5',            
        'name' => '1',
        'total_rows' => '8',
        'total_columns' => '10'
        ]);  
        Room::create([
        'place_id' => '6',            
        'name' => '1',
        'total_rows' => '10',
        'total_columns' => '12'
        ]);     
        Room::create([
        'place_id' => '7',            
        'name' => '1',
        'total_rows' => '6',
        'total_columns' => '10'
        ]);    
        Room::create([
        'place_id' => '8',            
        'name' => '1',
        'total_rows' => '6',
        'total_columns' => '8'
        ]);   
        Room::create([
        'place_id' => '9',            
        'name' => '1',
        'total_rows' => '10',
        'total_columns' => '10'
        ]);
        Room::create([
        'place_id' => '10',            
        'name' => '1',
        'total_rows' => '12',
        'total_columns' => '10'
        ]);                                                                             
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
