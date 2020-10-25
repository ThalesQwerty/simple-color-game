<template>
    <ion-row id="root" :class="className">
        <ion-col size="1" id="name" :style="bold">
            {{ row.rank }}
        </ion-col>
        <ion-col size="6" id="name" :style="bold">
            {{ row.name }}
        </ion-col>
        <ion-col size="5" id="score" :style="bold">
            {{ row.score }}
        </ion-col>
    </ion-row>
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
    name: "ScoreRow",
    props: {
        row: Object,
        header: Boolean,
    },
    components: {
        IonGrid,
        IonRow,
        IonCol
    },
    computed: {
        bold() {
            return this.header ? "font-weight: bold;" : "";
        },
        className() {
            return (this.header ? "header" : "row") + (this.row.me ? " me" : "");
        }
    },
    methods: {

    }
});
</script>

<style scoped lang="scss">
    @import "../../style";

    #root {
        padding: 0.125rem;
        transition: background-color 0.25s;
        user-select: none;

        &.row:hover {
            background-color: rgba(255, 255, 255, 0.1);
            transition: background-color 0.1s;
        }

        &.me {
            color: var(--ion-color-warning);
            font-weight: bold;
        }
    }

    #score {
        text-align: right;
    }

    #name {
        text-align: left;
    }
</style>
