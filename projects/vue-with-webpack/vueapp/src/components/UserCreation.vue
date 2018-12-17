<template>
  <div>
    <label class="user-creation-title">User</label>
    <hr>
    <br>

    <span>
      <label>Gender</label>
      <img src="../assets/man-selected.png" width="25" height="20">
      <input type="radio" name="gender" value="male">
      <img src="../assets/woman-selected.png" width="25" height="20">
      <input type="radio" name="gender" value="female">
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

    <form v-on:submit="deleteUser">
      <div class="submit-container">
        <input type="submit" value="Delete">
      </div>
    </form>

    <hr>
  </div>
</template>

<script>
export default {
  name: "UserCreation",
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          _id: 0,
          name: {
            first: "",
            last: "",
            email: "",
            gender: ""
          }
        };
      }
    },
    saveUserCallback: {
      type: Function,
      default: function(id) {
        console.log("[DUMMY CALLBACK] Save User " + id);
      }
    },
    deleteUserCallback: {
      type: Function,
      default: function(id) {
        console.log("[DUMMY CALLBACK] Delete User  " + id);
      }
    }
  },
  data() {
    return {
      current_user: { ...this.user }
    };
  },
  methods: {
    saveUser: function(e) {
      e.preventDefault();
      this.saveUserCallback(this.current_user._id);
    },
    deleteUser: function(e) {
      e.preventDefault();
      this.deleteUserCallback(this.current_user._id);
    }
  },
  created: function() {}
};
</script>



<style scoped>
.user-creation-title {
  color: grey;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.submit-container {
  display: inline-block;
  padding-top: 5px;
}
</style>
