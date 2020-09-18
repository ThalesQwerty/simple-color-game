<template>
    <div id="parent" :style="style">
        <ColorButton 
            v-for="(color, index) in buttons" 
            :side="side"
            :thickness="thickness"
            :offset="0"
            :color="color"
            :key="index"
            :state="verifyState(color)"
            :angle="angle"
            @pick="propagatePick"
        />
    </div>
</template>

<script lang="ts">

import ColorButton from "./ColorButton.vue";

import {
  ButtonState,
  GameState,
  Difficulty
} from "../data";

import {
  Random
} from "../utils";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Game",
  components: {
    ColorButton
  },
  props: {
    buttons: Object,
    side: Number,
    thickness: Number,
    selectedColor: Object,
    rightColor: Object,
    state: Number,
    angle: Number
  },
  data() { return {
    currentSpeed: 0,
    desiredSpeed: 0,
    speedTimeout: null,
    lastFrame: new Date().getTime(),
  }},
  computed: {
    style() {
      return "width: " + (2 * this.side).toString() + "px; height: " + (Math.sqrt(3) * this.side).toString() + "px; transform: translate(25%) rotate(" + this.angle + "deg); transform-origin: 25% 50%;";
    }
  },
  methods: {
    propagatePick(color: object) {
      this.$emit("pick", color);
    },
    verifyState(color) {
      if (this.state === GameState.RIGHT_ANSWER && color.id === this.selectedColor.id) return ButtonState.RIGHT;
      if (this.state === GameState.WRONG_ANSWER) return ButtonState.WRONG;
      return ButtonState.DEFAULT;
    }
  }
});
</script>

<style scoped lang="scss">
  @import "../style";

  #parent {
    position: relative;
  }
</style>