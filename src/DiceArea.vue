<template>
  <div class="dice-area">
    <template v-for="(result, i) in target.drawables">
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
      target: [],
    };
  }

  mounted() {
    this.$store.watch((state) => { return state.readyAnimation; }, (val, old) => {
      if (val == false) {
        this.playAnimation();
      }
    });
  }

  playAnimation() {
    if (!this.playDiceAnimation) {
      return;
    }
    this.play();
    const target = this.$store.state.logBuffer[0];
    this.$data.draw = true;
    this.$data.target = target;
    if (target.drawables.length > 0) {
      this.$store.commit('activateAnimation');
      setTimeout(this.deactivateAnimation, 900);
    } else {
      this.$store.commit('appendLog', target);
    }
    setTimeout(this.nextAnimation, 1200);
  }

  get playSound() {
    return this.$store.state.settings.playSound;
  }

  get playDiceAnimation() {
    return this.$store.state.settings.playDiceAnimation;
  }

  getAudio () {
    if (this.$el !== undefined) {
      return this.$el.querySelectorAll('audio')[0];
    }
    return null;
  }

  play() {
    if (!this.playSound) {
      return;
    }

    const audio = this.getAudio();
    if (audio != null) {
      audio.pause();
      audio.currentTime = 0.15;
      audio.play();
    }
  }

  showDice () {
    this.$data.draw = true;
  }

  hideDice() {
    this.$data.draw = false;
  }

  deactivateAnimation() {
    this.$store.commit('deactivateAnimation');
    this.$store.commit('appendLog', this.$data.target);
  }

  nextAnimation() {
    this.$store.commit('nextAnimation');
    if (!this.$store.state.readyAnimation) {
      this.playAnimation();
    }
  }
}
</script>

<style lang="scss" scoped>
.dice-area {
  position: absolute;
  top: 100px;
  z-index: 1000;
}
</style>


