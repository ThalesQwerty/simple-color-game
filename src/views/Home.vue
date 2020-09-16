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
          <hr />
          <p>
            The game is very simple:<br>You must click on the color that appears before the timer runs out.
          </p>
          <p class="text-gray">
            <strong>REMEMBER:</strong> Click on the color, not on the word.
          </p>
        </div>
        <div id="play">
            <ion-button size="large" expand="block">
              Start game
            </ion-button>
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

  .text-gray {
    color: $lightgray;
  }

  #title {
    margin-top: 0;
    font-size: 3rem;
    font-weight: bolder;
  }

  #container {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    background: $darkest;
    color: $lightest;
  
    text-align: center;
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

  #play {
    margin-top: 2rem;
    width: 100%;
    max-width: 16rem;
  }
</style>