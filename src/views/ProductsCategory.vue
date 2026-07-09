<template>
  <div class="products-category mt-10">
    <h1 class="text-center mb-7">{{ $route.params.title }}</h1>
    <v-container>
      <v-card class="pt-5" min-height="700px" elevation="0">
        <v-row v-if="loading">
          <v-col cols="3" v-for="num in 4" :key="num">
            <v-skeleton-loader type="image, article, button"> </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="!loading">
          <v-col cols="3" v-for="product in categoryProducts" :key="product.id" class="px-5">
            <v-lazy>
              <v-card elevation="0" class="pb-5">
                <v-hover v-slot="{ isHovering, props }">
                  <div class="img-box position-relative" style="height: 200px; overflow: hidden">
                    <img
                      :src="showenImg[product.title] ? showenImg[product.title] : product.thumbnail"
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
                      : `(${product.title}) ${product.description}`.slice(0, 58) + '...'
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
                      (product.price - product.price * (product.discountPercentage / 100)).toFixed(
                        2,
                      )
                    }}
                  </span>
                </v-card-text>
                <v-btn-toggle v-model="showenImg[product.title]">
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
                    style="text-transform: none; border-radius: 30px; height: fit-content"
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
            </v-lazy>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { ProductsModule } from '@/stores/products'
import { mapState, mapActions } from 'pinia'

export default {
  data: () => ({
    loading: false,
    showenImg: {},
  }),
  inject: ['emitter'],

  computed: {
    ...mapState(ProductsModule, ['categoryProducts']),
  },
  methods: {
    ...mapActions(ProductsModule, ['getProductsByCategory']),
    openPopup(product) {
      this.emitter.emit('triggerPopup', product)
    },
  },
  watch: {
    async $route() {
      if (this.$route.name == 'products-category') {
        document.documentElement.scrollTo(0, 0)
        this.loading = true
        let category = this.$route.query.category
        await this.getProductsByCategory(category)
        this.loading = false
        console.log('fired')
      }
    },
  },
  async mounted() {
    if (!this.$route.query.category) {
      this.$router.go(-1)
    }
    this.loading = true
    let category = this.$route.query.category
    await this.getProductsByCategory(category)
    this.loading = false
  },
}
</script>

<style lang="scss" scoped>
.products-category {
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
}
</style>
