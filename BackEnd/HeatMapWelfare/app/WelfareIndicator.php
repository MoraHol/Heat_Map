<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class WelfareIndicator extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];
    /**
     * coordenadas que tiene este indicador
     *
     * @return coordenadas
     */
    public function coordinates()
    {
        return $this->belongsToMany('App\Coordinate')->using('App\CoordinateWelfareIndicator')
            ->withTimestamps()
            ->withPivot('score');
    }
}
