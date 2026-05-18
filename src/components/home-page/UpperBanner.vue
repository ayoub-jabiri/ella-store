<template>
  <div class="upper-banner">
    <div class="parent">
      <v-container>
        <v-row>
          <v-col cols="10">
            <div class="content">
              <h3 class="mb-5">
                <span>Huge Saving</span> on <br />
                UHD Televisions
              </h3>
              <p class="hint mb-10">Sale up to 70% off selected items*</p>
              <v-btn
                class="shop-btn px-9 py-4"
                variant="outlined"
                style="height: fit-content"
              >
                Shop Now
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upper-banner {
  .parent {
    height: 500px;
    background-image: url(../../assets/images/banner-bg.jpg);
    background-size: cover;
    background-position: center;
    .content {
      color: #fff;
      padding: 40px 0 0 0;
      h3 {
        font-size: 45px;
        font-weight: 900;
        span {
          color: #10ffda;
        }
      }
      .shop-btn {
        border-radius: 30px;
      }
    }
  }
}
</style>
