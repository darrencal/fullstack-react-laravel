<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request) {
        if(Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            $token = $user->createToken('admin')->accessToken;

            return [
                'token' => $token,
            ];
        }
        
        return response([
            'error' => 'Invalid Credentials!',
            Response::HTTP_UNAUTHORIZED,
        ]);
    }

    public function register(RegisterRequest $request) {
        $input = $request->all();
        $input['password'] = Hash::make($request->input('password'));
        $input['role_id'] = 2; // Assign default role of Editor

        $user = User::create($input);

        return response($user, Response::HTTP_CREATED);
    }
}
