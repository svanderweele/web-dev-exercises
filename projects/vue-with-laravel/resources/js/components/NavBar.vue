<template>
     <!-- Fixed navbar -->
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
          <a class="navbar-brand" href="#">User Manager</a>
          
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
              
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    
                    <ul class="nav navbar-nav mr-auto">
                      <li class="nav-item active">
                            <router-link to="/users">User List</router-link>
                        </li>
                    </ul>   
                    
                    <ul class='nav navbar-nav navbar-right'>
                         <router-link to="/users/edit/0">Create User</router-link>
                    </ul>
               </div>
         </nav>
</template>


<script>
export default {
    name:"NavBar",
    props:['title']
}
</script>
