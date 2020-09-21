<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div :class="container">
        <div id="text">
          <h1 id="color" :style="color" :class="opacity" v-if="!countdown()">
            {{ fakeColor.text }}
          </h1>
          <h1 id="countdown" v-else>
            {{ seconds }}
          </h1>
        </div>
        <Hexagon :zindex="2" :minSide="side() + 16" :maxSide="minSide" :angle="angle" :fraction="hexagonFraction" fill="very-dark" />
        <!-- <Hexagon :zindex="1" :minSide="side()" :maxSide()="maxSide()" :angle="angle" :fraction="hexagonFraction" triangles/> -->
        <Spinner @spin="spin" :difficulty="difficulty()" :frame="frameCounter" />
        <ColorWheel id="wheel"
          :buttons="buttons"
          :side="wheelSide()" 
          :thickness="wheelThickness()" 
          
          :rightColor="trueColor"
          :selectedColor="selectedColor"
          :state="state"
          :angle="angle"
          :mouseAngle="mouseAngle"
          :frame="frameCounter"
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
import ColorWheel from "../components/ColorWheel.vue";

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
    ColorWheel,
    Spinner,
    Hexagon
  },
  data() { return {
    buttons: Colors,
    rawSide: Math.min(window.innerWidth / 2 - 36, 250),
    minSide: 128,

    sideDistortion: 0,
    sideDistortionFactor: 10,
    spinSpeedIntegral: 0,

    trueColor: null,
    fakeColor: null,
    selectedColor: null,
    timeColor: null,
    
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
    lastFrame: new Date().getTime(),
    deltaTime: 0,
    angle: 0,

    timeRemaining: 0,
    timeRemainingFraction: 1,
    hexagonFraction: 1,

    mouseAngle: 0
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
    container() {
      return "container" + (this.state === GameState.WRONG_ANSWER ? " wrong" : "");
    }
  },
  created() {
    window.addEventListener("resize", this.updateSide);
    window.addEventListener("mousemove", this.updateMouse)
    this.animation = setInterval(() => this.update(), 16);
  },
  methods: {
    updateMouse(e: MouseEvent) {
      const angle = 90 + Math.atan2(e.pageY - window.innerHeight / 2, e.pageX - window.innerWidth / 2) * 180 / Math.PI;
      this.mouseAngle = angle;
    },
    wheelThickness() {
      const delta = this.side() - 24; // + (this.side() - this.minSide) * this.hexagonFraction;
      return this.wheelSide() * Math.sqrt(3) / 2 - delta;
    },
    wheelSide() {
      return this.maxSide(); //this.side() + this.hexagonFraction * (this.maxSide() - this.side());
    },
    maxSide() {
      return Math.max(window.innerWidth, window.innerHeight) / Math.sqrt(3) * 2;
    },
    side() {
      return this.rawSide + this.sideDistortion;
    },
    difficulty() {
      return Difficulty[this.level - 1];
    },
    update() {
      this.frameCounter++;

      let smoothness = 0.8;
      
      if (this.state !== GameState.COLOR) {
        
        this.timeRemainingFraction = 1;

      } else {
        smoothness = 0;

        let t = this.difficulty().colors.timeout - new Date().getTime() + this.timeColor;
        if (t < 0) t = 0;

        let t0 = t / this.difficulty().colors.timeout;
        if (t0 > 1) t0 = 1;
        if (t0 < 0) t0 = 0;

        this.timeRemainign = t;
        this.timeRemainingFraction = t0;
      }

      this.hexagonFraction = this.hexagonFraction + (this.timeRemainingFraction - this.hexagonFraction) * (1 - smoothness);
    },
    spin(angle: number, currentSpeed: number) {
      this.spinSpeedIntegral += currentSpeed;
      this.sideDistortion = Math.sin(this.spinSpeedIntegral / 500) * this.sideDistortionFactor;
      this.angle = angle;
    },
    countdown() {
      if (this.state !== GameState.COUNTDOWN) return 0;

      const seconds = Math.ceil((Timer.COUNTDOWN - new Date().getTime() + this.startTime) / 1000);

      if (seconds <= 0) {
        this.randomColor(Random.pick(
          Random.option(true, this.difficulty().colors.sameAsTextChance),
          Random.option(false, 1 - this.difficulty().colors.sameAsTextChance)
        ));
      }
      else {
        setTimeout(() => this.countdown(), 1000);
      }

      this.seconds = seconds;
      return seconds;
    },
    updateSide() {
      this.rawSide = Math.min(window.innerWidth / 2 - 36, 250);
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
      this.colorTimer = setTimeout(() => this.randomColor(Random.pick(
          Random.option(true, this.difficulty().colors.sameAsTextChance),
          Random.option(false, 1 - this.difficulty().colors.sameAsTextChance)
        )), 
      timer);
    },
    randomColor(sameAsText = false) {
      this.fakeColor = Random.pick(Colors);

      if (sameAsText) this.trueColor = this.fakeColor;
      else do {
        this.trueColor = Random.pick(Colors);
      } while (this.trueColor.id === this.fakeColor.id)

      this.state = GameState.COLOR;
      this.timeColor = new Date().getTime();
      this.colorTimer = setTimeout(this.timeout, this.difficulty().colors.timeout);
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
    frameCounter() {
      this.deltaTime = (new Date().getTime() - this.lastFrame) / 1000;
      this.lastFrame += 1000 * this.deltaTime;
    },
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
    score(val) {
      let i = 0;
      for (const dif of Difficulty) {
        i++;
        if (val >= dif.score) this.level = i;
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
    background: $dark5;
    transition: background $wrong_color_out;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  .container.wrong {
    background: $dark3;
  }

  #text {
    z-index: 10;
  }

  #color {
    margin-top: 0;
    font-size: 2.25rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
  } 

  #color.invisible {
    opacity: 0;
    transition: 0.25s;
  }

  #countdown {
    @extend #color;
  }

  #wheel {
    position: absolute;
    z-index: 5;
  }
</style>