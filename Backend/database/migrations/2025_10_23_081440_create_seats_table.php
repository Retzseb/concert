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
    Schema::create('seats', function (Blueprint $table) {
        $table->id();

        $table->foreignId('room_id')->constrained('rooms');

        $table->integer('row_number');
        $table->integer('column_number');
        $table->decimal('price_multiplier', 5, 2)->default(1.00);
        $table->timestamps();

        $table->unique(['room_id', 'row_number', 'column_number']);

});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
