---
title: 'js异步循环'
description:  'js的异步循环'
tags: 'others' 
createdDate: 2023/01/12
updateDate: 2023/01/12


---


### 案例：
最近几天在看总监直播的时候大家都喜欢在总监的直播间死等，想到我可以用 js 脚本发弹幕催促总监快快开播，心善俊美的总监看到咱们如此喜爱他就会立即开播(∩_∩)哈哈，当然刷屏不好也会被封，不合适这样但是可以试试怎么实现的。
### 原理：
其实就是一个简单的 js 脚本，具体就是提供一些语句数组，通过遍历这个数组来填入输入框再触发按钮的点击事件发送弹幕即可。其中需要用到的可能就是需要循环遍历异步事件。
### 实现：
网上随便查了下，循环的异步事件可以用ES6的语法实现，大致是用 async/await 的组合实现。把每个数组元素抽象成异步等待的事件。按数组顺序发生。
```javascript
let sentence=[
  "卢，你在哪，我需要你",
  "我爱你卢 快来",
  "还会再见吗刘哥",
  "卢，醒来"];
```
确定一下数组语句。还有两个获取DOM的操作就不写了。
```javascript
  	function sleep() {
            return new Promise((res, rej) => {
                setTimeout(() => {
                   
                    res()
                }, 30000)
            })
        }
```
延迟的Promise用于控制输出顺序。设定为30秒进行第二次循环。
```javascript
  	async function main() {
            for (let i = 0; i < sentence.length; i++) {
                await sleep();
              	//在这里处理我们的DOM逻辑
                console.log('get')
                chatText.value=sentence[i];
                chatBtn.click();
              
            }
        }
```

- 需要注意的是：
- Array.forEach操作是同步/并行方法，所以无法直接使用async进行我们理想中的异步操作
- 如果需要依次进行异步操作的话，建议使用常规循环（比如for）
- 如果需要同时进行异步操作的话，建议使用Promise.all但需要注意性能问题

