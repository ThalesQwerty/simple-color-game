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
  heartOutline
} from "ionicons/icons";

addIcons({
  "color-palette": colorPalette,
  "heart": heart,
  "heart-outline": heartOutline
});

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>