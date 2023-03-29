<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductStock extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function supplier() {
        return $this->hasOne(Supplier::class, 'id');
    }

    public function product() {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
