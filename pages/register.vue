<template>
  <div class="container-fluid my-5">
    <div class="margin-navbar card bg-white border-0 p-5 shadow">
      <h4>Daftar Akun Webstore</h4>
      <div v-if="alert_salah" class="alert alert-danger" role="alert">
        Pendaftaran Gagal
      </div>
      <div class="container px-5" style="width:350px">
        <form @submit.prevent="login">
          <div class="form-group mb-3">
            <label for="fname">Nama Lengkap</label>
            <input
              id="fname"
              v-model="name"
              required
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Masukan nama lengkap"
            />
          </div>
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
          <div class="form-group mb-3">
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
          <div class="form-group mb-3">
            <label for="exampleInputPassword1">Konfirmasi Password</label>
            <input
              id="exampleInputPassword1"
              v-model="password_confirmation"
              required
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 rounded-pill mt-5">
            Submit
          </button>
          Sudah punya akun web store? <nuxt-link to="/login" class="text-primary">Click disini!</nuxt-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      alert_salah: false,
      login_process: false,
    }
  },
  methods: {
    async login() {
      this.login_process = true
      const qs = require('qs')

      const credentials = qs.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      })
      try {
        await this.$axios.post('/api/register',credentials)
        this.$router.push('/login')
      } catch (err) {
        console.log(err)
        this.alert_salah = true
      }
      this.login_process = false
    },
  },
}
</script>
