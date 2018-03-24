<template>
  <div class="dice-area">
    <template v-for="(result, i) in animationTarget">
      <Dice v-if="draw" :key="i" :face="result.face" :value="result.value" @hide="draw = false" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Dice from './Dice.vue'

@Component({
  components: {
    Dice,
  }
})
export default class DiceArea extends Vue {
  data () {
    return {
      draw: false,
    }
  }

  get animationTarget() {
    setTimeout(this.nextAnimation, 1000)
    let queue = this.$store.state.diceAnimationQueue
    this.$data.draw = true
    return queue[0]
  }

  showDice () {
    this.$data.draw = true
  }

  hideDice() {
    this.$data.draw = false
  }

  nextAnimation() {
    this.$store.commit('nextAnimation')
  }
}
</script>

<style lang="scss" scoped>
.dice-area {
  position: absolute;
  top: 100px;
}
</style>


