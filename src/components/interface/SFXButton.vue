<template>
    <div id="root">
        <div class="button" id="btn-sfx" @click="toggle">
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
        <div class="button" id="btn-git" @click="github">
            <ion-icon
                name="logo-github"
            />
        </div>
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
        },
        github() {
            window.open("https://github.com/ThalesQwerty/simple-color-game");
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
        display: flex;
    }

    .button {
        cursor: pointer;
        pointer-events: all;
        margin-right: 1rem;
    }

    #btn-sfx {
        ion-icon {

            &.on {
                color: $light8;

                &:hover {
                    color: $lightC;
                }
            }

            &.off {
                color: $dark8;

                &:hover {
                    color: $darkC;
                }
            }
        }
    }

    #btn-git {
        ion-icon {
            color: $light8;

            &:hover {
                color: $lightC;
            }
        }
    }

</style>
