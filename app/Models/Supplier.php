<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    public function phone_numbers()
    {
        return $this->hasMany(MobileNumber::class, 'user_id')->where('table_name', 'suppliers');
    }
}
