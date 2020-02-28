<template>
  <v-app>
    <Menu v-if="user" />
    <Header />
    <v-content>
      <v-container>
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey, nameKey, emailKey } from "@/global";
import Menu from "./components/Menu";
import Header from "./components/Header";
import { mapState } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapState(["drawer", "user"])
  },

  components: {
    Menu,
    Header
  },

  data: () => ({
    validatingToken: true
  }),

  methods: {
    async validateToken() {
      this.validatingToken = true;

      const localJson = localStorage.getItem(userKey);
      this.$store.commit("setUser", null);

      if (!localJson) {
        this.validatingToken = false;
        this.$router.push({ name: "Auth" });
        return;
      }

      const json = localJson;
      const config = {
        headers: { Authorization: json }
      };

      const res = await axios.get(`${baseApiUrl}/users`, config);

      if (res.data) {
        const newName = localStorage.getItem(nameKey);
        const newEmail = localStorage.getItem(emailKey);
        this.$store.commit("setUser", json);
        this.$store.commit("setName", newName);
        this.$store.commit("setEmail", newEmail);
      } else {
        localStorage.removeItem(userKey);
        localStorage.removeItem(nameKey);
        localStorage.removeItem(emailKey);
        this.$router.push({ name: "Auth" });
      }

      this.validatingToken = false;
    }
  },
  created() {
    this.validateToken();
  }
};
</script>

<style>
@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}

.slide-enter-active {
  animation: slide-in 0.3s ease;
}

.slide-leave-active {
  animation: slide-out 0.3s ease;
}
</style>
