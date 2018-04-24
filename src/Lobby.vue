<template>
  <v-app>
    <v-toolbar>
      <v-icon>public</v-icon>
      <v-toolbar-title>ロビー dice-room</v-toolbar-title>
    </v-toolbar>
    <v-container grid-list-lg>
      <v-layout
        row
        wrap>
        <v-flex xs12>
          <v-list >
            <v-subheader>ルーム一覧</v-subheader>
            <template v-for="(item, index) in items">
              <router-link :to="{path: '/room/' + item.roomId}" :key="item.roomId" tag="div">
              <v-list-tile @click="">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.roomId }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              </router-link>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// import AppBar from './AppBar.vue';
// import Log from './Log.vue';
// import Tool from './Tool.vue';
// import DiceArea from './DiceArea.vue';
@Component({
  components: {
    // AppBar,
    // Tool,
    // Log,
    // DiceArea,
  }
})
export default class Lobby extends Vue {
  data() {
    return {
      items: [
        {
          roomId: "hoge"
        }
      ]
    }
  }
  // mounted () {
    // this.$store.commit('loadSettings');
  // }
}
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
