<template>
    <div id="parent">
        <ColorButton 
            v-for="(color, index) in buttons" 
            :side="250"
            :thickness="50"
            :offset="0"
            :color="color"
            :key="index"
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
    buttons: Object
  }
});
</script>

<style scoped lang="scss">
  @import "../style";

  #parent {
      position: relative;
      transform: translate(25%, -50%);
  }
</style>