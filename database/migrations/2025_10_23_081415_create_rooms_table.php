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
    Schema::create('rooms', function (Blueprint $table) {
        $table->id(); 

        $table->foreignId('place_id')->constrained('places');
        $table->integer('name');

        $table->integer('total_rows');
        $table->integer('total_columns');

        $table->timestamps();

        $table->unique(['place_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
