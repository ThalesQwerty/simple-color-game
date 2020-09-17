<template>
    <div :style="dimensions" id="parent">
        <ColorButton 
            v-for="(color, index) in buttons" 
            :side="side"
            :thickness="thickness"
            :offset="0"
            :color="color"
            :key="index"
            :state="verifyState(color)"
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
    state: Number
  },
  computed: {
    dimensions() {
      return "width: " + (2 * this.side).toString() + "px; height: " + (Math.sqrt(3) * this.side).toString() + "px; transform: translate(25%);";
    }
  },
  methods: {
    propagatePick(color: object) {
      this.$emit("pick", color);
    },
    verifyState(color) {
      if (this.state === GameState.POST_COLOR && this.rightColor.id === color.id) return ButtonState.RIGHT;
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