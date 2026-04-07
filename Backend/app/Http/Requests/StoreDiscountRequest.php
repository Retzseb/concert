<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDiscountRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'string', 'max:50', 'unique:discounts,type'],
            'value' => ['required', 'integer', 'min:0', 'max:100'],
        ];
    }
}
