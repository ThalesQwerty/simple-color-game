<template>
    <div id="menu">
        <p>
            Welcome to the
        </p>
        <h1 id="title">
            SIMPLE COLOR GAME
        </h1>
        <hr />
        <p>
            The game is very simple:<br>You must click on the color that appears before the time runs out.
        </p>
        <p id="hint" class="text-gray">
            Always remember: Click on the <strong>COLOR</strong>, not on the word.
        </p>
        <div id="play">
            <ion-button size="large" expand="block" @click="play">
                Start game
            </ion-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
    WithZeroes
} from "../../utils";

export default defineComponent({
    name: "Menu",
    methods: {
        play() {
            this.$emit("play");
        }
    }
});
</script>

<style lang="scss">
    @import "../../style";

    #menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        letter-spacing: 0.1rem;
        font-weight: lighter;

        #title {
            letter-spacing: 0.25rem;
            margin-top: 0;
            font-size: 3rem;
            font-weight: normal;
        }
    }

    #play {
        margin-top: 2rem;
        width: 100%;
        max-width: 16rem;
    }

    hr {
        border-bottom: solid $darkF 1px;
        margin-top: 1rem;
        margin-bottom: 2rem;
        width: calc(100vw - 2rem);
        max-width: 64rem;
    }

    .text-gray {
        color: $light3;
    }

    #icon {
        font-size: 5rem;
    }
</style>