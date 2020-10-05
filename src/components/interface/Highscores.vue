<template>
    <div id="highscores">
        <h1 id="title">
            HIGHSCORES
        </h1>
        <hr />
        <ion-grid>
            <ion-row>
                Hello World!
            </ion-row>
        </ion-grid>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
    IonGrid,
    IonRow,
    IonCol
} from "@ionic/vue"

import {
    WithZeroes
} from "../../utils";

export default defineComponent({
    name: "Highscores",
    components: {
        IonGrid,
        IonRow,
        IonCol
    },
    methods: {

    }
});
</script>

<style lang="scss">
    @import "../../style";

    #highscores {
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
</style>