<template>
    <div id="parent">
        <div id="score">
            <span>
                {{scoreStr}}
            </span>
            <div id="background">
                <svg width="256" height="64">
                    <polygon points="0,0 32,64 224,64 256,0" />
                </svg>
            </div>
        </div>
        <div id="lives">
            <ion-icon :name="heart(index)" class="heart" v-for="index in maxLives" :key="index" />
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

import {
    WithZeroes
} from "../../utils";

export default defineComponent({
    name: "Score",
    props: {
       score: Number,
       lives: Number,
       maxLives: Number
    },
    computed: {
        scoreStr() {
            return WithZeroes.parse(this.score, 3);
        }
    },
    methods: {
        heart(i: number) {
            return "heart" + (this.lives >= i ? "" : "-outline");
        }
    }
});
</script>

<style scoped lang="scss">
  @import "../../style";

#parent {
    position: absolute;

    top: 0;
    left: 0;
    width: 100vw;
    margin-top: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    pointer-events: none;

    z-index: $z_score;
}

#score {
    display: flex;
    justify-content: center;
    align-items: center;

    color: $lightF;
    font-weight: lighter;
    font-size: 2rem;
    letter-spacing: 0.25rem;

    span {
        z-index: $z_score + 1;
    }
}

#background {
    position: absolute;

    svg {
        fill: $dark0;
        fill-opacity: 0.75;
    }
}

#lives {
    margin-top: 1.25rem;
    
    display: flex;
    justify-content: center;
    align-items: center;

    .heart {
        color: $lightF;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
    }
}


</style>