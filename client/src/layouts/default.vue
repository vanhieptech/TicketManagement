<template>
  <v-app>
    <v-app-bar app fixed extension-height="50" mobile-breakpoint="500" color="primary" dark>
      <v-spacer></v-spacer>
      <v-avatar @click="$router.push('/')">
        <img src="/image/logo.png" alt="logo" />
      </v-avatar>
      <v-toolbar-title
        class="font-weight-bold text-uppercase pl-3"
        @click="$router.push('/')"
      >Travel for fun</v-toolbar-title>
      <v-spacer></v-spacer>
      <account></account>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-tabs background-color="secondary" centered slider-color="yellow">
          <v-tab class="font-weight-bold text-uppercase px-7" @click="$router.push('/')">
            <v-icon>mdi-airplane-takeoff</v-icon>&nbsp; Flight ticket
          </v-tab>
          <v-tab class="font-weight-bold text-uppercase px-7" @click="$router.push('/tour')">
            <v-icon>mdi-wallet-travel</v-icon>&nbsp; Tour
          </v-tab>
          <v-tab
            class="font-weight-bold text-uppercase px-7"
            @click="$router.push('/free-and-easy')"
          >
            <v-icon>mdi-freebsd</v-icon>&nbsp; Free and easy
          </v-tab>
          <v-tab class="font-weight-bold text-uppercase px-7" @click="$router.push('/promotions')">
            <v-icon>mdi-brightness-percent</v-icon>&nbsp; Promotions
          </v-tab>
          <v-tab class="font-weight-bold text-uppercase px-7" @click="$router.push('/about')">
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
import Account from "@/components/account.vue";
@Component({
  components: {
    Account,
  },
})
export default class Layout extends Vue {}
</script>
