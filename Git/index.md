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
合并某个分支上的单个commit
```$xslt
git checkout master
git cherry-pick 62ecb3
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
git rebase -i HEAD~n

上面的n代指数字，表示包括当前以前的几个commit
```

这时会出现一个编辑界面

```$xslt
pick 5e187c7dbe8    add center style indent  
pick 6d577eb3440    add center style  
pick f9b9508a3ab    add center style  
pick 111ab9cc261    update templates  
# Rebase 150a643..2fad1ae onto 150a643  
#  
# Commands:  
#  p, pick = use commit  
#  r, reword = use commit, but edit the commit message  
#  e, edit = use commit, but stop for amending  
#  s, squash = use commit, but meld into previous commit  
```

把第二到四行的[pick]更改为s，就会使用这个commit，并且合并前几个commit
```$xslt
s 5e187c7dbe8    add center style indent  
s 6d577eb3440    add center style  
s f9b9508a3ab    add center style  
pick 111ab9cc261    update templates  
```

若出现冲突，解决冲突，应用最新的版本，使用
```$xslt
git add . //提交索引
git rebase --continue //继续rebase操作
```
若在合并commit的过程中想放弃，可以使用命令
```$xslt
git rebase --abort
```
若在合并过程中异常退出了vi窗口，不要紧张
```$xslt
git rebase --edit-todo
```
这时候会一直处在这个编辑的模式里，我们可以回去继续编辑，修改完保存一下
```$xslt
git rebase --continue
```
最后把本地推上远程
```$xslt
git push -f //必须带上-f，以本地覆盖远程

git push (origin master) -f 或者指定远程和分支
```

查看结果
```$xslt
git log
```

#### 合并分支
1、首先我们先从master分支切出一个dev分支，进行开发
```$xslt
git checkout -b dev
```

2、这时候你的同事完成了一次hotfix，并合并入了master分支，此时，master已经领先于你的feature1分支了<br>

3、恰巧，我们想要同步master分支的改动，可以使用merge，执行
```$xslt
git merge master
```
这样就会在记录里发现一些merge的信息，但是我们觉得这样污染了commit记录，想要保持一份干净的commit

4、使用rebase
```$xslt
git rebase master
```

>rebase做了什么操作
首先，git 会把feature1分支里面的每一个commit取消掉；
其次，把上面的操作临时保存成patch文件，存在.git/rebase目录下；
然后，把feature1分支更新到最新的master分支上；
最后，把上面保存的patch文件应用到feature1分支上；

从commit记录我们可以看出来，feature1分支是基于hotfix合并后的master，自然而然的成为了最领先的分支，而且没有merge的commit记录<br>

5、在rebase的过程中，也许会出现冲突conflict，在这种情况下，git会停止rebase并会让你去解决冲突。
在解决完冲突后，用git add 命名去更新这些内容，注意，你无需执行git commit命令，只要执行continue
```$xslt
git rebase --continue
```
这样git会继续应用余下的patch补丁文件

6、在任何时候，我们都可以使用--abort参数来终止rebase的行动，并且分支会回到rebase开始前的状态
```$xslt
git rebase --abort
```

#### 更多rebase的使用场景
git rebase存在的价值是：对一个分支做[变基]操作

1、当我们在一个过时分支上面开发的时候，执行rebase以此同步master分支最新变动<br>
2、假如我们要启动一个放置了很久的并行工作，现在有时间来继续这件事情，很显然这个分支已经落后了，这时候需要子啊最新的基准上面开始工作，所以rebase是最合适的选择

#### 为什么会是危险操作
根据上文来看，git rebase很完美，解决了我们两个问题：<br>
1、合并commit记录，保持分支整洁<br>
2、相比merge来说会减少分支合并的记录

但它改变了历史，如果分支只有自己使用就莫问题～

## 参考文档

* [使用git stash命令保存和恢复进度](https://blog.csdn.net/daguanjia11/article/details/73810577)
* [Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
* [彻底搞懂 Git-Rebase](http://jartto.wang/2018/12/11/git-rebase/)
* [git rebase的两个使用技巧](https://juejin.cn/post/6844903926517465096)

