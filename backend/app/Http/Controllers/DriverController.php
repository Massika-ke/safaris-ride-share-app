<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function show(Request $request)
    {
        // return back the user and associated driver model
        $user = $request->user();
        $user->load('driver');


        return $user;
    }

    public function update(Request $request)
    {
        $request ->validate([
            'year' => 'required|numeric|between:2010,2025',
            'make' => 'required',
            'model' => 'required',
            'color' => 'required|alpha',
            'license_plate' => 'required',
            'name' => 'required'
        ]);

        $user = $request->user();

        $user->update($request->only('name'));

        // create or update a driver associated with this user
        $request->$user->driver()->updateOrCreate(
            // ['user_id' => $user->id],
            $request->only([
            'year',
            'make',
            'model',
            'color',
            'license_plate'
        ]));

        $user->load('driver');

        return $user;
    }
}
