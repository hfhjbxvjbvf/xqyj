<template>
  <div class="main-container">
    <!-- 走马灯 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(item, index) in slideshow" :key="index" class="carousel-item">
        <img :src="item.image" alt="Slideshow image" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>

    <!-- 分类导航栏 -->
    <div class="category-nav">
      <button
        v-for="category in categories"
        :key="category"
        @click="fetchProducts(category)"
        :class="{ active: currentCategory === category }"
      >
        {{ category }}
      </button>
    </div>

    <!-- 商品列表 -->
    <div class="main-content">
      <div class="product-list">
        <div v-for="product in products" :key="product._id" class="product-item">
          <router-link :to="`/goods/${product._id}`">
            <img :src="product.image" alt="product image" class="product-image" />
            <div class="product-info">
              <h2>{{ product.name }}</h2>
              <p>{{ product.description }}</p>
              <span class="product-price">Price: ${{ product.price }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 加载中状态 -->
    <div v-if="isLoading" class="loading">加载中...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [], // 商品数据
      slideshow: [], // 轮播图数据
      isLoading: false, // 加载状态
      currentCategory: 'CPU', // 当前分类
      categories: ['CPU', 'GPU', '苹果', '协处理器', '其他'], // 分类
    };
  },
  
  methods: {
    async fetchProducts(category) {
      this.isLoading = true;
      try {
        const response = await this.$http.get(`products?category=${category}`);
        this.products = response.data;
      } catch (error) {
        console.error('获取商品数据失败', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchSlideshow() {
      try {
        const slideshowRes = await this.$http.get('slideshows');
        this.slideshow = await Promise.all(
          slideshowRes.data.map(async (item) => {
            const res = await this.$http.get(`products/${item.productId}`);
            return res.data;
          })
        );
      } catch (error) {
        console.error('获取轮播图数据失败', error);
      }
    },
  },
  
  
  
  mounted() {
    this.fetchProducts(this.currentCategory);
    this.fetchSlideshow();
  },
};
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
}

.carousel-container {
  max-width: 600px;
  margin: auto;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-image {
  height: 100%;
  object-fit: cover;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.category-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.category-nav button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #3498db;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-nav button.active {
  background-color: #2980b9;
}

.category-nav button:hover {
  background-color: #2980b9;
}

.main-content {
  text-align: center;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.product-item {
  border: 1px solid #ddd;
  padding: 10px;
  width: 220px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
}

.product-info h2 {
  font-size: 18px;
  margin: 10px 0;
}

.product-info p {
  font-size: 14px;
  color: #666;
}

.product-price {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  color: #e74c3c;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #999;
}
</style>
