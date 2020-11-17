import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import {
  Game
 } from '../views';

import { GameState } from "../data";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Game',
    component: Game,
    meta: {
        title: "Simple Color Game"
    },
    props: { initialState: GameState.MENU },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
