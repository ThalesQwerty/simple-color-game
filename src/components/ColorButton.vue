<template>
    <div id="button" :style="rotate + zIndex" :class="shade">
        <div id="text-parent">
            <span id="text" :style="turnText">
                {{ color.text }}
            </span>
        </div>
        <svg :width="side" :height="thickness" id="hexagon-svg" >
            <polygon :points="trapezoid" id="hexagon" @click="click"/>
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    ButtonState,
    Trigonometry
} from "../data";

export default defineComponent({
    name: "ColorButton",
    props: {
        color: Object,

        side: Number,
        thickness: Number,
        offset: Number,
        state: Number,
        angle: Number,
        mouseAngle: Number
    },
    data() { return {
        order: this.color.id - 1,
        lastState: 0,
    }},
    computed: {
        center() {
            return Trigonometry.SIN_60 * this.side;
        },
        zIndex() {
            const angle = this.normalizeAngle(this.mouseAngle);
            const isHover = angle > this.totalAngle - 30 && angle < this.totalAngle + 30;
            return "z-index: " + (isHover ? "10" : "5") + "; ";
        },
        trapezoid() {
            const points = [
                [0, 0],
                [this.thickness * Trigonometry.CTG_60, this.thickness],
                [this.side - this.thickness * Trigonometry.CTG_60, this.thickness],
                [this.side, 0],
                // [this.side / 2, this.center]
            ];

            let str = "";

            for (const p of points) {
                str += p[0].toString() + "," + p[1].toString() + " ";
            }

            return str;
        },
        totalAngle() {
            return this.normalizeAngle(60 * this.order + this.angle);
        },
        turnText() {
            return "transform: rotate(" + (-this.totalAngle).toString() + "deg);" //this.totalAngle > 90 || this.totalAngle <= -90 ? "upside-down" : "";
        },
        rotate() {
            const angle = 60 * this.order;
            return "transform: rotate(" + angle.toString() + "deg) translateY(-" + (this.offset || 0).toString() + "px); transform-origin: 50% " + this.center.toString() + "px;";
        },
        dimensions() {
            return "width: " + this.side + "px; height: " + this.thickness + ";";
        },
        shade() {
            let style = this.order % 2 ? "dark " : "light ";
            switch (this.state) {
                case ButtonState.WRONG:
                    style += "wrong ";
                    break;
                case ButtonState.RIGHT:
                    style = "right fill-" + this.color.css.attr + " ";
                    break;
            }
            switch (this.lastState) {
                case ButtonState.WRONG:
                    style += "was-wrong ";
                    break;
                case ButtonState.RIGHT:
                    style += "was-right ";
                    break;
            }
            return style;
        }
    },
    methods: {
        click() {
            this.$emit("pick", this.color);
        },
        normalizeAngle(angle: number) {
            let normalized = angle % 360;
            if (normalized < 0) normalized += 360;
            if (normalized > 180) normalized -= 360;
            return normalized;
        }
    },
    watch: {
        state(val, old) {
            this.lastState = old;
        }
    }
});

</script>

<style scoped lang="scss">
    @import "../style";

    #text-parent {
        position: absolute; 
        width: 100%; 
        height: 100%;

        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        padding-bottom: 3rem;

        z-index: 4;

        pointer-events: none;

        text-transform: uppercase;
        font-size: 1.25rem;
        letter-spacing: 0.125rem;
        font-weight: lighter;
        transition: color 0.1s;
    }

    #text {
        transform-origin: center center;
        pointer-events: none;
    }

    #button {
        position: absolute;
        
        #hexagon-svg {
            pointer-events: visibleFill;
            cursor: pointer;

            &:hover {
                #hexagon {
                    transition: fill $hover_color_in;
                }
            }
        }

        #hexagon {
            transition: fill $hover_color_out;
            pointer-events: visibleFill;
        }

        &.dark {
            #hexagon-svg {
                &:hover {
                    #hexagon {
                        fill: $dark6;
                    }
                }

                #hexagon {
                    fill: $dark3;               
                }
            }

            #text {
                color: $light7;
            }

            &.wrong {
                #hexagon {
                    fill: $dark0 !important;
                }
                #text {
                    color: $dark9;
                }
            }
        }

        &.light {
            #hexagon-svg {
                &:hover {
                    #hexagon {
                        fill: $dark6;
                    }
                }

                #hexagon {
                    fill: $dark4;                 
                }
            }

            #text {
                color: $light8;
            }

            &.wrong {
                #hexagon {
                    fill: $dark1 !important;
                }
                #text {
                    color: $darkA;
                }
            }
        }

        &.wrong {
            #hexagon {
                pointer-events: none;
                transition: fill $wrong_color_in;
            }
        }

        &.right {
            #hexagon {
                // pointer-events: none;
                transition: fill $right_color_in;
            }
            #text {
                color: white;
            }
        }

        &.was-wrong {
            #hexagon {
                transition: fill $wrong_color_out;
            }
        }

        &.was-right {
            #hexagon {
                transition: fill $right_color_out;
            }
        }
    }

</style>