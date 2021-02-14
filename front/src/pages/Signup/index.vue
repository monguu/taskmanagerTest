<template>
  <div class="mt-3">
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Name:">
        <b-form-input
          v-model="form.name"
          type="text"
          placeholder="Enter Name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Email address:">
        <b-form-input
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Your Password:">
        <b-form-input
          type="password"
          v-model="form.password"
          placeholder="Enter Password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="confirm Password:">
        <b-form-input
          type="password"
          v-model="form.passwordConfirm"
          placeholder="Enter Password"
          required
        ></b-form-input>
      </b-form-group>

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
export default {
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
    onSubmit() {},
  },
};
</script>