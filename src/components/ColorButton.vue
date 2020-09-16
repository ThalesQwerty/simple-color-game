<template>
    <div id="button">
        <ion-button :color="color" size="large" expand="block">
            {{ text }}
        </ion-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ColorButton",
    props: {
        text: String,
        color: String
    },
});

</script>

<style scoped lang="scss">

    #button {
        width: 100%;
    }

</style>