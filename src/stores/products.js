import { defineStore } from 'pinia'

export const ProductsModule = defineStore('productsModule', {
  state: () => ({
    flashDeals: [],
    newProducts: [],
    mobilePhones: [],
    televisions: [],
    groceries: [],
    categories: [
      {
        title: 'Smart Phones',
        route: 'smartphones',
      },
      {
        title: 'Laptops',
        route: 'laptops',
      },
      {
        title: 'Furniture',
        route: 'furniture',
      },
      {
        title: 'Home Decoration',
        route: 'home-decoration',
      },
      {
        title: "Men's Watches",
        route: 'mens-watches',
      },
      {
        title: "Women's Bags",
        route: 'womens-bags',
      },
      {
        title: 'Groceries',
        route: 'groceries',
      },
    ],
    categoryProducts: [],
    singleProduct: '',
  }),
  actions: {
    async getProducts() {
      try {
        let res = await fetch('https://dummyjson.com/products?limit=30')
        let data = await res.json()
        this.flashDeals = data.products.slice(0, 8)
        this.newProducts = data.products.slice(8, 16)
        this.mobilePhones = data.products.slice(16, 24)
        this.televisions = data.products.slice(24, 29)
        this.groceries = data.products.filter((el) => el.category === 'groceries').slice(0, 8)
      } catch (err) {
        console.log(err)
      }
    },
    async getProductsByCategory(category) {
      try {
        let url = `https://dummyjson.com/products/category/${category}`
        let res = await fetch(url)
        let data = await res.json()

        this.categoryProducts = data.products
      } catch (err) {
        console.log(err)
      }
    },
    async getSingleProduct(productId) {
      try {
        let url = `https://dummyjson.com/products/${productId}`
        let res = await fetch(url)
        let data = await res.json()
        this.singleProduct = data
      } catch (err) {
        console.log(err)
      }
    },
  },
})
