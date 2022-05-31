<template>
  <div>
    <div class="container-fluid my-0 px-0 bg-light">
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
    <div class="d-flex w-100 justify-content-end mb-3">
      <div class="d-flex">
        <input v-model="title" type="text" class="form-control">
        <button @click="fetch" class="btn btn-primary text-white">Search</button>
      </div>
    </div>
    <div id="product" class="row">
      <div class="col-3">
        <div class="card border-0 shadow p-3">
          <h6 class="fw-bold w-100 text-center">Kategori</h6>
          <button @click="filter('')"  class="btn">
            Semua
          </button>
          <button @click="filter(item.id)" v-for="(item, index) in category" :key="index" class="btn">
            {{ item.nama }}
          </button>
        </div>
      </div>
      <div class="col-9">
        <div class="row">
          <div
            class="col-lg-3 col-sm-6 pb-5"
            v-for="(item, index) in data"
            :key="index"
          >
            <div class="card shadow" @click="modalitem(item)">
              <img :src="checkUrl(item.photo)" />
              <h6 class="px-3 pt-3">
                {{ item.title }}
              </h6>
              <h6 class="p-3">
                <strong>{{ item.original_price | toCurrency }}</strong>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal ref="itemModal" size="xl" hide-footer title="Detail Produk">
      <div class="px-md-5 row">
        <div class="col-md-5 col-lg-4">
          <img :src="checkUrl(item.photo)" class="w-100" alt="" srcset="" />
        </div>
        <div class="col-md-9 col-lg-8">
          <h3 class="fw-bold">{{ item.title }}</h3>
          <h4 class="fw-bold">Rp.{{ item.original_price }}</h4>
          <p>{{ item.description }}</p>
          <div>
            <h6><span class="fw-bold">Catatan</span> (Optional)</h6>
            <textarea
              class="form-control"
              v-model="catatan"
              cols="30"
              rows="3"
            ></textarea>
          </div>
          <div class="d-flex justify-content-between my-3">
            <span class="fw-bold">Jumlah</span>
            <div class="d-flex">
              <button
                class="btn btn-primary text-white rounded-circle p-0"
                style="width: 35px; height: 35px"
                @click="minus"
              >
                -
              </button>
              <input
                type="number"
                v-model="jumlah"
                class="form-control mx-2"
                style="width: 50px"
              />
              <button
                @click="jumlah++"
                class="btn btn-primary text-white rounded-circle p-0"
                style="width: 35px; height: 35px"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-info text-white rounded-pill"
          @click="cart(item.id)"
        >
          Masukan Keranjang
        </button>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      category: [],
      loading: false,
      catatan: '',
      jumlah: 0,
      title: '',
      item: {
        title: '',
        photo: '',
      },
      baseBe: 'http://api.dewostore.web.id/public/storage/',
    }
  },
  methods: {
    minus() {
      if (this.jumlah > 0) {
        this.jumlah--
      }
    },
    async filter(id) {
      await this.$axios.get('api/product?category=' + id+'&title='+this.title).then((res) => {
        this.data = res.data.data
        console.log(this.data)
      })
    },
    async fetch() {
      await this.$axios.get('api/product?title='+this.title).then((res) => {
        this.data = res.data.data
        console.log(this.data)
      })
      await this.$axios.get('api/category?limit=5').then((res) => {
        this.category = res.data
      })
    },
    async cart(id) {
      const data = {
        jumlah: this.jumlah,
        catatan: this.catatan,
      }
      this.loading = true
      await this.$axios
        .post('api/cart/' + id, data)
        .then((res) => {
          this.loading = false
          console.log(this.data)
          this.$router.push('/cart')
        })
        .catch((err) => {
          alert('Anda Belum Login')

          console.log(err)
        })
    },
    modalitem(item) {
      this.item = item
      this.$refs.itemModal.show()
    },
    checkUrl(url) {
      if (url.includes('files/products')) {
        return this.baseBe + url
      } else {
        return url
      }
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
