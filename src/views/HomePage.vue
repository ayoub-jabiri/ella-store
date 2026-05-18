<template>
  <div class="home-page">
    <UpperBanner />
    <TheFeatures />
    <TopOffers />
    <ProductsComponent
      title="Flash Deals"
      title-color="red"
      :products="flashDeals"
      :index="'0'"
    />
    <TopCategories />
    <NewProducts :products="newProducts" :index="1" />
    <QualityFeatures />
    <ProductsComponent
      title="Top Mobile Phones"
      title-color="inherit"
      :products="mobilePhones"
    />
    <v-container fluid>
      <v-row>
        <v-col class="pr-5">
          <img
            src="@/assets/images/band-left-cover.webp"
            alt=""
            class="w-100"
          />
        </v-col>
        <v-col class="pl-5">
          <img
            src="@/assets/images/band-right-cover.webp"
            alt=""
            class="w-100"
          />
        </v-col>
      </v-row>
    </v-container>
    <ProductsComponent
      title="Top Televisions"
      titleColor="inherit"
      :products="televisions"
      :index="3"
    />
    <v-container fluid>
      <img src="@/assets/images/tv-banner.webp" alt="" class="w-100" />
    </v-container>
    <ProductsComponent
      :sectionTitle="'Top Home Appliances'"
      title-color="inherit"
      :products="groceries"
      :index="6"
    />
    <WhyShopwithus />
  </div>
</template>

<script>
import UpperBanner from "@/components/home-page/UpperBanner.vue";
import TheFeatures from "@/components/home-page/TheFeatures.vue";
import TopOffers from "@/components/home-page/TopOffers.vue";
import ProductsComponent from "@/components/home-page/ProductsSwiper.vue";
import TopCategories from "@/components/home-page/TopCategories.vue";
import NewProducts from "@/components/home-page/NewProducts.vue";
import QualityFeatures from "@/components/home-page/QualityFeatures.vue";
import WhyShopwithus from "@/components/home-page/WhyShopwithus.vue";

import { ProductsModule } from "@/stores/products";
import { mapActions, mapState } from "pinia";
export default {
  components: {
    UpperBanner,
    TheFeatures,
    TopOffers,
    ProductsComponent,
    TopCategories,
    NewProducts,
    QualityFeatures,
    WhyShopwithus,
  },
  computed: {
    ...mapState(ProductsModule, [
      "flashDeals",
      "newProducts",
      "mobilePhones",
      "televisions",
      "groceries",
    ]),
  },
  methods: {
    ...mapActions(ProductsModule, ["getProducts"]),
  },
  mounted() {
    this.getProducts();
  },
};
</script>
