<template>
  <div class="pt-5">
    <div class="w-100 padding-navbar d-flex justify-content-between">
      <span style="vertical-align: middle">
        <span>Dewostore</span>
        <span> / </span>
        <span class="text-primary">Petakan Product</span>
      </span>
      <nuxt-link to="/add_product" class="btn btn-outline-secondary border"
        >Tambah Product +</nuxt-link
      >
    </div>
    <div class="padding-navbar mb-3">
      <h6 class="fw-bold">Dewostore Seller</h6>
    </div>
    <div class="padding-navbar mb-5">
      <h6 class="fw-bold">Atur Product</h6>
    </div>
    <div class="padding-navbar">
      <div class="card border-0">
        <div class="px-0 card-header border-0 bg-white">
          <span class="border-bottom-blue"> Semua Product </span>
        </div>
        <div class="card-body px-0">
          <div class="w-100 d-flex justify-content-end mb-5">
            <div class="d-flex">
              <select v-model="category" class="form-control">
                <option value="" selected>Semua</option>
                <option
                  v-for="(item, index) in categorydata"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.nama }}
                </option>
              </select>
              <input
                type="search"
                v-model="title"
                placeholder="Nama Product"
                class="form-control"
              />
              <button @click="fetch" class="btn btn-secondary">Cari</button>
            </div>
          </div>
          <table class="w-100 table-d">
            <tr>
              <th>SKU</th>
              <th>Nama Produk</th>
              <th>Stok</th>
              <th>Harga Produk</th>
              <th>Aksi</th>
            </tr>
            <tr v-for="(item, index) in data.data" :key="index" class="border-bottom">
              <td>{{ item.sku }}</td>
              <td class="w-25">{{ item.title }}</td>
              <td>{{ item.in_stock }}</td>
              <td>{{ item.original_price | toCurrency }}</td>
              <td>
                <nuxt-link
                  :to="'/edit_product/'+item.id"
                  class="btn btn-primary text-white"
                >
                  Detail
                </nuxt-link>
              </td>
            </tr>
          </table>
          <div class="d-flex w-100 justify-content-end mt-3">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <button
                    @click="prev"
                    :disabled="loading"
                    class="btn btn-outline-secondary border"
                    href="#"
                  >
                    Previous
                  </button>
                </li>
                <li class="page-item">
                  <button class="page-link" href="#">
                    {{ data.current_page }}
                  </button>
                </li>
                <li class="page-item">
                  <button
                    @click="next"
                    :disabled="loading"
                    class="btn btn-outline-secondary border"
                    href="#"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      profile: true,
      product: false,
      loading: true,
      category: '',
      categorydata: [],
      title: '',
      name: '',
      email: '',
      password: '',
      page: 0,
      productData: {
        title: '',
        photo: null,
        description: '',
      },
      data: [],
      baseBe: 'localhost:8000/storage/',
    }
  },
  methods: {
    next() {
      if (this.page < this.data.last_page) {
        this.loading = true
        this.page++
        this.fetch()
      }
    },
    prev() {
      if (this.page > 1) {
        this.loading = true
        this.page--
        this.fetch()
      }
    },
    async fetch() {
      await this.$axios
        .get(
          'api/product?seller_id=' +
            this.$auth.user.id +
            '&title=' +
            this.title +
            '&page=' +
            this.page +
            '&category=' +
            this.category
        )
        .then((res) => {
          this.data = res.data
          this.loading = false
          console.log(this.data)
        })
    },
    async fetchCat() {
      await this.$axios.get('api/category').then((res) => {
        this.categorydata = res.data
      })
    },
    uploadFile() {
      this.productData.photo = this.$refs.file.files[0]
    },
    changeTab(change) {
      if (change === 'product') {
        this.product = true
        this.profile = false
      } else {
        this.profile = true
        this.product = false
      }
    },
    submit() {
      const formData = new FormData()
      for (const key in this.productData) {
        formData.append(key, this.productData[key])
      }
      const headers = { 'Content-Type': 'multipart/form-data' }
      this.$axios.post('api/product', formData, headers).then((res) => {})
    },
    deleteData(id) {
      this.loading = true
      this.$axios.delete('api/product/' + id).then((res) => {
        this.fetch()
      })
    },
  },
  mounted() {
    this.fetch()
    this.fetchCat()
  },
}
</script>
<style scoped>
tr td {
  padding-top: 20px;
  padding-right: 10px;
}
</style>
