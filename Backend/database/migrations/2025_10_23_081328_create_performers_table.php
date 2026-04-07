<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
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
    }

    public function down(): void
    {
        Schema::dropIfExists('performers');
    }
};
