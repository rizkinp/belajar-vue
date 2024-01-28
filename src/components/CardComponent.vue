<template>
  <div class="card shadow-lg card-product">
    <img :src="'assets/images/' + product.gambar" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{ product.nama }}</h5>
      <p class="card-text" style="max-height: 100px; overflow: hidden;">{{ product.harga }}</p>
      <a href="#" class="btn btn-primary"><i class="bi bi-bag-dash"></i> Pesan Sekarang</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style scoped>
/* Tambahkan gaya tambahan sesuai kebutuhan */
</style>
