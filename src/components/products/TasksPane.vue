<template>

<div class="centered">
    <div class="loading" v-if="loading">
        Loading..
    </div>

    <div class="error" v-if="error">
        {{error}}
    </div>

    <div v-if="tasksData">
      <product-list v-on:add-new-task="onAddNewTask" v-bind:assignments='tasksData'></product-list>
    </div>
</div>

</template>

<script>
import auth from '../../auth';

import ProductList from './TaskCard';
import Vue from 'vue';

Vue.component('product-list', ProductList);

export default {
  name: 'products-pane',

  components: {
    ProductList
  },

  props: ['products'],

  data() {
    return {
      loading: false,
      tasksData: null,
      userData: null,
      error: null
    };
  },

  mounted() {
    this.tasksData = this.products.data;
    this.userData = this.products.userId;
  },

  methods: {
    onAddNewTask(task) {
      console.log('tasks pane received the event! task: ', task.name);
      this.$emit('add-new-task', task)
    }
  },

  components: {
    // TaskList
  }
};
</script>
