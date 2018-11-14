<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $indicator = new App\WalfareIndicator;
        $indicator->name = 'health';
        $indicator->save();

        $coordinate = new App\Coordinate;
        $coordinate->lat = '4.637601';
        $coordinate->lng = '-74.150478';
        $coordinate->save();
    }
}