<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card class="mt-5" elevation="0">
        <v-card-title class="text-h4 font-weight-medium d-flex justify-center">Register member</v-card-title>
        <v-card-subtitle
          class="d-flex justify-center text-body-1 mt-1 text-center"
        >Register account to book tickets with many great deals and get it done faster.</v-card-subtitle>
        <v-card-text class="mt-15">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="lastName"
                :rules="nameRules"
                label="Last name"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="firstName"
                :rules="nameRules"
                label="Last name"
                outlined
                required
                dense
              ></v-text-field>
            </v-col>
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
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                class="input-group--focused"
                outlined
                dense
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="confirmPassword"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min, rules.emailMatch(confirmPassword, password)]"
                :type="showConfirmPassword ? 'text' : 'password'"
                name="input-10-2"
                label="Confirm password"
                hint="At least 8 characters"
                class="input-group--focused"
                outlined
                dense
                @click:append="showConfirmPassword = !showConfirmPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" class="d-flex flex-row align-center">
              <p class="caption mb-0">Do you already have an account?</p>&nbsp;
              <nuxt-link to="/auth/login">Sign in now!</nuxt-link>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                :disabled="!valid"
                color="primary"
                x-large
                class="mr-4"
                min-width="200"
                elevation="0"
                block
                @click="validate"
              >Register</v-btn>
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
  data: () => ({}),

  methods: {},
})
export default class SignUp extends Vue {
  [x: string]: any;
  valid: Boolean = true;

  nameRules: any = [
    (v) => !!v || "Name is required",
    (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
  ];

  emailRules: any = [
    (v) => !!v || "E-mail is required",
    (v) =>
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        v
      ) || "E-mail must be valid",
  ];

  rules: any = {
    required: (value) => !!value || "Required.",
    min: (v) => v.length >= 8 || "Min 8 characters",
    emailMatch: (v, password) =>
      v === password || "The email and password you entered don't match",
  };

  userModel: any = {
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    permission: "ROLE_USER",
  };
  lastName: String = "";
  firstName: String = "";
  email: String = "";
  password: String = "";
  confirmPassword: String = "";
  showPassword: Boolean = false;
  showConfirmPassword: Boolean = false;

  mounted() {}

  validate() {
    const isValid = (this.$refs.form as Vue & {
      validate: () => boolean;
    }).validate();
    if (!isValid) return;
    this.userModel.name = `${this.firstName} ${this.lastName}`;
    this.userModel.email = this.email;
    this.userModel.password = this.password;

    // TODO: call api sign up
    console.log(`data`, this.userModel);
    this.$apiClient
      .signUp(this.userModel)
      .then((res) => {
        console.log(res);
        if (res && res.code === 200) {
          this.$swal(
            "Great!",
            "You have been successfully registered!",
            "success"
          );
          this.$router.push("/auth/login");
        }
      })
      .catch((e) => console.error(e));
  }
}
</script>

<style scoped>
@media (min-width: 1264px) {
  .container {
    max-width: 760px;
  }
}
</style>
