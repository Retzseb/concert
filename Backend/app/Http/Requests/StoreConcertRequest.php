<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConcertRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'picture' => ['nullable', 'string', 'max:2048'],
            'name' => ['required', 'string', 'max:50'],
            'performer_id' => ['required', 'integer', 'exists:performers,id'],
            'room_id' => ['required', 'integer', 'exists:rooms,id'],
            'date' => ['required', 'date'],
            'base_price' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'integer', 'in:0,1,2'],
            'soft_delete' => ['nullable', 'boolean'],
        ];
    }
}
