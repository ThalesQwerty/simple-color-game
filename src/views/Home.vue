<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div>
          <ion-icon name="color-palette" />
          <p>
            Welcome to the
          </p>
          <h1 id="title">
            Simple Color Game
          </h1>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
  },
});
</script>

<style scoped lang="scss">
  @import "../style";

  #title {
    margin-top: 0;
  }

  #container {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    
    background: $darkest;
    color: $lightest;
  
    text-align: center;
  }

  #container p {
    line-height: 1.5rem;

    color: $lightgray;

    margin: 0;
  }

  #container ion-icon {
    font-size: 2rem;
  }

  #container a {
    text-decoration: none;
  }
</style>