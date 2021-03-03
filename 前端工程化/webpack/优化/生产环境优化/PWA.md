# PWA
渐进式网络开发应用程序---离线可以访问

workbox --> workbox-webpack-plugin

````js
const WorkboxWebpackPlugin =  require('workbox-webpack-plugin')

module.export = {
    plugins: [
        new WorkboxWebpackPlugin.GenerateSW({
            // 1、帮助serviceworker快速启动
            // 2、删除旧的serviceworker
            clientsClaim: true,
            skipWaiting: true
        })
    ]
}
````
