<template>
  <div class="pt-5">
    <form @submit.prevent="submit">
      <div class="w-100 padding-navbar d-flex justify-content-between mb-5">
        <span style="vertical-align: middle">
          <span>Dewostore</span>
          <span> / </span>
          <span>Petakan Product</span>
          <span> / </span>
          <span class="text-primary"> Tambah Product </span>
        </span>
      </div>
      <div class="padding-navbar">
        <div class="card border-0">
          <div class="card-body px-0">
            <div class="row mb-5">
              <div class="col-md-4">
                <h6 class="fw-bold">Dewostore</h6>
                <p class="text-secondary">
                  Anda dapat membuat produk baru untuk dimasukkan kedalam majoo
                  atau memilih produk yang sudah ada dari majoo
                </p>
              </div>
              <div class="col-md-8">
                <div class="card border-0 p-3 shadow-sm">
                  <div class="row">
                    <div class="col-3">
                      <img
                        v-if="preview_list.length > 0"
                        class="w-100"
                        :src="preview_list[0]"
                        alt=""
                        srcset=""
                      />
                    </div>
                    <div class="col-5">
                      <span class="text-secondary">{{ data.sku }}</span>
                      <h6 class="fw-bold">{{ data.title }}</h6>
                    </div>
                    <div class="col-4">
                      <span class="fw-bold">
                        {{ data.original_price | toCurrency }}
                      </span>
                    </div>
                  </div>
                  <div class="row border-top p-3">
                    <div class="d-flex w-100 justify-content-end">
                      <div class="d-flex flex-column">
                        <span>Stock</span>
                        <input
                          v-model="data.stock"
                          type="number"
                          class="form-control"
                        />
                        <button
                          type="button"
                          class="btn btn-primary text-white"
                          @click="updateStock"
                        >
                          Update Stock
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <h6 class="fw-bold">Upload Gambar</h6>
                <p>
                  Format gambar .jpg .jpeg .png dengan ukuran minimum 300 x
                  300px (Untuk gambar optimal gunakan ukuran minimum 700 x 700
                  px).
                </p>
              </div>
              <div class="col-md-8">
                <div class="d-flex">
                  <template v-if="preview_list.length">
                    <div v-for="(item, index) in preview_list" :key="index">
                      <div
                        class="bg-light border border-2 me-2"
                        style="
                          height: 150px;
                          width: 150px;
                          background-size: contain;
                          background-repeat: no-repeat;
                        "
                        :style="{ backgroundImage: 'url(' + item + ')' }"
                      ></div>
                      <div v-if="index == 0">
                        <span>Foto Utama</span>
                        <span class="text-danger">*</span>
                      </div>
                      <!-- <img :src="item" class="img-fluid" />
                    <p class="mb-0">file name: {{ image_list[index].name }}</p>
                    <p>size: {{ image_list[index].size / 1024 }}KB</p> -->
                    </div>
                  </template>
                  <div
                    class="bg-light border border-2"
                    @click="clickAddFile"
                    style="
                      height: 150px;
                      width: 150px;
                      border-style: dashed !important;
                    "
                  >
                    <div class="w-100 h-100" style="position: relative">
                      <i
                        class="fa-solid fa-images text-secondary absolute-center"
                        >+</i
                      >
                      <div style="visibility: hidden">
                        <input
                          type="file"
                          id="productImg"
                          accept="image/*"
                          multiple="multiple"
                          @change="previewMultiImage"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <h6 class="fw-bold">Video URL</h6>
                <p>
                  Tambah video agar pembeli semakin tertarik dengan produkmu.
                </p>
              </div>
              <div class="col-md-8">
                <div class="d-flex align-items-center h-100">
                  <input
                    required
                    type="text"
                    class="form-control"
                    v-model="data.videourl"
                    placeholder="Alamat Video Url"
                  />
                </div>
              </div>
            </div>
            <h5 class="fw-bold mb-5">Informasi Produk</h5>
            <div class="row mb-3">
              <div class="col-md-4">
                <h6 class="fw-bold">Nama Produk</h6>
                <p>
                  Nama min. 5 kata, terdiri dari jenis produk, merek, dan
                  keterangan seperti warna, bahan, atau tipe.
                </p>
              </div>
              <div class="col-md-8">
                <div class="d-flex align-items-center h-100">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nama Produk"
                    v-model="data.title"
                    minlength="6"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <div class="d-flex align-items-center h-100">
                  <h6 class="fw-bold">Kategori Produk</h6>
                </div>
              </div>
              <div class="col-md-8">
                <div class="d-flex align-items-center h-100">
                  <select
                    required
                    class="form-control"
                    v-model="data.category_id"
                  >
                    <option
                      v-for="(item, index) in category"
                      :key="index"
                      :value="item.id"
                    >
                      {{ item.nama }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <div class="d-flex align-items-center h-100">
                  <h6 class="fw-bold">Harga Produk</h6>
                </div>
              </div>
              <div class="col-md-8">
                <div class="d-flex align-items-center h-100">
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Rp.</span>
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="Harga"
                      aria-label="harga"
                      aria-describedby="basic-addon1"
                      v-model="data.original_price"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <div class="d-flex align-items-center h-100">
                  <h6 class="fw-bold">Stock</h6>
                </div>
              </div>
              <div class="col-md-8">
                <div class="d-flex align-items-center h-100">
                  <input
                    required
                    class="form-control"
                    type="number"
                    v-model="data.stock"
                    id=""
                  />
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <div class="d-flex align-items-center h-100">
                  <h6 class="fw-bold">SKU</h6>
                </div>
              </div>
              <div class="col-md-8">
                <div class="d-flex align-items-center h-100">
                  <input
                    required
                    class="form-control"
                    type="text"
                    v-model="data.sku"
                    id=""
                  />
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <h6 class="fw-bold">Deskripsi</h6>
                <p>
                  Pastikan deskripsi produk memuat spesifikasi, ukuran, bahan,
                  masa berlaku, dan lainnya. Semakin detail, semakin berguna
                  bagi pembeli.
                </p>
              </div>
              <div class="col-md-8">
                <div class="d-flex align-items-center h-100">
                  <textarea
                    class="form-control"
                    v-model="data.description"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <div class="d-flex align-items-center h-100">
                  <h6 class="fw-bold">Berat</h6>
                </div>
              </div>
              <div class="col-md-8">
                <div class="d-flex align-items-center h-100">
                  <div class="input-group">
                    <input
                      required
                      type="number"
                      class="form-control"
                      placeholder="Berat"
                      v-model="data.weight"
                    />
                    <button
                      class="btn fw-bold"
                      :class="[
                        weightKg
                          ? 'btn-primary text-white'
                          : 'btn-outline-secondary',
                      ]"
                      type="button"
                      @click="weightKg = true"
                    >
                      Kg
                    </button>
                    <button
                      class="btn fw-bold"
                      :class="[
                        !weightKg
                          ? 'btn-primary text-white'
                          : 'btn-outline-secondary',
                      ]"
                      type="button"
                      @click="weightKg = false"
                    >
                      gram
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-4">
                <div class="d-flex align-items-center h-100">
                  <h6 class="fw-bold">Asuransi</h6>
                </div>
              </div>
              <div class="col-md-8">
                <div class="d-flex align-items-center h-100">
                  <button
                    type="button"
                    @click="data.assurance = true"
                    class="btn w-50"
                    :class="[
                      !data.assurance
                        ? 'btn-outline-secondary'
                        : 'btn-primary text-white',
                    ]"
                  >
                    Ya
                  </button>
                  <button
                    type="button"
                    @click="data.assurance = false"
                    class="btn w-50"
                    :class="[
                      data.assurance
                        ? 'btn-outline-secondary'
                        : 'btn-primary text-white',
                    ]"
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted mb-5">
            <div class="d-flex justify-content-end">
              <nuxt-link
                to="/product_seller"
                type="button"
                class="btn btn-outline-secondary me-3"
                >Batal</nuxt-link
              >
              <button
                @click="deleteData($route.params.id)"
                type="button"
                class="btn btn-danger text-white me-3"
              >
                Hapus
              </button>
              <button class="btn btn-primary text-white">Simpan</button>
            </div>
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
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
      weightKg: true,
      category: [],
      data: {
        videourl: '',
        sku: '',
        original_price: 0,
        title: '',
        assurance: false,
        stock: '',
        weight: 0,
        description: '',
        category_id: '',
      },
    }
  },
  methods: {
    async fetch() {
      await this.$axios
        .get('api/product/' + this.$route.params.id)
        .then((res) => {
          this.data = res.data
          this.data.stock = this.data.in_stock
          this.data.videourl = this.data.video
        })
      await this.$axios.get('api/category').then((res) => {
        this.category = res.data
        console.log(this.category)
      })
    },
    deleteData(id) {
      this.loading = true
      this.$axios.delete('api/product/' + id).then((res) => {
        this.$router.push('/product_seller')
      })
    },
    clickAddFile() {
      document.getElementById('productImg').click()
    },
    previewMultiImage(event) {
      const input = event.target
      let count = input.files.length
      let index = 0
      if (input.files) {
        while (count--) {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.preview_list.push(e.target.result)
          }
          this.image_list.push(input.files[index])
          reader.readAsDataURL(input.files[index])
          index++
        }
      }
    },
    submit() {
      const formData = new FormData()
      for (const key in this.data) {
        formData.append(key, this.data[key])
      }
      this.image_list.forEach((element, index) => {
        formData.append('photo[' + index + ']', this.image_list[index])
      })
      const headers = { 'Content-Type': 'multipart/form-data' }
      this.$axios
        .post('api/product/' + this.$route.params.id, formData, headers)
        .then((res) => {
          this.$router.push('/product_seller')
        })
    },
    submitStock() {
      const formData = new FormData()
      formData.append('stock', this.data.stock)
      const headers = { 'Content-Type': 'multipart/form-data' }
      this.$axios
        .post('api/product/' + this.$route.params.id, formData, headers)
        .then((res) => {
          this.$router.push('/product_seller')
        })
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>
<style scoped>
h6 {
  margin-bottom: 0;
  vertical-align: middle;
}
</style>
