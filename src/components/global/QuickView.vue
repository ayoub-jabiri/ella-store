<template>
  <div :class="`quick-view ${dialog ? 'mt-16' : ''}`">
    <v-dialog v-model="dialog" max-width="900" max-height="500">
      <v-icon class="close-btn" @click="dialog = false">mdi-close</v-icon>
      <v-card elevation="0" class="main-card">
        <v-container fluid class="bg-white pt-10 px-10">
          <v-row>
            <v-col cols="7">
              <v-skeleton-loader v-if="loading" type="image, image, image">
              </v-skeleton-loader>
              <img
                :src="tab ? tab : product.thumbnail"
                alt=""
                class="w-100"
                height="400"
                v-if="!loading"
              />
              <v-tabs
                center-active
                height="130"
                v-model="tab"
                class="mt-10"
                v-if="!loading"
              >
                <v-tab
                  v-for="(img, i) in product.images"
                  :key="i"
                  class="mx-10"
                  :value="img"
                >
                  <img :src="img" alt="" width="70" height="100" />
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col cols="5" class="pl-6">
              <v-skeleton-loader
                v-if="loading"
                type="article, article, article"
              >
              </v-skeleton-loader>
              <v-card elevation="0" class="pt-0" v-if="!loading">
                <v-card-title class="px-0">
                  ({{ product.title }}) Sample - {{ product.category }} For Sale
                </v-card-title>
                <div class="rating-info d-flex align-center">
                  <v-rating
                    v-model="product.rating"
                    half-increments
                    readonly
                    color="#f8c646"
                    size="x-small"
                    density="comfortable"
                    class="mr-1"
                  >
                  </v-rating>
                  <!-- <span class="mt-1 mr-4" style="font-size: 14px; color: #777">
                  {{ product.reviews.length }}
                  Review{{ product.reviews.length > 1 ? "s" : "" }}
                </span> -->
                  <span class="mt-1" style="font-size: 15px">
                    Stock: {{ product.stock }}
                  </span>
                </div>
                <v-card-text class="">{{ product.description }}</v-card-text>
                <v-card-text class="py-0">
                  Brand: {{ product.brand }}
                </v-card-text>
                <v-card-text class="pt-0">
                  Availability:
                  {{ product.stock > 0 ? "In Stock" : "Out of Stock" }}
                </v-card-text>
                <v-card-text class="pt-0 price">
                  <del>${{ product.price }}</del> From
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
                    @click="addToCart(product)"
                  >
                    Add To Cart
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CartModule } from "@/stores/cart";
import { mapActions } from "pinia";

export default {
  data: () => ({
    dialog: false,
    product: "",
    loading: false,
    btnLoading: false,
    tab: "",
    quantityCounter: 1,
  }),
  inject: ["emitter"],
  computed: {
    priceWithDiscount() {
      let productPrice = this.product.price;
      let discountPercentage = this.product.discountPercentage;
      let discountValue = productPrice * (discountPercentage / 100);

      return (productPrice - discountValue).toFixed(2);
    },
    subtotal() {
      return (this.priceWithDiscount * this.quantityCounter).toFixed(2);
    },
  },
  methods: {
    ...mapActions(CartModule, ["addItem"]),
    decreaseCounter() {
      this.quantityCounter > 1 ? this.quantityCounter-- : false;
    },
    increaseCounter() {
      this.quantityCounter < this.product.stock
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
  watch: {
    dialog(newVal) {
      newVal == true ? (this.quantityCounter = 1) : false;
    },
  },
  mounted() {
    this.emitter.on("triggerPopup", (data) => {
      this.dialog = true;
      this.loading = true;
      this.product = data;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    });
  },
};
</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  top: -14px;
  right: -14px;
  background-color: #000;
  color: #fff;
  font-size: 18px;
  padding: 13px;
  z-index: 10;
  cursor: pointer;
}
.main-card {
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    width: 7px;
    background-color: #9e9e9e;
  }
  &::-webkit-scrollbar-track {
    width: 7px;
    background-color: #ddd;
  }
}
.v-card {
  .v-card-title {
    font-size: 19px;
    font-weight: bold;
    white-space: pre-wrap;
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
</style>
