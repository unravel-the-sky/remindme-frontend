<template>
  <task-list v-bind:tasks='tasks'></task-list>
</template>

<script>
import TaskList from './TaskList';

export default {
  components: {
    TaskList
  },
  data() {
    return {
      tasks: [
        {
          title: 'Task 1',
          project: 'Project 1',
          done: false
        },
        {
          title: 'Task 2',
          project: 'Project 2',
          done: false
        },
        {
          title: 'Task 3',
          project: 'Project 3',
          done: true
        }
      ]
    };
  }
};
</script>
