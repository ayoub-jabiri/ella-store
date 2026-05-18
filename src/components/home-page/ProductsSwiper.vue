<template>
  <div class="products-swiper py-10">
    <v-container fluid>
      <div class="mb-10 d-flex justify-space-between align-center">
        <h2
          :class="[`text-${titleColor}`]"
          style="font-size: 26px; font-weight: bold"
        >
          {{ sectionTitle }}
        </h2>
        <router-link
          class="text-black"
          style="font-size: 14px"
          :to="{
            name: 'products-category',
            params: {
              title: categories[index].title,
              category: categories[index].route,
            },
          }"
        >
          Shop all
        </router-link>
      </div>
      <v-row v-if="!products.length">
        <v-col cols="12" class="pt-14">
          <v-row>
            <v-col cols="3" v-for="num in 4" :key="num">
              <v-skeleton-loader type="image, article, button">
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <swiper
        v-else
        class="pb-9"
        :pagination="{ el: '.swiper-pagination', clickable: true }"
        :modules="modules"
        :slides-per-view="4"
        :space-between="35"
        :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
        :autoplay="{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }"
        :loop="true"
      >
        <swiper-slide v-for="product in products" :key="product.id">
          <v-card elevation="0" class="pb-5">
            <v-hover v-slot="{ isHovering, props }">
              <div
                class="img-box position-relative"
                style="height: 200px; overflow: hidden"
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
                `(${product.title}) ${product.description}`.length <= 57
                  ? `(${product.title}) ${product.description}`
                  : `(${product.title}) ${product.description}`.slice(0, 58) +
                    "..."
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
        <div class="swiper-prev"></div>
        <div class="swiper-next"></div>
        <div class="swiper-pagination"></div>
      </swiper>
    </v-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { ProductsModule } from "@/stores/products";
import { mapState } from "pinia";

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
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  props: {
    sectionTitle: {
      type: String,
    },
    titleColor: {
      type: String,
    },
    products: {
      type: Array,
    },
    index: {
      type: Number,
    },
  },
  inject: ["emitter"],
  computed: {
    ...mapState(ProductsModule, ["categories"]),
  },
  methods: {
    openPopup(product) {
      this.emitter.emit("triggerPopup", product);
    },
  },
};
</script>

<style lang="scss">
.products-swiper {
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
  .swiper-button-prev,
  .swiper-button-next {
    background-color: #fff;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid #5f5f5f;
    top: 35%;
    &::after {
      font-size: 13px;
      font-weight: 900;
      color: #353535;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
}
</style>
