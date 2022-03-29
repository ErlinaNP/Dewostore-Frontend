<template>
  <div>
    <div class="padding-navbar">
      <img src="/banner/banner.png" class="w-100" />
    </div>
    <div class="container-fluid my-5 px-0 bg-light">
      <div class="d-flex justify-content-between padding-navbar py-3">
        <strong>Promo Terkini</strong>
        <nuxt-link to="/promo">Promo Lainya</nuxt-link>
      </div>
      <div class="d-flex justify-content-around pb-5">
        <img src="/promo/promo1.png" class="h-100" />
        <img src="/promo/promo2.png" class="h-100" />
        <img src="/promo/promo3.png" class="h-100" />
      </div>
    </div>
    <div class="container-fluid my-5 px-0">
      <div class="d-flex justify-content-between padding-navbar py-3">
        <strong>Kategori</strong>
      </div>
      <div class="d-flex justify-content-between padding-navbar pb-3">
        <button type="button" class="btn btn-light rounded-pill">Semua</button>
        <button type="button" class="btn btn-light rounded-pill">Atasan</button>
        <button type="button" class="btn btn-light rounded-pill">
          Bawahan
        </button>
        <button type="button" class="btn btn-light rounded-pill">Hijab</button>
        <button type="button" class="btn btn-light rounded-pill">
          Aksesoris
        </button>
        <button type="button" class="btn btn-light rounded-pill">Dewasa</button>
        <button type="button" class="btn btn-light rounded-pill">
          Anak anak
        </button>
      </div>
    </div>
    <div class="row padding-navbar">
      <div
        class="col-lg-3 col-md-6 pb-5"
        v-for="(item, index) in data"
        :key="index"
      >
        <div class="card shadow">
          <img :src="item.photo" />
          <h6 class="px-3 pt-3">
            {{ item.title }}
          </h6>
          <h6 class="p-3">
            <strong>Rp. {{ item.original_price }}</strong>
          </h6>
          <button class="btn btn-danger" @click="bayar">Masukan Ke Keranjang</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
    }
  },
  methods: {
    async fetch() {
      await this.$axios.get('api/product').then((res) => {
        this.data = res.data.data
        console.log(this.data)
      })
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>
