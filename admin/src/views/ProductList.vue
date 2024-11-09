<template>
  <div>
    <h1>商品列表</h1>
    <el-form>
      <el-form-item label="商品分类">
        <el-select v-model="category">
          <el-option
            v-for="item in fixedCategories"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        style="margin-left: 200px"
        @click="fetchProducts(category)"
      >
        搜索
      </el-button>

      <el-table :data="products" style="width: 100%">
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
        <el-table-column label="操作" width="270">
          <template slot-scope="scope">
            <el-button type="primary" @click="editProduct(scope.row._id)">
              编辑
            </el-button>
            <el-button type="danger" @click="deleteProduct(scope.row._id)">
              删除
            </el-button>
            <el-button type="primary" @click="addslideshow(scope.row._id)">
              添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="fetchProducts"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalProducts"
        layout="total, prev, pager, next, jumper"
        style="margin-top: 20px"
      />
    </el-form>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      products: [],
      searchCategory: '',
      currentPage: 1,
      pageSize: 10,
      totalProducts: 0,
      category: '',
      fixedCategories: ['CPU', 'GPU', '苹果', '协处理器', '其他'],
      page: 1,
    }
  },
  methods: {
    async fetchProducts(category = null) {
      try {
        console.log('测试前')
        // 发送请求，获取指定分类的数据
        const res = await this.$http.get('/products',{ params: { category:category } })
        console.log('测试后')
        console.log(res)

        // 处理返回的数据
        this.products = res.data.products // 获取产品数组
      } catch (error) {
        console.error('获取产品失败', error) // 输出错误信息
      }
    },
    editProduct(id) {
      // 跳转到编辑页面
      this.$router.push(`/products/create/${id}`)
    },
    async deleteProduct(id) {
      try {
        await this.$http.delete(`/products/${id}`)
        this.$message.success('删除成功')
        this.fetchProducts() // 刷新列表
      } catch (error) {
        this.$message.error('删除失败，请重试！')
        console.error('删除商品时发生错误:', error)
      }
    },
    async addslideshow(productId) {
      console.log(productId)
      try {
        await this.$http.post('/slideshows', { productId })
        this.$message.success('添加轮播图成功！') // 添加成功的提示
      } catch (error) {
        this.$message.error('添加轮播图失败，请重试！')
        console.error('添加轮播图失败，请重试！', error)
      }
    },
  },
  created() {
    this.fetchProducts()
  },
}
</script>
  
  <style scoped>
/* 可以根据需要添加样式 */
</style>
  