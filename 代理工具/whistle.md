# whistle
## 概述
基于Node实现的跨平台web调试代理工具，类似的工具有windows平台上的Fiddler，主要用于查看、修改HTTP、HTTPS、Websocket的请求、响应，也可以作为HTTP
代理服务器使用，不同于Fiddler通过断点修改请求响应的方式，whistle采用的是类似配置系统hosts的方式，一切操作都可以通过配置实现，支持域名、路径、正则表达式、通配符、
通配路径等多种匹配方式，且可以通过node模块扩展功能

## 参考文档
* [whistle](http://wproxy.org/whistle/)
