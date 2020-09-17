<template>
    <div :style="dimensions" id="parent">
        <ColorButton 
            v-for="(color, index) in buttons" 
            :side="side"
            :thickness="thickness"
            :offset="0"
            :color="color"
            :key="index"
            @pick="propagatePick"
        />
    </div>
</template>

<script lang="ts">

import ColorButton from "./ColorButton.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Game",
  components: {
    ColorButton
  },
  props: {
    buttons: Object,
    side: Number,
    thickness: Number
  },
  computed: {
    dimensions() {
      return "width: " + (2 * this.side).toString() + "px; height: " + (Math.sqrt(3) * this.side).toString() + "px; transform: translate(25%);";
    }
  },
  methods: {
    propagatePick(id: number) {
      this.$emit("pick", id);
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