<template>
  <div class="top-cat">
    <div class="cyber-banner">
      <img src="@/assets/images/cyber-banner.webp" alt="" class="w-100" />
    </div>
  </div>
  <div class="categories py-13 text-center">
    <v-container fluid>
      <div class="title mb-8 d-flex justify-center align-center">
        <h2 class="flex-grow-1" style="font-size: 20px; font-weight: 900">Top Categories</h2>
      </div>
      <v-row>
        <v-col cols="2" v-for="cat in categories" :key="cat.title">
          <v-card elevation="0">
            <v-hover v-slot="{ isHovering, props }">
              <div
                class="img-box px-3 py-2"
                style="width: 100%; height: 170px; border-radius: 50%; overflow: hidden"
              >
                <img
                  :src="cat.img"
                  alt=""
                  v-bind="props"
                  :style="`width: 100%; height: 100%; cursor: pointer; transition: 0.3s; scale: ${
                    isHovering ? 1.05 : 1
                  }`"
                />
              </div>
            </v-hover>
            <v-card-text>{{ cat.title }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [
      {
        title: 'Mobile Phone',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/mobile-phones.png?v=10616357514144629263',
      },
      {
        title: 'Laptop & Tablets',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/laptops-tablets.png?v=17546078654541140209',
      },
      {
        title: 'Televisions',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/televisions.png?v=792225267698738137',
      },
      {
        title: 'PCs & Accessories',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/pcs-accessories.png?v=7913320403362682840',
      },
      {
        title: 'Vudio & Video',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/audio-video.png?v=17118273463527967791',
      },
      {
        title: 'Gaming Accessories',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/gaming-accessories.png?v=5365032838061682635',
      },
      {
        title: 'Home Appliances',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/home-appliances.png?v=4122646624966862882',
      },
      {
        title: 'Kitchen Appliances',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/kitchen-appliances.png?v=912885117927234410',
      },
      {
        title: 'Cameras',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/cameras.png?v=10468174360605840515',
      },
      {
        title: 'Consumables',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/consumables.png?v=1604898607781595964',
      },
      {
        title: 'Smart Homes',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/smart-homes.png?v=11511407578445752828',
      },
      {
        title: 'Accessories',
        img: 'https://new-ella-demo.myshopify.com/cdn/shop/files/accessories.png?v=16090558546215869367',
      },
    ],
  }),
}
</script>
