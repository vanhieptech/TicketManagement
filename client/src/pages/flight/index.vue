<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FlightRepo from "@/repositories/flights";
@Component
export default class Flight extends Vue {
  fligths: any = null;
  flightRepo: FlightRepo = FlightRepo.getInstance(this);

  async mounted() {
    this.fligths = await this.flightRepo.getListFlights();
    console.log(`results flights`, this.fligths);
  }
}
</script>

<style scoped>
</style>
