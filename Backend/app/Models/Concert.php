<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concert extends Model
{
    /** @use HasFactory<\Database\Factories\ConcertFactory> */
    use HasFactory;
    protected $fillable = [
        'picture',
        'name',
        'performer_id', 
        'room_id',
        'date',
        'base_price',
        'description',
        'status', 
        'soft_delete'
    ];     
    
        protected function casts(): array
    {
        return [
            'date' => 'datetime',
            'soft_delete' => 'boolean',
        ];
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function performer()
    {
        return $this->belongsTo(Performer::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
