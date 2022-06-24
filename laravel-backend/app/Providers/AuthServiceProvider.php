<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        // Gate for checking if user has permission to view the model provided
        Gate::define('view', function (User $user, $model) {
            return $user->hasAccess("view_{$model}") || $user->hasAccess("edit_{$model}");
        });
        
        // Gate for checking if user has permission to edit the model provided
        Gate::define('edit', function (User $user, $model) {
            return $user->hasAccess("edit_{$model}");
        });
    }
}
