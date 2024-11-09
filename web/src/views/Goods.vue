<template>
  <div class="product-page-container">
    <div class="product-detail">
      <!-- 左侧商品图片区域，移除了轮播图，替换为单张图片 -->
      <div class="product-image-container">
        <el-image
          :src="product.image"
          fit="cover"
          class="product-image"
          @click="showZoomImage"
          lazy
        />
      </div>

      <!-- 右侧商品信息区域 -->
      <div class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-price">Price: ${{ product.price }}</p>
        <p class="product-description">{{ product.description }}</p>
        <div style="margin-top: 150px;">
          <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number><br>
        
        <!-- 添加购物车按钮 -->
          <el-button type="primary" @click="addToCart" style="margin-top: 50px;">Add to Cart</el-button>
        </div>
      </div>
    </div>

    <!-- 商品详细信息 -->
    <div class="product-extra-info">
      <h2>Product Details</h2>
      <p>{{ product.details }}</p>
    </div>

    <!-- 图片放大功能 -->
    <el-dialog v-model="zoomDialogVisible" width="80%">
      <img :src="product.image" class="zoomed-image" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      product: {
        title: "",
        price: 0,
        image: "",
        description: "",
        details: "",
      },
      zoomDialogVisible: false,
    };
  },
  methods: {
    async getData() {
      const id = this.$route.params.id;
      const res = await this.$http.get(`products/${id}`);
      this.product = res.data;
    },
    addToCart() {
      this.$message({
        message: "Added to Cart!",
        type: "success",
      });
    },
    showZoomImage() {
      this.zoomDialogVisible = true;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.product-page-container {
  padding: 20px;
  margin: 50px auto;
  color: white;
}

.product-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.product-image-container {
  flex: 1;
  margin-right: 20px;
}

.product-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  cursor: pointer;
}

.product-info {
  flex: 1;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  font-size: 20px;
  color: #e74c3c;
  margin-bottom: 10px;
}

.product-description {
  font-size: 16px;
  margin-bottom: 20px;
}

.product-extra-info {
  margin-top: 30px;
}

.zoomed-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
