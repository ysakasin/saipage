<template>
  <v-app>
    <AppBar />
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <Tool />
        </v-flex>
        <v-flex xs12>
          <Log />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import AppBar from './AppBar.vue'
import Log from './Log.vue'
import Tool from './Tool.vue'
@Component({
  components: {
    AppBar,
    Tool,
    Log
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>


