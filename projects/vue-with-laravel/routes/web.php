<?php

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

Route::get('/', function(){return view('layouts.app');});
// Route::resource('/users', 'UsersController');
Route::get('users/get/{id}', 'UsersController@getUserById');
Route::put('users/delete/{id}', 'UsersController@delete');
Route::get('users/get', 'UsersController@getAllUsers');

Route::post('users/save', 'UsersController@saveUser');
Route::post('users/add', 'UsersController@add');
