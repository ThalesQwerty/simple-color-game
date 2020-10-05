<template>
    <div id="parent" :class="style">
        <div>
            <Menu v-if="isInMenu" @play="play" />
            <GameOver v-else-if="isGameOver" :score="score" @play="play" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Menu from "./Menu.vue";
import GameOver from "./GameOver.vue";

import {
    GameState
} from "../../data";

import {
    WithZeroes
} from "../../utils";

export default defineComponent({
    name: "Overlay",
    components: {
        Menu,
        GameOver
    },
    props: {
        state: Number,
        score: Number
    },
    computed: {
        isInMenu() {
            return this.state === GameState.MENU;
        },
        isInGame() {
            return !this.isInMenu;
        },
        isGameOver() {
            return this.state == GameState.GAME_OVER;
        }
    },
    data() { return {
        style: ""
    }},
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