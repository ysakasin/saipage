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
            <template v-for="item in items">
              <v-list-tile
                :to="{path: '/room/' + item.roomId}"
                :key="item.roomId">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.roomId }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
        <v-btn
          color="pink"
          dark
          fab
          fixed
          bottom
          right
          @click.stop="roomMake = true" >
          <v-icon>add</v-icon>
        </v-btn>

      </v-layout>
    </v-container>
    <RoomMakeDialog v-model="roomMake" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import RoomMakeDialog from './RoomMakeDialog.vue';
@Component({
  components: {
    RoomMakeDialog,
  }
})
export default class Lobby extends Vue {
  data() {
    return {
      items: [
        {
          roomId: 'hoge'
        }
      ],
      roomMake: false,
    };
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
