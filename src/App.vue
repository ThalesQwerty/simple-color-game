<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

import { addIcons } from "ionicons";
import { 
  colorPalette,
  heart,
  heartOutline,
  createOutline,
} from "ionicons/icons";

addIcons({
  "color-palette": colorPalette,
  "heart": heart,
  "heart-outline": heartOutline,
  "create-outline": createOutline,
});

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>