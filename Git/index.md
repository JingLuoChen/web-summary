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

### Rebase
#### 合并commit
>你肯定也试过这样的场景，leader交给你一个小需求，一个小时不到就解决了，提交一个commit，但过了一会，觉得代码还有可以改进的地方，
作为一个努力上进的人，你肯定不会只求完成需求这么简单，所以在提交了一版。。。

但这几个commit都是为了同一个需求开发的，leader去review代码的时候，几个commit还好，但实际开发中有时是几十个commit，
这样对于review代码和追踪版本时，显的尤为困难了

所以需要将为同一个需求开发的这些commit合并成一个

```$xslt
步骤：
1. dev分支开发完毕后推送远程；

2.切换master分支拉取远程；

3.切换dev分支rebase到master分支
```


## 参考文档

* [使用git stash命令保存和恢复进度](https://blog.csdn.net/daguanjia11/article/details/73810577)
* [Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
