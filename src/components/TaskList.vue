<template>
  <div>
      <!-- <ul>
          <li> Task 1 </li>
          <li> Task 2 </li>
          <li> Task 3 </li>
      </ul> -->
      <p> HELLO! </p>
      <p> Completed tasks: {{tasks.filter(task => { return task.done === true }).length}}</p>
      <p> Pending tasks: {{tasks.filter(task => { return task.done === false }).length}}</p>
      <div class="ui centered card" v-for="task in tasks" :key="task.title">
        <div class="content">
          <div class="header">
            {{task.title}}
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ["tasks"]
};
</script>

<style>

</style>
