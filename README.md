# my-app

***

# 脚手架介绍
用于开发基于 React 的 Web 应用.

## 目录结构
```
bin                                         // 可执行命令目录.
|-build.bat                                 // 将 src 目录中的源码通过 webpack.config.dev.babel.js 编译到 build 目录.
|-deploy.bat                                // 将代码部署到服务器, 需在 package.json 中配置 deployments 相关信息.
|-package.bat                               // 将 src 目录中的源码通过生产环境配置打包到 dist 目录生成 zip 文件供发布使用(window).
|-package.sh                                // 将 src 目录中的源码通过生产环境配置打包到 dist 目录生成 zip 文件供发布使用(linux).
|-startup.bat                               // 启动开发环境 web 服务(window)
|-startup.sh                                // 启动开发环境 web 服务(linux)
|-mock.bat                                  // 启动开发环境 mock 服务(window)
|-mock.sh                                   // 启动开发环境 mock 服务(linux)
|-startup-mock.bat                          // 同时启动开发环境 web 和 mock 服务(window)
|-startup-mock.sh                           // 同时启动开发环境 web 和 mock 服务(linux)
|-test.bat                                  // 执行 jest 单元测试(window)
|-test.sh                                   // 执行 jest 单元测试(linux)
build                                       // 代码编译后生成的临时目录
dist                                        // 代码打包后生成的临时目录
mock                                        // mock 服务目录
|-data                                      // mock 数据存放目录
|-static                                    // mock 静态资源存放目录
|-mock.config.js                            // mock 服务全局配置
|-README.md                                 // mock 服务文档
src                                         // 项目源码目录
|-components                                // 公共组件目录
    |-component1
        |-Component1.jsx                    // 组件 jsx 文件, 文件首字母大写, 驼峰标识, 代码采用 ES6 风格编码.
        |-component1.less                   // 组件引用的 css 文件, 文件首字母小写, 驼峰标识.
    ...
|-config                                    // 生产环境配置文件目录
    |-global.js                             // 项目生产环境配置文件
    |-http.js                               // 全局http请求配置
|-constants                                 // 常量目录
    |-common.js                             // 存放一些通用常量
    |-enum.js                               // 存放一些枚举常量
|-pages                                     // 页面组件(它将各种功能组件组合在一起, 其主要负责组装功能组件, 调用接口以及管理页面的状态), 注意: 页面组件可以嵌套, 目录结构与 pages 相同.
    |-home                                  // 首页组件.
        |-components                        // 首页组件私有的功能组件, 仅供当前页面和子页面组件使用, 注意: 功能组件不能嵌套, 是原子级.
            |-component1
                |-images                    // 功能组件私有图片
                |-Component1.jsx            // 功能组件 jsx 文件
                |-component1.less           // 功能组件样式文件
            ...
        |-hooks                             // 首页组件私有的自定义hook, 仅供当前页面和子页面组件使用, 注意: 自定义hook不是函数组件.
        |-images                            // 首页组件的私有图片.
        |-pages                             // 首页组件的子页面组件, 注意: 页面组件可以嵌套, 目录结构和 pages 相同.
        |-services                          // 首页组件私有的接口请求, 所有组件私有的数据请求都封装在这里.
        |-Home.jsx                          // 首页组件jsx文件, 文件首字母大写, 驼峰标识, 代码采用ES6风格编码.
        |-home.less                         // 首页组件样式文件, 文件首字母小写, 驼峰标识.
    ...
|-data                                      // 存放copy的资源
|-fonts                                     // 公共字体文件
|-hooks                                     // 公共自定义hook, 注意: 自定义hook不是函数组件.
|-images                                    // 公共图片存放目录
|-layouts                                   // 公共布局组件目录
    |-mainLayout                            // 主要布局组件
        |-MainLayout.jsx
        |-mainLayout.less
|-services                                  // 公共接口请求目录, 所有公共的HTTP请求都封装在这里.
    |-demo.js                               // HTTP服务文件, 文件名对应请求的URL模块, 如: /user/add, 则文件应该命名为user.js
|-store                                     // 用于创建全局的状态, 如: createContext, useContext.
|-styles                                    // 公共样式目录
    |-main.less                             // 全局css文件
    |-fonts.less                            // 字体样式和字体图标css文件
|-utils                                     // 工具库
    |-common.js                             // 一些常用工具方法.
    |-http.js                               // 封装了用于http请求的库, 便于替换为其他类库.
|-App.jsx                                   // 应用组件文件.
|-bootstrap.js                              // 应用的引导文件.
|-index.js                                  // 入口文件.
|-template.ejs                              // 页面模板文件.
test                                        // 测试代码目录, 目录结构同src
|-components
|-hooks
|-pages
    ...
.eslintignore                               // eslint 忽略校验配置文件.
.eslintrc.js                                // eslint 开发环境代码校验配置文件.
.eslintrc.prod.js                           // eslint 生产环境代码校验配置文件, 比开发环境更加严格, 发版和提交代码时会自动执行此配置校验代码.
.gitignore                                  // git 忽略提交配置文件.
.stylelintignore                            // stylelint 忽略校验配置文件.
babel.config.js                             // babel 配置文件.
CHANGELOG.md                                // 项目更新日志.
enzyme.config.js                            // enzyme 配置文件.
fileTransformer.js                          // jest 文件转换配置文件.
gulpfile.babel.js                           // 项目打包, 发布脚本.
jest.config.js                              // jest 配置文件.
package.json                                // npm 配置文件.
postcss.config.js                           // postcss 插件配置文件.
README.md                                   // 脚手架说明文档.
stylelint.config.js                         // stylelint 校验规则配置文件
webpack.config.base.js                      // webpack 公共配置.
webpack.config.dev.babel.js                 // webpack 开发环境配置文件.
webpack.config.prod.babel.js                // webpack 生产环境配置文件.
```

