# Nest
## 创建
使用Nest CLI建立新项目只要确保你已经安装了npm，然后在你的OS终端中使用以下命令
```js
npm i -g @nestjs/cli
nest new project-name
```
将创建project目录，安装node模块和一些其他的样板文件，并将创建一个src目录，目录中包含几个核心文件
```
src
├── app.controller.ts
├── app.module.ts
└── main.ts
```
app.controller.ts：带有单个路由的基本控制器示例
app.module.ts：应用程序的根模块
main.ts：应用程序入口文件，它使用NestFactory用来创建Nest应用实例

main.ts包含一个异步函数，它负责引导我们的应用程序
```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```
要创建一个Nest应用实例，我们使用了NestFactory核心类，NestFactory暴露了一些静态方法用于创建应用实例，
create()方法返回了一个实现INestApplication接口的对象，并提供一组可用的方法。

在上面的main.ts示例中，我们只是启动HTTP服务器，它允许应用程序等待入站HTTP请求


