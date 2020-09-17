<template>
    <div :style="style + rotate" id="parent">
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
import ButtonState from "../data/button_state";
import GameState from "../data/game_state";

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
  computed: {
    style() {
      return "width: " + (2 * this.side).toString() + "px; height: " + (Math.sqrt(3) * this.side).toString() + "px; transform: translate(25%) rotate(" + this.angle + "deg); transform-origin: 25% 50%;";
    },
  },
  methods: {
    propagatePick(color: object) {
      this.$emit("pick", color);
    },
    verifyState(color) {
      if (this.state === GameState.POST_COLOR) {
        if (color.id === this.selectedColor.id && this.selectedColor.id === this.rightColor.id) return ButtonState.RIGHT;
        if (this.selectedColor.id !== this.rightColor.id) return ButtonState.WRONG;
      } 
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