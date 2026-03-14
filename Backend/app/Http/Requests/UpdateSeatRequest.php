<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'room_id' => ['sometimes', 'integer', 'exists:rooms,id'],
            'row_number' => ['sometimes', 'integer', 'min:1'],
            'column_number' => ['sometimes', 'integer', 'min:1'],
            'price_multiplier' => ['sometimes', 'numeric', 'min:0'],
        ];
    }
}
