<?php

use App\Models\Concert;
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
        Schema::create('concerts', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->foreignId('performer_id')->constrained();
            $table->foreignId('room_id')->constrained();
            $table->dateTime('date');
            $table->integer('base_price');
            $table->string('description')->nullable();
            $table->tinyInteger('status')->default(0); 
            $table->timestamps();

            $table->unique(['name', 'room_id', 'date']);
        });

        Concert::create([
        'name' => 'Tankcsapda – Tavaszi koncert',            
        'performer_id' => '10',
        'room_id' => '1',
        'date' => '2026-03-12 20:00:00',
        'base_price' => '12990',
        'description' => '',
        'status'=>0
        ]);                    
        Concert::create([
        'name' => 'Halott Pénz – Turnéállomás',            
        'performer_id' => '11',
        'room_id' => '3',
        'date' => '2026-04-05 19:30:00',
        'base_price' => '14990',
        'description' => '',
        'status'=>0
        ]);   
        Concert::create([
        'name' => 'Quimby – Akusztik',            
        'performer_id' => '12',
        'room_id' => '4',
        'date' => '2026-03-22 19:00:00',
        'base_price' => '11990',
        'description' => '',
        'status'=>0
        ]);
        Concert::create([
        'name' => 'Analog Balaton – Elektronikus est',            
        'performer_id' => '13',
        'room_id' => '2',
        'date' => '2026-02-28 21:00:00',
        'base_price' => '9990',
        'description' => '',
        'status'=>0
        ]);       
        Concert::create([
        'name' => 'Jazz Night',            
        'performer_id' => '4',
        'room_id' => '6',
        'date' => '2026-03-01 19:00:00',
        'base_price' => '8990',
        'description' => '',
        'status'=>0
        ]);     
        Concert::create([
        'name' => 'Akarsz-e játszani?',            
        'performer_id' => '15',
        'room_id' => '8',
        'date' => '2026-04-18 18:30:00',
        'base_price' => '6990',
        'description' => '',
        'status'=>0
        ]);                       
        Concert::create([
        'name' => 'Világok találkozása – Megérthető zene',            
        'performer_id' => '8',
        'room_id' => '7',
        'date' => '2026-05-02 19:00:00',
        'base_price' => '10990',
        'description' => '',
        'status'=>0
        ]);  

    }
        


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concerts');
    }
};
