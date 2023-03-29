<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Customer extends Model
{
    use HasFactory;
    protected $type = 'create';

    public function findById($id)
    {
        return $this->find($id);
    }

    public function type($type="create")
    {
        $this->type = $type;
        return $this;
    }
    public function name($name)
    {
        $this->name = $name;
        return $this;
    }
    public function email($email)
    {
        $this->email = $email;
        return $this;
    }
    public function address($address)
    {
        $this->address = $address;
        return $this;
    }
    public function upload()
    {
        if($this->type == 'create'){
            $this->created_at = Carbon::now();
        }

        $this->creator = Auth::user()->id;
        $this->save();
        $this->slug = $this->id.rand(10000,99999);

        return $this->save();
    }

    public function phone_numbers()
    {
        return $this->hasMany(MobileNumber::class, 'user_id');
    }
}
