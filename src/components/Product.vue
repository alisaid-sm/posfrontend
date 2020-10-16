<template>
  <div>
        <div class="" :class="{ select:true, selected: selecting }" @click="activeLink();$emit('getmenu', item.id_product)">
        <img class=" img-responsive img-fluid img-edit" v-bind:src="`${IP}/`+ item.image" />
        </div>
        <p class=" h5 mt-1">{{item.name}}</p>
        <p class=" font-weight-bold h5 text-price">Rp. {{item.price}}</p>
        <div class="row">
        <div class="col-6 text-danger text-center"><b-icon-trash font-scale="2" @click="$emit('delproduct', item.id_product)"></b-icon-trash></div>
        <div class="col-6 text-center">
            <a v-b-modal.modal-2 @click="$emit('updproduct', item.id_product, index)"><b-icon font-scale="2" icon="pencil-square"></b-icon></a>
            </div>
        </div>
  </div>
</template>

<script>
import env from '../mixins/env'
export default {
  name: 'Product',
  mixins: [env],
  props: ['item', 'index'],
  data () {
    return {
      selecting: false
    }
  },
  methods: {
    activeLink () {
      this.selecting = true
    }
  }
}
</script>

<style>

</style>
