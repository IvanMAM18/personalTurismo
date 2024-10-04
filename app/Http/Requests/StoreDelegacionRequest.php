<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDelegacionRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'max:255'],
            'leyenda' => ['required', 'max:255'],
            'descripcion' => ['required', 'max:2000'],
            'cover' => ['required','image'],
            'principal' => ['required','image'],
            'id_delegacion_padre' => ['nullable'],
        ];
    }
}
