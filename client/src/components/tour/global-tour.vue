<template>
  <v-container class="d-flex flex-column align-center">
    <v-row dense>
      <v-col cols="12" class="d-flex flex-row align-center">
        <p class="text-h4 font-weight-medium text-left mt-3">Foreign Tours</p>
        <v-spacer></v-spacer>
        <v-btn rounded elevation="0" color="info">
          see more
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-card elevation="0" max-width="1200">
          <v-row>
            <v-col v-for="i in 3" :key="i" cols="12" md="4">
              <v-card max-width="374" elevation="1">
                <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                <v-card-title>Cafe Badilico</v-card-title>

                <v-card-text>
                  <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <span class="grey--text font-weight-bold">
                    <v-icon>mdi-beer</v-icon>1 set menu Trưa/ Tối
                  </span>
                  <v-spacer></v-spacer>
                  <v-divider vertical></v-divider>
                  <v-btn color="deep-purple lighten-2" icon>
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class GlobalTour extends Vue {}
</script>

<style scoped>
</style>
