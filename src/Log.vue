<template>
  <v-card class="log-area">
    <v-card-text v-if="logs.length == 0" class="log">
      <div class="meta">
        ダイスログはまだありません
      </div>
    </v-card-text>
    <template v-for="(item, i) in logs">
      <v-card-text :key="i" class="log">
        <div class="meta">
          <span>{{ item.gameType }}</span
          ><span class="timestamp">{{ format(item.timestamp) }}</span>
          <v-tooltip right transition="slide-x-transition">
            <template v-slot:activator="{ on }">
              <v-icon
                v-ripple
                v-on="on"
                @click="dicerollByText(item.gameType, item.command)"
                >mdi-replay</v-icon
              >
            </template>
            <span>もう一度ダイスロール</span>
          </v-tooltip>
        </div>
        <div class="subheading">{{ item.command }} {{ item.body }}</div>
      </v-card-text>
    </template>
    <v-snackbar v-model="snackbar" :timeout="4000" color="error" top>
      {{ errorMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn drak text v-bind="attrs" @click="snackbar = false">
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { diceRoll, selectDiceResults } from "./dice";
import { Log as LogI } from "./interface";

interface Dice {
  faces: number;
  value: number;
}

const aDay = 1000 * 60 * 60 * 24;
const baseTime = Date.now();

@Component
export default class Log extends Vue {
  data() {
    return {
      snackbar: false,
      errorMsg: ""
    };
  }

  get logs() {
    return this.$store.state.logs;
  }

  format(dateOrg: string | Date): string {
    const date = new Date(dateOrg);
    const diff = baseTime - date.getTime();
    const h = this.zeroPadding(date.getHours());
    const m = this.zeroPadding(date.getMinutes());
    if (diff >= aDay) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日 ${h}:${m}`;
    } else {
      return `${h}:${m}`;
    }
  }

  zeroPadding(x: number): string {
    return ("0" + x).slice(-2);
  }

  dicerollByText(gameType: string, text: string) {
    diceRoll(gameType, text)
      .then(res => {
        const dices = res.dices.map((d: Dice) => {
          return { face: d.faces, value: d.value };
        });
        const log: LogI = {
          gameType: gameType,
          command: text,
          body: res.result,
          drawables: selectDiceResults(dices),
          timestamp: new Date()
        };

        this.$store.commit("appendLogBuffer", log);
      })
      .catch(error => {
        if (error.response) {
          this.$data.errorMsg = "ダイスコマンドを実行できませんでした";
        } else {
          this.$data.errorMsg = "APIサーバーに接続できませんでした";
        }
        this.$data.snackbar = true;
      });
  }
}
</script>

<style lang="scss" scoped>
.log-area {
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
}

.log {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  .meta {
    line-height: 1.4;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);

    .v-icon {
      font-size: 14px;
      padding: 1px;
    }
  }
  .timestamp::before {
    content: "・";
  }
  .subheading {
    color: rgba(0, 0, 0, 0.87);
    word-wrap: break-word;
    line-height: 1.2;
  }
}
</style>
