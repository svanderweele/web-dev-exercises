<template>
  <div>
    <label class="response-creation-title">User</label>

    <div class="button-return-response-list">
      <input type="button" v-on:click="returnToUserList" value="User List">
    </div>
    <hr>
    <br>
    <span>
      <label>Gender</label>
      <img src="../assets/man-selected.png" width="25" height="20">
      <input type="radio" name="gender" value="male" v-model="current_user.gender">
      <img src="../assets/woman-selected.png" width="25" height="20">
      <input type="radio" name="gender" value="female" v-model="current_user.gender">
    </span>
    <br>
    <input type="text" v-model="current_user.name.first" placeholder="Enter first name..">
    <br>
    <input type="text" v-model="current_user.name.last" placeholder="Enter last name..">
    <br>
    <input type="text" v-model="current_user.name.email" placeholder="Enter email..">
    <br>

    <form v-on:submit="saveUser">
      <div class="submit-container">
        <input type="submit" value="Save">
      </div>
    </form>

    <div v-if="current_user._id != 0">
      <form v-on:submit="deleteUser">
        <div class="submit-container">
          <input type="submit" value="Delete">
        </div>
      </form>
    </div>
    <hr>
  </div>
</template>

<script>
import UserApi from "../services/api/UserServices";
export default {
  name: "UserCreation",
  data() {
    return {
      current_user: {
        name: {
          first: "",
          last: ""
        },
        email: "",
        gender: "",
        _id: 0
      }
    };
  },
  methods: {
    saveUser: function(e) {
      e.preventDefault();
      this.current_user._id = this.$route.params.id;
      UserApi.saveUser(this.current_user).then(response => {
        if (response.createdNew) {
          this.$router.push("/users/edit/" + response.user._id);
        }
      });
    },
    deleteUser: function(e) {
      e.preventDefault();
      UserApi.deleteUser(this.$route.params.id).then(response => {
        this.$router.push("/");
      });
    },
    returnToUserList: function() {
      this.$router.push("/");
    }
  },
  created: function() {
    UserApi.getUserById(this.$route.params.id).then(response => {
      if (response != null) {
        this.current_user = response;
      }
    });
  }
};
</script>



<style scoped>
.response-creation-title {
  color: grey;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.submit-container {
  display: inline-block;
  padding-top: 5px;
}

.button-return-response-list {
  padding-top: 10px;
}
</style>
