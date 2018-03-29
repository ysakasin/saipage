<template>
  <div class="dice-area">
    <template v-for="(result, i) in animationTarget">
      <Dice
        v-if="draw"
        :key="i"
        :face="result.face"
        :value="result.value"
        @hide="draw = false" />
    </template>
    <audio preload>
      <source :src="soundData">
    </audio>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Dice from './Dice.vue';
import * as soundData from './assets/dice_roll.mp3';

@Component({
  components: {
    Dice,
  }
})
export default class DiceArea extends Vue {
  data () {
    return {
      draw: false,
      soundData: soundData,
    };
  }

  get animationTarget() {
    if (this.playSound) {
      this.play();
    }
    setTimeout(this.nextAnimation, 1000);
    let queue = this.$store.state.diceAnimationQueue;
    this.$data.draw = true;
    return queue[0];
  }

  get playSound() {
    return this.$store.state.settings.playSound;
  }

  getAudio () {
    if (this.$el !== undefined) {
      return this.$el.querySelectorAll('audio')[0];
    }
    return null;
  }

  play() {
    const audio = this.getAudio();
    if (audio != null) {
      audio.play();
    }
  }

  showDice () {
    this.$data.draw = true;
  }

  hideDice() {
    this.$data.draw = false;
  }

  nextAnimation() {
    this.$store.commit('nextAnimation');
  }
}
</script>

<style lang="scss" scoped>
.dice-area {
  position: absolute;
  top: 100px;
}
</style>


