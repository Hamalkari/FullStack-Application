<template lang="pug">
  section.signup
    .container.signup_container
      .signup-wrapper
        form.form(novalidate  @submit.prevent="createUser")
          md-card.md-layout-item.md-size-50.md-small-size-100
            md-card-header.md-title Регистрация
            md-card-content
              .md-layout
                .md-layout-item
                  md-field(:class="{ 'md-invalid' : $v.form.firstName.$error}")
                    label(for="first-name") Имя
                    md-input(name='first-name' id="first-name" v-model.trim="form.firstName" @change="$v.form.firstName.$touch()")
                    span.md-error(v-if="!$v.form.firstName.required") Обязательное поле
                    span.md-error(v-if="!$v.form.firstName.minLength") Имя должно быть более {{ $v.form.firstName.$params.minLength.min }} символов
              .md-layout
                .md-layout-item
                  md-field(:class="{ 'md-invalid' : $v.form.lastName.$error}")
                    label(for="last-name") Фамилия
                    md-input(name='last-name' id="last-name" v-model.trim="form.lastName" @cnahge="$v.form.lastName.$touch()")
                    span.md-error(v-if="!$v.form.lastName.required") Обязательное поле
                    span.md-error(v-if="!$v.form.lastName.minLength") Имя должно быть более {{ $v.form.lastName.$params.minLength.min }} символов
              .md-layout
                .md-layout-item
                  md-field(:class="{'md-invalid' : $v.form.email.$error}")
                    label(for="email") Email
                    md-input(name='email' id="email" v-model.trim="form.email" @change="$v.form.email.$touch()")
                    span.md-error(v-if="!$v.form.email.required") Обязательное поле
                    span.md-error(v-if="!$v.form.email.email") Введите корректный email
              .md-layout
                .md-layout-item
                  md-field(:class="{'md-invalid' : $v.form.password.$error}")
                    label(for="password") Пароль
                    md-input(name='password' id="password" type="password" v-model.trim="form.password" @change="$v.form.password.$touch()")
                    span.md-error(v-if="!$v.form.password.required") Обязательное поле
                    span.md-error(v-if="!$v.form.password.minLength") Пароль должен состоять как минимум из {{ $v.form.password.$params.minLength.min}} символов
              .md-layout
                .md-layout-item
                  md-field(:class="{'md-invalid' : $v.form.repeatPassword.$error}")
                    label(for="repeat-password") Повторите пароль
                    md-input(name='repeat-password' id="repeat-password" type="password" v-model.trim="form.repeatPassword" @change="$v.form.repeatPassword.$touch()")
                    span.md-error(v-if="!$v.form.repeatPassword.sameAsPassword") Пароли должны совпадать
            md-progress-bar.form__progress(md-mode="indeterminate" v-if="sending")
            md-card-actions
              md-button.form__submit(type="submit" class="md-raised md-accent") Создать аккаунт
</template>

<script>

import {required,email,sameAs,minLength} from 'vuelidate/lib/validators'
import UserService from '@/service/users.service'
  export default {
    name: 'Form',
    data() {
      return {
        form: {
          firstName: null,
          lastName: null,
          email: null,
          password: null,
          repeatPassword: null
        },
        sending: false,
      }
    },
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        },
        repeatPassword: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    },
    methods: {
      clearForm(){
        this.$v.$reset();
        this.form.firstName = null;
        this.form.lastName = null;
        this.form.email = null;
        this.form.password = null;
        this.form.repeatPassword = null;
      },
      validateUser(){
        this.$v.$touch();
        return this.$v.$invalid;
      },
      createUser(){
        if (!this.validateUser()){
          const payload = { 
            first_name: this.form.firstName,
            last_name: this.form.lastName,
            email: this.form.email,
            password: this.form.password
          };
          UserService.createUser(payload)
            .then(res => {
              const data = res.data;
              this.$notify({
                group: 'auth',
                type: data.status,
                title: data.title,
                duration: 4000,
                speed: 1000,
              });
              if (data.status == 'success'){
                this.clearForm();
              }
            })
            .catch(err => {
              this.$notify({
                group: 'auth',
                type: 'error',
                title: err,
                duration: 4000,
                speed: 1000
              });
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.signup{
  &-wrapper{
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

 .form{
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;

   &__submit{
     text-align: center;
   }
 }

 .form__progress{
   position: absolute;
   top: 0;
   left: 0;
   right:0;
 }
}
</style>