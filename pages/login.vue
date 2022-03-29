<template>
  <div class="container-fluid my-5">
    <div class="margin-navbar card bg-white border-0 p-5 shadow">
      <div v-if="alert_salah" class="alert alert-danger" role="alert">
        Email atau Password Salah
      </div>
      <h4>Masuk Ke Akun Webstore</h4>
      <div class="container" style="width: 350px">
        <form @submit.prevent="login">
          <div class="form-group mb-3">
            <label for="exampleInputEmail1">Alamat Email</label>
            <input
              id="exampleInputEmail1"
              v-model="email"
              required
              type="email"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              id="exampleInputPassword1"
              v-model="password"
              required
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 rounded-pill mt-5">
            Selanjutnya
          </button>
          Belum punya akun web store? <nuxt-link to="/register" class="text-primary">Daftar</nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      alert_salah: false,
      login_process: false,
    }
  },
  methods: {
    async login() {
      this.login_process = true
      const qs = require('qs')

      const credentials = qs.stringify({
        email: this.email,
        password: this.password,
      })
      try {
        const response = await this.$auth.loginWith('local', {
          data: credentials,
        })
        this.$auth.strategy.token.set(response.data.token)
        location.href = '/'
      } catch (err) {
        this.alert_salah = true
      }
      this.login_process = false
    },
  },
}
</script>
