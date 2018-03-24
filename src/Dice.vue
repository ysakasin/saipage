<template>
  <div class="dice-container" v-bind:class="{active: isActive}">
    <div class="dice" v-bind:class="[diceClass, valueClass, {active: isActive}]" @click="hide()"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    face: Number,
    value: Number,
  }
})
export default class Dice extends Vue {
  get diceClass() {
    return "dice-" + this.$props.face
  }
  get valueClass() {
    return "value-" + this.$props.value
  }
  get isActive() {
    return !this.$store.state.readyAnimation
  }

  hide() {
    console.log("hide")
    this.$emit('hide')
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

.dice-100 {
  background: url(assets/100_dice.png) no-repeat;
  &.active {
    animation: roll10 0.8s steps(10), move_y 0.8s linear;
  }
}

.value-1 {
  background-position: 0 0;
}
.value-2 {
  background-position: -100px 0;
}
.value-3 {
  background-position: -200px 0;
}
.value-4 {
  background-position: -300px 0;
}
.value-5 {
  background-position: -400px 0;
}
.value-6 {
  background-position: -500px 0;
}
.value-7 {
  background-position: -600px 0;
}
.value-8 {
  background-position: -700px 0;
}
.value-9 {
  background-position: -800px 0;
}
.value-10, .value-0 {
  background-position: -900px 0;
}

@keyframes roll10 {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -1000px 0;
  }
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
    animation-timing-function: cubic-bezier(.51,.01,.79,.02);
  }
  15% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(.19,1,.7,1);
  }
  25% {
    transform: translateY(-12em);
    animation-timing-function: cubic-bezier(.51,.01,.79,.02);
  }
  32.5% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(.19,1,.7,1);
  }
  40% {
    transform: translateY(-8em);
    animation-timing-function: cubic-bezier(.51,.01,.79,.02);
  }
  45% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(.19,1,.7,1);
  }
  50% {
    transform: translateY(-5em);
    animation-timing-function: cubic-bezier(.51,.01,.79,.02);
  }
  56% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(.19,1,.7,1);
  }
  60% {
    transform: translateY(-5em);
    animation-timing-function: cubic-bezier(.51,.01,.79,.02);
  }
  64% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(.19,1,.7,1);
  }
  66% {
    transform: translateY(-5em);
    animation-timing-function: cubic-bezier(.51,.01,.79,.02);
  }
  70% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(.19,1,.7,1);
  }
  80% {
    transform: translateY(-2em);
    animation-timing-function: cubic-bezier(.51,.01,.79,.02);
  }
  85% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(.19,1,.7,1);
  }
  90% {
    transform: translateY(-0.5em);
    animation-timing-function: cubic-bezier(.51,.01,.79,.02);
  }
  95%, 100% {
    transform: translateY(0em);
    animation-timing-function: cubic-bezier(.19,1,.7,1);
  }
}
</style>


