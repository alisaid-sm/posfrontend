<template>
  <div class="row app-header align-items-center">
    <div class="col-2" v-if="$route.path === '/'"><img src="../assets/img/menu (1).png" alt="" class="img-responsive img-fluid ml-3"></div>
    <div class="col-8 text-center" v-if="$route.path === '/'"><p class="font-weight-bold h2">Food Items</p></div>
    <div class="col-2 text-right d-flex justify-content-end" v-if="$route.path === '/'">
    <b-nav-form class="d-md-block d-none">
      <b-form-input
        size="sm"
        class="mr-sm-2"
        placeholder="Search"
        v-model="searchkey"
        @keyup="searchProducts"
      ></b-form-input>
    </b-nav-form>
    <img src="../assets/img/magnifying-glass.png" alt="" class="img-responsive img-fluid mr-4">
    </div>
    <div class="col-1" v-if="$route.path === '/history'">Navbar</div>
    <div class="col-11" v-if="$route.path === '/history'">Navbar</div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      searchkey: null
    }
  },
  methods: {
    searchProducts () {
      this.$emit('search', this.searchkey)
    }
  }
}
</script>

<style>

</style>
