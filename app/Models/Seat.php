<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    /** @use HasFactory<\Database\Factories\SeatFactory> */
    use HasFactory;
    protected $fillable = [
        'room_id',
        'row_number',
        'column_number', 
        'price_multiplier'
    ];          
}
