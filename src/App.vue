<template>
  <div id='app'>
    <h1>ts-vue-template</h1>
    <Message />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Message from './Message.vue'
@Component({
  components: {
    Message
  }
})
export default class App extends Vue {}
</script>

<style>
h1 {
  text-align: center;
}
</style>


