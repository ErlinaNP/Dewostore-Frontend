<template>
  <div>
    <div class="main-page pt-5 row">
      <div class="col-md-8">
        <div class="card p-3 border-0 shadow" style="border-radius: 10px">
          <div class="card-header bg-white mb-3">
            <h5 class="fw-bold">Checkout</h5>
          </div>
          <div
            class="card border-0 my-3 mt-0"
            v-for="(it, ix) in data.order_detail"
            :key="ix"
          >
            <div class="d-flex">
              <img
                style="width: 100px"
                :src="checkUrl(it.product.photo)"
                alt=""
                srcset=""
              />
              <div class="ms-5">
                <strong
                  >{{ it.product.title }} <span class="fw-bold">x</span>
                  {{ it.sum }}</strong
                >
                <p>{{ it.product.original_price | toCurrency }}</p>
                <p class="text-secondary">{{ it.catatan }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow p-3 mb-3">
          <h6>Tuliskan Alamat</h6>
          <p>
            {{ data.alamat }}
          </p>
        </div>
        <div class="card border-0 shadow p-3 mb-3">
          <h6 class="fw-bold mb-3">Ringkasan Pembayaran</h6>
          <div class="d-flex justify-content-between mb-3">
            <span>Subtotal Produk</span>
            <span>{{ data.price | toCurrency }}</span>
          </div>
          <div class="d-flex justify-content-between border-bottom mb-3">
            <span>{{ data.kurir }}</span>
            <span>{{ data.ongkir | toCurrency }}</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span class="fw-bold">Total Harga</span>
            <span>{{ (data.price + data.ongkir) | toCurrency }}</span>
          </div>
        </div>
        <div v-if="!loading" class="card border-0 shadow p-3">
          <div v-if="data.status == 'capture' || data.status == 'settlement'">
            <span class="btn btn-warning text-white fw-bold d-block">
              Dalam Pengiriman
            </span>
            <div
              v-if="$auth.user.id == data.buyer_id"
              class="d-flex justify-content-center mt-3"
            >
              <button @click="terimaProduct" class="btn btn-success">
                Konfirmasi Produk Telah Diterima
              </button>
            </div>
          </div>
          <span
            v-else-if="data.status == 'pending' || data.status == 'UNPAID'"
            class="d-flex justify-content-center"
          >
            <button
              v-if="$auth.user.id == data.buyer_id"
              :disabled="loading"
              @click="bayar"
              class="btn btn-primary text-white rounded-pill w-100"
            >
              Bayar
            </button>
            <button
              v-else
              disabled
              @click="bayar"
              class="btn btn-primary text-white rounded-pill w-100"
            >
              Menunggu Buyer Membayar
            </button>
          </span>
          <span
            v-else-if="data.status == 'finish'"
            class="btn btn-success text-white fw-bold d-block"
          >
            Selesai
          </span>
          <span v-else class="btn btn-danger text-white fw-bold d-block">
            Produk Gagal Dibeli
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {},
      kurir: '',
      alamat: '',
      loading: true,
      baseBe: 'http://api.dewostore.web.id/public/storage/',
    }
  },
  watch: {},
  methods: {
    async fetch() {
      await this.$axios
        .get('api/order/' + this.$route.params.id)
        .then((res) => {
          this.data = res.data
          this.loading = false
        })
    },
    bayar() {
      window.snap.show()
      window.snap.pay(this.data.token)
    },
    deleteData(id) {
      this.$axios
        .delete('api/cart/' + id)
        .then((res) => {
          this.data = res.data
          this.fetch()
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
    async terimaProduct() {
      await this.$axios
        .post('api/payment', {
          transaction_id: this.data.invoice,
          transaction_status: 'finish',
        })
        .then(() => {
          this.fetch()
        })
        .catch((err) => {
          console.log(err)
        })
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
</style>
