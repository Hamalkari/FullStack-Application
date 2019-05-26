<template lang="pug">
  section.users
    .container
      h1.users__title Таблица пользователей сайта
      md-progress-spinner(v-if="sending" md-mode="indeterminate" class="md-accent users__progress")
      .users__table(v-if="users")
        md-table(md-card v-model="users" md-sort="first_name" md-sort-order="asc")
          md-table-toolbar 
            h2.md-title Пользователи
          md-table-row(slot="md-table-row" slot-scope="{ item }")
            md-table-cell(md-label="ID") {{ item._id }}
            md-table-cell(md-label="Имя" md-sort-by="first_name") {{ item.first_name }}
            md-table-cell(md-label="Фамилия" md-sort-by="last_name") {{ item.last_name}}
            md-table-cell(md-label="Email" md-sort-by="email") {{ item.email }}

</template>

<script>
  import UsersService from '@/service/users.service'
  export default {
    data() {
      return {
        users: null,
        sending: false
      }
    },
    methods: {

    },
    mounted() {
      this.sending = true;
      UsersService.getUsers()
                  .then(res => {
                    this.sending = false;
                    const data = res.data;
                    this.users = data;
                  })
                  .catch(err => {
                    this.sending = false;
                    this.$notify({
                      group: "users",
                      type: 'error',
                      title: err,
                      duration: 4000,
                      speed: 1000
                    })
                  })
    },
  }
</script>

<style lang="scss" scoped>
  .users{
    &__title{
      text-align: center;
      font-size: 40px;
      margin-bottom: 40px;
    }

    &__progress {
      display: block;
      width: 60px;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }
</style>