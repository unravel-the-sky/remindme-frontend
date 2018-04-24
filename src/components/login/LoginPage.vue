<template>
    <div class="main-content">
        <div v-if="methodNotSelected" class="ui middle aligned center aligned grid">
            <div class="column">
                <h2 class="ui image header">
                    <div class="content">
                       Welcome to RemindMe app! <br>
                    </div>
                </h2>
                <form class="ui large form">
                  <div class="ui stacked segment">
                      <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="email" v-model="credentials.email" placeholder="email address">
                        </div>
                      </div>
                      <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" name="password" v-model="credentials.password" placeholder="password">
                        </div>
                      </div>
                      <div class="ui fluid large teal submit button" @click="submit()">Submit</div>
                  </div>

                  <div class="ui error message"></div>

                </form>
                
                   Not a user? <a @click="selectMethod('signup')" style="cursor: pointer">Sign up!</a>
            </div>
        </div>

        <router-view></router-view>
        
    </div>

            <!-- <component v-bind:is="selectedLoginComponent">

        </component> -->
</template>

<style scoped>
.main-content {
  margin: auto;
  max-width: 350px;
  margin-top: 100px;
}
.login-buttons {
  margin: 5px;
}
</style>


<script>
import auth from '../../auth';

export default {
  name: 'firstPage',

  data() {
    return {
      methodNotSelected: true,
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    };
  },

  methods: {
    selectMethod(method) {
      this.methodNotSelected = false;
      const route = 'login/' + method;
      auth.setRoute(route);
    },
    async submit() {
      let credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      };

      const loginUserRes = await auth.login(this, credentials, '/home');
      console.log('login result: ', loginUserRes);

      this.$store.commit('updateUser', loginUserRes.userName)

      console.log('lolllll: ', this.$store.state.userName)

    }
  },

  computed: {
    selectedLoginComponent: function() {
      return 'LoginPage' + this.selectedMethod;
    }
  }
};
</script>
