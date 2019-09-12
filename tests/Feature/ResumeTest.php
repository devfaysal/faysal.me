<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ResumeTest extends TestCase
{
    use RefreshDatabase;

    /** @test */

    public function it_shows_correct_view()
    {
        $response = $this->get('/resume');

        $response->assertViewIs('resume');
    }
}
