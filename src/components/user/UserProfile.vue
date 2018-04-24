<template>
    <div class="container">
        user profile here..

        <div class="ui content card">
            <div v-if="data" class="user-profile">
                you
                <div class="content">
                    <img class="userprofile-avatar-image" v-bind:src="data.image"> {{data.username}} : {{data.first_name}} <br>

                </div>
            </div>
        </div>
    </div>
  
</template>

<style scoped>
.userprofile-avatar-image {
  width: 50px;
}
</style>


<script>
export default {
  props: ['userProfileData'],

  mounted() {
    console.log('fetching user profile data from home..');
    this.data = this.userProfileData;
    console.log('data: ', this.data);
  },

  data() {
    return {
      data: null
    };
  },

  methods: {}
};
</script>
