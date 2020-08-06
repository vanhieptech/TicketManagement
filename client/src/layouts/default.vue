<template>
  <v-app>
    <v-app-bar app fixed extension-height="50" mobile-breakpoint="500" color="primary" dark>
      <!--
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
      </template>

      -->
      <v-avatar>
        <img src="/image/logo.jpg" alt="logo" />
      </v-avatar>
      <v-toolbar-title class="font-weight-bold text-uppercase pl-3">Tralvel for fun</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs background-color="secondary" centered slider-color="yellow">
          <v-tab class="font-weight-bold text-uppercase">
            <v-icon>mdi-airplane-takeoff</v-icon>&nbsp; Flight ticket
          </v-tab>
          <v-tab class="font-weight-bold text-uppercase">
            <v-icon>mdi-wallet-travel</v-icon>&nbsp; Tour
          </v-tab>
          <v-tab class="font-weight-bold text-uppercase">
            <v-icon>mdi-freebsd</v-icon>&nbsp; Free and easy
          </v-tab>
          <v-tab class="font-weight-bold text-uppercase">
            <v-icon>mdi-brightness-percent</v-icon>&nbsp; Promotions
          </v-tab>
          <v-tab class="font-weight-bold text-uppercase">
            <v-icon>mdi-information-outline</v-icon>&nbsp; About
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Layout extends Vue {}
</script>
