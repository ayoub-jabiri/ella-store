import { defineStore } from "pinia";
import productsData from "../json/products.json";

export const ProductsModule = defineStore("productsModule", {
  state: () => ({
    flashDeals: productsData.products.slice(0, 8),
    newProducts: productsData.products.slice(8, 16),
    mobilePhones: productsData.products.slice(16, 24),
    televisions: productsData.products.slice(24, 29),
    groceries: productsData.products
      .filter((el) => el.category === "groceries")
      .slice(0, 8),
    categories: [
      {
        title: "Smart Phones",
        route: "smartphones",
      },
      {
        title: "Laptops",
        route: "laptops",
      },
      {
        title: "Furniture",
        route: "furniture",
      },
      {
        title: "Televisions",
        route: "televisions",
      },
      {
        title: "Men's Watches",
        route: "mens-watches",
      },
      {
        title: "Women's Bags",
        route: "womens-bags",
      },
      {
        title: "Home Appliances",
        route: "home-appliances",
      },
    ],
    categoryProducts: [],
    singleProduct: "",
  }),
  actions: {
    getProducts() {
      //   try {
      //     let res = await fetch("https://dummyjson.com/products");
      //     let data = await res.json();
      //     this.FlashDeals = data.products.slice(0, 8);
      //     console.log(this.flashDeals);
      //   } catch (err) {
      //     console.log(err);
      //   }
      //   this.FlashDeals = productsData.products.slice(0, 8);
      //   console.log(this.flashDeals);
      // setTimeout(() => {
      //   this.flashDeals = productsData.products.slice(0, 8);
      //   this.newProducts = productsData.products.slice(8, 16);
      // }, 3000);
    },
    async getProductsByCategory(category) {
      try {
        let url = `https://dummyjson.com/products/category/${category}`;
        let res = await fetch(url);
        let data = await res.json();
        this.categoryProducts = data.products;
      } catch (err) {
        console.log(err);
      }
    },
    async getSingleProduct(productId) {
      try {
        let url = `https://dummyjson.com/products/${productId}`;
        let res = await fetch(url);
        let data = await res.json();
        this.singleProduct = data;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
