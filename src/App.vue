<template>
  <v-app>
    <AppBar />
    <v-container grid-list-lg>
      <v-layout
        row
        wrap>
        <v-flex
          xs12
          style="position: relative">
          <Tool />
          <DiceArea />
        </v-flex>
        <v-flex xs12>
          <Log />
        </v-flex>
      </v-layout>
    </v-container>
    <DisconnectedDialog />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import AppBar from './AppBar.vue';
import Log from './Log.vue';
import Tool from './Tool.vue';
import DiceArea from './DiceArea.vue';
import DisconnectedDialog from './DisconnectedDialog.vue';
@Component({
  components: {
    AppBar,
    Tool,
    Log,
    DiceArea,
    DisconnectedDialog,
  }
})
export default class App extends Vue {
  mounted () {
    this.$store.commit('connected');
    this.$store.commit('loadSettings');
    this.$store.dispatch('joinRoom', this.$route.params.roomId);
  }
}
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
