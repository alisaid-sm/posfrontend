<template>
  <b-container fluid>
    <div class="row">
      <div class="col-lg-8 col-12"><Navbar /></div>
      <div class="col-4 d-lg-block d-none"><Cartheader /></div>
    </div>
    <div class="row">
      <div class="col-sm-1 col-12"><Sidebar /></div>
      <div class="col-lg-7 col-sm-11 col-12">
          <div class="row">
            <div class="shadow col-sm-4 col-6">Product</div>
            <div class="shadow col-sm-4 col-6">Product</div>
            <div class="shadow col-sm-4 col-6">Product</div>
          </div>
      </div>
      <div class="col-4 d-lg-block d-none"><Cart /></div>
    </div>
    <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
      <div class="px-3 py-2">
        <div class="col-12"><Cartheader /></div>
        <div class="col-12"><Cart /></div>
      </div>
    </b-sidebar>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Cart from '@/components/Cart.vue'
import Cartheader from '@/components/Cartheader.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    Cart,
    Cartheader
  }
}
</script>
