<template>
  <div>
    <navbar title='User Manager'></navbar>
    <div id="user-list">
      <!-- <input type="button" class="m-15" value="Create New" v-on:click="createNewUser"> -->
      <ul>
        <li class="user-simple-list" v-for="user in this.$store.state.users">
          <div class="user-simple-field">
            <img v-if="user.gender=='male'" src="../assets/man-selected.png" width="25" height="20">
            <img
              v-if="user.gender=='female'"
              src="../assets/woman-selected.png"
              width="25"
              height="20"
            >
            <span>
              {{user.first_name}} {{user.last_name}}
              <a href="#" v-on:click="editUser(user.id)">Edit</a>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import UserApi from "../services/api/UserServices";
import axios from "axios";
export default {
  props: {
    appName:'User Manager',
    users: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isVisible: true,
      methods: {},
      computed: {}
    };
  },
  methods: {
    editUser: function(id) {
      this.$router.push("/users/edit/" + id);
    },
    createNewUser() {
      this.$router.push("/users/edit/0");
    }
  },
  created: function() {
    this.$store.dispatch("refreshUsers");
  }
};
</script>

<style scoped>
.user-simple-field {
  text-align: left;
}
.user-simple-list {
  list-style-type: none;
}
</style>
