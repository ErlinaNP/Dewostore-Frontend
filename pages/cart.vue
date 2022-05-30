<template>
  <div>
    <form @submit.prevent="bayar">
      <div class="main-page pt-5 row">
        <div class="col-md-8">
          <div class="card p-3 border-0 shadow" style="border-radius: 10px">
            <div class="card-header bg-white mb-3">
              <h5 class="fw-bold">Keranjang Belanja</h5>
            </div>
            <div
              v-for="(item, index) in data"
              :key="index"
              class="card border-0"
            >
              <div
                class="card border-0 border-bottom my-3 mt-0"
                v-for="(it, ix) in item.cart_product"
                :key="ix"
              >
                <div class="d-flex">
                  <div class="d-flex align-items-center">
                    <label class="container-check">
                      <input
                        v-model="it.checked"
                        type="checkbox"
                        checked="checked"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <img
                    style="width: 100px"
                    :src="checkUrl(it.product.photo)"
                    alt=""
                    srcset=""
                  />
                  <div class="ms-5">
                    <strong>{{ it.product.title }}</strong>
                    <p>{{ it.product.original_price | toCurrency }}</p>
                    <p class="text-secondary">{{ it.catatan }}</p>
                  </div>
                  <div class="ms-auto d-flex flex-column">
                    <div class="text-danger" @click="deleteData(it.id)">
                      <i class="fa-solid fa-trash-can"></i>
                    </div>
                    <div class="mt-auto">

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-between w-100">
                <div>
                  <h6 class="fw-bold">Ingin Tambah Pesanan ?</h6>
                  <span class="text-disabled">Silakan Pilih di menu utama</span>
                </div>
                <div>
                  <nuxt-link
                    class="btn btn-primary text-white rounded-pill"
                    to="/product"
                    >Pesan Lagi</nuxt-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow p-3 mb-3">
            <h6>Tuliskan Alamat</h6>
            <textarea
              required
              v-model="alamat"
              class="form-control"
              cols="30"
              rows="2"
            ></textarea>
          </div>
          <div class="card border-0 shadow p-3 mb-3">
            <h6>Pilih Kurir</h6>
            <select v-model="kurir" required class="form-control">
              <option value="" selected disabled>Pilih Kurir</option>
              <option value="20000">Sicepat {{ 20000 | toCurrency }}</option>
              <option value="23000">J&T {{ 23000 | toCurrency }}</option>
              <option value="25000">JNE {{ 25000 | toCurrency }}</option>
            </select>
          </div>
          <div class="card border-0 shadow p-3 mb-3">
            <h5 class="mb-3">Ringkasan Pembayaran</h5>
            <ul class="list-group">
              <li
                v-for="(item, index) in data"
                :key="index"
                class="list-group-item p-0 m-0 border-0"
              >
                <ul class="list-group p-0 m-0 border-0">
                  <div v-for="(it, ix) in item.cart_product" :key="ix">
                    <li
                      class="list-group-item border-0 p-0 mb-3"
                      v-if="it.checked"
                    >
                      {{ it.product.original_price | toCurrency }}
                    </li>
                  </div>
                </ul>
              </li>
            </ul>
          </div>
          <div class="card border-0 shadow p-3">
            <button
              :disabled="loading"
              class="btn btn-primary text-white rounded-pill"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      kurir: '',
      alamat: '',
      loading: false,
      baseBe: 'http://api.dewostore.web.id/public/storage/',
    }
  },
  watch: {},
  methods: {
    async fetch() {
      await this.$axios.get('api/cart').then((res) => {
        res.data.forEach((element) => {
          element.cart_product.forEach((el) => {
            el.checked = false
          })
        })
        this.data = res.data
        console.log(this.data)
      })
    },
    async bayar() {
      this.loading = true
      const formData = new FormData()
      formData.append('kurir', this.kurir)
      formData.append('alamat', this.alamat)
      let i = 0
      this.data.forEach((element) => {
        if (element.cart_product) {
          element.cart_product.forEach((element2) => {
            if (element2.checked) {
              formData.append('cart[' + i + ']', element2.id)
              i++
            }
          })
        }
      })
      const headers = { 'Content-Type': 'multipart/form-data' }
      await this.$axios
        .post('api/cart/checkout/order  ', formData, headers)
        .then((res) => {
          this.$router.push('/orders/list')
        })
        .catch((err) => {
          // alert("Pilih Barang Yang Akan Di Checkout")
          this.loading = false
          console.log(err)
        })
    },
    deleteData(id) {
      this.$axios
        .delete('api/cart/' + id)
        .then((res) => {
          this.data = res.data
          this.$router.push('/product')
        })
        .catch((err) => {
          console.log(err)
        })
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
    const midtransScript = document.createElement('script')
    midtransScript.setAttribute(
      'src',
      'https://app.sandbox.midtrans.com/snap/snap.js'
    )
    midtransScript.setAttribute(
      'data-client-key',
      'Mid-client-d5BZmZ8Ih46T1_iH'
    )
    document.head.appendChild(midtransScript)
    this.fetch()
  },
}
</script>
<style>
.pojok {
  position: absolute;
  right: 0;
  top: 0;
}
.pojok-bawah {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
