<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12"><Navbar /></div>
    </div>
    <div class="row">
      <div class="col-md-1 col-sm-2 col-12"><Sidebar /></div>
      <div class="col-md-11 col-sm-10">
        <div class="row mt-2 mt-sm-3 mb-3">
          <div class="col-md-4 mb-lg-0 mb-3">
            <div class="w-100 db1 position-relative">
              <div class="circle11 position-absolute"></div>
              <div class="circle12 position-absolute"></div>
              <div class="circle13 position-absolute"></div>
              <div class="row d-flex h-100 align-items-center">
                <div class="col-12 pl-5">
                  <p class="font-weight-bold h6">Today’s Income</p>
                  <p class="font-weight-bold h2">Rp. 1.000.000</p>
                  <p class="font-weight-bold h6">+2% Yesterday</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-lg-0 mb-3">
            <div class="w-100 db2 position-relative">
              <div class="circle21 position-absolute"></div>
              <div class="circle22 position-absolute"></div>
              <div class="circle23 position-absolute"></div>
              <div class="row d-flex h-100 align-items-center">
                <div class="col-12 pl-5">
                  <p class="font-weight-bold h6">Orders</p>
                  <p class="font-weight-bold h2">3.270</p>
                  <p class="font-weight-bold h6">+5% Last Week</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-lg-0 mb-3">
            <div class="w-100 db3 position-relative">
              <div class="circle31 position-absolute"></div>
              <div class="circle32 position-absolute"></div>
              <div class="circle33 position-absolute"></div>
              <div class="row d-flex h-100 align-items-center">
                <div class="col-12 pl-5">
                  <p class="font-weight-bold h6">This Year’s Income</p>
                  <p class="font-weight-bold h2">Rp. 100.000.000.000</p>
                  <p class="font-weight-bold h6">+10% Last Year</p>
                </div>
              </div>
            </div>
          </div>
          <div class="shadow col-12 img-fluid app-chart m-3">
            <p class="font-weight-bold h2 mt-3 float-left">Revenue</p>
            <div class="dropdown float-right mt-3 mr-3">
              <a
                class="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Month</a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item" href="#">Today</a>
                <a class="dropdown-item" href="#">Week</a>
              </div>
            </div>
            <!-- <Chart></Chart> -->
          </div>
          <div class="shadow col-12 m-3">
            <p class="font-weight-bold h2 mt-3 float-left">Recent Order</p>
            <div class="dropdown float-right mt-3 mr-3">
              <a
                class="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Today</a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item" href="#">Week</a>
                <a class="dropdown-item" href="#">Month</a>
              </div>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">INVOICES</th>
                  <th scope="col">CASHIER</th>
                  <th scope="col">DATE</th>
                  <th scope="col">ORDERS</th>
                  <th scope="col">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="history in historys" :key="history.id_history">
                  <th scope="row">{{history.invoices}}</th>
                  <td>{{history.cashier}}</td>
                  <td>{{history.date}}</td>
                  <td>{{history.orders}}</td>
                  <td>{{history.amount}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import axios from 'axios'
// import Chart from '@/components/Chart.vue'

export default {
  name: 'History',
  components: {
    Navbar,
    Sidebar
    // Chart
  },
  data: function () {
    return {
      historys: null
    }
  },
  methods: {
  },
  mounted () {
    axios
      .get('http://localhost:3000/api/v1/history/getall')
      .then((response) => {
        // handle success
        this.historys = response.data.data
      })
  }
}
</script>
