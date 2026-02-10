import { defineStore } from "pinia";
import axios from "axios";

export const ProductModule = defineStore("ProductModule", {
  state: () => ({
    flashDeals: [],
    brand: [],
    productDetails: "",
    menuItems: [
      {
        title: "Home",
        route: "home",
      },
      {
        title: "Product",
        route: "Product",
      },
      {
        title: "Categoury",
        route: "categoury",
      },
      {
        title: "Brand",
        route: "brand",
      },
      {
        title: "Cart",
        route: "cart",
      },
      {
        title: "About Us",
        route: "about",
      },
      {
        title: "Contact Us",
        route: "contact",
      },
    ],
  }),
  actions: {
    async getProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          this.flashDeals = res.data.products.slice(0, 30);
          this.brand = res.data.products.filter((el) => {
            return el.brand;
          });
        })
        .catch((err) => console.log(err));
    },
    async getSingleProducts(productId) {
      await axios
        .get(`https://dummyjson.com/products/${productId}`)
        .then((res) => {
          this.productDetails = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
});
