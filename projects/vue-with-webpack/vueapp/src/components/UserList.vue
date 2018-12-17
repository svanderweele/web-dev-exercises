<template>
  <div id="user-list">
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
          <span>{{user.name.title}}. {{user.name.first}} {{user.name.last}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import UserApi from "@/services/api/UserServices";
export default {
  name: "UserList",
  props: {
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
