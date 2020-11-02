<template>
    <div id="root">
        <div id="change-name">
            {{ title }}
           <ion-input id="input-name" color="warning" placeholder="Nickname" :value="newName" @input="newName = $event.target.value"></ion-input>
           <div id="buttons-name">
                <ion-button
                    size="small"
                    expand="block"

                    color="primary"
                    @click="submit"
                >
                    Submit
                </ion-button>
                <ion-button
                    size="small"
                    expand="block"

                    color="dark"
                    @click="cancel"

                    id="cancel-change"
                >
                    Cancel
                </ion-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
declare const process;
declare const require;

import { defineComponent } from "vue";

import ScoreRow from "./ScoreRow.vue";

import {
    IonSplitPane,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonTabs,
    IonTabButton,
    IonTabBar,
    IonIcon,
    IonItem,
    IonInput,
    IonLabel
} from "@ionic/vue"

const axios = require("axios");

export default defineComponent({
    name: "Highscores",
    components: {
        IonSplitPane,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        ScoreRow,
        IonTabs,
        IonTabButton,
        IonTabBar,
        IonIcon,
        IonItem,
        IonInput,
        IonLabel
    },
    props: {
        name: String,
        title: String
    },
    data() { return {
        newName: this.name,
    }},
    methods: {
        submit() {
            axios.post(
                (process.env.VUE_APP_API_URL || "") + "/user" + (localStorage.userId ? "/" + localStorage.userId : ""),
                { name: this.newName.trim() },
                { headers: {"Authorization": `Bearer ${localStorage.userKey}` } }
            )
                .then(response => {
                    const data = response.data;

                    console.log(data);

                    if (data.id) localStorage.userId = data.id;
                    if (data.key) localStorage.userKey = data.key;
                    if (data.name) localStorage.userName = data.name;

                    this.$emit("submit", name)
                })
                .catch(error => {
                    console.log(error);
                });
        },
        cancel() {
            this.$emit("cancel");
        }
    },
});
</script>

<style scoped lang="scss">
    @import "../../style";

    #root > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        letter-spacing: 0.1rem;
        font-weight: lighter;

        width: 33vw !important;
        min-width: 32rem;
        max-width: calc(100vw - 1rem);

        #title {
            width: 100%;
            letter-spacing: 0.25rem;
            margin-top: 0;
            font-size: 3rem;
            font-weight: normal;
        }

        #table {
            width: 100%;
        }
    }

    #input-name {
        background-color: rgba(255, 255, 255, 0.075);
        font-weight: bold;

        margin-top: 1rem;

        width: 100%;
    }

    #buttons-name {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 1rem;

        #cancel-change {
            margin-left: 2rem;
        }
    }

    hr {
        border-bottom: solid $darkF 1px;
        opacity: 0.25;
        margin-top: 1rem;
        margin-bottom: 1rem;
        width: 100%;
        max-width: 64rem;
    }

    .text-gray {
        color: $light3;
    }


    *::-webkit-scrollbar {
        width: 0.25rem;
        margin-left: -0.25rem;
    }

    *::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.00);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.00);
    }

    *::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.075);
    }
</style>
