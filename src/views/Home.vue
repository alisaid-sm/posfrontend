<template>
  <b-container fluid>
    <div class="row">
      <div class="col-lg-8 col-12"><Navbar :totalcart="menuget.length" @search='searchProducts'/></div>
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
                @keyup="searchProducts"
              ></b-form-input>
          </b-collapse>
          </div>
        <div class="col-12 mt-3"><!-- <= Pagination -->
        <div class="row">
          <div class="col-6">
            <div class="row no-gutters mt-3">
              <div class="col-3">
                <b-form-input @change="page()" @keyup="page()" v-model="limit" type="number"  placeholder="Limit" ></b-form-input>
              </div>
              <div class="col-9" @click="page()">
                <b-pagination v-model="currentPage" :per-page="limit" :total-rows="rows"></b-pagination>
              </div>
            </div>
          </div>
          <div class="col-3 ml-auto"><!-- <= Sort BY -->
            <select v-model="sort" @change="sortProducts" class="form-control form-additem">
              <option selected :value="null">Sort by</option>
              <option :value="{sort: 'name', sorttype: 'asc'}">Name</option>
              <option :value="{sort: 'price', sorttype: 'asc'}">Price</option>
              <option :value="{sort: 'date', sorttype: 'asc'}">date</option>
              <option :value="{sort: 'name', sorttype: 'desc'}">Name DESC</option>
              <option :value="{sort: 'price', sorttype: 'desc'}">Price DESC</option>
              <option :value="{sort: 'date', sorttype: 'desc'}">date DESC</option>
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
                                                <button @click="kurang(item.id_product)" type="button"
                                                    class="btn btn-primary btn-block button-checkout min-cart">-</button>
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-4">
                                                <p class="num-cart">{{item.qty}}</p>
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-4 ">
                                                <button @click="tambah(item.id_product)" type="button"
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
                            <p class="font-weight-bold h5 float-right">Rp. {{jumlahtr}}</p>
                        </div>
                        <!-- button checkout -->
                        <div class="shadow col-12 mb-3">
                            <button type="button" class="shadow btn btn-primary btn-block button-checkout" data-toggle="modal"
                                data-target="#myModal">Checkout</button>
                            <button type="button" @click="cancel()" class="shadow btn btn-primary btn-block button-cancelcart">Cancel</button>
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
        <form @submit.prevent='addProducts' enctype="multipart/form-data">
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
              <b-button type="submit" class="btn btn-primary button-add font-weight-bold">Update</b-button>
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
      sort: null,
      sorttype: '',
      menuget: [],
      priceget: [],
      jumlahharga: [],
      jumlahtr: 0,
      currentPage: 1,
      rows: null,
      limit: ''
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
      actionUpdateProduct: 'product/updateProduct',
      actionSearchProduct: 'product/searchProduct',
      actionSortProduct: 'product/sortProduct'
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
          if (response === 'image type must jpg, jpeg, or png') {
            alert(response)
          } else if (response === 'File too large, max size 100kb') {
            alert(response)
          } else {
            alert(response)
            window.location = '/'
          }
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

      console.log(this.formupd.image)
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
          console.log(response)
          if (response === 'image type must jpg, jpeg, or png') {
            alert(response)
          } else if (response === 'File too large, max size 100kb') {
            alert(response)
          } else {
            alert(response)
            window.location = '/'
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    searchProducts () {
      // console.log(this.search)
      this.$router.push({ path: '/', query: { search: this.search } })
      this.actionSearchProduct(this.search)
    },
    sortProducts () {
      // console.log(this.search)
      this.$router.push({ path: '/', query: { sort: this.sort.sort, sorttype: this.sort.sorttype } })
      this.actionSortProduct(this.sort)
    },
    getMenu (id) {
      const menuget = this.menuget.filter((e) => e.id_product === id)
      if (menuget.length === 0) {
        const data = this.products.data.filter((e) => e.id_product === id)
        data[0].qty = 1
        this.menuget = [
          ...this.menuget, data[0]
        ]
        this.priceget = [
          ...this.priceget, data[0].price
        ]
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        this.jumlahtr = this.priceget.reduce(reducer)
      } else {
        this.changeMenuget(id, 'add')
      }
      // console.log(this.menuget)
    },
    kurang (id) {
      this.changeMenuget(id, 'min')
    },
    tambah (id) {
      this.changeMenuget(id, 'add')
    },
    changeMenuget (id, category) {
      const dataBaru = this.menuget.map((e, i) => {
        if (e.id_product === id) {
          if (category === 'add') {
            e.qty += 1
            console.log(`${this.priceget[i]}*${e.qty}`)
            e.price = this.priceget[i] * e.qty
          } else if (category === 'min') {
            e.qty -= 1
            console.log(`${this.priceget[i]}*${e.qty}`)
            e.price = this.priceget[i] * e.qty
          }
        }
        return e
      })
      this.menuget = dataBaru
    },
    page () {
      const payload = {
        limit: this.limit,
        page: this.currentPage
      }
      this.$router.push({ path: '/', query: { limit: this.limit, page: this.currentPage } })
      this.actionGetAllProduct(payload)
        .then((result) => {
          this.rows = result.meta.totalRows
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cancel () {
      window.location = '/'
    }
  },
  mounted () {
    this.actionGetAllProduct({ limit: '', page: '' })
      .then((result) => {
        this.rows = result.meta.totalRows
      })
      .catch((err) => {
        console.log(err)
      })
    this.products = this.allProducts
  }
}
</script>
