<template>
  <div class="mt-3">
    <b-form @submit.prevent="onSubmit">
      <ValidationProvider
      name="Name"
        rules="required"
        v-slot="{ errors }"
      >
      <b-form-group label="Name:">
        <b-form-input
          v-model="form.name"
          type="text"
          placeholder="Enter Name"
          required
        ></b-form-input>
      <FormError :errors="errors" />
      </b-form-group>
      </ValidationProvider>
      <ValidationProvider
      name="email"
        rules="required|email"
        v-slot="{ errors }"
      >
      <b-form-group label="Email address:">
        <b-form-input
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
       <FormError :errors="errors" />
      </b-form-group>
      </ValidationProvider>
       <ValidationProvider
      name="password"
        rules="required|min:6"
        v-slot="{ errors }"
      >
      <b-form-group label="Your Password:">
        <b-form-input
          type="password"
          v-model="form.password"
          placeholder="Enter Password"
          required
        ></b-form-input>
       <FormError  :errors="errors"/>
      </b-form-group>
      </ValidationProvider>
      <ValidationProvider
      name="passwordConfirm"
        rules="required|min:6"
        v-slot="{ errors }"
      >
      <b-form-group label="confirm Password:">
        <b-form-input
          type="password"
          v-model="form.passwordConfirm"
          placeholder="Enter Password"
          required
        ></b-form-input>
      <FormError :errors="errors" />
      </b-form-group>
      </ValidationProvider>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          :aria-describedby="ariaDescribedby"
        >
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Signup</b-button>
    </b-form>
  </div>
</template>
<script>
import { ValidationProvider } from 'vee-validate';
import axios from "axios";
import FormError from "@/components/FormError.vue"
export default {
  components: {
    ValidationProvider,
    FormError
    ,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        await axios.post("http://localhost:3000/auth/signup", {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
        });

        this.$router.push({ path: "/login" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>