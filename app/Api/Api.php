<?php

namespace App\Api;

use GuzzleHttp\Client;

class Api
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client(['base_uri' => config('app.urls.api')]);
    }

    public function getClient(): Client
    {
        return $this->client;
    }
}
