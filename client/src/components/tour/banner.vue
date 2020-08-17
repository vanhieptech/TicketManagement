<template>
  <v-card elevation="0">
    <v-img src="https://picsum.photos/350/165?random" max-height="400">
      <v-row align="center" justify="center" class="lightbox white--text pa-2 fill-height">
        <v-col cols="12" class="d-flex justify-center">
          <div class="text-h3">Discover new lands</div>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Banner extends Vue {}
</script>

<style scoped>
</style>
