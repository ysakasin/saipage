<template>
  <div class="message">
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default class Message extends Vue{
  msg: string = 'We are ready to start.'
}
</script>

<style>
.message {
  text-align: center;
}
</style>

