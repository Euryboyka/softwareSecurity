import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import register from "../views/register.vue";
const routes = [
    {
        path: "/donate",
        name: "donate",
        meta: {
            title: '详情页'
        },
        component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue"),

    },
    {
        path: "/register",
        name: "Register",
        meta: {
            title: '注册'
        },
        component: register
    },
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            // {
            //     path: "/register",
            //     name: "register",
            //     meta: {
            //         title: '注册页'
            //     },
            //     component: () => import("../views/register.vue")
            // },
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '用户报告'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '部门管理'
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                // path: "/upload",
                path: "/baseform2",
                // name: "upload",
                name: "baseform2",
                meta: {
                    // title: '上传插件'
                    title: '部门报告'
                },
                // component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
                component: () => import ( /* webpackChunkName: "upload" */ "../views/BaseForm2.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '漏洞库信息'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            },{
            path: '/groupAdmin',
                name: 'groupAdmin',
                meta: {
                title: '部门管理'
                },
               component : () => import('../views/GroupAdmin.vue')
            },
            {
                path: '/admin',
                name: 'admin',
                meta: {
                    title: '管理员页'
                },
                component : () => import('../views/admin.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        // component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
        component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Home.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;