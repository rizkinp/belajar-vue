<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <HeroSection/>

      <div class="row mt-4">
        <div class="col">
          <h2>
            Best
            <strong>Foods</strong>
          </h2>
        </div>
        <div class="col">
          <router-link class="btn btn-success float-end" to="/foods"
            >Lihat Semua</router-link
          >
        </div>
      </div>

      <div class="row mb-5">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <CardComponent :product="product" />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>


<script>
// @ is an alias to /src
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import CardComponent from "@/components/CardComponent.vue";
import HeroSection from "@/components/HeroSection.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
    HeroSection,
    CardComponent,
    Footer,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/best-products")
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log("Respones", error));
  },
};
</script>
