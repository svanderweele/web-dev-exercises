// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import UserList from './components/UserList';
import UserCreation from './components/UserCreation';
import Vuex from 'vuex';
import UserApi from '@/services/api/UserServices'


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuex);


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{
      path: '/',
      component: UserList
    },
    {
      path: '/user/edit/:id',
      component: UserCreation
    },
  ]
})


const store = new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    updateUsers(state, payload) {
      console.log("Users are " + payload);
      state.users = payload;
    }
  },
  actions: {
    refreshUsers(context) {
      UserApi.getUsers().
      then((response) => {
          console.log(response);
          context.commit("updateUsers", response);
        })
        .catch((response) => {
          console.log("Something went wrong while getting users");
        });
    }
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: ` 
  <div id="app">
    <router-view></router-view>
  </div>
  `
}).$mount("#app")
