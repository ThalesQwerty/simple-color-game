<template>
    <ion-row>
        <ion-col size="6" id="name" :style="bold">
            {{ row.name }}
        </ion-col>
        <ion-col size="6" id="score" :style="bold">
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
        row: Number,
        header: Boolean
    },
    components: {
        IonGrid,
        IonRow,
        IonCol
    },
    computed: {
        bold() {
            return this.header ? "font-weight: bold;" : "";
        }
    },
    methods: {

    }
});
</script>

<style lang="scss">
    @import "../../style";

    #score {
        text-align: right;
    }

    #name {
        text-align: left;
    }
</style>