<template>
  <v-menu transition="slide-y-transition" open-on-hover bottom left offset-y max-width="300">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="info" dark elevation="0" v-bind="attrs" v-on="on">Account</v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-content
          class="caption text-center"
        >Sign in or register to take advantage of member-only offers!</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-btn color="primary" block elevation="0" @click="$router.push('/auth/login')">Log in</v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn
          outlined
          block
          color="primary"
          elevation="0"
          @click="$router.push('/auth/signup')"
        >Sign up</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Account extends Vue {}
</script>

<style scoped>
</style>
