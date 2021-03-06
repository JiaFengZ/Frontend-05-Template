## 算法思路

和三子棋与不一样的是，五子棋（15*15）在可接受时间内无法穷尽所有下法，需要设定一个搜索深度，
那么到达搜索深度时，需要一个评估当前局势分数的方法，假定局势评分越大对max方越有利，
那么评分越小则对min方越有利。ai则在max方模拟下子取评分最高的一种下子，在min方模拟下子
取评分最低的一种下子。

这里采取的评估思想如下：
* 遍历所有可能的赢法，记录每个点可归属的赢法
* 定义赢法的达成度为这个赢法5个连续位置中已下的棋子个数，个数越多达成度越高，最高达成度为5说明一方获胜
* 每次下子，更新下子所在点的所属的赢法达成度，累加所有赢法的达成度即可得出当前棋局的优势评分

目前这个评估算法似乎不太好，搜索深度到3时，ai每一步的运行用时数秒甚至更长，代码中暂时设为2。。。
[评估算法参考来源](https://zhuanlan.zhihu.com/p/25650252)