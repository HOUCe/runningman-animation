# runningman-animation
This is a demo about running man animation. You can learn about CSS3 to create animation scene.

作为一名真正的前端开发者，我们不能只关注前端逻辑部分。毕竟“水银泄地”般的页面设计和“炫酷逼真”的动画效果，是我们区别于其他程序员所特有的优势之一。尽量百分之百的还原视觉稿，为UE设计灵感和用户视觉享受架起一座桥梁：正所谓“晋帝时祭北郊，更祝版，工人削之，笔入木三分。”
借古书法形容我们的代码，当真是恰当准确又自恋无比。

之前的一些文章大多都是分享JS相关内容。今天轻松一下，我来谈谈前端页面的动画部分。通过剖析一个上线的“跑男”动画实例，来把CSS3中动画相关的知识点抽丝剥茧，一网打尽。如果读者有自己的感想或者不一样的见解，欢迎一起讨论。

整个项目的[Github地址](https://github.com/HOUCe/runningman-animation)可以参考[这里](https://github.com/HOUCe/runningman-animation)。对比线上效果，这个仓库进行了90%的删减，但是更加适合练手和理解。感兴趣的读者欢迎拉下来自己玩一玩。里面只有一关动画，您可以比葫芦画瓢进行调试练习。


## 项目简介
这是一个运营活动页面——"春季马拉松大比拼"：用户以闯关形式参加，并进行角色扮演。在满足一定条件下，自己扮演的马拉松选手会绕着跑道（非正规跑道形状）前进，向终点发起冲击。

部分页面动画效果如下：

![部分动画效果截图](http://upload-images.jianshu.io/upload_images/4363003-cabc0a036d80d926.gif?imageMogr2/auto-orient/strip)


当然，这个动画并不完美。考虑到时间性价比，我只用了两帧重复循环模拟摆腿动作。但也达到了运营和产品小妹的需求。如果在没有上线压力的情况下，我们完全可以拆分更多帧，把他打磨的更流畅顺滑。

首先，我们来看一下它的具体实现方式吧。如果您觉得很简单，也可以往下读，相信你也会有不一样的收获。

 
## 动画方案
这一系列的动画设计，出于性能和简单的考虑，我采用了纯CSS3来实现。CSS3实现动画，主要有两种方式：transition属性和animation属性。前者是用来“平滑的改变CSS的值”。一般对于需要特定帧处理的动画，这显然是苍白无力的。我就不过多介绍了。这里重点介绍一下animation属性。

### animation
animation属性其实是一个简写属性，就像我们更加熟悉的“background”属性一样。它用于设置六个动画属性：

1）animation-name
2）animation-duration
3）animation-timing-function
4）animation-delay
5）animation-iteration-count
6）animation-direction

最重要的就是animation-name，它规定需要绑定的keyframes名称。keyframes，我们用来定义几个关键节点帧。

具体我不会进行科普。如果初学者不了解，社区上关于这些的资料可是一大把。

### 跑男开跑
回到我们具体的业务场景，我们进行分析。跑男的动画其实可以拆分为两种：
1）一个是交替摆腿；
2）另一个是位置移动。
这两个动作要严丝合缝的结合。能把这个想清楚，那就基本思路理解了。

接着，如何让这两种动画一起施加在“静止的”跑男身上呢？

我采用了增加一个div标签包裹的方式：

    <div class="man-wrapper" id="man-wrapper">
        <div class="man" id="man"></div>
    </div>

'man-wrapper'这个div与'man'这个div尺寸大小完全一致，视觉上绝对重合。父节点处理位移，子节点负责交替摆腿：

    .man-wrapper {
        display: inline-block;
        width: 46px;
        height: 75px;
        position: absolute;
    }
    .man {
        display: inline-block;
        width: 46px;
        height: 75px;
        background: url(img/sprite.png);
        position: absolute;
        top: 0;
        left: 0;
    }

当需要触发位移，开启跑步状态时，父节点添"start-run"类：

    $('.man-wrapper').addClass('start-run');

子节点添加：

    $('#man').addClass('running');

### 动画实现
关于“start-run”位移的动画设计，在跑道上直道部分相对简单，我们思路是使用transform：translate3d。但是视觉稿上存在不少于5处不规则弯道，在不改变原图的基础上，在不增加多余图片的原则下，我们可以使用transform：rotate3d，使跑男进行侧身。具体设计看下图：

![动画部分分解](http://upload-images.jianshu.io/upload_images/4363003-22e1cfcd31e6b7e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1）1-2和4-5，只需要改变transform：translate3d；
2）2-4部分，即2，3，4这三个阶段是为了弯道准备的。当然，如果时间充足，我们完全可以拆分的更加细致，更加细分。
3）其中3是弯道中心的45度转身：rotate3d(0,0,1,45deg);
4）其中4是已经完全转身：rotate3d(0,0,1,90deg);

具体代码：

    .start-run {
        animation: start-run 5000ms; 
        animation-fill-mode: forwards;
        animation-timing-function: linear;
    }
    @keyframes start-run {
        0% {
            transform: translate3d(0, 0, 0);
        }
        35% {
            transform: translate3d(0, 155px, 0) rotate3d(0, 0, 1, 0deg);
        }
        50% {
            transform: translate3d(20px, 224px, 0) rotate3d(0, 0, 1, -45deg);
        }
        70% {
            transform: translate3d(80px, 242px, 0) rotate3d(0, 0, 1, -90deg);
        }
        100% {
            transform: translate3d(200px, 243px, 0) rotate3d(0, 0, 1, -90deg);
        }
    }

为什么是35%，50%，70%呢？这个是我调试出来，相对能达到顺畅效果。如果追求更严谨的话，完全可以列一个极坐标计算一下位移和时间。当然这样子成本会比较大。

还有一点值得一提的是animation-timing-function: linear; 一般马拉松中段，都近似于匀速跑吧～

解决完了位移的问题，我们来看摆腿动作。这个其实就是两张图片在交替播放。其实就是gif图原理。我使用了background-position来切换精灵图片的方式处理：

    .running {
        animation: running-man 1200ms steps(2) infinite;
    }
    @keyframes running-man {
        0% {
            background-position: 0 0;
        }
        50% {
            background-position: 92px 0;
        }
    }

千万不要扫一眼代码完事儿，这里还有一些最重要的细节要注意。首先是“infinite”的使用，这个应该没什么意外吧。另外，你可曾注意了steps这个函数?


### steps()函数实现阶跃动画
我们知道animation定义的关键帧之间是“平滑过渡”的。这个平滑过渡怎么理解呢？我精心做了一个“反例”示图来说明：
在使用keyframes改变雪碧图background-position时，

![动画部分分解反面示例](http://upload-images.jianshu.io/upload_images/4363003-de26aeaa8879fa44.gif?imageMogr2/auto-orient/strip)

这样的"平滑过度"显然不是我们想要的。

所以，在切换雪碧图背景的方案下，steps()就要派上用场了。顺便说一句，最近面试一些人，提到熟悉CSS3动画，但是大部分都还不知道这个steps阶跃函数。如果你还不清楚，可以参考[这里。](http://www.cnblogs.com/BATAKK/p/5301819.html)

借助steps()函数，我们实现了交替跑动的分解动画：

![动画部分分解](http://upload-images.jianshu.io/upload_images/4363003-4cd1498e2f1c9504.gif?imageMogr2/auto-orient/strip)


## 还不完美
做到这里，其实还没有完全结束。有一些值得我们思考的问题。

1）真的有必要多一个标签，来相互结合生成动画吗？
其实不是的，animation很神奇很强大的一点在于：它可以接受多个动画属性序列。比如上边那种情况我们完全可以这样实现：

    .running {
        animation: start-run 5000ms forwards linear, running-man 1200ms steps(2) infinite
    }

2) 如果刻意追求更佳完美的动画，我们还需要哪些储备？
不得不要说知识储备上，就是数学和物理知识了。比如，二次方曲线、三次方曲线、一直到五次方曲线，正弦余弦、圆弧、抛物线、反弹曲线、弹簧曲线等等。如果你对研究这些有兴趣，这里安利一些：[高性能动画实现](https://greensock.com/)以及[可视化1](https://greensock.com/ease-visualizer)，[可视化2。](http://jeremyckahn.github.io/stylie/)

除了数学公式以外，也需要我们掌握样式预处理器函数使用。毕竟，那么多帧我们不可能自己手动实现。


## 总结
流畅高效的动画，绝非一朝一夕就能完成，需要各方面甚至跨领域的积累。如果你对此很感兴趣，欢迎讨论。我也在工作过程中，积累了很多动画实现效果，愿意同大家一起分享，互通资源。

最后，这篇文章中截图部分采用了我厂（狼厂）UE：许冬设计师的视觉稿，和PM：田小甜大小姐的交互设计。

PS：百度知识搜索部大前端继续招兵买马，有意向者火速联系。。。
