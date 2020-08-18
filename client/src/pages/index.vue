<template>
  <div>
    <search-flight></search-flight>
    <top-deal></top-deal>
    <banner-login></banner-login>
    <popular-recommendation></popular-recommendation>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchFlight from "@/components/home/search-flight.vue";
import TopDeal from "@/components/home/top-deal.vue";
import BannerLogin from "@/components/home/banner-login.vue";
import PopularRecommendation from "@/components/home/popular-recommend.vue";
@Component({
  components: {
    SearchFlight,
    TopDeal,
    BannerLogin,
    PopularRecommendation,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
</style>
