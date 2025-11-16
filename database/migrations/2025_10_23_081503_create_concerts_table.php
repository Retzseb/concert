<?php

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
        });

    }
        


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concerts');
    }
};
