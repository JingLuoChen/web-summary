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
### 代码提交到暂存区
```$xslt
git add -A // 提交所有变化
git add -u // 提交被修改和被删除的文件
git add . // 提交新文件和被修改的文件
```

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

git stash pop // 恢复最新的进度到工作区 git默认会把工作区和暂存区的改动都恢复到工作区

git stash pop stash@{1} // 恢复指定的进度到工作区。stash_id是通过git stash list命令得到的

git stash list // 显示保存的列表

git stash pop --index // 恢复最新的进度到工作区和暂存区。（尝试将原来暂存区的改动还恢复到暂存区）

git stash clear // 删除所有存储的进度。

// 通过git stash pop命令恢复进度后，会删除当前进度。
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

### 推送分支
```$xslt
git push origin dev // 本地分支推送到远程分支上
```

## 参考文档

* [使用git stash命令保存和恢复进度](https://blog.csdn.net/daguanjia11/article/details/73810577)
* [Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
