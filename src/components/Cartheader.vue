<template>
  <div class="row app-header-right align-items-center">
      <div class="col-12 text-center">
        <p class="font-weight-bold h3">Cart<span class='number-cart'>{{totalcart}}</span>
        </p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Cartheader',
  props: ['totalcart']
}
</script>

<style>

</style>
