<template>
  <v-dialog
    v-model="isActive"
    :overlay="false"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
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
          <v-list-tile avatar>
            <v-select
              v-model="gameType"
              :items="diceBots"
              label="ダイスボット"
              item-text="name"
              item-value="gameType"
            />
          </v-list-tile>
          <v-list-tile avatar>
            <v-text-field
              :value="apiURL"
              label="BCDice-APIのURL"
              append-icon="restore"
              @change="v => apiURL = v"
              @click:append="resetApiURL"
            />
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch
                v-model="playDiceAnimation"
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
                v-model="showSystemInfo"
                color="primary" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>ヘルプ表示</v-list-tile-title>
              <v-list-tile-sub-title>ダイスコマンド入力時にヘルプを表示する</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <span class="setting-title">音量</span>
            <v-slider
              v-model="volume"
              class="volume"
              max="10"
              append-icon="volume_up"
              prepend-icon="volume_down"
            />
          </v-list-tile>
        </v-list>
        <v-divider/>
        <v-subheader>アプリケーション情報</v-subheader>
        <v-card-text>
          <div class="headline">Saipage {{ version }}</div>
          <!-- eslint-disable-next-line no-irregular-whitespace -->
          <p>Created by <a href="https://twitter.com/ysakasin">酒田　シンジ</a></p>

          <p>ご要望やバグ報告は<a href="https://github.com/ysakasin/saipage/issues">Github issue</a>または<a href="https://twitter.com/ysakasin">Twitter</a>までお寄せください</p>
        </v-card-text>
      </v-card-text>
      <div style="flex: 1 1 auto;"/>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      color="success"
      top>
      {{ snackbarText }}
      <v-btn
        dark
        flat
        @click="snackbar = false">
        閉じる
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DEFAULT_URL, fetchDicebots } from "./dice";
import * as saipage from "../package.json";

interface DiceBotInfo {
  name: string;
  gameType: string;
}

const diceBots: DiceBotInfo[] = [];

@Component({
  props: {
    value: Boolean
  },
  watch: {
    value(val: boolean) {
      if (val != this.$data.isActive) {
        this.$data.isActive = val;
      }
    },
    isActive(val: boolean) {
      this.$emit("input", val);
    }
  }
})
export default class Settings extends Vue {
  data() {
    return {
      isActive: false,
      diceBots: diceBots,
      snackbar: false,
      snackbarText: ""
    };
  }

  mounted() {
    if (this.$data.diceBots.length == 0) {
      fetchDicebots().then(dicebots => {
        this.$data.diceBots = dicebots;
      });
    }
  }

  resetApiURL() {
    this.$store.commit("updateApiURL", DEFAULT_URL);
    this.$data.snackbarText = `APIをデフォルト設定に戻しました`;
    this.$data.snackbar = true;
  }

  get version() {
    return "v" + saipage.version;
  }

  get apiURL() {
    return this.$store.state.apiURL;
  }

  set apiURL(newURL: string) {
    this.$store.commit("updateApiURL", newURL);
    this.$data.snackbarText = `変更しました`;
    this.$data.snackbar = true;
  }

  get gameType() {
    return this.$store.state.gameType;
  }

  set gameType(newType) {
    this.$store.dispatch("updateGameType", newType);
    this.$data.snackbarText = `ダイスボットを「${newType}」に変更しました`;
    this.$data.snackbar = true;
  }

  get playSound() {
    return this.$store.state.settings.playSound;
  }
  set playSound(val: boolean) {
    this.$store.commit("updateSoundSetting", val);
  }

  get playDiceAnimation() {
    return this.$store.state.settings.playDiceAnimation;
  }
  set playDiceAnimation(val: boolean) {
    this.$store.commit("updateAnimationSetting", val);
  }

  get showSystemInfo() {
    return this.$store.state.settings.showSystemInfo;
  }
  set showSystemInfo(val: boolean) {
    this.$store.commit("updateSystemInfoSetting", val);
  }

  get volume() {
    return this.$store.state.settings.soundVolume * 10;
  }

  set volume(val: number) {
    const newVolume = val / 10;
    this.$store.commit("updateSoundVolumeSetting", newVolume);
  }
}
</script>

<style lang="scss" scoped>
.volume {
  max-width: 400px;
}

.setting-title {
  padding-right: 1rem;
}
</style>
