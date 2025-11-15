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

        $table->foreignId('place_id');
        $table->integer('room_name');

        $table->integer('row_number');
        $table->integer('column_number');
        $table->decimal('price_multiplier', 5, 2)->default(1.00);
        $table->timestamps();

        $table->foreign(['place_id', 'room_name'])
            ->references(['place_id', 'name'])
            ->on('rooms')
            ->onDelete('cascade');
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
