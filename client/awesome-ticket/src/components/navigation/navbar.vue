 <template>
  <div class="center examplex">
    <vs-navbar color="#49C6E5" padding-scroll text-white fixed center-collapsed v-model="active">
      <!--
      <template #left>
        <img src="/logo2.png" alt />
      </template>
      -->
      <vs-navbar-item :active="active == 'flight_ticket'" id="flight_ticket">FLIGHT TICKET</vs-navbar-item>
      <vs-navbar-item :active="active == 'free_and_easy'" id="free_and_easy">FREE AND EASY</vs-navbar-item>
      <vs-navbar-item :active="active == 'tours'" id="tours">TOURS</vs-navbar-item>
      <vs-navbar-item :active="active == 'travel_guide'" id="travel_guide">TRAVEL GUIDE</vs-navbar-item>
      <vs-navbar-item :active="active == 'promotions'" id="promotions">PROMOTIONS</vs-navbar-item>
      <template #right>
        <vs-button flat>Login</vs-button>
      </template>
    </vs-navbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class NavBar extends Vue {
  active: Boolean = false;
}
</script>
<style  scoped >
.vs-navbar__item {
  font-size: 0.95rem;
}
</style>
