<template>
  <!-- eslint-disable no-irregular-whitespace -->
  <v-dialog
    v-model="isActive"
    :overlay="false"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card tile>
      <v-toolbar card dark>
        <v-btn @click.native="isActive = false" icon dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>設定</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-list three-line subheader>
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
              @change="v => (apiURL = v)"
              @click:append="resetApiURL"
              label="BCDice-APIのURL"
              append-icon="restore"
            />
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch v-model="playDiceAnimation" color="primary" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>ダイスロールアニメーション</v-list-tile-title>
              <v-list-tile-sub-title
                >ダイスロール時のアニメーションを表示する</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch v-model="playSound" color="primary" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>効果音</v-list-tile-title>
              <v-list-tile-sub-title
                >ダイスロール時に効果音を鳴らす</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch v-model="showSystemInfo" color="primary" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>ヘルプ表示</v-list-tile-title>
              <v-list-tile-sub-title
                >ダイスコマンド入力時にヘルプを表示する</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-action>
              <v-switch v-model="showTips" color="primary" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Tips表示</v-list-tile-title>
              <v-list-tile-sub-title
                >SaipageのTipsを表示する</v-list-tile-sub-title
              >
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
        <v-divider />
        <v-subheader class="red--text">Danger Zone</v-subheader>
        <v-list three-line subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>ログを削除</v-list-tile-title>
              <v-list-tile-sub-title
                >このSaipageで行ったダイスロールの全ログをブラウザから削除します</v-list-tile-sub-title
              >
            </v-list-tile-content>
            <v-list-tile-action class="danger-zone-action">
              <v-btn
                @click.stop="removeLogDialog = true"
                depressed
                color="error"
                >ログを削除</v-btn
              >
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-divider />
        <v-subheader>アプリケーション情報</v-subheader>
        <v-card-text>
          <div class="headline">
            Saipage <small>- {{ commitHash }}</small>
          </div>
          <p>
            Created by <a href="https://twitter.com/ysakasin">酒田　シンジ</a>
          </p>

          <p>
            ご要望やバグ報告は<a
              href="https://github.com/ysakasin/saipage/issues"
              >Github issue</a
            >または<a href="https://twitter.com/ysakasin">Twitter</a
            >までお寄せください
          </p>
        </v-card-text>
      </v-card-text>
      <div style="flex: 1 1 auto;" />
    </v-card>

    <v-dialog v-model="removeLogDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">ログを削除</v-card-title>
        <v-card-text>
          <p>
            このSaipageで行ったダイスロールの全ログをブラウザから削除します。ログを削除すると復旧することはできません。
          </p>
          <p>
            ログを削除しますか？
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="removeLogDialog = false"
            color="green darken-1"
            flat="flat"
          >
            キャンセル
          </v-btn>
          <v-btn @click="removeAllLogs" depressed color="error">
            削除する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="3000" color="success" top>
      {{ snackbarText }}
      <v-btn @click="snackbar = false" dark flat>
        閉じる
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DEFAULT_URL } from "./dice";
import { VERSION, COMMIT_HASH, STAGED, UNSTAGED } from "./constants";

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
      snackbar: false,
      snackbarText: "",
      removeLogDialog: false
    };
  }

  resetApiURL() {
    this.$store.dispatch("updateApiURL", DEFAULT_URL);
    this.$data.snackbarText = `APIをデフォルト設定に戻しました`;
    this.$data.snackbar = true;
  }

  removeAllLogs() {
    this.$store.commit("removeAllLogs");
    this.$data.removeLogDialog = false;

    this.$data.snackbarText = `ログを削除しました`;
    this.$data.snackbar = true;
  }

  get diceBots() {
    return this.$store.state.diceBots;
  }

  get version() {
    return "v" + VERSION;
  }

  get commitHash() {
    if (STAGED || UNSTAGED) {
      return COMMIT_HASH + "+";
    } else {
      return COMMIT_HASH;
    }
  }

  get apiURL() {
    return this.$store.state.apiURL;
  }

  set apiURL(newURL: string) {
    this.$store.dispatch("updateApiURL", newURL);
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

  get showTips() {
    return this.$store.state.settings.showTips;
  }
  set showTips(val: boolean) {
    this.$store.commit("updateTipsSetting", val);
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

.danger-zone-action {
  margin-left: 4px;
  min-width: auto;
}
</style>
