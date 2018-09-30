<template>
  <v-card>
    <form @submit.prevent="diceroll">
      <v-text-field
        ref="commandField"
        v-model="command"
        :append-icon-cb="diceroll"
        label="ダイスコマンドを入力..."
        append-icon="send"
        single-line
        hide-details
        full-width
        @focus="help = showSystemInfo"
        @blur="help = false"
      />
    </form>
    <v-divider />
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave">
      <div v-show="help">
        <v-card-text>
          <div>{{ system }}</div>
          <div class="sysinfo">{{ systeminfo }}</div>
        </v-card-text>
        <v-divider />
      </div>
    </transition>
    <v-btn
      v-for="(command, i) in shortcuts"
      :key="i"
      depressed
      @click.stop="execShortcut(command)">{{ command }}</v-btn>
    <v-tooltip bottom>
      <v-btn
        slot="activator"
        icon
        @click.stop="edit = true">
        <v-icon>add</v-icon>
      </v-btn>
      <span>ショートカット追加</span>
    </v-tooltip>
    <ShortcutDialog v-model="edit" />
    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      color="error"
      top>
      ダイスコマンドを実行できませんでした
      <v-btn
        dark
        flat
        @click="snackbar = false">
        閉じる
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "./store";
import BCDice, { DiceBotLoader } from "bcdice-js";

import ShortcutDialog from "./ShortcutDialog.vue";

@Component({
  components: {
    ShortcutDialog
  }
})
export default class Tool extends Vue {
  $refs!: {
    commandField: HTMLInputElement;
  };

  data() {
    return {
      command: "",
      help: false,
      edit: false,
      snackbar: false
    };
  }

  clearForm() {
    this.$data.command = "";
  }

  get userName() {
    return this.$store.state.userName;
  }

  get gameType() {
    return this.$store.state.gameType;
  }

  get shortcuts() {
    return this.$store.state.shortcuts;
  }

  get diceBot() {
    return DiceBotLoader.loadUnknownGame(this.gameType);
  }

  get system() {
    return this.diceBot.gameName();
  }

  get systeminfo() {
    return this.diceBot.getHelpMessage();
  }

  get showSystemInfo() {
    return this.$store.state.settings.showSystemInfo;
  }

  execShortcut(command: string) {
    if (command.match(/[?？]/)) {
      this.$data.command = command;
      this.$refs.commandField.focus();
    } else {
      this.dicerollByText(command);
    }
  }

  diceroll() {
    this.dicerollByText(this.$data.command, true);
  }

  dicerollByText(text: string, clear: boolean = false) {
    const bcdice = new BCDice();
    bcdice.setGameByTitle(this.gameType);
    bcdice.setMessage(text);
    bcdice.setCollectRandResult(true);

    let result = bcdice.dice_command();
    if (result[0] == "1") {
      this.$data.snackbar = true;
      return;
    }
    let diceResults = this.getDiceResults(bcdice);
    const log: Log = {
      userName: this.userName,
      body: result[0],
      drawables: diceResults,
      timestamp: new Date()
    };
    if (clear) {
      this.clearForm();
    }

    this.$store.dispatch("sendLog", log);
  }

  getDiceResults(bcdice: BCDice) {
    const randResults: Result[] = bcdice.getRandResults().map(x => {
      return { face: x[1], value: x[0] };
    });
    const drawableResults = randResults.reduce(
      (acc: Result[], result: Result) => {
        if (this.isDrawable(result)) {
          if (result.face == 100) {
            acc.push({ face: 100, value: Math.floor(result.value / 10) });
            acc.push({ face: 10, value: result.value % 10 });
          } else {
            acc.push(result);
          }
        }
        return acc;
      },
      []
    );
    return drawableResults;
  }
  isDrawable(result: Result): boolean {
    return (
      result.face == 100 ||
      result.face == 10 ||
      result.face == 4 ||
      result.face == 6 ||
      result.face == 8
    );
  }

  beforeEnter(el: HTMLElement) {
    el.style.height = "0";
  }
  enter(el: HTMLElement) {
    el.style.height = el.scrollHeight + "px";
  }
  beforeLeave(el: HTMLElement) {
    el.style.height = el.scrollHeight + "px";
  }
  leave(el: HTMLElement) {
    el.style.height = "0";
  }
}

interface Result {
  face: number;
  value: number;
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s;
  overflow: hidden;
}
.sysinfo {
  white-space: pre;
}
</style>
