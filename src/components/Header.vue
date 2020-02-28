<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
  >
    <v-app-bar-nav-icon v-if="user" @click.stop="toggleMenu" />
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Front Hardware</span>
    </v-toolbar-title>

    <v-spacer />
    <v-btn v-if="user" icon>
      <v-icon>mdi-apps</v-icon>
    </v-btn>
    <v-btn v-if="user" icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <div class="text-center" v-if="user">
      <v-bottom-sheet v-model="sheet">
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="32px" item>
              <v-img
                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                alt="Vuetify"
            /></v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-subheader
            ><b>{{ email }} | {{ name }}</b></v-subheader
          >

          <v-list-item>
            <v-list-item-avatar>
              <v-icon color="red darken-2">mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-avatar>
              <v-icon color="red darken-2">mdi-logout</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-bottom-sheet>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import { userKey, nameKey, emailKey } from "@/global";

export default {
  computed: {
    ...mapState(["user", "name", "email"])
  },

  data: () => ({
    sheet: false
  }),
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
    logout() {
      this.sheet = false;
      localStorage.removeItem(userKey);
      localStorage.removeItem(nameKey);
      localStorage.removeItem(emailKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "Auth" });
      return;
    }
  }
};
</script>

<style></style>
