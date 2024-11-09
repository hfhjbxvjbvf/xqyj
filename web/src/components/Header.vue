<template>
  <header class="head nav d-flex jc-around ai-center" :class="isScrolling ? 'mini' : ''">
    <div class="hand">
      <router-link tag="div" to="/">
        <img src="../assets/images/cropped-logo.png" height="100" class="main-img" />
      </router-link>
    </div>
    <div class="d-flex text-white hand">
      <div v-for="item in items" :key="item.text" class="nav-item px-5 icon">
        <router-link :to="item.link">
          {{ item.text }}
        </router-link>
      </div>
      <div class="nav-item px-5 icon">
            <!-- 判断有无token -->
          <router-link to = "/login" v-if=1 >
            登入
          </router-link>
          <router-link to = "/user" v-else >
            个人页面
          </router-link>
        </div>

      <div class="play pl-5">
        <i v-show="!isPlay" class="iconfont icon-music-o nav-item" @click="playMusic(true)"></i>
        <i v-show="isPlay" class="iconfont icon-Pause1 nav-item" @click="playMusic(false)"></i>
      </div>

      <div v-show="isPlay">
        <audio id="music" ref="music" src="https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/Prospect.mp3" loop></audio>
      </div>

      <!-- 主题切换开关 -->
      <!-- <div class="theme-switcher">
        <label class="switch">
          <input type="checkbox" v-model="isDarkTheme" @change="toggleTheme" />
          <span class="slider round"></span>
        </label>
      </div> -->
    </div>
  </header>
</template>


<script>
export default {
  data() {
    return {
      isPlay: false,
      isScrolling: false,
      isDarkTheme: false, // 新增的深色主题状态
      items: [
        { text: '首页', link: '/' },
        { text: 'Dieshot', link: '/tags' },
        { text: '产品', link: '/product' },
        { text: '留言', link: '/message' },
        { text: '关于', link: '/about' },
      ],
      token: '',
    };
  },
  mounted() {
    this.ajustNavigation();
    window.addEventListener('scroll', this.ajustNavigation);
    this.loadTheme(); // 加载初始主题
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.ajustNavigation);
  },
  methods: {
    ajustNavigation() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.isScrolling = scrollTop > 0;
    },
    playMusic(play) {
      this.isPlay = !this.isPlay;
      if (play) {
        this.$refs.music.play();
      } else {
        this.$refs.music.pause();
      }
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      document.body.classList.toggle('dark-theme', this.isDarkTheme);
    },
    loadTheme() {
      // 从本地存储或其他方式加载主题
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        this.isDarkTheme = true;
        document.body.classList.add('dark-theme');
      }
    },
  },
};

</script>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

/* Header styles */
.head {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  display: relative;
  height: 65px;
  background-color: transparent;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-in-out;
}

.mini {
  background-color: rgb(255, 255, 255);   //导航栏的颜色
  height: 56px;
  transition: 0.5s ease-in-out;
}

.nav-item {
  padding: 10px 20px;
  font-size: 14px;
  color: white;
}
.theme-switcher {
  margin-left: 20px; // 给开关一点左侧间距
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}


.play i {
  cursor: pointer;
}
</style>
