<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\App;

class Coordinate extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'lat', 'lng'
    ];
    /**
     * indicadores que tiene esta coordenada
     *
     * @return indicadores
     */
    public function indicators()
    {
        return $this->BelongsToMany('App\WelfareIndicator')->withTimestamps();
    }
}
