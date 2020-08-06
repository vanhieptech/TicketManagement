<template>
  <div>
    <search-flight></search-flight>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchFlight from "@/components/home/search-flight.vue";
@Component({
  components: {
    SearchFlight,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
</style>
