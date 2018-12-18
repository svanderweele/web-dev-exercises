<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::orderBy('created_at');
        return view('users/index')->with('users', $users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getAllUsers()
    {
        $users = User::orderBy('created_at')->get();
        return $users;
    }

    public function getUserById($id){
        $user = User::where('id', $id)->get()->first();
        return $user;   
    }

    public function saveUser(Request $request){
        $user = $request['user'];

        $model = User::find($user['id']);

        if($model == NULL){            
            $model = new User();
        }

        $this->save($model, $user);

        $user['id'] = $model['id'];
        $obj = (object) [
            'user' => $user,
            'createdNew' => 'true'
        ];
        return json_encode($obj);
    }

    private function save($model, $user){
        $model->gender = $user['gender'];
        $model->first_name = $user['first_name'];
        $model->last_name = $user['last_name'];
        $model->email = $user['email'];
        $model->save();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        echo "UPDATE USER";
    }

    public function add(Request $request)
    {
        $data  = ($request->newUsers);
           foreach($data as $user){
                $model = new User();
                $this->save($model, $user);
           }
    }


    public function delete($id){
        $user = User::find($id);
        $user->delete();
        return "user deleted successfully";   
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
