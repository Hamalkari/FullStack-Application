<template lang="pug">
  section.signin
    .container
      .signin-wrapper
        form.form.md-layout(novalidate @submit.prevent="singinUser")
          md-card.md-layout-item.md-size-100
            md-card-header.md-title Вход
            md-card-content
              .md-layout
                .md-layout-item
                  md-field(:class="{ 'md-invalid' : $v.email.$error}")
                    label(for="email-field") Email
                    md-input(name="email-field" id="email-field" v-model="email" @change="$v.email.$touch()")
                    span.md-error(v-if="!$v.email.email") Введите корректный email
                    span.md-error(v-if="!$v.email.required") Это обязаательно поле
              .md-layout
                .md-layout-item
                  md-field(:class="{ 'md-invalid' : $v.password.$error}")
                    label(for="password-field") Пароль
                    md-input(name="password-field" id="password-field" type="password" v-model="password" @change="$v.password.$touch()")
                    span.md-error(v-if="!$v.password.required") Это обязательное поле
                    span.md-error(v-if="!$v.password.minLength") Пароль должен состоять как минимум из {{ $v.password.$params.minLength.min}} символов
            md-card-actions
              md-button(type="submit" class="md-raised md-primary") Войти

</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import router from "@/router";
import UserService from "@/service/users.service";
import EventBus from "@/components/EventBus";
export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    clearForm() {
      this.$v.$reset();
      this.email = null;
      this.password = null;
    },
    validationUser() {
      this.$v.$touch();

      return this.$v.$invalid;
    },
    singinUser() {
      if (!this.validationUser()) {
        const payload = {
          email: this.email,
          password: this.password
        };
        UserService.loginUser(payload).then(res => {
          const data = res.data;
          if (data.status == "error") {
            this.$notify({
              group: "auth",
              type: data.status,
              title: data.title,
              duration: 4000,
              speed: 1000
            });
          } else {
            localStorage.setItem("usertoken", data.token);
            this.clearForm();
            this.emitMethod();
            router.push({ name: "home" });
          }
        });
      }
    },
    emitMethod() {
      EventBus.$emit("logged-in", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.signin-wrapper {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  width: 50%;
}
</style>