<?php

namespace App\Http\Controllers\Admin\Management;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\MobileNumber;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    public $data;

    public function __construct()
    {
        $this->data = new Customer();
    }
    public function all()
    {
        $paginate = (int) request()->paginate;
        $orderBy = request()->orderBy;
        $orderByType = request()->orderByType;

        $status = 1;
        if (request()->has('status')) {
            $status = request()->status;
        }


        $query = Customer::where('status', $status)->orderBy($orderBy, $orderByType);

        if (request()->has('search_key')) {
            $key = request()->search_key;
            $query->where(function ($q) use ($key) {
                return $q->where('id', $key)
                    ->orWhere('name', $key)
                    ->orWhere('name', 'LIKE', '%' . $key . '%')
                    ->orWhere('email', $key)
                    ->orWhere('email', 'LIKE', '%' . $key . '%')
                    ->orWhere('address', 'LIKE', '%' . $key . '%');
            });
        }

        $users = $query->with('phone_numbers')->paginate($paginate);
        return response()->json($users);
    }

    public function show($id)
    {
        $data = Customer::where('id', $id)->with('phone_numbers')->first();
        if (!$data) {
            return response()->json([
                'err_message' => 'not found',
                'errors' => ['role' => ['data not found']],
            ], 422);
        }
        return response()->json($data, 200);
    }

    public function store(Request $request)
    {

        $validator = Validator::make(request()->all(), [
            'name' => ['required', 'unique:customers']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->data->name($request->name)
            ->email($request->email)
            ->address($request->address)
            ->upload();

        foreach(json_decode(request()->mobile_numbers) as $mobile_no) {
            $mobile_number = new MobileNumber();
            $mobile_number->user_id = $this->data->id;
            $mobile_number->phone_no = $mobile_no->phone_no;
            $mobile_number->table_name = "customers";
            $mobile_number->creator = Auth::user()->id;
            $mobile_number->save();
        }

        return response()->json($data, 200);
    }

    public function canvas_store(Request $request)
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required', 'unique:Customers']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->data->name($request->name)
            ->email($request->email)
            ->address($request->address)
            ->upload();

        return response()->json($data, 200);
    }

    public function update()
    {
        $data = $this->data->findById(request()->id);
        
        if (!$data) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => ['name' => ['user_role not found by given id ' . (request()->id ? request()->id : 'null')]],
            ], 422);
        }

        $validator = Validator::make(request()->all(), [
            'name' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data->name(request()->name)
            ->email(request()->email)
            ->address(request()->address)
            ->upload();

        $delete = MobileNumber::where('user_id', $data->id)->delete();
        foreach(json_decode(request()->mobile_numbers) as $mobile_no) {
            $mobile_number = new MobileNumber();
            $mobile_number->user_id = $data->id;
            $mobile_number->phone_no = $mobile_no->phone_no;
            $mobile_number->table_name = "customers";
            $mobile_number->creator = Auth::user()->id;
            $mobile_number->save();
        }

        return response()->json($data->with('phone_numbers'), 200);
    }

    public function canvas_update()
    {
        $data = $this->data->findById(request()->id);
        if (!$data) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => ['name' => ['user_role not found by given id ' . (request()->id ? request()->id : 'null')]],
            ], 422);
        }

        $validator = Validator::make(request()->all(), [
            'name' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }


        $data->name(request()->name)
            ->email(request()->email)
            ->address(request()->address)
            ->upload();

        return response()->json($data, 200);
    }

    public function soft_delete()
    {
        $validator = Validator::make(request()->all(), [
            'id' => ['required', 'exists:customers,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = Customer::find(request()->id);
        $data->status = 0;
        $data->save();

        return response()->json([
            'result' => 'deactivated',
        ], 200);
    }

    public function destroy()
    {
    }

    public function status_update()
    {
        $data = Customer::find(request()->id);
        if (!$data) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => ['name' => ['Customer not found by given id ' . (request()->id ? request()->id : 'null')]],
            ], 422);
        }

        $data->Customer_status = request()->Customer_status;
        $data->save();

        return response()->json($data, 200);
    }


    public function restore()
    {
        $validator = Validator::make(request()->all(), [
            'id' => ['required', 'exists:customers,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = Customer::find(request()->id);
        $data->status = 1;
        $data->save();

        return response()->json([
            'result' => 'activated',
        ], 200);
    }

    public function bulk_import()
    {
        $validator = Validator::make(request()->all(), [
            'data' => ['required', 'array'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        foreach (request()->data as $item) {
            $item['created_at'] = $item['created_at'] ? Carbon::parse($item['created_at']) : Carbon::now()->toDateTimeString();
            $item['updated_at'] = $item['updated_at'] ? Carbon::parse($item['updated_at']) : Carbon::now()->toDateTimeString();
            $item = (object) $item;
            $check = Customer::where('id', $item->id)->first();
            if (!$check) {
                try {
                    Customer::create((array) $item);
                } catch (\Throwable $th) {
                    return response()->json([
                        'err_message' => 'validation error',
                        'errors' => $th->getMessage(),
                    ], 400);
                }
            }
        }

        return response()->json('success', 200);
    }
}
