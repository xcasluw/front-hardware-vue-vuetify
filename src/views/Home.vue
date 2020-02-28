<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo-vue.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";
import { userKey, nameKey, emailKey } from "@/global";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  computed: mapState(["user"]),
  methods: {
    validateToken() {
      const json = localStorage.getItem(userKey);
      const newName = localStorage.getItem(nameKey);
      const newEmail = localStorage.getItem(emailKey);
      this.$store.commit("setUser", json);
      this.$store.commit("setName", newName);
      this.$store.commit("setEmail", newEmail);
    }
  },
  created() {
    this.validateToken();
  }
};
</script>
