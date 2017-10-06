<?php

namespace App\Http\Controllers;

use Cookie;
use App\Api\Api;

class HomeController extends Controller
{
    protected $api;

    public function __construct(Api $api)
    {
        $this->api = $api;
    }

    public function index()
    {
        if (!Cookie::has('token') or count(explode('.', Cookie::get('token'))) !== 3) {
            return response()->view('login');
        }
        return response()->view('app');

        $token = Cookie::get('token');
        try {
            $result = $this->api->getClient()->get('/me', [
                'headers' => [
                    'Authorization' => "Bearer $token",
                ],
            ]);
        } catch (\Exception $e) {
            return response()->view('login');
        }

        $user = json_decode($result->getBody());
        $user->roles = collect($user->roles);

        $hasAccess = !$user->roles->filter(function ($role) {
            return in_array($role->name, ['admin', 'journalist', 'chef-journalist']);
        })->isEmpty();

        if ($hasAccess) {
            return response()->view('app');
        } else {
            return redirect(config('app.urls.nau'));
        }
    }
}
