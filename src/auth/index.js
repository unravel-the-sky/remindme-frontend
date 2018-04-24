import { router } from '../main'
import axios from 'axios'
import { debug } from 'util'

// const API_URL = 'http://localhost:5000/';
const API_URL = 'https://server-testing-2.herokuapp.com/'
const LOGIN_URL = API_URL + 'auth/signIn'
const SIGNUP_URL = API_URL + 'auth/register'

// const API_URL = 'https://api-staging.attensi.com/api/v1'
// const LOGIN_URL = API_URL + '/oauth/token'
// const GETHOME_URL = API_URL + 'tasks'
const GETHOME_URL = API_URL + 'userTasks/'
const ADDNEWTASK_URL = API_URL + 'tasks'

// Attensi API
// const apiToken = 'bfb744f8bb4dbec69e8340e4b0f4d2af2098cf7c27212c490c4dac210a43d3a9';
// axios.defaults.headers.common['API-Token'] = apiToken; // this sets for ALL the request

// VIKTIG: https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios
/**
 * 
 * For a single request:
    let config = {
      headers: {
        header1: value,
      }
    }

    let data = {
      'HTTP_CONTENT_LANGUAGE': self.language
    }

    axios.post(URL, data, config).then(...)

 * For setting default global config:
    axios.defaults.headers.post['header1'] = 'value' // for POST requests
    axios.defaults.headers.common['header1'] = 'value' // for all requests
    For setting as default on axios instance:

    let instance = axios.create({
      headers: {
        post: {        // can be common or any other method
          header1: 'value1'
        }
      }
    })

    //- or after instance has been created
    instance.defaults.headers.post['header1'] = 'value'
 */

export default {
  user: {
    authenticated: false
  },

  addNewTask(context, task) {
    const userId = localStorage.getItem('user_id')
    const taskToSend = {
      name: task.name,
      ownerId: userId,
      status: task.status,
      remindOn: task.remindOn
    }

    return axios
      .post(ADDNEWTASK_URL, taskToSend)
      .then(res => {
        console.log('wee sending new task worked, here is the response: ', res);

        const result = {
          error: false,
          status: res.status,
          statusText: res.statusText,
          data: res.data
        };
        return result;
      })
      .catch(function(err) {
        console.log('poop: ', err);

        const result = err;
        return result;
      });

  },

  getHome(context, redirect) {
    const homeUrl = GETHOME_URL + localStorage.getItem('user_id')

    return axios
      .get(homeUrl)
      .then(res => {
        console.log('weee home worked, here is the response:', res);

        const result = {
          error: false,
          status: res.status,
          statusText: res.statusText,
          data: res.data
        };
        return result;
      })
      .catch(function(err) {
        console.log('poop: ', err);

        const result = err;
        return result;
      });
  },

  login(context, creds, redirect) {
    return axios
      .post(LOGIN_URL, creds)
      .then(res => {
        console.log('weee it worked, here is the response:', res);
        localStorage.setItem('id_token', res.data.token);

        axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');

        const decodedToken = this.parseJwt(res.data.token);
        console.log('response is: ', decodedToken);

        this.user.authenticated = true;

        if (redirect) {
          router.replace(redirect);
        }

        localStorage.setItem('user_id', decodedToken._id)
        localStorage.setItem('user_name', decodedToken.userName)

        const data = {
          userId: decodedToken._id,
          userName: decodedToken.userName,
          data: res.data
        };

        return data;
      })
      .catch(function(err) {
        console.log('poop: ', err);
      });
  },

  parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  },

  signup(context, creds, redirect) {
    axios
      .post(SIGNUP_URL, creds)
      .then(res => {
        localStorage.setItem('id_token', res.id_token);
        localStorage.setItem('user_id', res.data._id)

        this.user.authenticated = true;

        if (redirect) {
          router.go('/home');
        }
        // this.login(creds, redirect)
      })
      .catch(err => {
        console.log('poop happened: ', err);
      });
  },

  logout() {
    localStorage.removeItem('id_token');
    this.user.authenticated = false;
    router.replace('/login');
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token');
    if (jwt) {
      this.user.authenticated = true;
      axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');
      router.replace('/home');
    } else {
      this.user.authenticated = false;
      router.replace('/login');
    }
  },

  getAuthHeader() {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('id_token')
    };
  },

  setRoute(route) {
    router.replace(route);
  }
};
