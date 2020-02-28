<template>
  <v-row class="mt-10" align="center" justify="center">
    <v-col cols="12" sm="8" md="8" lg="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat class="justify-space-between">
          <v-toolbar-title>Login Form</v-toolbar-title>
          <v-spacer />
          <v-icon large dark right class="mr-1">mdi-account-circle</v-icon>
        </v-toolbar>
        <v-card-text>
          <div class="d-flex flex-no-wrap justify-center">
            <v-avatar size="125" tile>
              <v-img src="../assets/logo-vue.png" alt="Hardware" />
            </v-avatar>
          </div>

          <v-form ref="form">
            <v-text-field
              v-model="user.email"
              :error-messages="emailErrors"
              label="E-mail"
              :disabled="loading"
              required
              @input="$v.user.email.$touch()"
              @blur="$v.user.email.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :error-messages="passwordErrors"
              label="Password"
              type="password"
              :disabled="loading"
              required
              @input="$v.user.password.$touch()"
              @blur="$v.user.password.$touch()"
            ></v-text-field>
            <v-text-field color="info" v-if="loading" loading disabled></v-text-field>
          </v-form>

          <v-btn color="primary" class="mt-5" text to="/reset-password">Forgot Password?</v-btn>
          <v-btn color="primary" class="mt-5" text to="/create-account">Don't Have An Account?</v-btn>

          <v-snackbar
            v-model="snackbar"
            :bottom="y === 'bottom'"
            :color="color"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="timeout"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"
          >
            {{ text }}
            <v-btn dark text @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="success"
            class="mt-4"
            @click="login"
            :disabled="!user.email || !user.password"
          >
            <v-icon dark right class="mr-1">mdi-checkbox-marked-circle</v-icon>Login
          </v-btn>

          <v-btn color="error" class="mt-4" @click="clear">
            <v-icon dark right class="mr-1">mdi-refresh</v-icon>Reset Form
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey, nameKey, emailKey } from "@/global";

import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },

  data: () => ({
    loading: false,
    user: {
      email: "",
      password: ""
    },

    color: "red",
    mode: "",
    snackbar: false,
    text: "Usuário ou senha inválidos",
    timeout: 6000,
    x: "center",
    y: "bottom"
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.email && errors.push("Must be valid e-mail");
      !this.$v.user.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.password && errors.push("Must be valid password");
      !this.$v.user.password.required && errors.push("Password is required");
      return errors;
    }
  },

  methods: {
    login() {
      this.loading = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      }

      axios
        .post(`${baseApiUrl}/session`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data.token);
          const newToken = "Bearer " + res.data.token;
          const newName = res.data.user.name;
          const newEmail = res.data.user.email;
          localStorage.setItem(userKey, newToken);
          localStorage.setItem(nameKey, newName);
          localStorage.setItem(emailKey, newEmail);
          this.loading = false;
          this.$router.push({ path: "/home" });
        })
        .catch(res => {
          this.loading = false;
          this.snackbar = true;
        });
    },
    clear() {
      this.$v.$reset();
      this.user.email = "";
      this.user.password = "";
    }
  }
};
</script>
