<template>
  <v-container v-if="!$auth.loggedIn" class="d-flex justify-center mt-5">
    <v-card color="#EEEEEE" max-width="1100" elevation="0">
      <v-row>
        <v-col cols="2">
          <v-img src="/image/member-gtd.svg" class="mt-n15"></v-img>
        </v-col>
        <v-col cols="6">
          <p class="headline font-weight-bold my-2">Only for TFF members!</p>
          <p>Manage transactions, save your frequent flyer list, notify reminders, enjoy exclusive privileges only when joining us.</p>
        </v-col>

        <v-col cols="4" class="d-flex justify-center align-center">
          <v-btn
            class="mx-2"
            color="primary"
            width="150"
            elevation="0"
            @click="$router.push('/auth/login')"
          >Log in</v-btn>

          <v-btn
            class="mx-2"
            outlined
            width="150"
            color="primary"
            elevation="0"
            @click="$router.push('/auth/signup')"
          >Sign up</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class BannerLogin extends Vue {}
</script>

<style scoped>
</style>
