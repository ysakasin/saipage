<template>
  <!-- eslint-disable no-irregular-whitespace -->

  <v-dialog
    v-model="isActive"
    fullscreen
    hide-overlay
    transition="dialog-left-transition"
  >
    <v-card>
      <v-toolbar dark flat>
        <v-btn @click.native="isActive = false" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>設定</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-list three-line subheader>
          <v-list-item>
            <v-select
              v-model="gameType"
              :items="diceBots"
              label="ダイスボット"
              item-text="name"
              item-value="gameType"
            />
          </v-list-item>
          <v-list-item>
            <v-text-field
              :value="apiURL"
              @change="v => (apiURL = v)"
              @click:append="resetApiURL"
              label="BCDice-APIのURL"
              append-icon="mdi-history"
            />
          </v-list-item>
          <v-list-item>
            <v-list-item-action-text>
              <v-switch v-model="playDiceAnimation" color="primary" />
            </v-list-item-action-text>
            <v-list-item-content class="ml-4">
              <v-list-item-title>ダイスロールアニメーション</v-list-item-title>
              <v-list-item-subtitle
                >ダイスロール時のアニメーションを表示する</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action-text>
              <v-switch v-model="playSound" color="primary" />
            </v-list-item-action-text>
            <v-list-item-content class="ml-4">
              <v-list-item-title>効果音</v-list-item-title>
              <v-list-item-subtitle
                >ダイスロール時に効果音を鳴らす</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action-text>
              <v-switch v-model="showSystemInfo" color="primary" />
            </v-list-item-action-text>
            <v-list-item-content class="ml-4">
              <v-list-item-title>ヘルプ表示</v-list-item-title>
              <v-list-item-subtitle
                >ダイスコマンド入力時にヘルプを表示する</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action-text>
              <v-switch v-model="showTips" color="primary" />
            </v-list-item-action-text>
            <v-list-item-content class="ml-4">
              <v-list-item-title>Tips表示</v-list-item-title>
              <v-list-item-subtitle
                >SaipageのTipsを表示する</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <span>音量</span>
            <v-slider
              v-model="volume"
              class="volume pt-5 ml-4"
              max="10"
              append-icon="mdi-volume-high"
              prepend-icon="mdi-volume-medium"
            />
          </v-list-item>
        </v-list>
        <v-divider />
        <v-subheader class="red--text danger-zone">Danger Zone</v-subheader>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>ログを削除</v-list-item-title>
              <v-list-item-subtitle
                >ダイスロールの全ログをブラウザから削除します</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action class="danger-zone-action">
              <v-btn
                @click.stop="removeLogDialog = true"
                depressed
                color="error"
                >ログを削除</v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-subheader>アプリケーション情報</v-subheader>
        <v-card-text class="pt-0">
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
          <v-btn @click="removeLogDialog = false" color="green darken-1" text>
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
      <template v-slot:action="{ attrs }">
        <v-btn drak text v-bind="attrs" @click="snackbar = false">
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DEFAULT_URL } from "./dice";
import { COMMIT_HASH, STAGED, UNSTAGED } from "./constants";

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
.v-toolbar {
  margin-bottom: 20px;
}

.volume {
  max-width: 400px;
}

.setting-title {
  padding-right: 1rem;
}

.danger-zone {
  margin-bottom: -12px;
}

.danger-zone-action {
  margin-left: 4px;
  min-width: auto;
}

p,
.headline {
  color: rgba(0, 0, 0, 0.87);
}
</style>

<style lang="scss">
.dialog-left-transition {
  &-enter,
  &-leave-to {
    transform: translateX(100%);
  }
}
</style>
