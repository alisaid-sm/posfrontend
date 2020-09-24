<template>
  <div class="row">
      <a @click="cek"><p>CEKKKKKK</p></a>
      <p>{{dataproduk}}</p>
      <div class="col-12 text-center">
        <img src="../assets/img/food-and-restaurant.png" alt class="img-responsive img-fluid" />
        <p class="font-weight-bold h2 text-empty">Your cart is empty</p>
        <p class="text-please h5">Please add some items from the menu</p>
        <p>{{this.geting}}</p>
      </div>
      <div class="col-12 text-center">
        <div v-for="(item, index) in geting" :key="index">
          {{item}}
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      dataproduk: null
    }
  },
  props: ['geting'],
  methods: {
    cek () {
      this.geting = this.dataproduk
      console.log(this.geting)
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
