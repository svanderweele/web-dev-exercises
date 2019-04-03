<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    private $pages = array(
        'pages' => ['Home', 'About', 'Portfolio', 'Contact'],
    );

    public function redirectToIndex(){
        return redirect('/home');
    }

    public function home(){
        return view('pages.home')->with($this->pages);
    }

    public function about(){
        $title = "My About Title";
        return view('pages.about')->with('title', $title)->with($this->pages);
    }

    public function editUser($id){
        return "This is the user edit screen for ".$id;
    }
}
