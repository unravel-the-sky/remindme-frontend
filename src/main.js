// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Home from './components/Home';
import TaskList from './components/TaskList';
// import LoginWithCredentials from './components/login/LoginPageCredentials'

import LoginMainPage from './components/login/LoginPage';
import LoginWithCredentials from './components/login/LoginPageCredentials';
import SignUpPage from './components/login/Signup';

import TasksPane from './components/products/TasksPane';
import TaskCard from './components/products/TaskCard';
import HomePage from './components/layout/HomePage';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
Vue.use(VueRouter);
Vue.use(VueResource);
import auth from './auth';

Vue.config.productionTip = false;

const routes = [
  {
    path: '/login',
    component: LoginMainPage,
    children: [ { path: 'credentials', component: LoginWithCredentials }, 
                { path: 'signup', component: SignUpPage }
              ]
  },
  { path: '/home', component: HomePage, props: {userName: ''} },
  { path: '/getTasks', component: TaskList }
];
// TODO: check how to do redirecting, something like:
// router.redirect({
//   '*': '/home'
// })

export const router = new VueRouter({
  routes
});

// Check the user's auth status when the app starts
auth.checkAuth();

const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
}).$mount('#app');
