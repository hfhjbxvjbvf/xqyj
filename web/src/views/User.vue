<template>
    <div class="main-container page-profile d-flex flex-column ai-center pt-9">
      <div class="page p-5">
        <div class="content">
          <div class="text-green fs-xxxxl">个人信息</div>
          <div class="text-grey-2 fs-sm mt-5">注册时间：2024年3月10日</div>
          <div class="mt-5 mb-5"></div>
          <el-row class="py-4" gutter="20">
            <el-col :span="8" class="text-right">头像：</el-col>
            <el-col :span="16">
              <el-image
                style="width: 100px; height: 100px"
                src="https://via.placeholder.com/100"
                alt="User Avatar"
                fit="cover"
              ></el-image>
            </el-col>
          </el-row>
          <el-row class="py-4" gutter="20">
            <el-col :span="8" class="text-right">用户名：</el-col>
            <el-col :span="16">{{ userInfo.username }}</el-col>
          </el-row>
          <el-row class="py-4" gutter="20">
            <el-col :span="8" class="text-right">邮箱：</el-col>
            <el-col :span="16">{{ userInfo.email }}</el-col>
          </el-row>
          <el-row class="py-4" gutter="20">
            <el-col :span="8" class="text-right">个性签名：</el-col>
            <el-col :span="16">{{ userInfo.signature }}</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInfo: {
          username: 'John Doe',
          email: 'johndoe@example.com',
          signature: '爱生活，爱编程',
        },
      };
    },
  };
  </script>
  
  <style scoped>
  .main-container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
  
  .page {
    width: 100%;
    max-width: 800px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .content {
    line-height: 1.8 !important;
  }
  
  .text-right {
    text-align: right;
  }
  </style>
  