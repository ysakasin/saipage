<template>
  <div class="dice-area">
    <div>
      <div
        v-show="draw"
        :class="{ success: isSuccess, failure: isFailure, active: isActive }"
        @click.stop="draw = false"
        class="result"
      >
        {{ commandResult }}
      </div>
    </div>
    <template v-for="(result, i) in target.drawables">
      <Dice
        v-if="draw"
        :key="i"
        :face="result.face"
        :value="result.value"
        @hide="draw = false"
      />
    </template>
    <audio preload>
      <source :src="soundData" />
    </audio>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Dice from "./Dice.vue";
import soundData from "./assets/dice_roll.mp3";

@Component({
  components: {
    Dice
  }
})
export default class DiceArea extends Vue {
  data() {
    return {
      draw: false,
      soundData: soundData,
      target: []
    };
  }

  mounted() {
    this.$store.watch(
      state => {
        return state.readyAnimation;
      },
      val => {
        if (val == false) {
          this.playAnimation();
        }
      }
    );
  }

  playAnimation() {
    if (!this.playDiceAnimation) {
      return;
    }
    this.play();
    const target = this.$store.state.logBuffer[0];
    if (target.drawables.length > 0) {
      this.$data.draw = true;
      this.$data.target = target;
      this.$store.commit("activateAnimation");
      setTimeout(this.deactivateAnimation, 900);
    } else {
      this.$store.commit("appendLog", target);
    }
    setTimeout(this.nextAnimation, 1200);
  }

  get playSound() {
    return this.$store.state.settings.playSound;
  }

  get playDiceAnimation() {
    return this.$store.state.settings.playDiceAnimation;
  }

  getAudio() {
    if (this.$el !== undefined) {
      return this.$el.querySelectorAll("audio")[0];
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
      audio.volume = this.$store.state.settings.soundVolume;
      audio.play();
    }
  }

  showDice() {
    this.$data.draw = true;
  }

  hideDice() {
    this.$data.draw = false;
  }

  deactivateAnimation() {
    this.$store.commit("deactivateAnimation");
    this.$store.commit("appendLog", this.$data.target);
  }

  nextAnimation() {
    this.$store.commit("nextAnimation");
    if (!this.$store.state.readyAnimation) {
      this.playAnimation();
    }
  }

  get commandResult(): string {
    const result = this.$data.target.body;
    if (!result) {
      return "";
    }
    const strs = result.split("＞");
    return strs[strs.length - 1];
  }

  get isSuccess(): boolean {
    return this.commandResult.includes("成功");
  }

  get isFailure(): boolean {
    return this.commandResult.includes("失敗");
  }

  get isActive(): boolean {
    return this.$store.state.activeAnimation;
  }

  get soundVolume(): number {
    return this.$store.state.settings.soundVolume;
  }
}
</script>

<style lang="scss" scoped>
.dice-area {
  position: absolute;
  top: 0;
  z-index: 200;
}

.result {
  display: inline-block;
  font-size: 1.5rem;
  min-width: 100px;
  border-radius: 5px;
  padding: 10px 5px;
  margin-left: 10px;
  text-align: center;
  border: solid 1px #e0e0e0;
  background-color: #fff;

  &.active {
    animation: showing 0.8s step-end;
  }

  &.success {
    border: solid 1px #81c784;
    background-color: #c8e6c9 !important;
  }

  &.failure {
    border: solid 1px #e57373;
    background-color: #ffcdd2 !important;
  }
}

@keyframes showing {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
