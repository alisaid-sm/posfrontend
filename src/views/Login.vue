<template>
  <div id="login">
    <div class="p-3 shadow form-login">
      <h1>POSCafe</h1>
      <form @submit.prevent='login'>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="form.email"
            required
          />
          <small
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" v-model="form.password" id="exampleInputPassword1" required/>
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
#login {
  height: 100vh;
  background-color: #EBEDEF !important;
  padding: 50px 400px 0px 400px;
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
#login .form-login{
  border-radius: 10px !important;
  background-color: white;
}
@media (max-width: 992px) {
  #login {
    padding: 0px !important;
    height: auto !important;
  }
  #login .form-login{
  border-radius: 0px !important;
}
}
</style>
