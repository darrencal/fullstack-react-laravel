<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        Gate::authorize('view', 'roles');

        return RoleResource::collection(Role::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        Gate::authorize('edit', 'roles');

        $role = Role::create($request->only('name'));

        // Assign permissions if available
        if ($permissions = $request->input('permissions')) {
            foreach ($permissions as $permission_id) {
                DB::table('role_permission')->insert([
                    'role_id' => $role->id,
                    'permission_id' => $permission_id,
                ]);
            }
        }

        return response(new RoleResource($role), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        Gate::authorize('view', 'roles');
        
        return new RoleResource(Role::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        Gate::authorize('edit', 'roles');

        $role = Role::find($id);

        $role->update($request->only('name'));

        // Delete old permissions
        DB::table('role_permission')
            ->where('role_id', $role->id)
            ->delete();

        // Assign permissions if available
        if ($permissions = $request->input('permissions')) {
            foreach ($permissions as $permission_id) {
                DB::table('role_permission')->insert([
                    'role_id' => $role->id,
                    'permission_id' => $permission_id,
                ]);
            }
        }

        return response(new RoleResource($role), Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        Gate::authorize('edit', 'roles');
        
        // Delete permissions assigned to the role
        DB::table('role_permission')
            ->where('role_id', $id)
            ->delete();

        Role::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
