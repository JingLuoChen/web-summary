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
## 基本指令
### 工作区内容恢复
```$xslt
git checkout --file  => 可以丢弃工作区的修改
```

### 暂存区内容恢复
```$xslt
git reset HEAD file  => 可以丢弃暂存区的修改
```

### 本地仓库内容恢复
```$xslt
git reset --hard 1094a  => 可以回退到指定版本
```

### 代码暂存
```$xslt
git stash  // 暂存代码

git stash pop // 恢复并把stash代码清掉
```

### 确定从版本库中删除某些文件
```$xslt
git rm read.txt 

git commit -m "update:删除无效文件"

这样就从版本库中删除指定文件
```

## 分支管理
### 切换分支
```$xslt
git switch dev

git branch dev

git checkout dev

// 通常使用git checkout dev
```
### 查看当前分支
```$xslt
git branch
```
### 合并分支
```$xslt
git merge master // 在dev分支上合并master分支代码
```
### 创建分支
```$xslt
git checkout -b dev
git switch -c dev
```
### 删除分支
```$xslt
git branch -d dev
```

## 参考文档

* [Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
