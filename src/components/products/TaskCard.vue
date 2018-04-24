<template>
    <div class="ui grid cards centered">
        <div class="four wide column card">
            <div class="content">
                <img class="right floated mini ui image" src="https://i.pinimg.com/originals/1e/0e/6a/1e0e6a9507b80487f31fa1ff26920332.png">
                <div class="header">
                    New task
                </div>
                <!-- <button @click="newTask()">Add..</button> -->
                <new-task-modal v-on:add-new-task="onAddNewTask" v-show="showTaskModal" @close="showTaskModal = false"></new-task-modal>
                <button id="show-task-modal" @click="showTaskModal = true"> Add new task </button>
        </div>
        </div>
        <div class="four wide column card" v-for="task in assignments" v-bind:key="task.date">
            <div class="content">
                <img class="right floated mini ui image" v-bind:src=task.image>
                <div class="header">
                    name: {{task.name}}
                </div>
                <div class="meta">
                    status: {{task.status[0]}}
                </div>
                <div class="description">
                    remind on: {{task.remindOn}}
                </div>
                <div class="extra content">
                    <div class="ui two buttons">
                        <div class="ui basic green button">Done</div>
                        <div class="ui basic red button">Delete</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</template>

<style scoped>

</style>

<script>
import NewTaskModal from './NewTaskModal';

import Vue from 'vue';
Vue.component('new-task-modal', NewTaskModal);

export default {
  name: 'product-list',
  props: ['assignments'],
  data() {
    return {
      showTaskModal: false,
    };
  },
  methods: {
    onAddNewTask(task) {
      console.log('task card received the event! task: ', task.name);
      this.$emit('add-new-task', task);
    }
  }
};
</script>
