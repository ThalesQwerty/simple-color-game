<template>
    <div id="root">
        <div>
            <ion-spinner name="crescent" color="light" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ScoreRow from "./ScoreRow.vue";

import {
    IonSpinner
} from "@ionic/vue"

import {
    WithZeroes
} from "../../utils";

export default defineComponent({
    name: "Highscores",
    components: {
        IonSpinner
    }
});
</script>

<style scoped lang="scss">
    @import "../../style";

    #root {
        width: 100%;
        height: 100%;

        & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            letter-spacing: 0.1rem;
            font-weight: lighter;

            width: 33vw !important;
            min-width: 32rem;
            max-width: calc(100vw - 1rem);
        }
    }

    ion-spinner {
        width: 6rem !important;
        height: 6rem !important;
    }

</style>
