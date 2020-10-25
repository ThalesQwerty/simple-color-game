<template>
    <div id="gameOver" v-if="!insertName">
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
        <div id="highscores">
            <ion-button size="small" color="danger" @click="highscores">
                Highscores
            </ion-button>
        </div>
        <p id="hint">
            <small class="text-gray">
                Always remember:<br>
                Click on the <strong>COLOR</strong>, not on the word.
            </small>
        </p>
    </div>
    <InsertName v-else
        title="Type your nickname"
        @submit="submitScore"
        @cancel="() => { insertName = false }"
    />
</template>

<script lang="ts">
declare const process;
declare const require;

import { defineComponent } from "vue";

import InsertName from "./InsertName.vue";

import {
    WithZeroes
} from "../../utils";

const axios = require("axios");

export default defineComponent({
    name: "GameOver",
    components: {
        InsertName
    },
    props: {
        score: Number
    },
    data() { return {
        insertName: false,
    }},
    computed: {
        scoreStr() {
            return WithZeroes.parse(this.score, 3);
        }
    },
    methods: {
        play() {
            this.$emit("play");
        },
        highscores() {
            if (!localStorage.userKey) this.insertName = true;
            else this.submitScore();
        },
        submitScore() {
            axios.post(
                process.env.VUE_APP_API_URL + "/scores/" + localStorage.userId,
                { score: this.score }, 
                { headers: {"Authorization": `Bearer ${localStorage.userKey}` } }
            )
                .then(response => {
                    const data = response.data;

                    this.$emit("highscores");
                })
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

    #highscores {
        margin-top: 1rem;
        width: 100%;
        max-width: 16rem;
        display: flex;
        justify-content: center;
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
