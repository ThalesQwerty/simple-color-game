<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="container">
        <div id="text">
          <h1 id="color" :style="color" :class="opacity" v-if="!countdown()">
            {{ fakeColor.text }}
          </h1>
          <h1 id="countdown" v-else>
            {{ seconds }}
          </h1>
        </div>
        <Spinner @spin="spin" :difficulty="difficulty" :frame="frameCounter" />
        <Hexagon id="hexagon" 
          :buttons="buttons"
          :side="side" 
          :thickness="50" 
          
          :rightColor="trueColor"
          :selectedColor="selectedColor"
          :state="state"
          :angle="angle"
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

import Spinner from "../components/Spinner.vue";
import Hexagon from "../components/Hexagon.vue";

import {
  Colors,
  GameState,
  Difficulty
} from "../data";

import {
  Random
} from "../utils";

import Timer from "../data/timers";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Game",
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    Hexagon,
    Spinner
  },
  data() { return {
    buttons: Colors,
    side: Math.min(window.innerWidth / 2 - 36, 250),

    trueColor: null,
    fakeColor: null,
    selectedColor: null,
    
    startTime: new Date().getTime(),
    seconds: 3,
    state: GameState.COUNTDOWN,
    lastState: GameState.COUNTDOWN,
    colorTimer: null,

    score: 0,
    lives: 3,

    level: 1,

    animation: null, 
    frameCounter: 0,
    angle: 0,
  }},
  computed: {
    color() {
      return "color: " + this.trueColor.css.var + ";";
    },
    opacity() {
      let style = "";

      style += this.state === GameState.COLOR ? 
        "" : 
        "invisible ";

      style += this.lastState === GameState.RIGHT_ANSWER ? 
        "right " :
        "wrong ";

      return style;
    },
    difficulty() {
      return Difficulty[this.level - 1];
    }
  },
  created() {
    window.addEventListener("resize", this.updateSide);
    this.animation = setInterval(() => this.update(), 16);
  },
  methods: {
    spin(angle: number) {
      this.angle = angle;
    },
    countdown() {
      if (this.state !== GameState.COUNTDOWN) return 0;

      const seconds = Math.ceil((Timer.COUNTDOWN - new Date().getTime() + this.startTime) / 1000);

      if (seconds <= 0) {
        this.randomColor();
      }
      else {
        setTimeout(() => this.countdown(), 1000);
      }

      this.seconds = seconds;
      return seconds;
    },
    update() {
      this.frameCounter++;
    },
    updateSide() {
      this.side = Math.min(window.innerWidth / 2 - 36, 250);
    },
    pickColor(color: object) {
      if (this.state === GameState.COLOR) {
        this.selectedColor = color;

        if (color["id"] === this.trueColor.id) {
          this.state = GameState.RIGHT_ANSWER;
        }
        else {
          this.state = GameState.WRONG_ANSWER;
        }
      }
    },
    prepareColor(timer: number) {
      this.colorTimer = setTimeout(this.randomColor, timer);
    },
    randomColor(sameAsText = false) {
      this.fakeColor = Random.pick(Colors);
      this.trueColor = sameAsText ? this.fakeColor : Random.pick(Colors);
      this.state = GameState.COLOR;

      this.colorTimer = setTimeout(this.timeout, this.difficulty.colors.timeout);
    },
    timeout() {
      this.state = GameState.WRONG_ANSWER;
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
    state(val: number, old: number) {
      this.lastState = old;
      switch (val) {
        case GameState.RIGHT_ANSWER:
          this.score ++;
          this.prepareColor(Timer.RIGHT_ANSWER);
          break;
        case GameState.WRONG_ANSWER:
          this.lives --;
          this.prepareColor(Timer.WRONG_ANSWER);
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
        // window.alert(this.lives + " lives remaining!");
      }
    },
    score(val, old) {
      if (val > old) {
        console.log("Score: " + this.score);
      }
    },
    colorTimer(val, old) {
      clearTimeout(old);
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

  #color.invisible {
    opacity: 0;
    transition: 0.25s;
  }

  #countdown {
    @extend #color;
  }

  #hexagon {
    position: absolute;
  }
</style>