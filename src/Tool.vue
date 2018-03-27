<template>
  <v-card>
    <form v-on:submit.prevent="diceroll">
    <v-text-field
      label="コマンドを入力..."
      v-model="command"
      single-line
      hide-details
      full-width
      v-on:focus="help = true"
      v-on:blur="help = false"
    ></v-text-field>
    </form>
    <v-divider />
    <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave">
    <div v-show="help">
    <v-card-text>
    <div>{{ system }}</div>
    <div class="sysinfo">{{ systeminfo }}</div>
    </v-card-text>
    <v-divider />
    </div>
    </transition>
    <v-btn v-for="(command, i) in commands" :key="i" depressed>{{ command }}</v-btn>
    <v-btn icon>
      <v-icon>add</v-icon>
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import store from './store'
import BCDice, {DiceBotLoader} from 'bcdice-js'

@Component
export default class Tool extends Vue{
  data () {
    return {
      command: '',
      help: false,
      commands: [
        "1D100",
        "1D6",
        "1D20",
        "1D100<=?",
      ]
    }
  }

  clearForm() {
    this.$data.command = ""
  }

  get userName() {
    return this.$store.state.userName
  }

  get gameType() {
    return this.$store.state.gameType
  }

  get diceBot() {
    return DiceBotLoader.loadUnknownGame(this.gameType)
  }

  get system() {
    return this.diceBot.gameName()
  }

  get systeminfo() {
    return this.diceBot.getHelpMessage()
  }

  diceroll() {
    const bcdice = new BCDice()
    bcdice.setGameByTitle(this.gameType)
    bcdice.setMessage(this.$data.command)
    bcdice.setCollectRandResult(true)

    let result = bcdice.dice_command()
    console.log(result)
    const log = {username: this.userName, body: result[0]}
    let diceResults = this.getDiceResults(bcdice)
    console.log(diceResults)

    this.$store.commit('appendLog', log)
    this.$store.commit('pushDice', diceResults)
    this.clearForm()
  }

  getDiceResults(bcdice : BCDice) {
    const randResults : Result[] = bcdice.getRandResults().map((x) => {return {face: x[1], value: x[0]}})
    console.log(randResults)
    const drawableResults = randResults.reduce((acc : Result[], result : Result) => {
      if (this.isDrawable(result)) {
        if (result.face == 100) {
          acc.push({face: 100, value: Math.floor(result.value / 10)})
          acc.push({face:  10, value: result.value % 10})
        } else {
          acc.push(result)
        }
      }
      return acc
    }, [])
    return drawableResults
  }
  isDrawable(result : Result) : boolean {
    return result.face == 100 || result.face == 10 || result.face == 4 || result.face == 6 || result.face == 8
  }

  beforeEnter(el : HTMLElement) {
    el.style.height = '0'
  }
  enter(el : HTMLElement) {
    el.style.height = el.scrollHeight + 'px'
  }
  beforeLeave(el : HTMLElement) {
    el.style.height = el.scrollHeight + 'px'
  }
  leave(el : HTMLElement) {
    el.style.height = '0'
  }
}

interface Result {
  face: number,
  value: number,
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
