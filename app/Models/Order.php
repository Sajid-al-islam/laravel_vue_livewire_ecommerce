<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    
    public function order_address(){
        return $this->hasOne('App\Models\OrderAddress','order_id','id');
    }
    public function order_details(){
        // return $this->hasMany('App\Models\OrderDetails','user_id','user_id');
        return $this->hasMany(OrderDetails::class,'order_id','id');
    }
    public function order_payments(){
        // return $this->hasMany('App\Models\OrderDetails','user_id','user_id');
        return $this->hasOne(OrderPayment::class,'order_id','id');
    }
}
