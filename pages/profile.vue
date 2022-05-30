<template>
  <div class="padding-navbar">
    <div class="d-flex justify-content-center pt-5 pb-3">
      <div class="text-center">
        <div class="photo-profile-big"></div>
        <h3 v-if="$auth.user">{{ $auth.user.name }}</h3>
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a
              class="nav-link text-dark"
              :class="profile ? 'active' : ''"
              @click="changeTab('profile')"
              aria-current="true"
              href="#"
              >Profile</a
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link text-dark"
              to="/product_seller"
              >Product</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link text-dark"
              to="/orders/list"
              >My Order</nuxt-link
            >
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="text-start" v-if="profile">
          <form action="">
            <div class="mb-3">
              <label class="form-label"> Name </label>
              <input
                type="text"
                class="form-control"
                v-model="name"
                placeholder="Masukan Nama"
              />
            </div>
            <div class="mb-3">
              <label class="form-label"> Email address </label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="name@example.com"
              />
            </div>
            <div class="mb-3">
              <label class="form-label"> Password </label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="name@example.com"
              />
            </div>
            <button class="btn btn-primary text-white">Save</button>
          </form>
        </div>
        <div class="text-start" v-if="product">
          <div class="row">
            <div class="col-md-6">
              <h3>Product Anda</h3>
            </div>
            <div class="col-md-6 d-flex justify-content-end">
              <div>
                <b-button v-b-modal.modal-xl variant="primary">
                  Tambah Product
                </b-button>

                <b-modal id="modal-xl" size="lg" title="Buat Product Baru">
                  <form @submit.prevent="submit">
                    <label>Foto Product</label>
                    <input
                      type="file"
                      class="form-control"
                      ref="file"
                      @change="uploadFile"
                    />
                    <label>Nama Product</label>
                    <input
                      type="text"
                      v-model="productData.title"
                      class="form-control"
                    />
                    <label>Deskripsi</label>
                    <textarea
                      v-model="productData.description"
                      cols="30"
                      rows="10"
                      class="form-control"
                    ></textarea>
                    <label>Stock</label>
                    <input
                      type="number"
                      v-model="productData.stock"
                      class="form-control"
                    />
                    <label>Harga</label>
                    <input
                      type="number"
                      v-model="productData.original_price"
                      class="form-control"
                    />
                    <button type="submit" class="btn btn-primary text-white">
                      Submit
                    </button>
                  </form>
                </b-modal>
              </div>
            </div>
            <div class="row">
              <div
                class="col-lg-3 col-md-6 pb-5"
                v-for="(item, index) in data"
                :key="index"
              >
                <div class="card shadow">
                  <img v-if="item.photo.includes('http')" :src="item.photo" />
                  <img v-else :src="baseBe + item.photo" />
                  <h6 class="px-3 pt-3">
                    {{ item.title }}
                  </h6>
                  <h6 class="p-3">
                    <strong>Rp. {{ item.original_price }}</strong>
                  </h6>
                  <button
                    :disabled="loading"
                    class="btn btn-danger"
                    @click="hapusProduct(item.id)"
                  >
                    Hapus Product
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div></div>
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
      name: '',
      email: '',
      password: '',
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
    async fetch() {
      await this.$axios
        .get('api/product?seller_id=' + this.$auth.user.id)
        .then((res) => {
          this.data = res.data.data
          console.log(this.data)
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
      this.$axios.post('api/product', formData, headers).then((res) => {
        console.log(res)
      })
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>
