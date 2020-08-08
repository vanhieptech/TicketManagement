<template>
  <div style="background-color:#EEEEEE;">
    <v-container>
      <v-stepper v-model="currentStep">
        <v-stepper-header elevation="0">
          <template v-for="step in steps">
            <v-stepper-step
              :key="`${step.number}-step`"
              :complete="step.complete "
              :step="step.number"
              :editable="step.editable"
            >{{step.title}}</v-stepper-step>
            <v-divider v-if="step.number !== 3" :key="step.number"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="step in steps"
            :key="`${step.number}-content`"
            :step="step.number"
          >
            <component :is="step.component" :step="step" @step-receiver="nextStep($event)"></component>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component({
  components: {
    InformationStep: () => import("@/components/steps/information-step.vue"),
    BadgetsStep: () => import("@/components/steps/badgets-step.vue"),
    ConfirmStep: () => import("@/components/steps/confirm-step.vue"),
    PaymentStep: () => import("@/components/steps/payment-step.vue"),
  },
})
export default class CheckoutFlight extends Vue {
  currentStep: any = 1;
  // steps: Number = 4;
  steps = [
    {
      number: 1,
      title: "Informations",
      component: "information-step",
      editable: true,
      complete: false,
    },
    // {
    //   number: 2,
    //   title: "Add badgets",
    //   component: "badgets-step",
    //   editable: false,
    //   complete: false,
    // },
    {
      number: 2,
      title: "Confirm information",
      component: "confirm-step",
      editable: false,
      complete: false,
    },
    {
      number: 3,
      title: "Payment",
      component: "payment-step",
      editable: false,
      complete: false,
    },
  ];
  @Watch("steps")
  stepsChanged(val) {
    if (this.currentStep > val) {
      this.currentStep = val;
    }
  }
  onInput(val) {
    console.log(val);
    // this.steps = parseInt(val);
  }
  nextStep(step) {
    console.log(`nextStep`, step, this.currentStep);
    if (!step) {
      this.currentStep--;
      return;
    }
    console.log(`nextStep`, step, this.currentStep);
    if (step.number === 3) {
      this.currentStep = 1;
    } else {
      this.currentStep = step.number + 1;
    }
  }
}
</script>

<style  scoped>
.v-stepper {
  box-shadow: none !important;
  background-color: rgba(0, 0, 0, 0);
}
.v-stepper__header {
  box-shadow: none !important;
}
@media (min-width: 1264px) {
  .container {
    max-width: 1160px;
  }
}
</style>
