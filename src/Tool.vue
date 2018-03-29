<template>
  <v-card>
    <form @submit.prevent="diceroll">
      <v-text-field
        v-model="command"
        label="コマンドを入力..."
        single-line
        hide-details
        full-width
        @focus="help = true"
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
      @click.stop="dicerollByText(command)"
      depressed>{{ command }}</v-btn>
    <v-btn
      icon
      @click.stop="edit = true">
      <v-icon>add</v-icon>
    </v-btn>
    <ShortcutDialog v-model="edit" />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import store from './store';
import BCDice, {DiceBotLoader} from 'bcdice-js';

import ShortcutDialog from './ShortcutDialog.vue';

@Component({
  components: {
    ShortcutDialog
  }
})
export default class Tool extends Vue{
  data () {
    return {
      command: '',
      help: false,
      edit: false,
    };
  }

  clearForm() {
    this.$data.command = '';
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

  diceroll() {
    this.dicerollByText(this.$data.command);
    this.clearForm();
  }
  dicerollByText(text : string) {
    const bcdice = new BCDice();
    bcdice.setGameByTitle(this.gameType);
    bcdice.setMessage(text);
    bcdice.setCollectRandResult(true);

    let result = bcdice.dice_command();
    const log = {username: this.userName, body: result[0]};
    let diceResults = this.getDiceResults(bcdice);

    this.$store.commit('appendLog', log);
    this.$store.commit('pushDice', diceResults);
  }

  getDiceResults(bcdice : BCDice) {
    const randResults:   Result[] = bcdice.getRandResults().map((x) => {return {face: x[1], value: x[0]};});
    const drawableResults = randResults.reduce((acc : Result[], result : Result) => {
      if (this.isDrawable(result)) {
        if (result.face == 100) {
          acc.push({face: 100, value: Math.floor(result.value / 10)});
          acc.push({face:  10, value: result.value % 10});
        } else {
          acc.push(result);
        }
      }
      return acc;
    }, []);
    return drawableResults;
  }
  isDrawable(result : Result) : boolean {
    return result.face == 100 || result.face == 10 || result.face == 4 || result.face == 6 || result.face == 8;
  }

  beforeEnter(el : HTMLElement) {
    el.style.height = '0';
  }
  enter(el : HTMLElement) {
    el.style.height = el.scrollHeight + 'px';
  }
  beforeLeave(el : HTMLElement) {
    el.style.height = el.scrollHeight + 'px';
  }
  leave(el : HTMLElement) {
    el.style.height = '0';
  }
}

interface Result {
  face: number;
  value: number;
}
</script>

<style lang="scss" scoped>
.v-enter-active, .v-leave-active {
  transition: all .25s;
  overflow: hidden;
}
.sysinfo {
  white-space: pre;
}
</style>
