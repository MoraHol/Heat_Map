<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;

class CoordinateController extends Controller
{
    public function show()
    {
        return App\Coordinate::all();
    }
    public function create($lat, $lng, $indicatorName,$score)
    {
        $sucess = array('sucess' => true);
        $coordinate = new App\Coordinate();
        $coordinate->lat = $lat;
        $coordinate->lng = $lng;
        $coordinate->save();
        $indicator = App\WelfareIndicator::all()->where('name', $indicatorName)->first();
        $coordinate->indicators()->attach($indicator, ['score' => $score]);
        return json_encode($sucess);
    }
}
