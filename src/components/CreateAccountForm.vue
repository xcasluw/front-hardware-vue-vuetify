<template>
  <v-row class="mt-10" align="center" justify="center">
    <v-col cols="12" sm="8" md="8" lg="4">
      <v-alert
        v-model="alert"
        dismissible
        color="info"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-mail"
      >
        O cadastro foi realizado.
        <a href="/auth">Clique para logar</a>
      </v-alert>

      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat class="justify-space-between">
          <v-toolbar-title>Create Account</v-toolbar-title>
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
              v-model="user.name"
              :error-messages="nameErrors"
              label="Name"
              :disabled="alert || loading"
              required
              @input="$v.user.name.$touch()"
              @blur="$v.user.name.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="user.email"
              :error-messages="emailErrors"
              label="E-mail"
              :disabled="alert || loading"
              required
              @input="$v.user.email.$touch()"
              @blur="$v.user.email.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :error-messages="passwordErrors"
              label="Password"
              type="password"
              :disabled="alert || loading"
              required
              @input="$v.user.password.$touch()"
              @blur="$v.user.password.$touch()"
            ></v-text-field>
            <v-text-field color="info" v-if="loading" loading disabled></v-text-field>
          </v-form>

          <v-btn color="primary" class="mt-5" text to="/auth">Already have an account?</v-btn>

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
            @click="createAccount"
            :disabled="!user.email || !user.password"
          >
            <v-icon dark right class="mr-1">mdi-checkbox-marked-circle</v-icon>Create
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
      name: { required, minLength: minLength(6) },
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },

  data: () => ({
    loading: false,
    alert: false,
    user: {
      name: "",
      email: "",
      password: ""
    },

    color: "red",
    mode: "",
    snackbar: false,
    text: "Houve um erro ao tentar cadastrar",
    timeout: 6000,
    x: "center",
    y: "bottom"
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.user.name.$dirty) return errors;
      !this.$v.user.name.name && errors.push("Must be valid name");
      !this.$v.user.name.required && errors.push("Name is required");
      return errors;
    },
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
    createAccount() {
      this.loading = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      }

      axios
        .post(`${baseApiUrl}/users`, this.user)
        .then(() => {
          this.loading = false;
          this.alert = true;
          this.user = {};
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
