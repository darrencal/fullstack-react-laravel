<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() {
        return User::paginate();
    }

    public function show($id) {
        return User::find($id);
    }

    public function store(StoreUserRequest $request) {
        $input = $request->all();
        $input['password'] = Hash::make($request->input('password'));

        $user = User::create($input);

        return response($user, Response::HTTP_CREATED);
    }

    public function update(UpdateUserRequest $request, $id) {
        $user = User::find($id);
        $input = $request->all();
        $input['password'] = Hash::make($request->input('password'));
        
        $user->update($input);

        return response($user, Response::HTTP_ACCEPTED);
    }

    public function destroy($id) {
        User::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
