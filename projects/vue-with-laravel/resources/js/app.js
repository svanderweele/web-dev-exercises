// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import UserList from './components/UserList';
import UserCreation from './components/UserCreation';
import About from './components/About';
import Vuex from 'vuex';
import UserApi from './services/api/UserServices'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuex);


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/users',
      component: UserList
    },
    {
      path: '/',
      component: About
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/users/edit/:id',
      component: UserCreation,
    },
  ]
})

Vue.component('app', require('./components/App').default);
Vue.component('navbar', require('./components/NavBar').default);


const store = new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    updateUsers(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    refreshUsers(context) {
      UserApi.getUsers().then(users => {
         if(users.length == 0){
           UserApi.createNewUsers();
        }
        context.commit('updateUsers', users);
      });
    }
  },
});


/* eslint-disable no-new */
new Vue({
  el:'#app',
  router,
  store,
});
