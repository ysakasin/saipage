<template>
  <v-layout row>
    <v-dialog
      v-model="isActive"
      max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">ルーム作成</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model.lazy="roomName"
                  label="ルーム名を入力..."
                  autofocus
                />
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="gameType"
                  :items="diceBots"
                  label="ダイスボット"
                  item-text="name"
                  item-value="gameType"
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
            @click.native="isActive = false">キャンセル</v-btn>
          <v-btn
            color="primary"
            depressed
            @click.native="createRoom()">作成する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {DiceBotLoader} from 'bcdice-js';
import axios from 'axios';

interface DiceBotInfo {
  name: string;
  gameType: string;
}

const diceBots : DiceBotInfo[] = DiceBotLoader.collectDiceBotDescriptions().map((x) => {
  return {name: x[2], gameType: x[1]};
});

@Component({
  props : {
    value: Boolean
  },
  watch : {
    value (val : boolean) {
      if (val != this.$data.isActive) {
        this.$data.isActive = val;
      }
    },
    isActive (val : boolean) {
      this.$emit('input', val);
    }
  }
})
export default class RoomMakeDialog extends Vue {
  data () {
    return {
      isActive: false,
      roomName: '',
      diceBots: diceBots,
      gameType: '',
    };
  }

  createRoom() {
    axios.post('/api/v1/rooms/create', {roomName: this.$data.roomName, gameType: this.$data.gameType})
      .then(response => {
        this.$router.push('/rooms/' + response.data.roomId);
      });
  }
}
</script>