## 项目依赖
```
webpack:        v4
babel:          v7
gulp:           v4
react           v16
react-dom       v16
react-router    v5
jest            v24
enzyme          v3
eslint:         v5
stylelint       v10
node            v8+
```

## 安装
下载项目后在项目根目录执行
```
npm install
```

## CSS处理
默认使用 PostCSS 转换 css 文件, 可以在 postcss.config.js 中扩展插件.

## 开发环境
在 package.json > devEnvironments 中配置相关信息.

1. 启动 web 服务, 运行 /bin/startup.bat (linux 运行 startup.sh). 默认通过 http://localhost:8080 访问.
2. 启动 mock 服务, 运行 /bin/mock.bat (linux 运行 mock.sh). 默认通过 http://localhost:3000 访问.
3. 同时启动 web 服务和 mock 服务, 运行 /bin/startup-mock.bat (linux 运行 startup-mock.sh)  

### 服务
```js
"servers": {
    "local": 8080,      // web服务端口
    "mock": 3000        // mock服务端口
},
```

### 代理
代理会根据URL拦截请求, 从而解决跨域问题.  
proxy 的 key 为拦截的URL前缀, value 为最终访问的服务地址.  
()内的字符串会被代理从URL中移除再请求目标服务器, 类似 pathRewrite: {'/proxy' : ''} 的功能.
如: http://localhost:8080/proxy/user/1 > proxy > http://www.example.org/user/1
```js
"proxies": {
    "/api": "http://localhost:3000",
    "(/proxy)": "http://api.xxx.com"
}
```

### Mock
mock server 会先查找本地模拟数据, 如果没有找到(或配置为ignore), 则会将请求转发到代理服务.
```js
"servers": {
    "local": 8080,
    "mock": {
        port: 3000,
        proxy: 'http://api.xxx.com'     // 代理服务
    }
},
"proxies": {
    "/api": "http://localhost:3000"
}
```

### 全局变量
可在 globals 中配置开发环境使用的全局变量, 在生产环境会全部变为false.
```js
"globals": {
    "__DEV__": true
}
```

## 代码校验
1. webpack 编译代码时, 会自动检测 js, jsx, css, less, scss 类型文件的代码规范, 并自动修复(仅限于支持自动修复的代码).
2. git commit 时, 会再次执行代码检测, 并自动修复(仅限于支持自动修复的代码)后, 后再提交.

### CSS校验

#### 忽略局部代码
```css
/* stylelint-disable */
:global {
    .ant-select-selection {
        ...
    }
}
/* stylelint-enable */
```

#### 忽略第三方库
```js
"rules": {
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]+$|^ant-"       // 忽略 antd ui 校验
}
```

## 单元测试
对 /test 目录下的所有文件进行单元测试.  
运行 /bin/test.bat (linux 运行 test.sh)  

## 生产环境
在 package.json > parcel 中配置相关信息.  
运行 /bin/package.bat (linux 运行 package.sh), 会在 /dist 目录生成生产环境文件, 供发布使用.

### 项目打包
用于生产环境打包配置.
```js
"name": string,                   // 包名称
"parcel": {
    "publicPath": string,         // webpack 的 publicPath 配置.
    "format": "zip|tar"           // 打包时的压缩格式, 默认为zip.
}
```

### 自动发布
在 package.json > deployments 中配置发布到服务器的相关信息.  
运行 /bin/deploy.bat (linux 运行 deploy.sh), 发布到配置的服务器上.

```js
"deployments": [{             // object|array
    "host": string,           // 主机IP
    "port": number,           // 端口
    "user": string,           // 服务器登陆账号(注意: 切忌将账号暴露在公网!!!)
    "pass": string,           // 服务器登陆密码(注意: 切忌将密码暴露在公网!!!)
    "timeout": number,        // 服务器连接超时时间
    "remotePath": string,     // 发布到服务器上的位置
    "enabled": boolean        // 是否启用该配置, 默认为 true.
}]
```

## linux环境配置(RHEL, CentOS or Fedora)
1. 安装node, 执行:
```
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs
```
可选安装, 构建工具:
```
sudo yum install gcc-c++ make
```
2. 从git下载项目源码.
3. 为项目授权, 执行
```
chmod -R 777 xxxxxx/
```
4. 进入项目根目录, 执行  
```
npm i
```
5. 执行/bin目录下./package.sh文件
参考
https://nodejs.org/en/download/package-manager/

### linux下常见问题
1. 切换用户后找不到 node 或 npm 命令
查看echo $PATH 环境变量, 将 node 和 npm 快捷方式加入到其中一个bin目录中.
2. 执行 npm install 提示: Cannot find module '/root/..../node_modules/node-sass/scripts/install.js'
尽量不要使用 sudo 执行 npm, 如果必须使用, 需先安装
```
sudo npm install --unsafe-perm -g node-sass
```
参考
https://github.com/sass/node-sass/blob/master/TROUBLESHOOTING.md