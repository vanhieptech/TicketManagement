<template>
  <v-app>
    <v-navigation-drawer
      id="main-drawer"
      clipped
      dark
      fixed
      app
      style="z-index: 9999;"
      :permanent="!$vuetify.breakpoint.mobile"
      :mini-variant-width="$vuetify.breakpoint.mobile ?  '0': '60'"
      color="primary"
      :mini-variant.sync="mini"
      :value="value"
    >
      <v-list-item class="px-2 d-flex" :style=" mini ? 'height: 116px;':'' ">
        <v-list-item-avatar class="align-self-start" :size="mini ? '36': '60'">
          <v-img
            :size="mini ? '40': '60'"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            :name="$auth.user.name"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-title class="font-weight-medium">{{$auth.user.name}}</v-list-item-title>
        <v-btn icon @click.stop="$vuetify.breakpoint.mobile ? $emit('input', false) : mini=!mini ">
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-list-item v-if="!mini" dense class="px-1 d-flex justify-space-between">
        <v-btn text depressed block x-small @click="logoutConfirm = true">
          <v-icon left x-small>mdi-logout</v-icon>logout
        </v-btn>
        <v-dialog v-model="logoutConfirm" max-width="390">
          <v-card>
            <v-card-title class="title-2 pt-3">Xác nhận</v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle class="font-weight-regular pt-2 pb-1">
              Bạn muốn
              <strong>đăng xuất</strong>
              khỏi hệ thống ?
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="red darken-1" text @click="logoutConfirm = false">cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue" class="white--text" @click="doLogout">agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <template v-for="(item, index) in listItems">
          <v-list-item
            v-if="item.icon"
            :key="'menu-item-' + index"
            class="white--text my-2"
            link
            :to="item.link"
          >
            <v-list-item-action v-if="item.icon" class="my-0">
              <v-icon class="white--text" v-text="item.icon"></v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text subtitle-2">{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>

    <v-footer class="d-flex justify-center">
      <div>
        &copy; {{ new Date().getFullYear() }} -
        <span
          class="font-weight-light caption"
        >Power by AnhEmXaHoi Team</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Account from "@/components/account.vue";
@Component({
  components: {
    Account,
  },
})
export default class Layout extends Vue {
  mini: boolean = false;
  value: any = "";
  logoutConfirm: boolean = false;
  listItems: any = [
    {
      icon: "mdi-desktop-mac-dashboard",
      title: "Dashboard",
      link: "/admin",
    },
    { icon: "mdi-ticket", title: "Tickets", link: "/admin/tickets" },
    { icon: "mdi-book", title: "Orders", link: "/admin/orders" },
    { icon: "mdi-account-group", title: "Users", link: "/admin/users" },
    { icon: "mdi-airplane", title: "Airlines", link: "/admin/airlines" },
    { icon: "mdi-airport", title: "Airports", link: "/admin/airports" },
    { icon: "mdi-brightness-percent", title: "Promos", link: "/admin/promos" },
    { icon: "mdi-cart", title: "Payment", link: "/admin/payment" },
  ];
  doLogout() {
    this.$auth.logout();
    this.$router.push("/");
  }
}
</script>
