<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="container">
        <div>
          Click on the color!
          <h1 id="title">
            Red
          </h1>
          <hr />
          <ion-grid>
            <ion-row>
              <ion-col size="6" v-for="(button, index) in buttons" :key="index">
                <ColorButton :color="button.color" :text="button.text" />
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/vue";

import ColorButton from "../components/ColorButton.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Game",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    ColorButton
  },
  data() { return {
    buttons: [
      {text: "Hello", color: "blue"},
      {text: "Hello", color: "red"},
      {text: "Hello", color: "green"},
      {text: "Hello", color: "yellow"},
      {text: "Hello", color: "orange"},
      {text: "Hello", color: "purple"}
    ]
  }}
});
</script>

<style scoped lang="scss">
  @import "../style";

  .container > div {
    width: calc(100vw - 2rem);
    max-width: 32rem;
  }

  .text-gray {
    color: $lightgray;
  }

  #title {
    margin-top: 0;
    font-size: 3rem;
    font-weight: bolder;
  } 

  #container hr {
    border-bottom: solid $darkish 1px;
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: calc(100vw - 2rem);
    max-width: 64rem;
  }

  #container p {
    line-height: 1.5rem;

    margin: 0;
  }

  #container ion-icon {
    font-size: 5rem;
  }
</style>