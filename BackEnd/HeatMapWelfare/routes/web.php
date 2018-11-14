<?php

use App\Http\Controllers\WelfareIndicatorController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('welcome');
});
Route::get('/heatmap', function () {
    return view('heatmap');
});
Route::get('/getCoordinates', 'CoordinateController@show');
Route::get('/getIndicators', 'WelfareIndicatorController@show');
Route::get('/getIndicators/{indicator}/{coordinates?}', 'WelfareIndicatorController@showIndicator');
Route::get('addCoordinate/lat={lat}/lng={lng}/indicator={indicatorName}/score={score}', 'CoordinateController@create');
