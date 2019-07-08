<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HomePageTest extends TestCase
{
    /** @test */

    public function home_route_can_be_accessed()
    {
        $this->get('/')->assertStatus(200);
    }
}
