<template>
  <v-dialog
    v-model="isActive"
    :overlay="false"
  >
    <v-card tile>
      <v-toolbar
        card
        dark>
        <v-btn
          icon
          dark
          @click.native="isActive = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>設定</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-list
          three-line
          subheader>
          <v-subheader>ルーム設定</v-subheader>
          <v-list-tile avatar>
            <v-text-field
              v-model.lazy="roomName"
              name="roomname"
              label="ルーム名"
            />
          </v-list-tile>
          <v-list-tile avatar>
            <v-select
              v-model="gameType"
              :items="diceBots"
              label="ダイスボット"
              item-text="name"
              item-value="gameType"
            />
          </v-list-tile>
        </v-list>
        <v-divider/>
        <v-list
          three-line
          subheader>
          <v-subheader>ユーザー設定</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch
                v-model="diceanimation"
                color="primary" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>ダイスロールアニメーション</v-list-tile-title>
              <v-list-tile-sub-title>ダイスロール時のアニメーションを表示する</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch
                v-model="playSound"
                color="primary" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>効果音</v-list-tile-title>
              <v-list-tile-sub-title>ダイスロール時に効果音を鳴らす</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch
                v-model="systeminfo"
                color="primary" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>ヘルプ表示</v-list-tile-title>
              <v-list-tile-sub-title>ダイスコマンド入力時にヘルプを表示する</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card-text>
      <div style="flex: 1 1 auto;"/>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {DiceBotLoader} from 'bcdice-js';

interface DiceBotInfo {
  name: string;
  gameType: string;
}

const diceBots : DiceBotInfo[] = DiceBotLoader.collectDiceBotDescriptions().map((x) => {
  return {name: x[2], gameType: x[1]};
});

diceBots.sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
});

@Component({
  props: {
    value: Boolean
  },
  watch: {
    value(val : boolean) {
      if (val != this.$data.isActive) {
        this.$data.isActive = val;
      }
    },
    isActive(val : boolean) {
      this.$emit("input", val);
    }
  }
})
export default class Settings extends Vue{
  data () {
    return {
      isActive: false,
      diceanimation: true,
      systeminfo: true,
      diceBots: diceBots,
    };
  }

  get roomName () {
    return this.$store.state.roomName;
  }

  set roomName (newName) {
    this.$store.commit('changeRoomName', newName);
  }

  get gameType() {
    return this.$store.state.gameType;
  }

  set gameType(newType) {
    this.$store.commit('updateGameType', newType);
  }

  get playSound() {
    return this.$store.state.settings.playSound;
  }
  set playSound(val : boolean) {
    this.$store.commit('updateSoundSetting', val);
  }
}
</script>
