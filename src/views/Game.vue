<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="container">
        <div id="text">
          <h1 id="color" :style="color">
            {{ fakeColor.text }}
          </h1>
        </div>
        <Hexagon id="hexagon" :buttons="buttons" :side="side" :thickness="50" @pick="pickColor" />
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

import Hexagon from "../components/Hexagon.vue";

import Colors from "../data/colors";

import { defineComponent } from "vue";


export default defineComponent({
  name: "Game",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    Hexagon
  },
  data() { return {
    buttons: Colors,
    side: Math.min(window.visualViewport.width / 2 - 36, 250),
    trueColor: Colors.GREEN,
    fakeColor: Colors.PURPLE
  }},
  computed: {
    color() {
      return "color: " + this.trueColor.css.var + ";";
    }
  },
  created() {
    window.addEventListener("resize", this.updateSide);
  },
  methods: {
    updateSide() {
      this.side = Math.min(window.visualViewport.width / 2 - 36, 250);
    },
    pickColor(id: number) {
      if (id === this.trueColor.id) window.alert("OK");
      else window.alert("Nope!");
      this.randomColor(true);
    },
    randomColor(sameAsText = false) {
      function select(): object {
        const index: string = Object.keys(Colors)[ 
          Math.floor(Math.random() * Object.keys(Colors).length) 
        ];
        return Colors[index];
      }

      this.fakeColor = select();
      this.trueColor = sameAsText ? this.fakeColor : select();
    }
  }
});
</script>

<style scoped lang="scss">
  @import "../style";

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .text-gray {
    color: $lightgray;
  }

  #color {
    margin-top: 0;
    font-size: 3rem;
    font-weight: bolder;
  } 

  #hexagon {
    position: absolute;
  }
</style>