<template>
  <div>
    <banner></banner>
    <local-tour></local-tour>
    <global-tour></global-tour>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Banner from "@/components/tour/banner.vue";
import LocalTour from "@/components/tour/local-tour.vue";
import GlobalTour from "@/components/tour/global-tour.vue";

@Component({ components: { Banner, LocalTour, GlobalTour } })
export default class Tour extends Vue {}
</script>

<style scoped>
</style>
