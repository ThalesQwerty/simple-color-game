<template>
    <div id="parent" :class="style">
        <div>
            <Menu v-if="showMenu" @play="play" @highscores="highscores" />
            <GameOver v-else-if="showGameOver" :score="score" @play="play" />
            <Highscores v-else-if="showHighscores" :table="table" @menu="menu" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Menu from "./Menu.vue";
import GameOver from "./GameOver.vue";
import Highscores from "./Highscores.vue";

import {
    GameState
} from "../../data";

import {
    WithZeroes,
    ComputedState
} from "../../utils";

const { isInMenu, isInHighscores, isInGame, isGameOver } = ComputedState;

export default defineComponent({
    name: "Overlay",
    components: {
        Menu,
        GameOver,
        Highscores
    },
    props: {
        state: Number,
        score: Number
    },
    computed: {
        showMenu() {
            return isInMenu(this.state);
        },
        showGameOver() {
            return isGameOver(this.state);
        },
        showHighscores() {
            return isInHighscores(this.state);
        }
    },
    data() { return {
        style: "",
        table: {
            "me": {
                name: "Thales",
                score: 12
            },
            "buttons": ["All time", "This week"],
            "lists": [
                [
                    {name: "First", score: 143},
                    {name: "Second", score: 122},
                    {name: "Third", score: 110},
                    {name: "Forth", score: 102},
                    {name: "Fifth", score: 97},
                    {name: "Sixth", score: 85},
                    {name: "First", score: 143},
                    {name: "Second", score: 122},
                    {name: "Third", score: 110},
                    {name: "Forth", score: 102},
                    {name: "Fifth", score: 97},
                    {name: "Sixth", score: 85},
                    {name: "First", score: 143, me: true},
                    {name: "Second", score: 122},
                    {name: "Third", score: 110},
                    {name: "Forth", score: 102},
                    {name: "Fifth", score: 97},
                    {name: "Sixth", score: 85},
                    {name: "First", score: 143},
                    {name: "Second", score: 122},
                    {name: "Third", score: 110},
                    {name: "Forth", score: 102},
                    {name: "Fifth", score: 97},
                    {name: "Sixth", score: 85},
                ],
                [
                    {name: "First", score: 143},
                    {name: "Second", score: 122},
                    {name: "Third", score: 110}
                ]
            ]
        }
    }},
    methods: {
        play() {
            this.style = "invisible";

            setTimeout(() => {
                this.$emit("play");
                this.style = "";
            }, 500);
        },
        menu() {
            this.$emit("set-state", GameState.MENU);
        },
        highscores() {
            this.$emit("set-state", GameState.HIGHSCORES);
        }
    }
});
</script>

<style scoped lang="scss">
    @import "../../style";

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
    }

</style>