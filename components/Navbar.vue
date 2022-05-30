<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="white"
      class="shadow padding-navbar"
    >
      <nuxt-link to="/">
        <img src="logo.svg" alt="" srcset="" />
      </nuxt-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item tag="nuxt-link" to="/">
            Beranda
          </b-nav-item>
          <b-nav-item tag="nuxt-link" to="/product">
            Produk
          </b-nav-item>
          <b-nav-item tag="nuxt-link" to="#">
            Promo
          </b-nav-item>
          <b-nav-item tag="nuxt-link" to="/about-us">
           Tentang Kami
          </b-nav-item>
          <b-nav-item tag="nuxt-link" to="/contact">
            Hubungi Kami
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ms-auto">
            <b-nav-item tag="nuxt-link" to="/cart">
                <i class="fa-solid fa-cart-shopping"></i>
            </b-nav-item>
            <b-nav-item v-if="$auth.user" tag="nuxt-link" to="/profile">
              <div class="photo-profile"></div>
            </b-nav-item>
            <b-nav-item-dropdown v-if="$auth.user" right>
              <template #button-content>
                <em>{{ $auth.user.name }}</em>
              </template>
              <b-dropdown-item tag="nuxt-link" to="/profile">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout" href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-else tag="nuxt-link" to="/login">
            Masuk
            </b-nav-item>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      location.reload()
    },
  },
}
</script>
