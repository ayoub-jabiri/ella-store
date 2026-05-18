<template>
  <div class="order-success">
    <v-dialog v-model="dialog" width="50%" persistent>
      <v-card class="text-center pa-4">
        <div class="text-center">
          <v-icon
            style="
              background-color: #fff;
              color: #4caf50;
              border: 1px solid #4caf50;
              font-size: 35px;
              width: 70px;
              height: 70px;
              border-radius: 50%;
            "
          >
            mdi-check
          </v-icon>
        </div>
        <v-card-title class="pb-1" style="font-size: 25px">
          Order Placed Successfully!
        </v-card-title>
        <v-card-text class="py-0 px-0" style="font-size: 15px; color: #6f6f6f">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
          accusamus obcaecati illo mollitia fugiat commodi deleniti quae,
          voluptates ad perspiciatis eaque, fugit quis dicta animi! Ab
          reprehenderit itaque fuga maxime!
        </v-card-text>
        <v-card-actions class="mt-3 justify-center">
          <v-btn variant="elevated" color="blue" @click="checkout"
            >Got it!</v-btn
          >
        </v-card-actions>
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
  }),
  props: {
    popup: {
      type: Boolean,
    },
  },
  methods: {
    ...mapActions(CartModule, ["resetItems"]),
    checkout() {
      this.resetItems();
      this.dialog = false;
      this.$router.push({ name: "home" });
    },
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        setTimeout(() => this.$emit("close-popup"), 200);
      }
    },
  },
  mounted() {
    this.dialog = this.popup;
  },
};
</script>
