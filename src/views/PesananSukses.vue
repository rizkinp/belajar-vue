<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6 offset-md-3 text-center">
          <h1 class="display-4">Pemesanan Sukses!</h1>
          <p class="lead">Terima kasih telah melakukan pemesanan makanan.</p>
          <!-- Ganti URL SVG dengan tautan SVG undraw yang Anda pilih -->
          <img src="../assets/images/orderSuccess.svg" alt="Success Image" class="img-fluid mt-3">
          <router-link to="/" class="btn btn-primary mt-3">Kembali ke Beranda</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SuccessPage',
  }
  </script>
  
  <style scoped>
  /* Tambahkan styling sesuai kebutuhan */
  </style>
  