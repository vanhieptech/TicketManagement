<template>
  <v-row dense>
    <v-col cols="12" sm="6" md="8">
      <v-row dense>
        <v-col cols="12" md="12">
          <p class="font-weight-bold mb-0">Booking info</p>
          <p
            class="font-weight-light text-caption"
          >Fares are not guaranteed until payment is made in full and Gotadi confirms your booking. Aircraft subject to change.</p>
          <v-expansion-panels accordion>
            <v-expansion-panel v-for="(item,i) in 2" :key="i">
              <v-expansion-panel-header class="py-2">
                <v-row dense>
                  <v-col cols="12" sm="6" md="6">
                    <p class="text-body-1 mb-2 d-flex align-center">
                      <v-icon class="mdi-rotate-45" color="primary">mdi-airplane</v-icon>Hồ Chí Minh (SGN)
                      <v-icon color="primary">mdi-arrow-right-bold</v-icon>Hà Nội (HAN)
                    </p>
                    <p class="text-body-1 text--secondary d-flex justify-space-between mb-0">
                      <span>23:10 - 01:20</span>
                      <span>06/08/2020 - 06/08/2020</span>
                    </p>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="d-flex flex-column align-end">
                    <p class="text-body-1 text-right text--secondary mb-2">VN6028 | Airbus 302</p>
                    <p class="text-body-1 text-right text--secondary mb-0">Economy</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content color="#E9F1F7">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <p class="text-body-1 mb-2 d-flex align-center">
                      <v-icon class="mdi-rotate-45" color="primary">mdi-airplane</v-icon>Hồ Chí Minh (SGN)
                      <v-icon color="primary">mdi-arrow-right-bold</v-icon>Hà Nội (HAN)
                    </p>
                    <p class="text-body-1 text--secondary d-flex justify-space-between mb-0">
                      <span>23:10 - 01:20</span>
                      <span>06/08/2020 - 06/08/2020</span>
                    </p>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="d-flex flex-column align-end">
                    <p class="text-body-1 text-right text--secondary mb-2">VN6028 | Airbus 302</p>
                    <p class="text-body-1 text-right text--secondary mb-0">Economy</p>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="12" md="12">
          <div class="d-flex justify-space-between">
            <p class="font-weight-bold mb-0 d-inline-block">Contact info</p>

            <p
              class="font-weight-light text-caption d-inline-block"
            >Please enter unsigned Vietnamese or English.</p>
          </div>
          <v-card class="mb-12">
            <v-card-title class="text-body-1 grey lighten-2 py-2">1st contact person*</v-card-title>
            <v-card-text class="pt-2">
              <v-row dense>
                <v-col cols="12" md="6">
                  <p class="text-body-1 font-weight-medium mb-1">Last name</p>
                  <p
                    class="text-body-1 text--black font-weight-medium text-uppercase"
                    style="color:black;"
                  >Hiep</p>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="text-body-1 font-weight-medium mb-1">First name</p>
                  <p
                    class="text-body-1 text--black font-weight-medium text-uppercase"
                    style="color:black;"
                  >Le Van</p>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <p class="text-body-1 font-weight-medium mb-1">Zip code</p>
                  <p
                    class="text-body-1 text--black font-weight-medium text-uppercase"
                    style="color:black;"
                  >700000</p>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <p class="text-body-1 font-weight-medium mb-1">Phone</p>
                  <p
                    class="text-body-1 text--black font-weight-medium text-uppercase"
                    style="color:black;"
                  >0976666666</p>
                </v-col>

                <v-col cols="12" sm="6" md="5">
                  <p class="text-body-1 font-weight-medium mb-1">Email</p>
                  <p
                    class="text-body-1 text--black font-weight-medium text-uppercase"
                    style="color:black;"
                  >admin@gmail.com</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="12">
          <div class="d-flex justify-space-between">
            <p class="font-weight-bold mb-0 d-inline-block">Passenger info</p>

            <p
              class="font-weight-light text-caption d-inline-block"
            >Please enter unsigned Vietnamese or English.</p>
          </div>
          <v-card class="mb-12">
            <v-card-text class="text-body-1 font-weight-bold grey lighten-2 py-2">Male.</v-card-text>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="6">
                  <p class="text-body-1 font-weight-medium mb-1">Last name</p>
                  <p
                    class="text-body-1 text--black font-weight-medium text-uppercase"
                    style="color:black;"
                  >Hiep</p>
                </v-col>

                <v-col cols="12" md="6">
                  <p class="text-body-1 font-weight-medium mb-1">First name</p>
                  <p
                    class="text-body-1 text--black font-weight-medium text-uppercase"
                    style="color:black;"
                  >Le Van</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="12" class="d-flex justify-end">
          <v-btn elevation="0" min-width="200" @click="$emit('step-receiver', false)">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            elevation="0"
            min-width="150"
            @click="$emit('step-receiver', step)"
          >Payment</v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-row class="pt-5 px-3">
        <v-col cols="12" md="12">
          <v-card class="mb-12">
            <v-card-text class="py-1">
              <v-row dense>
                <v-col cols="6">
                  <p class="text-body-1 font-weight-black mb-0">Base fare</p>
                  <span class="caption">1 Adult</span>
                </v-col>
                <v-col cols="6">
                  <p class="text-body-1 font-weight-medium text-right">600,000 &nbsp; VND</p>
                </v-col>
                <v-col cols="6">
                  <p class="text-body-1 font-weight-black mb-0">Tax & fees</p>
                </v-col>
                <v-col cols="6">
                  <p class="text-body-1 font-weight-medium text-right mb-0">862,000 &nbsp; VND</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-text class="py-1">
              <v-row dense>
                <v-col cols="6">
                  <p class="text-body-1 font-weight-black mb-0">Total provisional</p>
                </v-col>
                <v-col cols="6">
                  <p class="text-body-1 font-weight-medium text-right">600,000 &nbsp; VND</p>
                </v-col>
                <v-col cols="8">
                  <p class="text-body-1 font-weight-black mb-0">Service fee</p>
                  <span class="caption">Fee reduced by membership level</span>
                </v-col>
                <v-col cols="4">
                  <p class="text-body-1 font-weight-medium text-right">0 &nbsp; VND</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-title class="d-flex flex-row justify-space-between">
              <p class="font-weight-bold mb-0">Total</p>
              <p class="font-weight-bold text-right mb-0">600,000 &nbsp; VND</p>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class PaymentStep extends Vue {
  @Prop({ type: Object, required: true })
  step;
}
</script>

<style lang="scss" scoped>
</style>
