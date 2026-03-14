<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory;
    
    protected $fillable = [
        'place_id',
        'name',
        'total_rows', 
        'total_columns'
    ];        

    public function place()
    {
        return $this->belongsTo(Place::class);
    }

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }    

    public function syncSeats(bool $deleteOutsideBounds = true): void
    {
        DB::transaction(function () use ($deleteOutsideBounds) {
            $this->loadMissing('seats');

            $existingSeats = $this->seats()->get()->keyBy(function (Seat $seat) {
                return $seat->row_number . '-' . $seat->column_number;
            });

            for ($row = 1; $row <= (int) $this->total_rows; $row++) {
                for ($column = 1; $column <= (int) $this->total_columns; $column++) {
                    $key = $row . '-' . $column;
                    if (! $existingSeats->has($key)) {
                        $this->seats()->create([
                            'row_number' => $row,
                            'column_number' => $column,
                            'price_multiplier' => 1.00,
                        ]);
                    }
                }
            }

            if (! $deleteOutsideBounds) {
                return;
            }

            $outsideBounds = $this->seats()
                ->where(function ($query) {
                    $query->where('row_number', '>', $this->total_rows)
                        ->orWhere('column_number', '>', $this->total_columns);
                })
                ->get();

            if ($outsideBounds->isEmpty()) {
                return;
            }

            $blockedSeatIds = Ticket::query()
                ->whereIn('seat_id', $outsideBounds->pluck('id'))
                ->pluck('seat_id')
                ->all();

            if (! empty($blockedSeatIds)) {
                throw ValidationException::withMessages([
                    'total_rows' => ['A terem mérete nem csökkenthető, mert a levágott székekhez már tartozik jegy.'],
                    'total_columns' => ['A terem mérete nem csökkenthető, mert a levágott székekhez már tartozik jegy.'],
                ]);
            }

            $this->seats()->whereIn('id', $outsideBounds->pluck('id'))->delete();
        });
    }    
}
