<template>
    <div id="parent" :class="style">
        <div>
            <!-- <ion-icon id="icon" name="color-palette" /> -->
            <div id="menu" v-if="!gameOver">
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

            <div id="gameOver" v-else>
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

            
        </div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
    WithZeroes
} from "../utils";

export default defineComponent({
    name: "Menu",
    props: {
        gameOver: Boolean,
        score: Number
    },
    data() { return {
        style: ""
    }},
    computed: {
        scoreStr() {
            return WithZeroes.parse(this.score, 3);
        }
    },
    methods: {
        play() {
            this.style = "invisible";

            setTimeout(() => {
                this.$emit("play");
                this.style = "";
            }, 500);
        }
    }
});
</script>

<style scoped lang="scss">
  @import "../style";

  .centralized {
      display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
  }

  #parent {
        @extend .centralized;
        
        z-index: $z_menu;
        background: rgba(0, 0, 0, 0.5);
        width: 100vw;
        height: 100vw;

        &.invisible {
            opacity: 0 !important;
            transition: 0.5s;
        }

        #menu {
            @extend .centralized;

            letter-spacing: 0.1rem;
            font-weight: lighter;

            #title {
                letter-spacing: 0.25rem;
                margin-top: 0;
                font-size: 3rem;
                font-weight: normal;
            }
        }

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