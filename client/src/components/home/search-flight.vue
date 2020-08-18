<template>
  <v-card elevation="0" color="#F5F5F5" min-height="600">
    <v-row dense>
      <v-col cols="12" class="pa-0">
        <v-card
          elevation="0"
          img="https://www.gannett-cdn.com/presto/2019/06/23/USAT/c3a9f051-bd6c-4b39-b5b9-38244deec783-GettyImages-932651818.jpg?auto=webp&crop=667,375,x0,y80&format=pjpg&width=1200"
          min-height="300"
        ></v-card>
      </v-col>
      <v-col cols="12" class="d-flex flex-column align-center">
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-card class="rounded-lg mt-n15" min-height="165">
                <v-card-title>
                  <v-radio-group v-model="radios" class="mt-0" :mandatory="false" row hide-details>
                    <v-radio label="One way" value="radio-1"></v-radio>
                    <v-radio label="Round trip" value="radio-2"></v-radio>
                  </v-radio-group>
                </v-card-title>
                <v-card-text class="pt-1">
                  <v-row dense>
                    <v-col cols="12" sm="6" md="6">
                      <div class="d-flex flex-row pt-2 pa-0" style="border: 1px solid #EEEEEE">
                        <v-autocomplete
                          v-model="departure"
                          :loading="loading"
                          :items="locations"
                          item-text="name"
                          item-value="code"
                          prepend-inner-icon="mdi-map-marker"
                          placeholder="Thành Phố / Sân bay"
                          label="From"
                          flat
                          hide-no-data
                          hide-details
                          return-object
                        >
                          <template v-slot:item="data">
                            <p>
                              {{data.item.name}}
                              <strong>({{data.item.code}})</strong>
                            </p>
                          </template>
                        </v-autocomplete>
                        <v-autocomplete
                          v-model="arrival"
                          :loading="loading"
                          :items="locations"
                          item-text="name"
                          item-value="code"
                          placeholder="Thành Phố / Sân bay"
                          label="To"
                          flat
                          hide-no-data
                          return-object
                        >
                          <template v-slot:item="data">
                            <p>
                              {{data.item.name}}
                              <strong>({{data.item.code}})</strong>
                            </p>
                          </template>
                        </v-autocomplete>
                      </div>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <div class="pt-2 pa-0" style="border: 1px solid #EEEEEE">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="departureTime"
                              label="Date"
                              prepend-icon="event"
                              readonly
                              hide-details
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="departureTime" no-title @input="menu2 = false"></v-date-picker>
                        </v-menu>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <!--
                        <v-combobox
                          v-model="select"
                          :items="items"
                          label="Passenger"

                          multiple
                          chips
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              :key="JSON.stringify(data.item)"
                              v-bind="data.attrs"
                              :input-value="data.selected"
                              :disabled="data.disabled"
                              @click:close="data.parent.selectItem(data.item)"
                            >
                              <v-avatar
                                class="accent white--text"
                                left
                                v-text="data.item.slice(0, 1).toUpperCase()"
                              ></v-avatar>
                              {{ data.item }}
                            </v-chip>
                          </template>
                        </v-combobox>
                        <v-select
                          v-model="e6"
                          :items="states"
                          :menu-props="{ maxHeight: '400' }"
                          label="Passenger"
                          placeholder="Passenger"
                          multiple
                        ></v-select>
                      -->
                      <div class="pt-2 pa-0" style="border: 1px solid #EEEEEE">
                        <v-menu
                          v-model="menuPassenger"
                          :close-on-content-click="false"
                          :nudge-width="200"
                          offset-y
                          left
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              label="Passenger"
                              placeholder="Thành Phố / Sân bay"
                              readonly
                              hide-details
                              v-bind="attrs"
                              v-on="on"
                            >
                              <template v-slot:append>
                                <v-icon :class="menuPassenger? 'mdi-flip-v':''">mdi-chevron-down</v-icon>
                              </template>
                            </v-text-field>
                          </template>

                          <v-card>
                            <v-list dense>
                              <v-list-item dense>
                                <v-list-item-content>
                                  <v-list-item-title>Người lớn</v-list-item-title>
                                  <v-list-item-subtitle>(>12 tuổi)</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action
                                  class="d-flex flex-row justify-center align-center"
                                >
                                  <v-btn icon :disabled="adultNumeric<=0" @click="adultNumeric--">
                                    <v-icon>mdi-minus-circle-outline</v-icon>
                                  </v-btn>
                                  <v-spacer></v-spacer>
                                  <span
                                    class="font-weight-bold text-title text-center"
                                    style="width:30px;"
                                  >{{ adultNumeric}}</span>
                                  <v-spacer></v-spacer>
                                  <v-btn icon :disabled="adultNumeric>=10" @click="adultNumeric++">
                                    <v-icon>mdi-plus-circle-outline</v-icon>
                                  </v-btn>
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider></v-divider>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>Người lớn</v-list-item-title>
                                  <v-list-item-subtitle>(>12 tuổi)</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action
                                  class="d-flex flex-row justify-center align-center"
                                >
                                  <v-btn icon :disabled="adultNumeric<=0" @click="adultNumeric--">
                                    <v-icon>mdi-minus-circle-outline</v-icon>
                                  </v-btn>
                                  <v-spacer></v-spacer>
                                  <span
                                    class="font-weight-bold text-title text-center"
                                    style="width:30px;"
                                  >{{ adultNumeric}}</span>
                                  <v-spacer></v-spacer>
                                  <v-btn icon :disabled="adultNumeric>=10" @click="adultNumeric++">
                                    <v-icon>mdi-plus-circle-outline</v-icon>
                                  </v-btn>
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider></v-divider>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>Người lớn</v-list-item-title>
                                  <v-list-item-subtitle>(>12 tuổi)</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action
                                  class="d-flex flex-row justify-center align-center"
                                >
                                  <v-btn icon :disabled="adultNumeric<=0" @click="adultNumeric--">
                                    <v-icon>mdi-minus-circle-outline</v-icon>
                                  </v-btn>
                                  <v-spacer></v-spacer>
                                  <span
                                    class="font-weight-bold text-title text-center"
                                    style="width:30px;"
                                  >{{ adultNumeric}}</span>
                                  <v-spacer></v-spacer>
                                  <v-btn icon :disabled="adultNumeric>=10" @click="adultNumeric++">
                                    <v-icon>mdi-plus-circle-outline</v-icon>
                                  </v-btn>
                                </v-list-item-action>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-menu>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" class="d-flex justify-center pa-0">
        <v-btn
          class="white--text mt-n10 text-body-2 text-uppercase font-weight-bold"
          color="primary"
          min-width="200"
          min-height="50"
          rounded
          :loading="isLoading"
          large
          @click="onSearchFlights"
        >Search flight</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import dayjs from "dayjs";
