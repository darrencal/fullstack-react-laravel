<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() {
        Gate::authorize('view', 'users');

        $users = User::paginate();

        return UserResource::collection($users);
    }

    public function show($id) {
        Gate::authorize('view', 'users');
        
        $user = User::find($id);

        return new UserResource($user);
    }

    public function store(StoreUserRequest $request) {
        Gate::authorize('edit', 'users');

        $input = $request->all();
        $input['password'] = Hash::make($request->input('password'));

        $user = User::create($input);

        return response(new UserResource($user), Response::HTTP_CREATED);
    }

    public function update(UpdateUserRequest $request, $id) {
        Gate::authorize('edit', 'users');

        $input = $request->all();
        $input['password'] = Hash::make($request->input('password'));
        
        $user = User::find($id);
        $user->update($input);

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy($id) {
        Gate::authorize('edit', 'users');

        User::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function user() {
        $user = Auth::user();

        return (new UserResource($user))->additional([
            'data' => [
                'permissions' => $user->permissions()
            ]
        ]);
    }

    public function updateInfo(UpdateInfoRequest $request) {
        $user = Auth::user();        
        $user->update($request->all());

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UpdatePasswordRequest $request) {
        $user = Auth::user();
        $user->update([
            'password' => Hash::make($request->input('password')),
        ]);

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }
}
