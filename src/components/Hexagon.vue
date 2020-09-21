<template>
    <div id="parent" :style="style + zIndex">
        <svg v-if="triangles" :width="width" :height="height">
            <polygon :points="hexagon(i)" :class="shade(i) + fill" v-for="i in [1,2,3,4,5,6]" :key="i"/>
        </svg>
        <svg v-else :width="width" :height="height">
            <polygon :points="hexagon(0)" :class="shade(0) + fill"/>
        </svg>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
    name: "Hexagon",
    props: {
        minSide: Number,
        maxSide: Number,
        fraction: Number,
        angle: Number,
        zindex: Number,
        fill: String,
        triangles: Boolean
    },
    data() { return {
        currentSpeed: 0,
        desiredSpeed: 0,
        speedTimeout: null,
        lastFrame: new Date().getTime(),
    }},
    computed: {
        zIndex() {
            return "z-index: " + this.zindex + ";";
        },
        side() {
            return this.minSide + this.fraction * (this.maxSide - this.minSide);
        },
        width() {
            return 2 * this.side;
        },
        height() {
            return Math.sqrt(3) * this.side;
        },
        style() {
            return "width: " + (2 * this.side).toString() + "px; height: " + (Math.sqrt(3) * this.side).toString() + "px; transform: rotate(" + this.angle + "deg); transform-origin: 50% 50%;";
        },
        color() {
            return this.fill ? "fill: " + this.fill + " !important;" : "";
        }
    },
    methods: {
        shade(i: number) {
            return "hexagon " + (i % 2 ? "dark " : "light ");
        },
        hexagon(i: number) {
            const hexagonPoints = [
                [
                    0, 
                    this.height / 2
                ],
                [
                    this.width / 4, 
                    0
                ],
                [
                    3 * this.width / 4, 
                    0
                ],
                [
                    this.width, 
                    this.height / 2
                ],
                [
                    3 * this.width / 4, 
                    this.height
                ],
                [
                    this.width / 4, 
                    this.height
                ],
            ];

            const center = [
                this.width / 2,
                this.height / 2
            ];

            let points = hexagonPoints;

            if (i > 0) points = [hexagonPoints[(i - 1) % 6], hexagonPoints[i % 6], center];

            let str = "";

            for (const p of points) {
                str += p[0].toString() + "," + p[1].toString() + " ";
            }

            return str;
        }
  }
});
</script>

<style scoped lang="scss">
  @import "../style";

  .hexagon.very-dark {
    fill: $dark1 !important;
  }

  .hexagon.dark {
    fill: $dark3;
   }

  .hexagon.light {
    fill: $dark4;
   }

  #parent {
    position: absolute;
    pointer-events: none;
  }
</style>