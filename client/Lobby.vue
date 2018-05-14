<template>
  <v-app>
    <v-toolbar>
      <v-icon>public</v-icon>
      <v-toolbar-title>ロビー Saibox</v-toolbar-title>
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
                :to="{path: '/rooms/' + item.roomId}"
                :key="item.roomId">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.roomName }}
                    <v-icon
                      v-if="item.hashedPassword != ''"
                      small>locked</v-icon>
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn
                    icon
                    ripple
                    @click.stop.prevent="deleteDaialog = true; deleteTarget = item">
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
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
    <v-dialog
      v-model="deleteDaialog"
      max-width="500px">
      <v-card>
        <v-card-title class="headline">ルームの削除</v-card-title>

        <v-card-text>
          「{{ deleteTarget.roomName }}」を削除しますか？
          <v-container grid-list-md v-if="deleteTarget.hashedPassword">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model.lazy="password"
                  :append-icon="visiblePassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (visiblePassword = !visiblePassword)"
                  :type="visiblePassword ? 'text' : 'password'"
                  :error="failedAuth"
                  :error-messages="errorMessages"
                  label="パスワードを入力..."
                  autofocus=""
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            @click.stop.prevent="password = ''; deleteDaialog = false">やめる</v-btn>
          <v-btn
            color="error"
            depressed
            :disabled="deleteTarget.hashedPassword != '' && password == ''"
            @click.stop.prevent="deleteRoom()">削除する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';

import RoomMakeDialog from './RoomMakeDialog.vue';
@Component({
  components: {
    RoomMakeDialog
  }
})
export default class Lobby extends Vue {
  data() {
    return {
      items: [],
      roomMake: false,
      deleteDaialog: false,
      password: '',
      visiblePassword: false,
      failedAuth: false,
      deleteTarget: {},
      errorMessages: [],
    };
  }
  mounted() {
    this.loadRooms();
  }
  loadRooms() {
    axios.get('/api/v1/rooms').then(res => {
      this.$data.items = res.data;
    });
  }
  deleteRoom() {
    const data = {
      roomId: this.$data.deleteTarget.roomId,
      password: this.$data.password,
    };
    axios.post('/api/v1/rooms/delete', data).then(res => {
      this.$data.deleteDaialog = false;
      this.$data.deleteTarget = {};
      this.loadRooms();
    }).catch(error => {
      this.$data.failedAuth = true;
      this.$data.errorMessages = 'パスワードが一致しませんでした';
    });
  }
}
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
