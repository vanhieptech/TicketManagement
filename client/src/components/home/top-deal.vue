<template>
  <v-container>
    <p class="headline font-weight-medium text-center mt-3">Top deals today</p>
    <v-sheet class="mx-auto" elevation="0" max-width="1200">
      <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
        <v-slide-item v-for="n in 4" :key="n" v-slot:default="{ active, toggle }">
          <v-card :color="active ? 'primary' : 'grey lighten-1'" class="ma-4" @click="toggle">
            <v-img height="250" width="250" src="https://picsum.photos/350/165?random"></v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class TopDeal extends Vue {
  model: any = "";
}
</script>

<style scoped>
</style>
