<template>
  <div class="keranjang">
    <Navbar :updateKeranjangs="keranjangs"/>
    <div class="container">
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item" style="color: green;"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item" style="color: blue;"><router-link to="/foods">Daftar Menu</router-link></li>
              <li class="breadcrumb-item active" aria-current="page" style="color: rgb(29, 29, 29);">Order</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          
          <div class="table-responsive mt-3" v-if="keranjangs.length > 0">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No. </th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Jumlah Pesanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Harga Total</th>
                  <th scope="col">Hapus Item</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                  <th>{{ index + 1 }}</th>
                  <td><img width="250" :src="'../assets/images/' + keranjang.products.gambar" class="img-fluid shadow" alt="gambar">
                  </td>
                  <td>{{ keranjang.products.nama }}</td>
                  <td>{{ keranjang.jumlah_pesanan }}</td>
                  <td>{{ keranjang.keterangan }}</td>
                  <td align="right">{{keranjang.products.harga}}</td>
                  <td align="right"> <strong>Rp. {{keranjang.products.harga * keranjang.jumlah_pesanan}}</strong> </td>
                  <td><button type="button" class="btn btn-danger" @click="deleteItem(keranjang.id)">Hapus</button></td>

                  <!-- ... (lanjutan kolom tabel) ... -->
                </tr>
                <tr>
                  <td colspan="6">Jumlah Pesanan: </td>
                  <td align="right"><strong>Rp. {{totalHarga}}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-center align-items-center" v-else>
            <h3 class="text-muted text-center">Belum Ada Keranjang</h3>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" @click="changePage(currentPage - 1)" href="#" tabindex="-1" aria-disabled="true">Previous</a>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                <a class="page-link" @click="changePage(page)" href="#">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" @click="changePage(currentPage + 1)" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Keranjang",
  components: {
    Navbar,
  },
  data() {
    return {
      keranjangs: [],
      currentPage: 1,
      itemsPerPage: 5, // Set the number of items per page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.keranjangs.length / this.itemsPerPage);
    },
    paginatedKeranjangs() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.keranjangs.slice(startIndex, endIndex);
    },
    totalHarga() {
      return this.keranjangs.reduce(function(items, data) {
        return items+(data.products.harga * data.jumlah_pesanan)
      },0)
    }
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    deleteItem(keranjangId) {
      // Implement the logic to delete the item with the given ID
      axios
        .delete(`http://localhost:3000/keranjangs/${keranjangId}`)
        .then(() => {
          // Refresh the data after deletion
          this.$toast.open({
                    message: 'Item Berhasil Dihapus!',
                    type: 'error',
                    queue: true,
                    // all of other options may go here
                });
          this.refreshData();
        })
        .catch((error) => console.log("Error deleting item", error));
    },
    refreshData() {
      // Fetch updated data after deletion or any other changes
      axios
        .get("http://localhost:3000/keranjangs/")
        .then((response) => {
          this.setKeranjangs(response.data);
          console.log("Data refreshed");
        })
        .catch((error) => console.log("Error refreshing data", error));
    },
  },
  mounted() {
    // Fetch initial data
    this.refreshData();
  },
};
</script>


<style></style>