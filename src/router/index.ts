import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import {
  Game
 } from '../views';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Game',
    component: Game
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
