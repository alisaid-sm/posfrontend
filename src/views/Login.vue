<template>
  <div class="container-fluid d-flex justify-content-center align-items-center bg-light">
    <div class="title position-absolute"><h1>POS App</h1></div>
    <div class="p-3 shadow form-login">
      <form @submit.prevent='login'>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="form.email"
          />
          <small
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" v-model="form.password" id="exampleInputPassword1" />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary btn-block btn-login" v-backkolor="'#57CAD5'" >Login</button>
      </form>
      <p class="mt-3">Anda belum memiliki akun ? <router-link to="/register" v-kolor="'#29b2be'" >Daftar disini</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  directives: {
    kolor: {
      bind: (element, binding) => {
        element.style.color = binding.value
      }
    },
    backkolor: {
      bind: (element, binding) => {
        element.style.backgroundColor = binding.value
      }
    }
  },
  methods: {
    login () {
      this.actionLogin(this.form)
        .then((response) => {
          alert(response)
          window.location = '/'
        }).catch((err) => {
          alert(err)
        })
    },
    ...mapActions({
      actionLogin: 'auth/login'
    })
  }
}
</script>

<style>
.container-fluid{
  height: 100vh;
}
.btn-login{
    font-size: 20px !important;
    border-radius: 10px !important;
    border: none !important;
    color: #FFFFFF !important;
}
.btn-login:hover{
    background-color: #29b2be !important;
}
.btn-login:active{
    background-color: #29b2be !important;
}
.title{
  top: 10%;
}
.form-login{
  border-radius: 10px !important;
}
</style>
