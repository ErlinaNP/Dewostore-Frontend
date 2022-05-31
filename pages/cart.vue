<template>
  <div>
    <form @submit.prevent="bayar">
      <div class="main-page pt-5 row">
        <div class="col-md-8">
          <div class="card p-3 border-0 shadow" style="border-radius: 10px">
            <div
              class="card-header bg-white mb-3 d-flex justify-content-between"
            >
              <h5 class="fw-bold">Keranjang Belanja</h5>
              <nuxt-link to="/orders/list">Lihat order</nuxt-link>
            </div>
            <div
              v-for="(item, index) in data"
              :key="index"
              class="card border-2 p-3 border-bottom"
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
                        @change="checkChecked(it)"
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
                  <div class="ms-auto d-flex flex-column text-end">
                    <div class="text-danger" @click="deleteData(it.id)">
                      <i class="fa-solid fa-trash-can"></i>
                    </div>
                    <div class="mt-auto">
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-primary text-white rounded-circle p-0"
                          style="width: 35px; height: 35px"
                          @click="minus(it)"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          v-model="it.jumlah"
                          class="form-control mx-2"
                          style="width: 50px"
                        />
                        <button
                          @click="it.jumlah++"
                          type="button"
                          class="btn btn-primary text-white rounded-circle p-0"
                          style="width: 35px; height: 35px"
                        >
                          +
                        </button>
                      </div>
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
                      <div class="d-flex justify-content-between">
                        <span>
                          {{ it.product.title }}
                        </span>
                        <span>
                          {{
                            (it.product.original_price * it.jumlah) | toCurrency
                          }}
                        </span>
                      </div>
                    </li>
                  </div>
                </ul>
              </li>
              <li class="list-group-item p-0 m-0 border-0">
                <div class="d-flex justify-content-between" v-if="kurir">
                  <span> Ongkir </span>
                  <span>
                    {{ kurir | toCurrency }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="card border-0 shadow p-3">
            <button
              :disabled="loading || checked < 1"
              class="btn btn-primary text-white rounded-pill"
            >
              Pesan
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
      seller_id: '',
      checked: 0,
      loading: false,
      baseBe: 'http://api.dewostore.web.id/public/storage/',
    }
  },
  watch: {},
  methods: {
    checkChecked(it) {
      let inc = 0
      this.data.forEach((element) => {
        if (element.cart_product) {
          element.cart_product.forEach((element2) => {
            if (element2.checked) {
              inc++
            }
          })
        }
      })
      this.checked = inc
    },
    minus(it) {
      if (it.jumlah > 1) {
        it.jumlah--
      }
    },
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
      this.seller_id = ''
      let canAdd = true
      this.data.forEach((element) => {
        if (element.cart_product) {
          element.cart_product.forEach((element2) => {
            if (element2.checked) {
              if (!this.seller_id) {
                this.seller_id = element2.product.seller_id
              } else if (this.seller_id !== element2.product.seller_id) {
                canAdd = false
                alert('Hanya bisa checkout 1 toko yang sama dalam 1 waktu !')
              }
              formData.append('cart[' + i + ']', element2.id)
              formData.append('cartSum[' + i + ']', element2.jumlah)
              i++
            }
          })
        }
      })
      if (canAdd) {
        formData.append('seller_id', this.seller_id)
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
      }else{
        this.loading=false
      }
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
