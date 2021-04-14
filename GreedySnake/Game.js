function Game() {
    // 设置行和列，初始化
    this.row = 20;
    this.col = 20;
    this.init();
    // 初始化蛇
    this.snake = new Snake();
    // 初始化食物
    this.food = new Food(this);
    // 初始化分数
    this.score = 0;
    // 执行定时器任务
    this.start();
    // 键盘事件监听
    this.bindEvent();
}

// 初始化
Game.prototype.init = function () {
    this.dom = document.createElement('table');
    var tr, td;
    // 创建表格
    for (var i = 0; i < this.row; i++) {
        tr = document.createElement('tr');
        for (var j = 0; j < this.col; j++) {
            td = document.createElement('td');
            tr.appendChild(td);
        }
        // 添加表格到dom中
        this.dom.appendChild(tr);
    }
    // 添加dom到主视图中
    document.getElementById('app').appendChild(this.dom);
}

// 设置颜色的方法
Game.prototype.setColor = function (row, col, color) {
    this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].style.background = color;
}

// 渲染食物
Game.prototype.setHTML = function (row, col, html) {
    this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].innerHTML = html;
}


// 清屏
Game.prototype.clear = function () {
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.row; j++) {
            this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background = '#333';
            this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML = '';

        }
    }
}

// 异步程序（蛇行走的动画效果）
var timer;
Game.prototype.start = function () {
    this.f = 0;
    timer = setInterval(() => {
        // 清屏-更新-渲染
        game.f++;
        game.clear();
        // 当蛇变长的时候，速度要变快
        var during = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1;
        game.f % during == 0 && game.snake.update();
        // 渲染蛇和食物
        game.snake.render();
        game.food.render();
    }, 20);
}

// 键盘事件监听
Game.prototype.bindEvent = function () {
    var self = this;
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            // 左
            case 37:
                if (self.snake.direction == 'R') return;
                self.snake.changeDirection('L');
                break;
            // 上
            case 38:
                if (self.snake.direction == 'D') return;
                self.snake.changeDirection('U');
                break;
            // 右
            case 39:
                if (self.snake.direction == 'L') return;
                self.snake.changeDirection('R');
                break;
            // 下
            case 40:
                if (self.snake.direction == 'U') return;
                self.snake.changeDirection('D');
                break;
        }
    }
}