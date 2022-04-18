<template>
  <div class="main-page pt-5">
    <h3>Keranjang Belanja</h3>
    <div v-for="(item,index) in data" :key="index" class="card border-0">
      <div class="card my-3" v-for="(it,ix) in item.cart_product" :key="ix" >
        <div class="d-flex">
          <img style="width:100px" :src="it.product.photo" alt="" srcset="">
          <div class="ms-5">
            <strong>{{it.product.title}}</strong>
            <p>Rp. {{it.product.original_price}}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-success">Checkout</button>
      <button @click="deleteData" class="btn btn-danger">delete</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      loading:false,
    }
  },
  methods: {
    async fetch() {
      await this.$axios.get('api/cart').then((res) => {
        this.data = res.data
        console.log(this.data)
      })
    },
    deleteData(){
      this.data.forEach(element => {
        this.$axios.delete('api/cart/'+element.id).then((res) => {
          this.data = res.data
          console.log(this.data)
        })
      });
    }
  },
  mounted() {
    this.fetch()
  },
}
</script>

