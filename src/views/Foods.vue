<template>
    <div>
        <Navbar />
        <div class="container">
            <div class="row mt-4">
                <div class="col">
                    <h2>Daftar Makanan</h2>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col">
                    <div class="input-group mb-3">
                        <input v-model="searchTerm" type="text" class="form-control" placeholder="Cari Makanan.."
                            aria-label="cari" aria-describedby="basic-addon1" />
                        <span class="input-group-text" id="basic-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-5" v-if="displayedProducts.length > 0">
                <div class="col-md-4 col-sm-6 mt-4" v-for="product in displayedProducts" :key="product.id">
                    <CardComponent :product="product" />
                </div>
            </div>

            <div v-if="displayedProducts.length === 0" class="row">
                <div class="col">
                    <h3 class="text-muted">Not Found</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import CardComponent from "@/components/CardComponent.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Foods",
    components: {
        Navbar,
        CardComponent,
    },
    data() {
        return {
            products: [],
            searchTerm: "",
        };
    },
    methods: {
        setProduct(data) {
            this.products = data;
        },
    },
    computed: {
        displayedProducts() {
            if (!this.searchTerm) {
                return this.products;
            } else {
                const filtered = this.products.filter((product) => {
                    return (
                        product.nama &&
                        product.nama.toLowerCase().includes(this.searchTerm.toLowerCase())
                    );
                });

                return filtered;
            }
        },
    },

    mounted() {
        axios
            .get("http://localhost:3000/products")
            .then((response) => {
                this.setProduct(response.data);
                console.log("Data Berhasil");
            })
            .catch((error) => console.log("Response", error));
    },
};
</script>
