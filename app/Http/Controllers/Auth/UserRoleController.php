<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserRole;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserRoleController extends Controller
{
    public function all()
    {
        $paginate = (int) request()->paginate;
        $orderBy = request()->orderBy;
        $orderByType = request()->orderByType;

        $status = 1;
        if (request()->has('status')) {
            $status = request()->status;
        }

        $query = UserRole::where('status', $status)->orderBy($orderBy, $orderByType);

        if (request()->has('search_key')) {
            $key = request()->search_key;
            $query->where(function ($q) use ($key) {
                return $q->where('id', $key)
                    ->orWhere('name', $key)
                    ->orWhere('role_serial', $key)
                    ->orWhere('name', 'LIKE', '%' . $key . '%')
                    ->orWhere('created_at', 'LIKE', '%' . $key . '%')
                    ->orWhere('updated_at', 'LIKE', '%' . $key . '%')
                    ->orWhere('status', 'LIKE', '%' . $key . '%');
            });
        }

        $users = $query->paginate($paginate);
        return response()->json($users);
    }

    public function show($id)
    {
        $data = UserRole::where('id',$id)->first();
        if(!$data){
            return response()->json([
                'err_message' => 'not found',
                'errors' => ['role'=>['data not found']],
            ], 422);
        }
        return response()->json($data,200);
    }

    public function store()
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required', 'unique:user_roles'],
            'role_serial' => ['required', 'unique:user_roles'],
        ], [
            'name.unique'=>"already taken. try except : ". UserRole::select('name')->get()->implode('name', ' , '),
            'role_serial.unique' => "already taken. try except : ". UserRole::select('role_serial')->get()->implode('role_serial', ' , '),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = new UserRole();
        $data->name = request()->name;
        $data->role_serial = request()->role_serial;
        $data->save();

        return response()->json($data, 200);
    }

    public function canvas_store()
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required', 'unique:user_roles'],
            'role_serial' => ['required', 'unique:user_roles'],
        ], [
            'name.unique'=>"already taken. try except : ". UserRole::select('name')->get()->implode('name', ' , '),
            'role_serial.unique' => "already taken. try except : ". UserRole::select('role_serial')->get()->implode('role_serial', ' , '),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = new UserRole();
        $data->name = request()->name;
        $data->role_serial = request()->role_serial;
        $data->save();

        return response()->json($data, 200);
    }

    public function update()
    {
        $data = UserRole::find(request()->id);
        if(!$data){
            return response()->json([
                'err_message' => 'validation error',
                'errors' => ['name'=>['user_role not found by given id '.(request()->id?request()->id:'null')]],
            ], 422);
        }

        $rules = [
            'id' => ['required', 'exists:user_roles,id'],
            'name' => ['required'],
            'role_serial' => ['required'],
        ];
        if ($data->name != request()->name) {
            $rules['name'][] = "unique:user_roles";
        }
        if ($data->role_serial != request()->role_serial) {
            $rules['role_serial'][] = "unique:user_roles";
        }
        $validator = Validator::make(request()->all(), $rules, [
            'name.unique'=>"already taken. try except : ". UserRole::select('name')->get()->implode('name', ' , '),
            'role_serial.unique' => "already taken. try except : ". UserRole::select('role_serial')->get()->implode('role_serial', ' , '),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data->name = request()->name;
        $data->role_serial = request()->role_serial;
        $data->save();

        return response()->json($data, 200);
    }

    public function canvas_update()
    {
        $data = UserRole::find(request()->id);
        if(!$data){
            return response()->json([
                'err_message' => 'validation error',
                'errors' => ['name'=>['user_role not found by given id '.(request()->id?request()->id:'null')]],
            ], 422);
        }

        $rules = [
            'id' => ['required', 'exists:user_roles,id'],
            'name' => ['required'],
            'role_serial' => ['required'],
        ];
        if ($data->name != request()->name) {
            $rules['name'][] = "unique:user_roles";
        }
        if ($data->role_serial != request()->role_serial) {
            $rules['role_serial'][] = "unique:user_roles";
        }
        $validator = Validator::make(request()->all(), $rules, [
            'name.unique'=>"already taken. try except : ". UserRole::select('name')->get()->implode('name', ' , '),
            'role_serial.unique' => "already taken. try except : ". UserRole::select('role_serial')->get()->implode('role_serial', ' , '),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data->name = request()->name;
        $data->role_serial = request()->role_serial;
        $data->save();

        return response()->json($data, 200);
    }

    public function soft_delete()
    {
        $validator = Validator::make(request()->all(), [
            'id' => ['required','exists:user_roles,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = UserRole::find(request()->id);
        $data->status = 0;
        $data->save();

        return response()->json([
                'result' => 'deactivated',
        ], 200);
    }

    public function destroy()
    {
    }

    public function restore()
    {
        $validator = Validator::make(request()->all(), [
            'id' => ['required','exists:user_roles,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = UserRole::find(request()->id);
        $data->status = 1;
        $data->save();

        return response()->json([
                'result' => 'activated',
        ], 200);
    }

    public function bulk_import()
    {
        $validator = Validator::make(request()->all(), [
            'data' => ['required','array'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        foreach (request()->data as $item) {
            $item['created_at'] = $item['created_at'] ? Carbon::parse($item['created_at']): Carbon::now()->toDateTimeString();
            $item['updated_at'] = $item['updated_at'] ? Carbon::parse($item['updated_at']): Carbon::now()->toDateTimeString();
            $item = (object) $item;
            $check = UserRole::where('id',$item->id)->first();
            if(!$check){
                try {
                    UserRole::create((array) $item);
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
