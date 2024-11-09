<template>
  <div>
    <h1>{{ id ? '编辑商品' : '新增商品' }}</h1>
    <el-form label-width="120px" @submit.prevent="saveProduct">
      <el-form-item label="商品分类">
        <el-select v-model="product.category">
          <el-option
            v-for="item in fixedCategories"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="product.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="product.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="(res) => $set(product, 'image', res.url)"
        >
          <img v-if="product.image" :src="product.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <mavon-editor
          code_style="monokai-sublime"
          :ishljs="true"
          ref="mavon"
          v-model="product.description"
          @imgAdd="$imgAdd"
        ></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="saveProduct">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'ProductForm',
  components: {
    mavonEditor,
  },
  props: {
    id: {},
  },
  data() {
    return {
      product: {
        name: '',
        price: 0,
        image: '',
        description: '',
        category: '', // 初始化为字符串
      },
      fixedCategories: ['CPU', 'GPU', '苹果', '协处理器', '其他'], // 固定的分类
    }
  },
  methods: {
    async saveProduct() {
      try {
        if (this.id) {
          await this.$http.put(`/products/${this.id}`, this.product);
        } else {
          await this.$http.post('/products', this.product);
        }

        // 提示保存成功
        this.$message({
          type: 'success',
          message: '保存成功',
        });

        // 可以在成功后跳转到产品列表
        //this.$router.push('/products/list');

      } catch (error) {
        // 在请求失败时提示错误信息
        this.$message({
          type: 'error',
          message: '保存失败，请重试！', // 可以根据具体错误更新信息
        });

        // 如果需要，可以在这里输出错误的详细信息，方便调试
        console.error('保存产品时发生错误:', error);
      }
    },
    async fetchProduct(id) {
      if (id) {
        const res = await this.$http.get(`/products/${id}`);
        this.product = res.data;
      }
    },
    $imgAdd(pos, $file) {
      const formData = new FormData();
      formData.append('file', $file);
      this.$http.post('/upload', formData).then((res) => {
        this.$refs.mavon.$img2Url(pos, res.data.url);
      });
    },
  },
  created() {
    this.fetchProduct(this.$route.params.id);
    console.log(this.$route.params.id);
  },
}
</script>

<style scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
}
</style>
