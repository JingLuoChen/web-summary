# happypack
由于有大量文件需要解析和处理，构建是文件读写和计算密集型的操作，特别是当文件数量变多后，webpack构建慢的问题会显得严重。
文件读写和计算操作是无法避免的，那能不能让webpack同一时刻处理多个任务，发挥多核CPU电脑的威力，以提升构建速度？

HappyPack就能让webpack做到这点，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程

```js
const Happypack = require('happypack');
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                // 把对.js文件的处理转交给id为js的HappyPack实例
                use: 'happypack/loader?id=js',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                use: 'happypack/loader?id=css',
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                ]
            }
        ]
    },
    plugins: [
        // 用唯一的标识符id来代表当前的HappyPack是用来处理一类特定文件
        new Happypack({
            id: 'js', //和rule中的id=js对应
            //将之前 rule 中的 loader 在此配置
            use: ['babel-loader'] //必须是数组
        }),
        new Happypack({
            id: 'css',//和rule中的id=css对应
            use: ['style-loader', 'css-loader','postcss-loader'],
        })
    ]
}
```

happypack默认开启 CPU核数 - 1 个进程，我们也可以传递threads给Happypack
