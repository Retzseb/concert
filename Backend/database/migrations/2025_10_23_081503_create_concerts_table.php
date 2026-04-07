<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('concerts', function (Blueprint $table) {
            $table->id();
            $table->string('picture')->nullable();
            $table->string('name', 50);
            $table->foreignId('performer_id')->constrained();
            $table->foreignId('room_id')->constrained();
            $table->dateTime('date');
            $table->integer('base_price');
            $table->string('description')->nullable();
            $table->tinyInteger('status')->default(0);
            $table->boolean('soft_delete')->default(false);
            $table->timestamps();

            $table->unique(['name', 'room_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('concerts');
    }
};
