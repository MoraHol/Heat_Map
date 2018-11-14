<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;

class WelfareIndicatorController extends Controller
{
    public function show()
    {
        return App\WelfareIndicator::all();
    }
    public function showIndicator($indicator, $coordinates = null)
    {
        if ($coordinates) {
            return App\WelfareIndicator::all()->where('name', $indicator)->first()->coordinates;
        } else {
            return App\WelfareIndicator::all()->where('name', $indicator)->first();
        }
    }
}
