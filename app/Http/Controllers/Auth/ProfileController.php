<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

use function PHPUnit\Framework\fileExists;

class ProfileController extends Controller
{
    public function update_profile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // 'first_name' => ['required'],
            // 'last_name' => ['required'],
            // 'user_name' => ['required'],
            // 'mobile_number' => ['required'],
            'old_password' => ['required'],
            'newpassword' => ['required', 'min:8', 'confirmed'],
            'newpassword_confirmation' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $old_password = $request->old_password;
        $newpassword = $request->newpassword;
        $newpassword_confirmation = $request->newpassword_confirmation;
        // $user = User::find(json_decode($request->user)->id);
        $user = User::find(auth()->user()->id);

        // $user->first_name = $request->first_name;
        // $user->last_name = $request->last_name;
        // $user->mobile_number = $request->mobile_number;

        if (strlen($old_password)) {
            if (Hash::check($old_password, $user->password)) {
                if (strlen($newpassword) && strlen($newpassword_confirmation)) {
                    // $validator = Validator::make($request->all(), [
                    //     'old_password' => ['required'],
                    //     'newpassword' => ['required', 'min:8', 'confirmed'],
                    //     'newpassword_confirmation' => ['required']
                    // ]);

                    // if ($validator->fails()) {
                    //     return response()->json([
                    //         'err_message' => 'validation error',
                    //         'data' => $validator->errors(),
                    //     ], 422);
                    // }

                    $user->password = Hash::make($request->newpassword);
                }
            } else {
                return response()->json([
                    'err_message' => 'validation error',
                    'errors' => [
                        'old_password' => ['your given old password not matching'],
                    ],
                ], 422);
            }
        }

        // $user_name = $request->user_name;
        // if($user_name != $user->user_name){
        //     $validator = Validator::make($request->all(), [
        //         'user_name' => ['required','unique:users'],
        //     ],[
        //         'user_name' => ['your given user name already been taken'],
        //     ]);

        //     if ($validator->fails()) {
        //         return response()->json([
        //             'err_message' => 'validation error',
        //             'data' => $validator->errors(),
        //         ], 422);
        //     }else{
        //         $user->user_name = $request->user_name;
        //     }
        // }

        // if ($request->hasFile('photo')) {
        //     if(explode('/',$user->photo)[0]=='uploads' && fileExists(public_path($user->photo))){
        //         unlink(public_path($user->photo));
        //     }
        //     $file = $request->file('photo');
        //     $path = 'uploads/users/pp-' . $user->user_name . '-' . $user->id . rand(1000, 9999) . '.' . $file->getClientOriginalExtension();
        //     Image::make($file)->fit(400, 400)->save(public_path($path));
        //     $user->photo = $path;
        // }

        $user->save();
        return response()->json([
            'message' => 'User password updated successfully',
        ], 200);
    }
}
