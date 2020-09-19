<template>
  <div id="parent">
    <slot />
  </div>
</template>

<script lang="ts">

import {
  Random
} from "../utils";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Spinner",
  props: {
    difficulty: Object,
    frame: Number
  },
  data() { return {
    currentSpeed: 0,
    desiredSpeed: 0,
    speedTimeout: null,
    lastFrame: new Date().getTime(),

    angle: 0,
  }},
  computed: {
    rotation() {
      return this.difficulty.rotation;
    },
    deltaTime() {
      return (new Date().getTime() - this.lastFrame) / 1000;
    }
  },
  created () {
    this.changeSpeed();
  },
  methods: {
    changeSpeed() {
      const timer = Random.number(this.rotation.minTime, this.rotation.maxTime);
      let sign = Random.pick(
        Random.option(-Math.sign(this.desiredSpeed), this.rotation.turnChance),
        Random.option(Math.sign(this.desiredSpeed), 1 - this.rotation.turnChance),
      );

      if (this.desiredSpeed == 0) sign = Random.pick(1, -1);

      this.desiredSpeed = Random.number(this.rotation.minSpeed, this.rotation.maxSpeed) * sign;

      if (this.speedTimeout) clearInterval(this.speedTimeout);
      this.speedTimeout = setTimeout(this.changeSpeed, timer);
    },
    spin() {
      //console.log(this.desiredSpeed, this.currentSpeed, this.angle);
      if (Math.abs(this.desiredSpeed - this.currentSpeed) <= this.rotation.acceleration * this.deltaTime) {
        this.currentSpeed = this.desiredSpeed;
      }
      else if (this.desiredSpeed > this.currentSpeed) {
        this.currentSpeed += this.rotation.acceleration * this.deltaTime;
      }
      else {
        this.currentSpeed -= this.rotation.acceleration * this.deltaTime;
      }

      this.angle += this.currentSpeed * this.deltaTime;
      this.lastFrame = new Date().getTime();

      this.$emit("spin", this.angle);
    },
  },
  watch: {
    frame() {
      this.spin();
    }
  }
});

</script>

<style scoped lang="scss">
  @import "../style";
  
  #parent {
      position: relative;
      pointer-events: none;
  }
</style>