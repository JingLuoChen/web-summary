# 队列
## 概览
队列，又称为伫列（queue），是先进先出（FIFO, First-In-First-Out）的线性表。在具体应用中通常用链表或者数组来实现。
队列只允许在后端（称为rear）进行插入操作，在前端（称为front）进行删除操作。

## 实现单链队列的完整代码
```js
class Queue {
  constructor() {
    this.items = []; // 存储数据
  }
  enqueue(item) { // 向队尾添加一个元素
    this.items.push(item);
  }
  dequeue() { // 删除队首的一个元素
    return this.items.shift();
  }
  head() { // 返回队首的元素
    return this.items[0];
  }
  tail() { // 返回队尾的元素
    return this.items[this.items.length - 1];
  }
  size() { // 返回队列的元素
    return this.items.length;
  }
  isEmpty() { // 返回队列是否为空
    return this.items.length === 0;
  }
  clear() { // 清空队列
    this.items = [];
  }
}
```
## 实现循环队列的完整代码
```js
//循环队列
function Queue(maxSize) {
    this.data = new Array(maxSize);
    this.front = 0; // 头指针
    this.rear = 0; // 尾指针
    this.maxSize = maxSize;
}
//长度
Queue.prototype.length = function(){
    return (this.rear-this.front+this.maxSize)%this.maxSize;
}
Queue.prototype.enterQueue = function(data){
    if((this.rear+1)%this.maxSize==this.front){
        //满
        return 1;
    }
    this.data[this.rear] = data;
    this.rear = (this.rear+1)%this.maxSize;
    return 0;
}
Queue.prototype.deleteQueue = function(){
    if(this.front == this.rear){
        //空
        return 1;
    }
    this.front = (this.front+1)%this.maxSize;
    return 0;
}
var que = new Queue(10);
que.enterQueue(1);
que.enterQueue(2);
que.enterQueue(3);
que.deleteQueue();
console.info(que.length());
```

## 实现链式队列的完整代码
```js
//节点
function Node(data){
    this.data = data;
}
function Queue() {
    var node = new Node(null);
    this.front = node;
    this.rear = node;
}
//长度
Queue.prototype.length = function(){
    var length = 0;
    var node = this.front;
    while(node!=this.rear){
        node = node.next;
        length++;
    }
    return length;
}
Queue.prototype.enterQueue = function(node){
    node.next = null;
    this.rear.next = node;
    this.rear = node;
    return 0;
}
Queue.prototype.deleteQueue = function(){
    var p = this.front.next;
    if(this.rear == this.front){
        return 1;
    }
    this.front.next = p.next;
    if(this.rear == p){
        this.rear = this.front;
    }
    delete p;
}
var que = new Queue(10);
que.enterQueue(new Node(1));
que.enterQueue(new Node(2));
que.deleteQueue();
console.info(que.length);
```
