<template>
  <div class="new-products py-12">
    <v-container fluid>
      <div class="title d-flex justify-space-between align-center">
        <h2 style="font-weight: bold">New Products</h2>
        <a href="#" class="text-black" style="font-size: 14px">Shop all</a>
      </div>
      <v-row>
        <v-col cols="7" class="pt-14" v-if="!products.length">
          <v-row>
            <v-col cols="4" v-for="num in 3" :key="num">
              <v-skeleton-loader type="image, article, button">
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="7" class="pt-14" v-else>
          <swiper
            class="pb-9"
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :modules="modules"
            :slides-per-view="3"
            :space-between="20"
          >
            <swiper-slide v-for="product in products" :key="product.id">
              <v-card elevation="0" class="pb-5">
                <v-hover v-slot="{ isHovering, props }">
                  <div
                    class="img-box position-relative"
                    style="height: 160px; overflow: hidden"
                  >
                    <img
                      :src="
                        showenImg[product.title]
                          ? showenImg[product.title]
                          : product.thumbnail
                      "
                      class="w-100"
                      alt=""
                      :style="`height: 100%; cursor: pointer; transition: 0.3s; scale: ${
                        isHovering ? 1.05 : 1
                      }`"
                      v-bind="props"
                    />
                    <v-btn
                      class="quick-view bg-white"
                      variant="outlined"
                      density="compact"
                      :style="`opacity: ${isHovering ? '1' : '0'}`"
                      v-bind="props"
                      @click="openPopup(product)"
                    >
                      Quick View
                    </v-btn>
                  </div>
                </v-hover>
                <v-card-text class="pl-0 pb-1">
                  {{
                    `(${product.title}) ${product.description}`.length <= 40
                      ? `(${product.title}) ${product.description}`
                      : `(${product.title}) ${product.description}`.slice(
                          0,
                          41
                        ) + "..."
                  }}
                </v-card-text>
                <v-rating
                  v-model="product.rating"
                  half-increments
                  readonly
                  color="#f8c646"
                  size="x-small"
                  density="comfortable"
                >
                </v-rating>
                <v-card-text class="pl-0 pt-0">
                  <del>${{ product.price }}</del> From
                  <span class="text-red" style="font-weight: bold">
                    ${{
                      (
                        product.price -
                        product.price * (product.discountPercentage / 100)
                      ).toFixed(2)
                    }}
                  </span>
                </v-card-text>
                <v-btn-toggle v-model="showenImg[product.title]" mandatory>
                  <v-btn
                    v-for="(img, i) in product.images"
                    :value="img"
                    :key="i"
                    size="x-small"
                    rounded="xl"
                    :ripple="false"
                  >
                    <img
                      :src="img"
                      alt=""
                      width="30"
                      height="30"
                      style="
                        background-color: #fff;
                        border-radius: 50%;
                        border: 1px solid #000;
                        padding: 3px;
                      "
                    />
                  </v-btn>
                </v-btn-toggle>
                <div class="mt-5 text-center">
                  <v-btn
                    class="px-12 py-2"
                    variant="outlined"
                    style="
                      text-transform: none;
                      border-radius: 30px;
                      height: fit-content;
                    "
                    @click="
                      $router.push({
                        name: 'products-details',
                        params: { productId: product.id },
                      })
                    "
                  >
                    Choose Options
                  </v-btn>
                </div>
              </v-card>
            </swiper-slide>
            <div class="swiper-pagination"></div>
          </swiper>
        </v-col>
        <v-col cols="5">
          <img src="@/assets/images/vr-banner.webp" alt="" class="w-100" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination } from "swiper";

export default {
  data: () => ({
    showenImg: {},
  }),
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  props: {
    products: {
      type: Array,
    },
    index: {
      type: Number,
    },
  },
  inject: ["emitter"],
  methods: {
    openPopup(product) {
      this.emitter.emit("triggerPopup", product);
    },
  },
};
</script>

<style lang="scss">
.new-products {
  .img-box {
    button.quick-view {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 30px;
      font-size: 12px;
      text-transform: none;
      border-radius: 30px;
      transition: 0.3s;
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
}
</style>
