<template>
  <v-container class="d-flex flex-column align-center">
    <p class="headline font-weight-medium text-center mt-3">Popular accommodation and destinations</p>
    <v-card elevation="0" max-width="1200">
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-img height="250" src="https://picsum.photos/350/165?random"></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-img height="250" src="https://picsum.photos/350/165?random"></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img height="250" src="https://picsum.photos/350/165?random"></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img height="250" src="https://picsum.photos/350/165?random"></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img height="250" src="https://picsum.photos/350/165?random"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class PopularRecommend extends Vue {
  model: any = "";
}
</script>

<style scoped>
</style>
