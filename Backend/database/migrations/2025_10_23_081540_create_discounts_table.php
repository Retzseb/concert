<?php

use App\Models\Discount;
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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id(); 
            $table->string('type', 20)->unique();
            $table->unsignedTinyInteger('value');
            $table->timestamps();
        });
        Discount::create([
            'type' => 'normál',
            'value' => '100',
        ]);    
        Discount::create([
            'type' => 'diák',
            'value' => '50',
        ]);       
        Discount::create([
            'type' => 'nyugdíjas',
            'value' => '45',
        ]); 
        Discount::create([
            'type' => 'vip',
            'value' => '25',
        ]);   
        Discount::create([
            'type' => 'promo',
            'value' => '10',
        ]);                 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
