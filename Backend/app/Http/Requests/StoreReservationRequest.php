<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'concert_id' => ['required', 'integer', 'exists:concerts,id'],
            'seat_ids' => ['nullable', 'array', 'min:1', 'required_without:items'],
            'seat_ids.*' => ['required_with:seat_ids', 'integer', 'distinct', 'exists:seats,id'],
            'items' => ['nullable', 'array', 'min:1', 'required_without:seat_ids'],
            'items.*.seat_id' => ['required_with:items', 'integer', 'distinct', 'exists:seats,id'],
            'items.*.discount_id' => ['required_with:items', 'integer', 'exists:discounts,id'],
        ];
    }
}
