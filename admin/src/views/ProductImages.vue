<template>
  <div>
    <h1>轮播图列表</h1>
    <!-- 全选复选框 -->
    <div>
      <el-checkbox
        v-model="selectAll"
        @change="toggleSelectAll"
        label="全选"
        style="margin-bottom: 10px"
      >
        全选
      </el-checkbox>
      <!-- 如果点击确定的时候，将选择状态提交，避免重复提交 -->
      <el-button
        type="primary"
        @click="saveDateSelected"
        style="margin-left: 85%"
      >
        确定
      </el-button>
    </div>

    <el-table :data="products" style="width: 100%">
      <!-- 复选框列 -->
      <el-table-column label="选择" width="60">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.selected"
            @change="updateSelected"
          ></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="商品名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="商品分类"
        width="180"
      ></el-table-column>
      <el-table-column prop="image" label="商品图片" width="180">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            alt="商品图片"
            style="width: 50px; height: 50px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteProductImg(scope.row._id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="fetchSlideshowAndProducts"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalProducts"
      layout="total, prev, pager, next, jumper"
      style="margin-top: 20px"
    />
  </div>
</template>

  
<script>
export default {
  data() {
    return {
      products: [],
      selectAll: false, // 用于全选的复选框状态
      currentPage: 1,
      pageSize: 10,
      totalProducts: 0,
    }
  },
  methods: {
    async fetchSlideshowAndProducts() {
      try {
  // 获取幻灯片数据
  const slideshowRes = await this.$http.get('/slideshows')
  console.log('请求返回:', slideshowRes.data.slideshow)
  const slideshowArray = slideshowRes.data.slideshow

  // 提取 productId 列表
  const productIds = slideshowArray.map((item) => item.productId)
  
  // 初始化 products 数组
  this.products = []

  let n = 0
  while (n < productIds.length) {
    // 获取对应 product 数据
    const res = await this.$http.get(`/products/${productIds[n]}`)
    
    // 创建一个新对象，将幻灯片 _id 替换到 product 的 _id 上
    const productWithSlideshowId = {
      ...res.data,
      _id: slideshowArray[n]._id  // 使用 slideshow 的 _id 覆盖 product 的 _id
    }
    
    // 将修改后的产品信息加入 products 数组
    this.products.push(productWithSlideshowId)
    console.log('当前产品:', productWithSlideshowId)

    n++
  }
} catch (error) {
  console.error('获取数据失败', error)
}

    },

    async deleteProductImg(id) {
      try {
        console.log('准备删除:', id)
        const response = await this.$http.delete(`/slideshows/${id}`);
        console.log('删除响应:', response) // 打印删除结果
        this.$message.success('删除成功')
        this.products = []
        this.fetchSlideshowAndProducts() // 刷新列表
      } catch (error) {
        this.$message.error('删除失败，请重试！')
        console.error('删除轮播图时发生错误:', error)
      }
    },
    updateSelected() {
      // 当有任意单个复选框改变时，更新全选按钮的状态
      this.selectAll = this.products.every((product) => product.selected)
    },
    toggleSelectAll(val) {
      // 当全选按钮状态改变时，更新所有行的复选框状态
      this.products.forEach((product) => {
        product.selected = val
      })
    },
    async saveDateSelected() {
      try {
        console.log('准备发送请求')
        const response = await this.$http.post('/slideshows', this.products)
        console.log('请求返回:', response)
        this.$message.success('保存成功')
      } catch (error) {
        this.$message.error('保存失败，请重试！')
        console.error('保存失败:', error)
      }
    },
  },
  created() {
    this.fetchSlideshowAndProducts()
  },
}
</script>

  <style scoped>
/* 可以根据需要添加样式 */
</style>
  