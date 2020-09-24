<template>
  <b-container fluid>
    <div class="row">
      <div class="col-lg-8 col-12"><Navbar :totalcart="menuget.length"/></div>
      <div class="col-4 d-lg-block d-none"><Cartheader :totalcart="menuget.length"/></div>
    </div>
    <div class="row">
      <div class="col-md-1 col-sm-2 col-12 app-sidebar"><Sidebar/></div>
      <div class="col-lg-7 col-sm-10 col-12 content">
        <div class="col-12 d-block d-md-none">
          <b-collapse id="collapse-1" class="mt-2"> <!-- <= Search Ukuran HP/Tab -->
              <b-form-input
                size="lg"
                placeholder="Search"
                v-model="search"
              ></b-form-input>
          </b-collapse>
          </div>
        <div class="col-12 mt-3"><!-- <= Sort BY -->
            <div class="row justify-content-end">
              <div class="col-md-3 col-4">
                <select v-model="sort" class="form-control form-additem">
                  <option selected value="">Sort by</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="date">date</option>
                </select>
              </div>
              <div class="col-md-2 col-3">
                <select v-model="sorttype" class="form-control form-additem">
                  <option selected value=''>ASC</option>
                  <option value="DESC">DESC</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row"> <!-- <= Card Product -->
            <div class="col-12 text-center" v-if="allProducts.isLoading">
              <h1>Loading...</h1>
            </div>
            <div v-else class="col-sm-4 col-6 content1" v-for="(item, index) in allProducts.data" :key="index">
              <Product :item='item' :index='index' @getmenu='getMenu' @delproduct='delProduct' @updproduct='updateGet'/>
            </div>
          </div>
      </div>
      <div class="shadow col-4 d-none d-lg-inline-block">
        <div class="row"> <!-- <= Halaman Cart -->
          <div class="col-12 text-center">
              <div v-if="menuget.length <= 0" >
                <img src="../assets/img/food-and-restaurant.png" alt class="img-responsive img-fluid" />
                <p class="font-weight-bold h2 text-empty">Your cart is empty</p>
                <p class="text-please h5">Please add some items from the menu</p>
              </div>
              <div v-else>
                <div v-for="(item, index) in menuget" :key="index" >
                <div class="col-md-12 col-sm-12 col-12 pt-4 pr-4 pl-4">
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-3 image-cart">
                                <img class="img-responsive img-fluid rounded-sm ml-2" v-bind:src="`${IP}/`+ item.image">
                            </div>
                            <div class="col-md-9 col-sm-9 col-9">
                                <p class="font-weight-bold h5 mb-4 ml-2">{{item.name}}</p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-6">
                                        <div class="row no-gutters ml-2">
                                            <div class="col-md-4 col-sm-4 col-4 ">
                                                <button type="button"
                                                    class="btn btn-primary btn-block button-checkout min-cart">-</button>
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-4">
                                                <p class="num-cart">1</p>
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-4 ">
                                                <button type="button"
                                                    class="btn btn-primary btn-block button-checkout plus-cart">+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-6">
                                        <p class="font-weight-bold h6 float-right mt-2">{{item.price}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row checkout">
                        <!-- details -->
                        <div class="col-md-6 col-sm-6 col-6">
                            <p class="font-weight-bold h5">Total :</p>
                            <p class="h6">*Belum termasuk ppn</p>
                        </div>
                        <!-- price -->
                        <div class="col-md-6 col-sm-6 col-6">
                            <p class="font-weight-bold h5 float-right">Rp. 148.000*</p>
                        </div>
                        <!-- button checkout -->
                        <div class="shadow col-12 mb-3">
                            <button type="button" class="shadow btn btn-primary btn-block button-checkout" data-toggle="modal"
                                data-target="#myModal">Checkout</button>
                            <button type="button" class="shadow btn btn-primary btn-block button-cancelcart">Cancel</button>
                        </div>
                        <!-- button cancel -->
                        <!-- <div class="shadow col-12 mb-3">
                        </div> -->
                    </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <b-sidebar id="sidebar-right" bg-variant="white" width="100%" right shadow>
      <div class="px-3 py-2"> <!-- <= Halaman Cart Ukuran HP -->
        <div class="col-12"><Cartheader/></div>
        <div class="col-12">
          <div class="row">
            <div class="col-12 text-center">
              <div>
                <img src="../assets/img/food-and-restaurant.png" alt class="img-responsive img-fluid" />
                <p class="font-weight-bold h2 text-empty">Your cart is empty</p>
                <p class="text-please h5">Please add some items from the menu</p>
              </div>
              <div class="d-none">
                <div>
                <div class="col-md-12 col-sm-12 col-12 pt-4 pr-4 pl-4">
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-3 image-cart">
                                <img class="img-responsive img-fluid rounded-sm ml-2">
                            </div>
                            <div class="col-md-9 col-sm-9 col-9">
                                <p class="font-weight-bold h5 mb-4 ml-2"></p>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-6">
                                        <div class="row no-gutters ml-2">
                                            <div class="col-md-4 col-sm-4 col-4 ">
                                                <button type="button"
                                                    class="btn btn-primary btn-block button-checkout min-cart">-</button>
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-4">
                                                <p class="num-cart">1</p>
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-4 ">
                                                <button type="button"
                                                    class="btn btn-primary btn-block button-checkout plus-cart">+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-6">
                                        <p class="font-weight-bold h6 float-right mt-2"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-sidebar>
    <b-modal id="modal-1" size="lg" centered hide-header hide-footer>
      <div class="m-4">
        <p class="font-weight-bold h3 mb-5">Add Item</p>
        <form @submit.prevent='addProducts'>
          <div class="form-group row font-weight-bold">
            <label for="name" class="col-sm-2 col-form-label col-form-label-lg">Name</label>
            <div class="col-sm-10">
              <input type="text" v-model="form.name" class="form-control form-control-lg form-additem" id="name" required/>
            </div>
          </div>
          <div class="form-group row font-weight-bold">
            <label for="image" class="col-sm-2 col-form-label col-form-label-lg">Image</label>
            <div class="col-sm-10">
              <input type="file" @change="prosesFile($event)" class="form-control form-control-lg form-additem" id="image" required/>
            </div>
          </div>
          <div class="form-group row font-weight-bold">
            <label for="price" class="col-sm-2 col-form-label col-form-label-lg">Price</label>
            <div class="col-sm-5">
              <input type="number" v-model="form.price" class="form-control form-control-lg form-additem" id="price" required/>
            </div>
          </div>
          <div class="form-group row font-weight-bold">
            <label for="category" class="col-sm-2 col-form-label col-form-label-lg">Category</label>
            <div class="col-sm-3">
              <select class="form-control form-control-lg form-additem" v-model="form.category" id="category" required>
                <option selected :value='null'>Category</option>
                <option :value='1'>Food</option>
                <option :value='2'>Drink</option>
              </select>
            </div>
          </div>
          <div class="form-group row float-md-right float-sm-none float-none">
            <div class="col-sm-12">
              <b-button type="reset" class="btn btn-primary button-cancel font-weight-bold mr-3 ml-5">Cancel</b-button>
              <b-button type="submit" class="btn btn-primary button-add font-weight-bold">Add</b-button>
            </div>
          </div>
        </form>
      </div>
    </b-modal>
    <b-modal id="modal-2" size="lg" centered hide-header hide-footer>
      <div class="m-4">
        <p class="font-weight-bold h3 mb-5">Update Item</p>
        <form @submit.prevent='updateProduct' enctype="multipart/form-data">
          <div class="form-group row font-weight-bold">
            <label for="name" class="col-sm-2 col-form-label col-form-label-lg">Name</label>
            <div class="col-sm-10">
              <input type="text" v-model="formupd.name" class="form-control form-control-lg form-additem" id="name" required/>
            </div>
          </div>
          <div class="form-group row font-weight-bold">
            <label for="image" class="col-sm-2 col-form-label col-form-label-lg">Image</label>
            <div class="col-sm-10">
              <input type="file" @change="prosesFile($event)" class="form-control form-control-lg form-additem" id="image"/>
            </div>
          </div>
          <div class="form-group row font-weight-bold">
            <label for="price" class="col-sm-2 col-form-label col-form-label-lg">Price</label>
            <div class="col-sm-5">
              <input type="number" v-model="formupd.price" class="form-control form-control-lg form-additem" id="price" required/>
            </div>
          </div>
          <div class="form-group row font-weight-bold">
            <label for="category" class="col-sm-2 col-form-label col-form-label-lg">Category</label>
            <div class="col-sm-3">
              <select class="form-control form-control-lg form-additem" v-model="formupd.category" id="category" required>
                <option selected :value='null'>Category</option>
                <option :value='1'>Food</option>
                <option :value='2'>Drink</option>
              </select>
            </div>
          </div>
          <div class="form-group row float-md-right float-sm-none float-none">
            <div class="col-sm-12">
              <b-button type="reset" class="btn btn-primary button-cancel font-weight-bold mr-3 ml-5">Cancel</b-button>
              <b-button type="submit" class="btn btn-primary button-add font-weight-bold">Add</b-button>
            </div>
          </div>
        </form>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Cartheader from '@/components/Cartheader.vue'
import Product from '@/components/Product.vue'

// import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import env from '../mixins/env'
export default {
  name: 'Home',
  mixins: [env],
  data () {
    return {
      form: {
        name: null,
        price: null,
        category: null,
        image: null
      },
      formupd: {
        id: null,
        name: null,
        price: null,
        category: null,
        image: null
      },
      products: [],
      search: null,
      sort: '',
      sorttype: '',
      menuget: []
    }
  },
  components: {
    Navbar,
    Sidebar,
    Cartheader,
    Product
  },
  computed: {
    ...mapGetters({
      allProducts: 'product/getAllProduct'
    })
  },
  methods: {
    ...mapActions({
      actionGetAllProduct: 'product/getAllProduct',
      actionAddProduct: 'product/addProduct',
      actionDelProduct: 'product/delProduct',
      actionUpdateProduct: 'product/updateProduct'
    }),
    prosesFile (event) {
      this.form.image = event.target.files[0]
      console.log(this.form.image)
    },
    addProducts () {
      const fd = new FormData()
      fd.append('name', this.form.name)
      fd.append('price', this.form.price)
      fd.append('id_category', this.form.category)
      fd.append('image', this.form.image)
      console.log(fd)
      this.actionAddProduct(fd)
        .then((response) => {
          alert(response)
          window.location = '/'
        }).catch((err) => {
          console.log(err)
        })
    },
    delProduct (id) {
      var result = confirm('Want to delete?')

      if (result) {
        console.log(id)
        this.actionDelProduct(id)
          .then((response) => {
            alert(response)
            window.location = '/'
          }).catch((err) => {
            console.log(err)
          })
      }
    },
    updateGet (id, index) {
      // console.log(`${id} ${index}`)
      // console.log(this.products.data[index])
      this.formupd.id = id
      this.formupd.name = this.products.data[index].name
      this.formupd.price = this.products.data[index].price
      this.formupd.image = this.products.data[index].image
      this.formupd.category = this.products.data[index].id_category

      console.log(this.formupd)
    },
    updateProduct () {
      // console.log(id)
      // alert('update')
      const fd = new FormData()
      fd.append('name', this.formupd.name)
      fd.append('price', this.formupd.price)
      fd.append('id_category', this.formupd.category)
      fd.append('image', this.form.image)
      const payload = {
        id: this.formupd.id,
        data: fd
      }
      this.actionUpdateProduct(payload)
        .then((response) => {
          alert(response)
          window.location = '/'
        }).catch((err) => {
          console.log(err)
        })
    },
    getMenu (id) {
      console.log(this.products.data)
      const data = this.products.data.filter((e) => e.id_product === id)
      this.menuget = [
        ...this.menuget, data[0]
      ]
      console.log(this.menuget)
    }
  },
  mounted () {
    this.actionGetAllProduct()
    this.products = this.allProducts
  }
  // methods: {
  //   getMenu (id) {
  //     // console.log(menu)
  //     const data = this.products.filter((e) => e.id_product === id)
  //     this.menuget = [
  //       ...this.menuget, data[0]
  //     ]
  //     console.log(this.menuget.length)
  //   },
  //   getAll () {
  //     axios
  //       .get('http://34.228.247.42:3000/api/v1/product/getall')
  //       .then((response) => {
  //         console.log(response.data.data)
  //         this.products = response.data.data
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   },
  //   viewProducts (data) {
  //     this.products = data
  //   },
  //   searchProducts (searchkey) {
  //     // console.log(searchkey)
  //     // console.log(this.search)
  //     axios
  //       .get(`http://34.228.247.42:3000/api/v1/product/getall?search=${searchkey}`)
  //       .then((response) => {
  //         this.viewProducts(response.data.data)
  //       })
  //       .catch((error) => {
  //         console.log('coba' + error)
  //       })
  //   },
  //   searchProduct () {
  //     // console.log(searchkey)
  //     // console.log(this.search)
  //     axios
  //       .get(`http://34.228.247.42:3000/api/v1/product/getall?search=${this.search}`)
  //       .then((response) => {
  //         this.viewProducts(response.data.data)
  //       })
  //       .catch((error) => {
  //         console.log('coba' + error)
  //       })
  //   },
  //   sortProducts () {
  //     axios
  //       .get(`http://34.228.247.42:3000/api/v1/product/getall?sort=${this.sort}&sorttype=${this.sorttype}`)
  //       .then((response) => {
  //         this.viewProducts(response.data.data)
  //         // console.log(response.data.data[0].name)
  //       })
  //       .catch((error) => console.log(error))
  //   },
  //   prosesFile (event) {
  //     this.form.image = event.target.files[0]
  //     console.log(this.form.image)
  //   },
  //   addProducts () {
  //     // alert('Simpan')
  //     const fd = new FormData()
  //     fd.append('name', this.form.name)
  //     fd.append('price', this.form.price)
  //     fd.append('id_category', this.form.category)
  //     fd.append('image', this.form.image)
  //     // console.log(fd)
  //     axios
  //       .post('http://34.228.247.42:3000/api/v1/product/insert', fd)
  //       .then((response) => {
  //         this.$toast.success('Sukses Masuk Menu', {
  //           type: 'success',
  //           position: 'top-right',
  //           duration: 3000,
  //           dismissible: true
  //         })
  //         console.log(response)
  //         setTimeout(() => {
  //           this.getAll()
  //         }, 2000)
  //       })
  //       .catch((error) => console.log(error))
  //   },
  //   updateGet (id, index) {
  //     // console.log(`${id} ${index}`)
  //     this.formupd.id = id
  //     this.formupd.name = this.products[index].name
  //     this.formupd.price = this.products[index].price
  //     this.formupd.image = this.products[index].image
  //     this.formupd.category = this.products[index].id_category

  //     console.log(this.formupd.image)
  //   },
  //   updateProduct () {
  //     // console.log(id)
  //     // alert('update')
  //     const fd = new FormData()
  //     fd.append('name', this.formupd.name)
  //     fd.append('price', this.formupd.price)
  //     fd.append('id_category', this.formupd.category)
  //     fd.append('image', this.form.image)
  //     axios
  //       .patch(`http://34.228.247.42:3000/api/v1/product/updatepatch/${this.formupd.id}`, fd)
  //       .then((response) => {
  //         this.$toast.success('Sukses Update Menu', {
  //           type: 'success',
  //           position: 'top-right',
  //           duration: 3000,
  //           dismissible: true
  //         })
  //         console.log(response)
  //         setTimeout(() => {
  //           this.getAll()
  //         }, 2000)
  //       })
  //       .catch((error) => console.log(error))
  //   },
  //   hapusProduct (id) {
  //     var result = confirm('Want to delete?')

  //     if (result) {
  //       axios
  //         .delete('http://34.228.247.42:3000/api/v1/product/delete/' + id)
  //         .then((response) => {
  //           this.$toast.error('Sukses Hapus Keranjang', {
  //             type: 'error',
  //             position: 'top-right',
  //             duration: 3000,
  //             dismissible: true
  //           })
  //           console.log(response)
  //           setTimeout(() => {
  //             this.getAll()
  //           }, 2000)
  //         })
  //         .catch((error) => console.log(error))
  //     }
  //   }
  // },
  // mounted () {
  //   axios
  //     .get('http://34.228.247.42:3000/api/v1/product/getall')
  //     .then((response) => {
  //       this.viewProducts(response.data.data)
  //       // console.log(response.data.data[0].name)
  //     })
  //     .catch((error) => console.log(error))
  // },
  // updated () {
  // }
}
</script>
