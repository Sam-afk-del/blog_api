var percision = 50;

class Leaf {

    constructor(ctx, x, y, color) {
        this.ctx = ctx;
        this.x = x
        this.y = y
        this.color = color;
        this.size = 1;
        this.rotate = random(0, 4) * 100; //旋转度数
        this.vertices = new Array();
        for (var i = 0; i < percision; i++) {
            var t = Math.PI * 2 * (i / percision - 0.5);
            // var tx = 3 * Math.sin(t) - 1 * Math.sin(3 * t);
            // var ty = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            var tx = 3 * Math.cos(t);
            var ty = 3 * Math.sin(t);
            this.vertices.push({ x: tx, y: -ty });
        }
    }

    draw() {

        this.ctx.save();
        this.ctx.translate(this.x, this.y); //偏移绘制原点
        this.ctx.beginPath(); //开始绘制
        this.ctx.rotate(this.rotate); //旋转
        this.ctx.scale(this.size, this.size); //缩放
        this.vertices.forEach(element => {
            this.ctx.lineTo(element.x, element.y); //绘制轮廓
        });
        // this.ctx.fillStyle = this.color;//填充颜色
        this.ctx.fillStyle = this.color;
        this.ctx.shadowOffsetX = 0;//阴影
        this.ctx.shadowOffsetY = 0;//阴影
        this.ctx.shadowBlur = 4;//模糊级数
        this.ctx.shadowColor = '#fff';//阴影颜色
        this.ctx.closePath(); //结束绘制
        this.ctx.fill(); //填充轮廓
        this.ctx.restore(); //返回之前保存过的路径状态和属性

    }

}


class MoveLeaf extends Leaf {

    constructor(ctx, x, y, color) {
        super(ctx, x, y, color);

        this.dx = random(-5, 5);
        this.dy = random(-5, 5);

    }

    update() {

        this.x += this.dx;
        this.y += this.dy;
        this.size -= 0.08;
        if (this.size < 0) {
            this.size = 0;
        }
    }
}

const random = (start, end) => Math.floor(Math.random() * (end - start) + start);

export default {

    getLeaf(ctx, x, y, color) {

        let moveLeaf = new MoveLeaf(ctx, x, y, color);

        return moveLeaf;
    }

}