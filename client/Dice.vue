<template>
  <div
    :class="{active: isActive}"
    class="dice-container">
    <div
      :class="[diceClass, valueClass, {active: isActive}]"
      class="dice"
      @click="hide()"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    face: Number,
    value: Number
  }
})
export default class Dice extends Vue {
  get diceClass() {
    return "dice-" + this.$props.face;
  }
  get valueClass() {
    return "value-" + this.$props.value;
  }
  get isActive() {
    return this.$store.state.activeAnimation;
  }

  hide() {
    this.$emit("hide");
  }
}
</script>

<style lang="scss" scoped>
.dice-container {
  display: inline-block;
  z-index: 1000;
  &.active {
    animation: rightmove 0.8s linear;
  }
}

.dice {
  width: 100px;
  height: 100px;
  position: relative;
  z-index: 1000;
}

.dice-4 {
  background: url(assets/4_dice.png) no-repeat;
  &.active {
    animation: roll4 0.4s steps(4) 2, move_y 0.8s linear;
  }
}

@keyframes roll4 {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -400px 0;
  }
}

.dice-6 {
  background: url(assets/6_dice.png) no-repeat;
  &.active {
    animation: roll6 0.8s steps(6), move_y 0.8s linear;
  }
}

@keyframes roll6 {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -600px 0;
  }
}

.dice-8 {
  background: url(assets/8_dice.png) no-repeat;
  &.active {
    animation: roll8 0.8s steps(8), move_y 0.8s linear;
  }
}

@keyframes roll8 {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -800px 0;
  }
}

.dice-10 {
  background: url(assets/10_dice.png) no-repeat;
  &.active {
    animation: roll10 0.8s steps(10), move_y 0.8s linear;
  }
}

.dice-100 {
  background: url(assets/100_dice.png) no-repeat;
  &.active {
    animation: roll10 0.8s steps(10), move_y 0.8s linear;
  }
}

@keyframes roll10 {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -1000px 0;
  }
}

@for $i from 1 through 20 {
  .value-#{$i} {
    background-position-x: -100px * ($i - 1);
  }
}
.value-0 {
  background-position: -900px 0;
}

@keyframes rightmove {
  0% {
    transform: translateX(500px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes move_y {
  0% {
    transform: translateY(-16em);
    animation-timing-function: cubic-bezier(0.51, 0.01, 0.79, 0.02);
  }
  15% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(0.19, 1, 0.7, 1);
  }
  25% {
    transform: translateY(-12em);
    animation-timing-function: cubic-bezier(0.51, 0.01, 0.79, 0.02);
  }
  32.5% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(0.19, 1, 0.7, 1);
  }
  40% {
    transform: translateY(-8em);
    animation-timing-function: cubic-bezier(0.51, 0.01, 0.79, 0.02);
  }
  45% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(0.19, 1, 0.7, 1);
  }
  50% {
    transform: translateY(-5em);
    animation-timing-function: cubic-bezier(0.51, 0.01, 0.79, 0.02);
  }
  56% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(0.19, 1, 0.7, 1);
  }
  60% {
    transform: translateY(-5em);
    animation-timing-function: cubic-bezier(0.51, 0.01, 0.79, 0.02);
  }
  64% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(0.19, 1, 0.7, 1);
  }
  66% {
    transform: translateY(-5em);
    animation-timing-function: cubic-bezier(0.51, 0.01, 0.79, 0.02);
  }
  70% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(0.19, 1, 0.7, 1);
  }
  80% {
    transform: translateY(-2em);
    animation-timing-function: cubic-bezier(0.51, 0.01, 0.79, 0.02);
  }
  85% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(0.19, 1, 0.7, 1);
  }
  90% {
    transform: translateY(-0.5em);
    animation-timing-function: cubic-bezier(0.51, 0.01, 0.79, 0.02);
  }
  95%,
  100% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(0.19, 1, 0.7, 1);
  }
}
</style>
