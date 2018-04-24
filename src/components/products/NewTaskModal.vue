<template>
  <task-modal v-show="show" @close="close">
    <div class="modal-header">
      <h3>New task: </h3>
    </div>

    <div class="modal-body">
      <label class="task-label">
        Task: 
        <input v-model="task.name" class="form-control">
      </label>
      <label class="task-remind-on">
        Remind me on: 
        <input v-model="task.remindOn" id="date" type="date">
      </label>
      
      <div class="modal-footer text-right">
        <button class="modal-default-button" @click="saveTask()">Save</button>
      </div>
    </div>

  </task-modal>
</template>

<style scoped>
/** stuff that comes from the INTERNET
*   change it later on to SemanticUI stuff
*/
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.text-right {
  text-align: right;
}

.form-label {
  display: block;
  margin-bottom: 1em;
}

.form-label > .form-control {
  margin-top: 0.5em;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5em 1em;
  line-height: 1.5;
  border: 1px solid #ddd;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<script>
import taskModal from './GenericModal';
import Vue from 'vue';
Vue.component('task-modal', taskModal);

export default {
  props: ['show'],
  methods: {
    saveTask() {
      // more logic to come to connect to the api and stuff

      // auth.addNewTask(this, this.task);
      this.$emit('add-new-task', this.task)

      this.close();
    },

    close() {
      this.$emit('close');
      this.task = {
        name: '',
        remindOn: ''
      };
    }
  },

  data() {
    return {
      task: {
        name: '',
        remindOn: ''
      }
    };
  }
};
</script>
