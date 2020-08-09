<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card class="mt-5" elevation="0">
        <v-card-title class="text-h4 font-weight-medium d-flex justify-center">Request password</v-card-title>
        <v-card-subtitle
          class="d-flex justify-center text-body-1 mt-1 text-center"
        >Please enter your Email or phone number you have registered for an account to retrieve your password.</v-card-subtitle>
        <v-card-text class="mt-5">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4"
                min-width="200"
                elevation="0"
                block
                @click="validate"
              >Request Password</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="12" class="d-flex flex-row align-center">
              <v-divider></v-divider>&nbsp;Or&nbsp;
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" class="d-flex justify-space-around">
              <v-btn x-large rounded elevation="0" color="#4267B2" class="white--text">
                <v-icon left>mdi-facebook</v-icon>Sign up with Facebook
              </v-btn>
              <v-btn x-large rounded outlined color="#FF6D00">
                <v-icon left>mdi-google</v-icon>Sign up with Google
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    show2: true,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match",
    },
  }),

  methods: {
    validate() {
      (this.$refs.form as Vue & { validate: () => boolean }).validate();
    },
    reset() {
      (this.$refs.form as Vue & { reset: () => boolean }).reset();
    },
    resetValidation() {
      (this.$refs.form as Vue & {
        resetValidation: () => boolean;
      }).resetValidation();
    },
  },
})
export default class RequestPassword extends Vue {}
</script>

<style scoped>
@media (min-width: 1264px) {
  .container {
    max-width: 760px;
  }
}
</style>
