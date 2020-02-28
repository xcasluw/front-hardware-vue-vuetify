<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    :value="drawer"
  >
    <v-list dense>
      <template v-for="item in items">
        <v-list-item :key="item.text" :to="item.link" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["drawer"]),
  data: () => ({
    items: [
      { icon: "mdi-home", text: "Dashboard", link: "/home" },
      {
        icon: "mdi-desktop-classic",
        text: "Motherboards",
        link: "/motherboards"
      },
      { icon: "mdi-cpu-64-bit", text: "Processors", link: "/processors" },
      { icon: "mdi-information", text: "About", link: "/about" }
    ]
  })
};
</script>
