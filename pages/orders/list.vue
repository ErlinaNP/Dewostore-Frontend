<template>
  <div class="padding-navbar pt-5">
    <ul class="list-group">
      <li
        @click="pushTo(item.id)"
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
              <h6 class="fw-bold">{{ item.price | toCurrency }}</h6>
            </div>
            <div class="col-6">
              <small>Tanggal</small>
              <h6>{{ item.created_at | ReadableDate }}</h6>
              <small>Status</small>
              <span v-if="item.status == 'capture'||item.status == 'settlement'" class="btn btn-warning text-white fw-bold d-block">
                Dalam Pengiriman
              </span>
              <span v-else-if="item.status == 'pending'||item.status == 'UNPAID'" class="btn btn-info text-white fw-bold d-block">
                Menunuggu di Bayar
              </span>
              <span v-else-if="item.status == 'finish'" >
                Selesai
              </span>
              <span v-else class="btn btn-danger text-white fw-bold d-block">
                Produk Gagal Dibeli
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
      this.$router.push('/orders/' + id)
    },
    async fetch() {
      await this.$axios.get('api/order').then((res) => {
        this.data = res.data
        console.log(this.data)
      })
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>
