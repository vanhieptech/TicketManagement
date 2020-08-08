<template>
  <v-row dense>
    <v-col cols="12" sm="6" md="8">
      <v-row dense>
        <v-col cols="12" md="12" class="mb-7">
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
          <v-card class="mb-6">
            <v-card-text class="primary--text pb-1">
              <v-icon left color="primary">mdi-ticket-percent</v-icon>
              <span>Do you have a discount code?</span>
            </v-card-text>
            <v-card-actions class="pb-4">
              <v-text-field
                label="Enter voucher code..."
                class="px-2 mr-3"
                outlined
                rounded
                dense
                hide-details
              ></v-text-field>
              <v-btn color="primary" elevation="0" min-width="140">Apply</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-radio-group v-model="paymentMethod" class="mt-0" :mandatory="false">
            <v-expansion-panels accordion>
              <v-expansion-panel v-for="(payment,i) in paymentList" :key="i">
                <v-expansion-panel-header v-slot="{ open }" hide-actions style="height:80px;">
                  <v-radio v-model="payment.value" :value="open ? payment.value:''">
                    <template v-slot:label>
                      <img class="mx-3" :src="`/image/${payment.image}`" width="50" alt="atm" />
                      <span :class=" open ? 'primary--text':''">{{payment.name}}</span>
                    </template>
                  </v-radio>
                </v-expansion-panel-header>
                <v-expansion-panel-content color="#EEEEEE" class="pt-4">
                  <v-container>
                    <v-row>
                      <v-col cols="8">
                        <v-row dense>
                          <v-col cols="12" sm="6" md="12">
                            <v-text-field v-model="payment.content.name" label="Tên in trên thẻ"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="12">
                            <v-text-field v-model="payment.content.numberCard" label="Số thẻ"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="payment.content.expired"
                              label="Ngày hết hạn (MM/YY)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="payment.content.cvv" label="CVV"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="4">
                        <v-row>
                          <v-col cols="12">
                            <img src="/image/the-quoc-te.svg" alt />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-radio-group>
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

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class PaymentStep extends Vue {
  @Prop({ type: Object, required: true })
  step;

  paymentMethod: any = "momo";

  paymentList: any = [
    {
      image: "visa.jpg",
      name: "Payment by International Card Visa, Master Card, JCB.",
      value: "internationalcard",
      content: {
        name: "",
        numberCard: "",
        expired: "",
        CVV: "",
      },
    },
    {
      image: "atm.png",
      name: "Payment by domestic ATM card.",
      value: "atm",
      content: {
        name: "",
        numberCard: "",
        expired: "",
        cvv: "",
      },
    },
    {
      image: "momo.jpeg",
      name: "Payment via Momo application.",
      value: "momo",
      content: {
        name: "",
        numberCard: "",
        expired: "",
        cvv: "",
      },
    },
    {
      image: "zalopay.png",
      name: "Payment via Zalo Pay application.",
      value: "zalopay",
      content: {
        name: "",
        numberCard: "",
        expired: "",
        cvv: "",
      },
    },
  ];
}
</script>

<style lang="scss" scoped>
</style>
