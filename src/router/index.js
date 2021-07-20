import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
    path: '/',
    // 默认到 home 页面
    redirect: '/home',
    // 页面主框架组件
    component: () => import(/* webpackChunkName: "mainLayout" */ '../layouts/mainLayout/MainLayout.vue'),
    children: [{
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home.vue')
    }, {
        path: '404',
        component: () => import(/* webpackChunkName: "notFound" */ '../pages/notFound/NotFound.vue')
    }]
}];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
