<template>
  <div class="product-details mt-16">
    <v-container fluid>
      <v-row>
        <v-col cols="7">
          <v-skeleton-loader v-if="loading" type="image, image, image">
          </v-skeleton-loader>
          <img
            :src="tab ? tab : singleProduct.thumbnail"
            alt=""
            class="w-100"
            height="500"
            v-if="!loading"
          />
          <v-tabs
            center-active
            height="220"
            v-model="tab"
            class="mt-10"
            v-if="!loading"
          >
            <v-tab
              v-for="(img, i) in singleProduct.images"
              :key="i"
              class="mx-10"
              :value="img"
            >
              <img :src="img" alt="" width="100" height="200" />
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="5" class="pl-6">
          <v-skeleton-loader v-if="loading" type="article, article, article">
          </v-skeleton-loader>
          <v-card elevation="0" class="pt-0" v-if="!loading">
            <v-card-title class="px-0">
              ({{ singleProduct.title }}) Sample -
              {{ singleProduct.category }} For Sale
            </v-card-title>
            <div class="rating-info d-flex align-center">
              <v-rating
                v-model="singleProduct.rating"
                half-increments
                readonly
                color="#f8c646"
                size="x-small"
                density="comfortable"
                class="mr-1"
              >
              </v-rating>
              <!-- <span class="mt-1 mr-4" style="font-size: 14px; color: #777">
                {{ singleProduct.reviews.length }}
                Review{{ singleProduct.reviews.length > 1 ? "s" : "" }}
              </span> -->
              <span class="mt-1" style="font-size: 15px">
                Stock: {{ singleProduct.stock }}
              </span>
            </div>
            <v-card-text class="">{{ singleProduct.description }}</v-card-text>
            <v-card-text class="py-0">
              Brand: {{ singleProduct.brand }}
            </v-card-text>
            <v-card-text class="pt-0">
              Availability:
              {{ singleProduct.stock > 0 ? "In Stock" : "Out of Stock" }}
            </v-card-text>
            <v-card-text class="pt-0 price">
              <del>${{ singleProduct.price }}</del> From
              <span style="font-weight: bold">
                {{ priceWithDiscount }}
              </span>
            </v-card-text>
            <v-card-text> Quantity: </v-card-text>
            <div class="counter">
              <v-icon @click="decreaseCounter">mdi-minus</v-icon>
              <input type="text" readonly v-model="quantityCounter" />
              <v-icon @click="increaseCounter">mdi-plus</v-icon>
            </div>
            <v-card-text>
              Subtotal:
              <span style="font-weight: bold"> ${{ subtotal }} </span>
            </v-card-text>
            <v-card-actions class="mt-5 px-0 w-100">
              <v-btn
                variant="outlined"
                style="text-transform: none; border-radius: 30px"
                class="w-75 mx-auto bg-black text-white"
                density="compact"
                height="50"
                :loading="btnLoading"
                @click="addToCart(singleProduct)"
              >
                Add To Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ProductsModule } from "@/stores/products";
import { CartModule } from "@/stores/cart";
import { mapActions, mapState } from "pinia";

export default {
  data: () => ({
    loading: false,
    btnLoading: false,
    tab: "",
    quantityCounter: 1,
  }),
  inject: ["emitter"],
  computed: {
    ...mapState(ProductsModule, ["singleProduct"]),
    priceWithDiscount() {
      let productPrice = this.singleProduct.price;
      let discountPercentage = this.singleProduct.discountPercentage;
      let discountValue = productPrice * (discountPercentage / 100);

      return (productPrice - discountValue).toFixed(2);
    },
    subtotal() {
      return (this.priceWithDiscount * this.quantityCounter).toFixed(2);
    },
  },
  methods: {
    ...mapActions(ProductsModule, ["getSingleProduct"]),
    ...mapActions(CartModule, ["addItem"]),
    decreaseCounter() {
      this.quantityCounter > 1 ? this.quantityCounter-- : false;
    },
    increaseCounter() {
      this.quantityCounter < this.singleProduct.stock
        ? this.quantityCounter++
        : false;
    },
    addToCart(item) {
      item.quantity = this.quantityCounter;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addItem(item);
        this.emitter.emit("openCart");
        this.emitter.emit("showMsg", this.product.title);
        this.dialog = false;
      }, 1000);
    },
  },
  async beforeMounted() {
    this.loading = true;
    let productId = this.$route.params.productId;
    await this.getSingleProduct(productId);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.product-details {
  .v-card {
    .v-card-title {
      font-size: 19px;
      font-weight: bold;
    }
    .v-card-text {
      padding-right: 0;
      padding-left: 0;
      &:not(.price) {
        font-size: 15px;
        color: #555;
      }
      &.price {
        font-size: 18px;
      }
    }
    .counter {
      border: 1px solid #9e9e9e;
      width: fit-content;
      padding: 10px 5px;
      border-radius: 30px;
      i {
        cursor: pointer;
      }
      input {
        border: none;
        outline: none;
        width: 50px;
        text-align: center;
        color: inherit;
      }
    }
  }
}
</style>
