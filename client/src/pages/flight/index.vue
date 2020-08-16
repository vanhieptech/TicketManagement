<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card elevation="0">
            <v-card-title class="pl-2">
              <v-row dense>
                <v-col cols="12" sm="6" md="6">
                  <p class="text-body-1">Departure (1 flights found)</p>
                  <span>
                    Hồ Chí Minh (SGN)
                    <v-icon color="primary">mdi-arrow-right-bold</v-icon>Hà Nội (HAN)
                  </span>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="d-flex flex-column align-end">
                  <p class="text-body-1 text-right">Friday, 07/08/2020 - 1 Adult</p>
                  <v-btn outlined color="primary">change search</v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
              <span class="pr-5">Filter</span>
              <v-menu v-model="value" :close-on-content-click="false" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-4" color="primary" outlined dark v-bind="attrs" v-on="on">
                    <v-icon left>mdi-airplane-landing</v-icon>
                    <span>Departture Time</span>
                    <v-icon right>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list class="pb-0">
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-checkbox
                      v-model="item.value"
                      :label="item.title"
                      color="success"
                      class="mt-0"
                      hide-details
                    ></v-checkbox>
                  </v-list-item>
                  <v-divider></v-divider>
                  <span class="d-flex justify-space-between">
                    <v-btn color="warning" text>Reset</v-btn>
                    <v-btn color="success" text>Apply</v-btn>
                  </span>
                </v-list>
              </v-menu>
              <v-menu v-model="value" :close-on-content-click="false" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-4" color="primary" outlined dark v-bind="attrs" v-on="on">
                    <v-icon left>mdi-airplane-landing</v-icon>
                    <span>Departture Time</span>
                    <v-icon right>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list class="pb-0">
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-checkbox
                      v-model="item.value"
                      :label="item.title"
                      color="success"
                      class="mt-0"
                      hide-details
                    ></v-checkbox>
                  </v-list-item>
                  <v-divider></v-divider>
                  <span class="d-flex justify-space-between">
                    <v-btn color="warning" text>Reset</v-btn>
                    <v-btn color="success" text>Apply</v-btn>
                  </span>
                </v-list>
              </v-menu>
              <v-menu v-model="value" :close-on-content-click="false" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-4" color="primary" outlined dark v-bind="attrs" v-on="on">
                    <v-icon left>mdi-airplane-landing</v-icon>
                    <span>Departture Time</span>
                    <v-icon right>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list class="pb-0">
                  <v-list-item v-for="(item, index) in items" :key="index">
                    <v-checkbox
                      v-model="item.value"
                      :label="item.title"
                      color="success"
                      class="mt-0"
                      hide-details
                    ></v-checkbox>
                  </v-list-item>
                  <v-divider></v-divider>
                  <span class="d-flex justify-space-between">
                    <v-btn color="warning" text>Reset</v-btn>
                    <v-btn color="success" text>Apply</v-btn>
                  </span>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div style="background-color:#EEEEEE;">
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <span class="pl-2">Sort by</span>
            <v-menu v-model="value" :close-on-content-click="false" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-4" color="primary" text dark v-bind="attrs" v-on="on">
                  <span>Departture Time</span>
                  <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list class="pb-0">
                <v-list-item v-for="(item, index) in items" :key="index">
                  <v-radio
                    v-model="item.value"
                    :label="item.title"
                    color="success"
                    class="mt-0"
                    hide-details
                  ></v-radio>
                </v-list-item>
                <v-divider></v-divider>
                <span class="d-flex justify-space-between">
                  <v-btn color="warning" text>Reset</v-btn>
                  <v-btn color="success" text>Apply</v-btn>
                </span>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-row dense>
          <!--
          <v-col v-for="flight in flights" :key="flight._id" cols="12">
            <v-card elevation="0" outlined>
              <v-card-title>
                <v-row dense>
                  <v-col cols="12" md="7">
                    <v-row dense>
                      <v-col
                        cols="12"
                        sm="6"
                        md="5"
                        class="text-body-2"
                      >{{flight.code}} | Airbus A320</v-col>
                      <v-col cols="12" sm="6" md="7">
                        {{flight.departure_time | formatTime("HH:mm")}}
                        <span
                          v-if="flight.departure"
                        >({{flight.departure.code}})</span>

                        <img src="/image/path.png" alt />
                        {{flight.arrival_time | formatTime("HH:mm")}}
                        <span
                          v-if="flight.arrival"
                        >({{flight.arrival.code}})</span>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" md="5">
                    <v-row dense>
                      <v-col cols="12" sm="6" md="6">
                        <span class="text-body-2">
                          {{getFlightTime(flight.departure_time,flight.arrival_time)}} •
                          Direct flight
                        </span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="d-flex justify-end">
                        <v-btn outlined>detail</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="py-0">
                <v-row dense>
                  <v-col cols="12" md="7" class="d-flex align-center">
                    <v-row dense>
                      <v-col cols="12" sm="6" md="5">Economy</v-col>
                      <v-col cols="12" sm="6" md="7">Luggage & ticket conditions</v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex align-center">
                    <v-row dense>
                      <v-col cols="12" sm="6" md="6">
                        <span
                          class="font-weight-bold text-h6"
                          style="color:#FF5722;"
                        >{{flight.price}}</span> &nbsp;VND
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="d-flex justify-end">
                        <v-btn color="primary" elevation="0">choice</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          -->
          <v-col v-for="i in 5" :key="i" cols="12">
            <v-card elevation="0" outlined>
              <v-card-title>
                <v-row dense>
                  <v-col cols="12" md="7">
                    <v-row dense>
                      <v-col cols="12" sm="6" md="5" class="text-body-2">123 | Airbus A320</v-col>
                      <v-col cols="12" sm="6" md="7">
                        20:30
                        <span>(CHM)</span>

                        <img src="/image/path.png" alt />21:30
                        <span>(NB)</span>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" md="5">
                    <v-row dense>
                      <v-col cols="12" sm="6" md="6">
                        <span class="text-body-2">
                          2h •
                          Direct flight
                        </span>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="d-flex justify-end">
                        <v-btn outlined>detail</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="py-0">
                <v-row dense>
                  <v-col cols="12" md="7" class="d-flex align-center">
                    <v-row dense>
                      <v-col cols="12" sm="6" md="5">Economy</v-col>
                      <v-col cols="12" sm="6" md="7">Luggage & ticket conditions</v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex align-center">
                    <v-row dense>
                      <v-col cols="12" sm="6" md="6">
                        <span class="font-weight-bold text-h6" style="color:#FF5722;">600000</span> &nbsp;VND
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="d-flex justify-end">
                        <v-btn color="primary" elevation="0">choice</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FlightRepo from "@/repositories/flights";
import dayjs from "dayjs";

@Component
export default class Flight extends Vue {
  flights: any = {};
  flightRepo: FlightRepo = FlightRepo.getInstance(this);
  items = [
    { value: false, title: "00:00 - 06:00" },
    { value: false, title: "06:00 - 12:00" },
    { value: false, title: "12:00 - 18:00" },
    { value: false, title: "18:00 - 24:00" },
  ];
  value: any = "";
  async mounted() {
    const query = this.$route.query
      ? this.$route.query
      : {
          departure: "",
          departure_time: new Date().toString(),
          arrival: "",
          standardfare: "",
        };

    this.flights = await this.flightRepo.getListFlights(query);

    console.log(`results flights`, this.flights);
  }
  getFlightTime(departureTime, arrivalTime) {
    console.log(departureTime);
    const time = dayjs(arrivalTime).diff(departureTime, "minute");

    return time / 60 + "h" + (time % 60 === 0 ? "00" : time % 60);
  }
}
</script>

<style scoped>
@media (min-width: 1264px) {
  .container {
    max-width: 1160px;
  }
}
</style>
