import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [{
      path: "/login",
      name: "login",
      component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue'),
      meta: {
        isPublic: true
      }
    },
    {
      path: "/",
      name: "main",
      component: () => import('../views/Main.vue'),
      children: [{
          path: "/categories/create",
          component: () => import('../views/CategoryEdit.vue'),
        },
        {
          path: "/categories/edit/:id",
          component: () => import('../views/CategoryEdit.vue'),
          props: true
        },
        {
          path: "/categories/list",
          component: () => import('../views/CategoryList.vue'),
        },
        {
          path: "/articles/create",
          component: () => import('../views/ArticleEdit.vue'),
        },
        {
          path: "/articles/edit/:id",
          component: () => import('../views/ArticleEdit.vue'),
          props: true
        },
        {
          path: "/articles/list",
          component: () => import('../views/ArticleList.vue'),
        },
        {
          path: "/comments/list",
          component: () => import('../views/CommentList.vue'),
          props: true
        },
        {
          path: "/links/create",
          component: () => import('../views/LinkEdit.vue'),
        },
        {
          path: "/links/edit/:id",
          component: () => import('../views/LinkEdit.vue'),
          props: true
        },
        {
          path: "/links/list",
          component: () => import('../views/LinkList.vue'),
        },
        {
          path: "/messages/list",
          component: () => import('../views/MessageList.vue'),
        },
              //商品
        {
          path:"/products/create/:id?",
          component: () => import( '../views/Product.vue'),
        },
        {
          path:"/products/list",
          component: () => import( '../views/ProductList.vue'),
        },
        {
          path:"/slideshow",
          component: () => import( '../views/ProductImages.vue'),
        },
                  // 用户
        {
          path: "/users/list",
          component: () => import('../views/UserList.vue'),
        },
        {
          path: "/admin_users/create",
          component: () => import( '../views/AdminUserEdit.vue'),
        },
        {
          path: "/admin_users/edit/:id",
          component: () => import('../views/AdminUserEdit.vue'),
          props: true
        },
        {
          path: "/admin_users/list",
          component: () => import( /* webpackChunkName: "admin_list" */ '../views/AdminUserList.vue'),
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router;