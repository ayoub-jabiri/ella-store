<template>
  <div class="top-offers py-9">
    <v-container fluid>
      <v-row class="justify-center mb-9">
        <v-col class="py-0 pr-3" style="height: 260px">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="box h-100"
              style="overflow: hidden; border-radius: 7px"
              v-bind="props"
            >
              <img
                class="w-100 h-100"
                :style="`cursor: pointer; transition: 0.3s; scale: ${
                  isHovering ? 1.05 : 1
                }`"
                src="../../assets/images/playstations.webp"
                alt="Console"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col class="py-0 px-3" style="height: 260px">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="box h-100"
              style="overflow: hidden; border-radius: 7px"
              v-bind="props"
            >
              <img
                class="w-100 h-100"
                :style="`cursor: pointer; transition: 0.3s; scale: ${
                  isHovering ? 1.05 : 1
                }`"
                src="../../assets/images/headset.webp"
                alt="Headset"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col class="py-0 pl-3" style="height: 260px">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="box h-100"
              style="overflow: hidden; border-radius: 7px"
              v-bind="props"
            >
              <img
                class="w-100 h-100"
                :style="`cursor: pointer; transition: 0.3s; scale: ${
                  isHovering ? 1.05 : 1
                }`"
                src="../../assets/images/chairs.webp"
                alt="Chairs"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 pr-3">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="box h-100"
              style="overflow: hidden; border-radius: 7px"
              v-bind="props"
            >
              <img
                class="w-100 h-100"
                :style="`cursor: pointer; transition: 0.3s; scale: ${
                  isHovering ? 1.05 : 1
                }`"
                src="../../assets/images/iphones.webp"
                alt="IPhones"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col class="py-0 pl-3">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="box h-100"
              style="overflow: hidden; border-radius: 7px"
              v-bind="props"
            >
              <img
                class="w-100 h-100"
                :style="`cursor: pointer; transition: 0.3s; scale: ${
                  isHovering ? 1.05 : 1
                }`"
                src="../../assets/images/laptops.webp"
                alt="Laptops"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.top-offers {
  background-color: #f5f5f5;
}
</style>
