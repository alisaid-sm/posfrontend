<template>
  <b-container fluid>
    <div class="row">
      <div class="col-lg-8 col-12"><Navbar @search='searchProducts' /></div>
      <div class="col-4 d-lg-block d-none"><Cartheader /></div>
    </div>
    <div class="row">
      <div class="col-md-1 col-sm-2 col-12"><Sidebar /></div>
      <div class="col-lg-7 col-sm-10 col-12 content">
          <div class="row">
            <div class="col-sm-4 col-6 content1" v-for="(item, index) in products" :key="index">
              <Product :item='item' :index='index' @delproduct='hapusProduct' @updproduct='updateGet'/>
            </div>
          </div>
      </div>
      <div class="shadow col-4 d-none d-lg-inline-block"><Cart /></div>
    </div>
    <b-sidebar id="sidebar-right" bg-variant="white" width="100%" right shadow>
      <div class="px-3 py-2">
        <div class="col-12"><Cartheader /></div>
        <div class="col-12"><Cart /></div>
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
import Cart from '@/components/Cart.vue'
import Cartheader from '@/components/Cartheader.vue'
import Product from '@/components/Product.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    Cart,
    Cartheader,
    Product
  },
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
      products: null,
      search: null,
      sort: '',
      sorttype: ''
    }
  },
  methods: {
    getAll () {
      axios
        .get('http://localhost:3000/api/v1/product/getall')
        .then((response) => {
          console.log(response.data.data)
          this.products = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    viewProducts (data) {
      this.products = data
    },
    searchProducts (search) {
      // console.log(search)
      axios
        .get(`http://localhost:3000/api/v1/product/getall?search=${search}`)
        .then((response) => {
          this.viewProducts(response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sortProducts () {
      axios
        .get(`http://localhost:3000/api/v1/product/getall?sort=${this.sort}&sorttype=${this.sorttype}`)
        .then((response) => {
          this.viewProducts(response.data.data)
          // console.log(response.data.data[0].name)
        })
        .catch((error) => console.log(error))
    },
    prosesFile (event) {
      this.form.image = event.target.files[0]
      console.log(this.form.image)
    },
    addProducts () {
      // alert('Simpan')
      const fd = new FormData()
      fd.append('name', this.form.name)
      fd.append('price', this.form.price)
      fd.append('id_category', this.form.category)
      fd.append('image', this.form.image)
      // console.log(fd)
      axios
        .post('http://localhost:3000/api/v1/product/insert', fd)
        .then((response) => {
          this.$toast.success('Sukses Masuk Menu', {
            type: 'success',
            position: 'top-right',
            duration: 3000,
            dismissible: true
          })
          console.log(response)
          setTimeout(() => {
            this.getAll()
          }, 2000)
        })
        .catch((error) => console.log(error))
    },
    updateGet (id, index) {
      // console.log(`${id} ${index}`)
      this.formupd.id = id
      this.formupd.name = this.products[index].name
      this.formupd.price = this.products[index].price
      this.formupd.image = this.products[index].image
      this.formupd.category = this.products[index].id_category

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
      axios
        .patch(`http://localhost:3000/api/v1/product/updatepatch/${this.formupd.id}`, fd)
        .then((response) => {
          this.$toast.success('Sukses Update Menu', {
            type: 'success',
            position: 'top-right',
            duration: 3000,
            dismissible: true
          })
          console.log(response)
          setTimeout(() => {
            this.getAll()
          }, 2000)
        })
        .catch((error) => console.log(error))
    },
    hapusProduct (id) {
      var result = confirm('Want to delete?')

      if (result) {
        axios
          .delete('http://localhost:3000/api/v1/product/delete/' + id)
          .then((response) => {
            this.$toast.error('Sukses Hapus Keranjang', {
              type: 'error',
              position: 'top-right',
              duration: 3000,
              dismissible: true
            })
            console.log(response)
            setTimeout(() => {
              this.getAll()
            }, 2000)
          })
          .catch((error) => console.log(error))
      }
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/api/v1/product/getall')
      .then((response) => {
        this.viewProducts(response.data.data)
        // console.log(response.data.data[0].name)
      })
      .catch((error) => console.log(error))
  },
  updated () {
  }
}
</script>
