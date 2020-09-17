<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="container">
        <div id="text">
          <h1 id="color" :style="color" v-if="!countdown()">
            {{ fakeColor.text }}
          </h1>
          <h1 id="countdown" v-else>
            {{ seconds }}
          </h1>
        </div>
        <Hexagon id="hexagon" 
          :buttons="buttons"
          :side="side" 
          :thickness="50" 
          
          :rightColor="trueColor"
          :selectedColor="selectedColor"
          :state="state"
          @pick="pickColor" 
          />
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
import GameState from "../data/game_state";

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
    fakeColor: Colors.PURPLE,
    selectedColor: 0,
    
    startTime: new Date().getTime(),
    seconds: 3,
    state: GameState.COUNTDOWN,
    colorTimer: null,

    score: 0,
    lives: 3
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
    countdown() {
      if (this.state !== GameState.COUNTDOWN) return 0;

      const seconds = 3 - Math.floor((new Date().getTime() - this.startTime) / 1000);

      if (seconds <= 0) {
        this.randomColor();
      }
      else {
        setTimeout(() => this.countdown(), 1000);
      }

      this.seconds = seconds;
      return seconds;
    },
    updateSide() {
      this.side = Math.min(window.visualViewport.width / 2 - 36, 250);
    },
    pickColor(color: object) {
      // if (id === this.trueColor.id) window.alert("OK");
      // else window.alert("Nope!");

      if (color["id"] === this.trueColor.id) {
        this.score ++;
      }
      else {
        this.lives --;
      }

      this.selectedColor = color;
      this.state = GameState.POST_COLOR;
    },
    prepareColor() {
      clearTimeout(this.colorTimer);
      this.colorTimer = setTimeout(this.randomColor, 1000);
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
      this.state = GameState.COLOR;

      clearTimeout(this.colorTimer);
      this.colorTimer = setTimeout(this.timeout, 2000);
    },
    timeout() {
      this.state = GameState.POST_COLOR;
      this.lives --;
    },
    reset() {
      this.startTime = new Date().getTime();
      this.seconds = 3;
      this.state = GameState.COUNTDOWN;
      this.lives = 3;
      this.score = 0;
      clearTimeout(this.colorTimer);
    }
  },
  watch: {
    state(val: number) {
      switch (val) {
        case GameState.PRE_COLOR:
        case GameState.POST_COLOR:
          this.prepareColor();
          break;
        case GameState.GAME_OVER:
          window.alert("GAME OVER!\n\nYour score: " + this.score);
          this.reset();
          break;
      }
    },
    lives(val, old) {
      if (val <= 0) {
        this.state = GameState.GAME_OVER;
      }
      else if (val < old) {
        window.alert(this.lives + " lives remaining!");
      }
    },
    score(val, old) {
      if (val > old) {
        console.log("Score: " + this.score);
      }
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

  #countdown {
    @extend #color;
  }

  #hexagon {
    position: absolute;
  }
</style>