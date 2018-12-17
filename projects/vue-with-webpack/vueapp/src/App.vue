<template>
  <div id="app">
    <!-- <router-view/> -->
    <div class="user-creation-title">
      <div class="user-creation">
        <UserCreation v-bind:saveUserCallback="saveUser" v-bind:deleteUserCallback="deleteUser"></UserCreation>
      </div>
    </div>

    <div class="user-list-wrapper">
      <div class="user-list">
        <UserList/>
      </div>
    </div>
  </div>
</template>

<script>
import UserList from "./components/UserList";
import UserCreation from "./components/UserCreation";

export default {
  name: "App",
  components: {
    UserList,
    UserCreation
  },
  methods: {
    saveUser: function(id) {
      this.$http.post("users/save/" + id).then(response => {
        console.log("[AjaxSaveResponse] " + response.body.message);
      });
    }.bind(this),
    deleteUser: function(id) {
      this.$http.post("users/delete/" + id).then(response => {
        console.log("[AjaxDeleteResponse] " + response.body.message);
      });
    }.bind(this)
  },
};
</script>

<style scoped>
.user-list {
  display: inline-block;
}
.user-list-wrapper {
  text-align: center;
}
.user-creation {
  display: inline-block;
}
.user-creation-title {
  text-align: center;
}
</style>
