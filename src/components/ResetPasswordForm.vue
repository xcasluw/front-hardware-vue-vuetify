<template>
  <v-row class="mt-10" align="center" justify="center">
    <v-col cols="12" sm="8" md="8" lg="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat class="justify-space-between">
          <v-toolbar-title>Reset Password</v-toolbar-title>
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
              placeholder="E-mail"
              required
              :disabled="alert || loading"
              @input="$v.user.email.$touch()"
              @blur="$v.user.email.$touch()"
            ></v-text-field>
            <v-text-field color="info" v-if="loading" loading disabled></v-text-field>
          </v-form>

          <v-btn color="primary" class="mt-5" text to="/auth">Already have an account?</v-btn>
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
          <v-btn color="success" class="mt-4" @click="resetPassword" :disabled="!user.email">
            <v-icon dark right class="mr-1">mdi-checkbox-marked-circle</v-icon>Send
          </v-btn>

          <v-btn color="error" class="mt-4" @click="clear">
            <v-icon dark right class="mr-1">mdi-refresh</v-icon>Reset Form
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-alert
        class="mt-10"
        v-model="alert"
        dismissible
        color="info"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-mail"
      >A nova senha foi gerada e enviada para o e-mail.</v-alert>
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
      email: { required, email }
    }
  },

  data: () => ({
    alert: false,
    loading: false,
    user: {
      email: ""
    },
    color: "red",
    mode: "",
    snackbar: false,
    text: "Usuário não encontrado",
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
    }
  },

  methods: {
    resetPassword() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loading = true;

      axios
        .post(`${baseApiUrl}/reset-password`, this.user)
        .then(res => {
          this.user.email = "";
          this.alert = true;
          this.loading = false;
        })
        .catch(res => {
          this.snackbar = true;
          this.loading = false;
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
