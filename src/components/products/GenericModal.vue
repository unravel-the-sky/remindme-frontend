<template>
    <transition name="modal">
        <div class="modal-mask" @click="close" v-show="show">
            <div class="modal-container" @click.stop>
              <slot></slot>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
.modal-container {
  width: 300px;
  margin: 40px auto 0;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
</style>

<script>
export default {
  name: 'modal',
  props: ['show'],
  methods: {
    close() {
      this.$emit('close');
    }
  },
  mounted() {
    document.addEventListener('keydown', event => {
      if (this.show && event.keyCode == 27) {
        // this is to catch ESC events
        this.close();
        console.log('hello you pressed ESC');
      }
    });
  },

  created() {
    console.log('hello i am a modal');
  }
};
</script>
