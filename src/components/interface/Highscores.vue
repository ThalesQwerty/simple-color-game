<template>
    <div id="root">
        <Loading v-if="loading" />
        <div id="highscores" v-else-if="highscores">
            <ion-grid>
                <ion-row>
                    <h1 id="title">
                        HIGHSCORES
                    </h1>
                <hr />
                </ion-row>
                <ion-row id="table">
                    <!-- <ion-col size="0" size-md="3"/> -->
                    <ion-col size="12">
                        <ion-row>
                            <div id="header">
                                <ScoreRow header
                                    :row="{rank:'#', name: 'NAME', score: 'SCORE'}"
                                />
                            </div>
                            <div id="rows">
                                <ScoreRow
                                    v-for="(row, index) in currentList[selected]"
                                    :key="index"
                                    :row="row"
                                />
                            </div>
                        </ion-row>
                        <ion-row id="footer">
                            <div id="buttons">
                                <div id="left-buttons">
                                    <ion-button
                                        v-for="(button, index) in table.buttons"
                                        :key="index"

                                        size="small"
                                        expand="block"

                                        :color="index === selected ? 'success' : 'dark' "
                                        @click="() => {selected = index}"
                                    >
                                        {{ button.name }}
                                    </ion-button>
                                </div>
                                <div id="right-buttons" v-if="user">
                                    <ion-button
                                        fill="clear"
                                        size="small"

                                        color="danger"

                                        @click="() => {highscores = false}"
                                    >
                                        <div id="user-info">
                                            <span id="name">
                                                {{ user.name }}
                                            </span>
                                            <br>
                                            <span id="score">
                                                {{ user.score }}
                                            </span>
                                        </div>
                                        <ion-icon id="edit-button" name="create-outline" />
                                    </ion-button>
                                </div>
                            </div>
                            <div id="menu">
                                <ion-button size="large" expand="block" color="primary" @click="menu">
                                    Main menu
                                </ion-button>
                            </div>
                        </ion-row>
                    </ion-col>
                    <!-- <ion-col size="0" size-md="3"/> -->
                </ion-row>
            </ion-grid>
        </div>

        <InsertName v-else
            :name="user.name"
            title="Type your new username"

            @submit="reload"
            @cancel="() => {highscores = true}"
        />
    </div>
</template>

<script lang="ts">
declare const process;
declare const require;

import { defineComponent } from "vue";

import ScoreRow from "./ScoreRow.vue";
import InsertName from "./InsertName.vue";
import Loading from "./Loading.vue";

import {
    IonSplitPane,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonItem,
    IonInput,
    IonLabel
} from "@ionic/vue"

import {
    WithZeroes
} from "../../utils";

const axios = require('axios');

export default defineComponent({
    name: "Highscores",
    components: {
        IonSplitPane,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        ScoreRow,
        IonIcon,
        IonItem,
        IonInput,
        IonLabel,
        InsertName,
        Loading
    },
    props: {
        table: Object
    },
    data() { return {
        selected: 0,
        loading: true,
        highscores: true,
        currentList: []
    }},
    computed: {
        user() {
            for (const row of this.currentList[this.selected]) {
                if (row.me) {
                    return {
                        name: row.name,
                        score: WithZeroes.parse(row.score, 3)
                    }
                }
            }
            return null;
        }
    },
    methods: {
        menu() {
            this.$emit("menu");
        },
        reload() {
            this.loading = true;
            this.highscores = true;

            const timestamps = this.table.buttons.map((button) => button.timestamp);
            let loaded = 0;

            console.log("TIMESTAMPS", timestamps)

            this.currentList = [];

            for (const i in timestamps) {

                axios.get(process.env.VUE_APP_API_URL + "/scores", {"timestamp": timestamps[i]})
                    .then(response => {
                        const data = response.data;
                        const list = [];

                        for (let i = 0; i < data.length; i++) {
                            const row = data[i];
                            list.push({
                                me: row.user.id == localStorage.userId,
                                rank: i + 1,
                                name: row.user.name,
                                score: row.score
                            })
                        }

                        this.currentList[i] = list;
                        loaded ++;

                        if (loaded >= timestamps.length) this.loading = false;
                    })
                    .catch(error => {
                        console.error(error);
                    })

            }
        }
    },
    mounted() {
        this.reload();
    }
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

    #highscores {
        ion-grid {
            width: 100% !important;
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

    #header {
        width: 100%;
    }

    #rows {
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100%;
        height: 33vh;
        min-height: 300px;
    }

    #footer {
        display: flex;
        justify-content: center;
    }

    #menu {
        margin-top: 2rem;
    }

    #buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 1rem;

        width: 100%;

        #left-buttons {
            display: flex;
            justify-content: flex-start;

        }

        #right-buttons {
            display: flex;
            justify-content: flex-end;

            ion-button {
                text-transform: none;
            }
        }
    }

    #user-info {
        text-align: right;
        line-height: 0.875;
        padding-right: 0.5rem;

        #name {
            font-size: 0.875rem;

        }

        #score {
            font-size: 0.625rem
        }
    }

    #edit-button {
        font-size: 1.5rem
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
