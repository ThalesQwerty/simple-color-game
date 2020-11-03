<template>
    <div id="root" @click="toggle">
        <ion-icon
            name="volume-high"
            class="on"
            v-if="active"
        />
        <ion-icon
            name="volume-mute"
            class="off"
            v-else
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
    IonIcon
} from "@ionic/vue"


export default defineComponent({
    name: "SFX",
    components: {
        IonIcon
    },
    props: {
        active: Boolean
    },
    methods: {
        toggle() {
            this.$emit("toggle");
        }
    }
});
</script>

<style scoped lang="scss">
    @import "../../style";

    #root {
        position: absolute;
        top: 1rem;
        left: 1rem;
        z-index: $z_menu_buttons;
        font-size: 2rem;
        cursor: pointer;
        pointer-events: all;

        ion-icon {

            &.on {
                color: $light8;
            }

            &.off {
                color: $dark8;
            }

            // &.off {
            //     opacity: 0.5;
            // }
        }

    }

</style>