@Component({
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  data() {
    return {
      select: [],
      items: ["Programming", "Design", "Vue", "Vuetify"],
    };
  },
})
export default class SearchFlight extends Vue {
  img: String = "";
  radios: String = "radio-1";

  menu: Boolean = false;
  date = new Date().toISOString().substr(0, 10);
  modal: Boolean = false;

  menuPassenger: Boolean = false;
  adultNumeric: Number = 0;
  e6: any = "";
  states: any = [];
  locations: any = [];

  departure: any = "";
  departureTime: any = new Date().toISOString().substr(0, 10);
  arrival: any = "";
  standardfare: any = "";
  loading: Boolean = false;
  isLoading: Boolean = false;
  dataSearches: Object = {
    departure: "",
    departureTime: "",
    arrival: "",
    standardfare: "TG",
  };
  async mounted() {
    const res = await this.$apiClient.getAirports();
    if (res && res.code === 200) {
      this.locations = res.results;
    }
    console.log(`res mounted list airport`, this.locations);
  }
  items: any = null;
  save() {}
  onSearchFlights() {
    this.isLoading = true;
    if (!this.departure || !this.departure.code) return;
    if (!this.arrival || !this.arrival.code) return;
    // TODO: validate value before search

    const query = {
      departure: this.departure.code,
      departure_time: dayjs(this.departureTime).toISOString(),
      arrival: this.arrival.code,
      standardfare: "TG",
    };
    const url = `/flight?departure=${query.departure}&arrival=${query.arrival}&departure_time=${query.departure_time}&standardfare=${query.standardfare}`;
    this.$router.push(url);
    this.isLoading = false;
  }
}
</script>

<style scoped>
div >>> .v-input {
  max-height: 44px;
}
@media (min-width: 1264px) {
  .container {
    max-width: 1160px;
  }
}
</style>
