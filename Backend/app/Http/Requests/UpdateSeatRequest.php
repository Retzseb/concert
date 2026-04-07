<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'room_id' => ['sometimes', 'integer', 'exists:rooms,id'],
            'row_number' => ['sometimes', 'integer', 'min:1'],
            'column_number' => ['sometimes', 'integer', 'min:1'],
            'price_multiplier' => ['sometimes', 'numeric', 'gt:0'],
        ];
    }
}
