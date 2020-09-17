<template>
    <div id="button" :style="rotate">
        <div id="text" :class="turnText">
            {{ color.text }}
        </div>
        <svg :width="side" :height="thickness" id="hexagon-svg" @click="click">
            <polygon :points="trapezoid" id="hexagon" :class="shade" :style="bgColor"/>
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonState from "../data/button_state";

export default defineComponent({
    name: "ColorButton",
    props: {
        color: Object,

        side: Number,
        thickness: Number,
        offset: Number,
        state: Number
    },
    data() { return {
        center: Math.sqrt(3) / 2 * this.side,
        order: this.color.id - 1
    }},
    computed: {
        trapezoid() {
            const points = [
                [0, 0],
                // [this.thickness / 2, this.thickness],
                // [this.side - this.thickness / 2, this.thickness],
                [this.side, 0],
                [this.side / 2, this.center]
            ];

            let str = "";

            for (const p of points) {
                str += p[0].toString() + "," + p[1].toString() + " ";
            }

            return str;
        },
        turnText() {
            return this.order < 2 || this.order == 5 ? "" : "upside-down";
        },
        rotate() {
            console.log(this.side);
            const angle = 60 * this.order;
            return "transform: rotate(" + angle.toString() + "deg) translateY(-" + (this.offset || 0).toString() + "px); transform-origin: 50% " + this.center.toString() + "px;";
        },
        dimensions() {
            return "width: " + this.side + "px; height: " + this.thickness + ";";
        },
        shade() {
            return this.order % 2 ? "dark " : "light ";
        },
        bgColor() {
            let style = "";
            switch (this.state) {
                case ButtonState.WRONG:
                    style = "fill: black !important;";
                    break;
                case ButtonState.RIGHT:
                    style = "fill: " + this.color.css.var + " !important;";
                    break;
            }
            return style;
        }
    },
    methods: {
        click() {
            this.$emit("pick", this.color);
        },
    }
});

</script>

<style scoped lang="scss">
    @import "../style";

    #text {
        position: absolute; 
        width: 100%; 
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        pointer-events: none;
        text-transform: uppercase;
        font-weight: bolder;
    }

    #text.upside-down {
        transform: rotate(180deg);
        transform-origin: center center;
    }

    #hexagon {
        cursor: pointer;
        transition: 0.1s;
    }
    
    #hexagon.dark {
        fill: $darkish;

        &:hover {
            fill: $gray !important;
        }
    }

    #hexagon.light {
        fill: $darkgray;

        &:hover {
            fill: $gray !important;
        }
    }

    #button {
        position: absolute;
    }

</style>