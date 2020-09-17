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
        <Hexagon id="hexagon" 
          :buttons="buttons"
          :side="side" 
          :thickness="50" 
          
          :rightColor="trueColor"
          :selectedColor="selectedColor"
          :state="state"
          @pick="pickColor" 

          :angle="angle"
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

import {
  Colors,
  GameState
} from "../data";

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
    Hexagon
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
    angle: 0,

    animation: null, 
    currentSpeed: 0,
    desiredSpeed: 0,
    acceleration: 30,
    lastFrame: new Date().getTime(),
    speedTimeout: null
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
    }
  },
  created() {
    window.addEventListener("resize", this.updateSide);
    this.changeSpeed();
    this.animation = setInterval(() => this.update(), 16);
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
    changeSpeed() {
      const timer = Math.round(Math.random() * 15000 + 5000);
      let sign = Math.random() >= 0.33 ? Math.sign(this.desiredSpeed) : -Math.sign(this.desiredSpeed);
      if (this.desiredSpeed == 0) sign = Math.random() >= 0.5 ? 1 : -1;

      this.desiredSpeed = (Math.random() * 20 + 10) * sign;

      if (this.speedTimeout) clearInterval(this.speedTimeout);
      this.speedTimeout = setTimeout(() => this.changeSpeed(), timer);
    },
    update() {
      const deltaTime = (new Date().getTime() - this.lastFrame) / 1000;

      if (Math.abs(this.desiredSpeed - this.currentSpeed) <= this.acceleration * deltaTime) {
        this.currentSpeed = this.desiredSpeed;
      }
      else if (this.desiredSpeed > this.currentSpeed) {
        this.currentSpeed += this.acceleration * deltaTime;
      }
      else {
        this.currentSpeed -= this.acceleration * deltaTime;
      }

      this.angle += this.currentSpeed * deltaTime;
      this.lastFrame += 1000 * deltaTime;
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
      clearTimeout(this.colorTimer);
      this.colorTimer = setTimeout(this.randomColor, timer);
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