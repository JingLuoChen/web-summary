# Git教程
## 概述
git 版本控制系统，有linux使用c语言开发了两周（大佬啊）<br>

```$xslt
git有好几个区

工作区 - workspace
暂存区 - index
本地仓库 - local repository - 以上三个地方都是存在本地的
远程仓库 - remote repository - 远程服务器，例如github、gitlab
```

## 工作区内容恢复
```$xslt
git checkout --file  => 可以丢弃工作区的修改
```

## 暂存区内容恢复
```$xslt
git reset HEAD file  => 可以丢弃暂存区的修改
```

## 本地仓库内容恢复
```$xslt
git reset --hard 1094a  => 可以回退到指定版本
```
## 参考文档

* [Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
