<nav class="navbar navbar-expand navbar-dark bg-dark">

        <a class="navbar-brand" href="#"><img src="{{asset('images/site_logo_small.png')}}" width="140px" height="100px" alt="Simon's Portfolio"/> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarsExample02">
          <ul class="navbar-nav mr-auto">

            @foreach($pages as $page)
            
            <?php 
            $className = "nav-item";
            $link = "/";

            $actionMethod = request()->path();

            if(strtolower($page) == $actionMethod)
            {
                $className = "nav-item active";
            }else{
                $link = $page;
            }
                    ?>
        
                  <li class="{{$className}}">
                    <a class="nav-link" href="{{strtolower($link)}}">{{$page}} <span class="sr-only">(current)</span></a>
                  </li>
      
            @endforeach

            {{-- <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li> --}}

          </ul>
          <form class="form-inline my-2 my-md-0">
            <input class="form-control" type="text" placeholder="Search">
          </form>
        </div>
      </nav>