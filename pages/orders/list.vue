<template>
  <div class="padding-navbar pt-5">
    <ul class="list-group">
      <li
        v-for="(item, index) in data"
        :key="index"
        class="list-group-item mb-3"
      >
        <div class="cardp-2">
          <div class="row">
            <div class="col-6">
              <small>Invoice</small>
              <h6 class="fw-bold text-secondary">{{ item.invoice }}</h6>
              <small>Harga</small>
              <h6 class="fw-bold">
                {{ (Number(item.price) + Number(item.ongkir)) | toCurrency }}
              </h6>
            </div>
            <div class="col-6">
              <div class="d-flex justify-content-between">
                <div>
                  <small>Tanggal</small>
                  <h6>{{ item.created_at | ReadableDate }}</h6>
                </div>
                <button class="btn text-primary" @click="pushTo(item.id)">
                  Detail
                </button>
              </div>
              <small>Status</small>
              <span
                v-if="item.status == 'capture' || item.status == 'settlement'"
                class="btn btn-warning text-white fw-bold d-block"
              >
                Menunggu Konfirmasi Seller
              </span>
              <span
                v-else-if="item.status == 'delivering'"
                class="btn btn-warning text-white fw-bold d-block"
              >
                Produk Sedang di Prosses & Dikirim
              </span>
              <span
                v-else-if="item.status == 'pending' || item.status == 'UNPAID'"
                class="btn btn-info text-white fw-bold d-block"
                @click="bayar(item.token)"
              >
                Menunuggu di Bayar
              </span>
              <span v-else-if="item.status == 'finish'" class="btn btn-success text-white fw-bold d-block"> Selesai </span>
              <span v-else class="btn btn-danger text-white fw-bold d-block">
                Produk Batal Dibeli
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
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
    pushTo(id) {
      this.$router.push('/orders/detail/' + id)
    },
    async fetch() {
      await this.$axios.get('api/order').then((res) => {
        this.data = res.data
        console.log(this.data)
      })
    },
    bayar(token) {
      window.snap.show()
      window.snap.pay(token)
    },
  },
  mounted() {
    this.fetch()
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
