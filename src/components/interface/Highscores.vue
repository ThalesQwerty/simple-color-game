<template>
    <div id="highscores">
        <h1 id="title">
            HIGHSCORES
        </h1>
        <hr />
        <ion-grid id="table">
            <ion-row>
                <ion-col size="0" size-md="3" />
                <ion-col>
                    <ScoreRow header
                        :row="{name: 'NAME', score: 'SCORE'}"
                    />
                    <ScoreRow 
                        v-for="(row, index) in table"
                        :key="index"
                        :row="row"
                    />
                </ion-col>
                <ion-col size="0" size-md="3" />
            </ion-row>
        </ion-grid>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ScoreRow from "./ScoreRow.vue";

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
    props: {
        table: Array
    },
    components: {
        IonGrid,
        IonRow,
        IonCol,
        ScoreRow
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

        #table {
            width: 100%;
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