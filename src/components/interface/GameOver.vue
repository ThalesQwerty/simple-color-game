<template>
    <div id="gameOver">
        <h3>
            GAME OVER!
        </h3>
        <h1 id="score">
            {{ scoreStr }}
        </h1>
        <div id="play">
            <ion-button size="large" expand="block" @click="play">
                Try again
            </ion-button>
        </div>
        <p id="hint">
            <small class="text-gray">
                Always remember:<br>
                Click on the <strong>COLOR</strong>, not on the word.
            </small>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
    WithZeroes
} from "../../utils";

export default defineComponent({
    name: "GameOver",
    props: {
        score: Number
    },
    computed: {
        scoreStr() {
            return WithZeroes.parse(this.score, 3);
        }
    },
    methods: {
        play() {
            this.$emit("play");
        }
    }
});
</script>

<style scoped lang="scss">
    @import "../../style";

    #gameOver {
        letter-spacing: 0.25rem;
        font-weight: lighter;
        
        #score {
            font-size: 4rem;
            margin-top: -0.5rem;
            letter-spacing: 0.5rem;
            font-weight: lighter;
        }

        #hint {
            letter-spacing: 0.125rem;
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