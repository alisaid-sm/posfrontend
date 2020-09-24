<template>
  <div class="row">
      <div class="col-12 text-center">
        <img
          src="../assets/img/fork.png"
          alt
          class="img-responsive img-fluid d-inline-block d-sm-flex justify-content-center mt-3 mt-sm-5 mb-3 mr-4 mr-sm-0 ml-4 ml-sm-3"
        />
        <router-link to="/history" v-if="$route.path === '/'">
          <img
          src="../assets/img/clipboard.png"
          alt
          class="img-responsive img-fluid d-inline-block d-sm-flex justify-content-center mt-3 mt-sm-5 mb-3 mr-4 mr-sm-0 ml-0 ml-sm-3"
        />
        </router-link>
        <router-link to="/" v-else>
          <img
          src="../assets/img/clipboard.png"
          alt
          class="img-responsive img-fluid d-inline-block d-sm-flex justify-content-center mt-3 mt-sm-5 mb-3 mr-4 mr-sm-0 ml-0 ml-sm-3"
        />
        </router-link>

        <a v-b-modal.modal-1>
          <img
            src="../assets/img/add.png"
            alt
            class="img-responsive img-fluid d-inline-block d-sm-flex justify-content-center mt-3 mt-sm-5 mb-3 mr-4 mr-sm-0 ml-0 ml-sm-3"
          />
        </a>
        <a v-b-toggle.sidebar-right
          class="img-fluid d-inline-block d-sm-flex d-lg-none mt-3 mt-sm-5 mb-3 mr-4 mr-sm-0 ml-0 ml-sm-3 button-slider"
        >
          <b-icon icon="cart4" font-scale="3.5" style="vertical-align: middle;"></b-icon>
          <span class="number-cart shadow" style="margin-left: -37px;">{{totalcart}}</span>
        </a>
        <a class="img-fluid d-inline-block d-sm-flex mt-3 mt-sm-5 mb-3 mr-4 mr-sm-0 ml-0 ml-sm-3" @click="onLogout()">
          <b-icon icon="box-arrow-right" font-scale="3.5" style="vertical-align: middle;"></b-icon>
        </a>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Sidebar',
  props: ['totalcart'],
  methods: {
    ...mapActions({
      actionLogout: 'auth/logout'
    }),
    onLogout () {
      this.actionLogout().then((resolve) => {
        alert(resolve)
        window.location = '/login'
      })
    }
  }
}
</script>

<style>

</style>
