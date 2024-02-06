<template>
    <Navbar />
    <div class="food-detail">
        <div class="container">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" style="color: green;"><router-link to="/">Home</router-link></li>
                            <li class="breadcrumb-item" style="color: blue;"><router-link to="/foods">Daftar
                                    Menu</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page" style="color: rgb(29, 29, 29);">Order
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-6">
                    <img :src="'../assets/images/' + product.gambar" class="img-fluid shadow" alt="gambar">
                </div>
                <div class="col-md-6">
                    <h2> {{ product.nama }}</h2>
                    <hr />
                    <h4>Harga <strong>{{ product.harga }}</strong></h4>

                    <!-- Form Control-->
                    <form class="row" @submit.prevent="pemesanan">
                        <div class="col-md-6 form-group">
                            <label for="jumlah_pesanan">Jumlah Pesanan</label>
                            <input type="number" class="form-control" id="jumlah_pesanan"
                                placeholder="Masukan Jumlah Pesanan" v-model="pesanan.jumlah_pesanan">
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="keterangan">Keterangan tambahan</label>
                            <textarea class="form-control" id="keterangan"
                                placeholder="Masukan Keterangan seperti, Pedas, Nasi Sedikit dll.."
                                v-model="pesanan.keterangan"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <!-- //End Of Form control -->
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
export default {
    name: "FoodDetail",
    components: {
        Navbar,
        Footer,
    },
    data() {
        return {
            product: [],
            pesanan: {
                jumlah_pesanan: 0,
                keterangan: ''
            }
        }
    },
    methods: {
        setProduct(data) {
            this.product = data
        },
        pemesanan() {
            if (this.pesanan.jumlah_pesanan) {
                this.pesanan.products = this.product;
                axios
                    .post("http://localhost:3000/keranjangs", this.pesanan)
                    .then(
                        () => {
                            this.$router.push({path:"/keranjang"})
                            this.$toast.open({
                                message: 'Berhasil dimasukkan keranjang!',
                                type: 'success',
                                queue: true,
                                // all of other options may go here
                            });
                        }
                    )
                    .catch((err) => console.log(err))
            } else {
                this.$toast.open({
                    message: 'Masukkan Jumlah Pesanan!',
                    type: 'error',
                    queue: true,
                    // all of other options may go here
                });
            }
        }
    },
    mounted() {
        axios
            .get("http://localhost:3000/products/" + this.$route.params.id)
            .then((response) => {
                this.setProduct(response.data);
                console.log("Data Berhasil");
            })
            .catch((error) => console.log("Response", error));
    },
}
</script>

<style scoped>

.btn {
    margin-top: 20px;
    border-radius: 30px;
}

nav {
    margin-top: 20px;
    padding: 0;
}
</style>

