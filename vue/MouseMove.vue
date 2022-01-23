<template>
  <canvas id="myCanvas">当前浏览器不支持canvas</canvas>
</template>

<script>
import leaf from "../../api/leaf.js";
export default {
  name: "mouse-move",
  components: {},
  data() {
    return {
      leafArray: [],
      ctx: "",
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
      colorArray: [
        // "rgb(100,150,0)",
        // "rgb(80,200,0)",
        // "rgb(150,200,0)",
        // "rgb(130,200,0)",
        // "rgb(70,150,0)",
        "rgb(23, 255, 243)",
        "rgb(129, 255, 177)",
        "rgb(248, 255, 148)",
        "rgb(148, 191, 255)",
        "rgb(255, 205, 148)",
        "rgb(255, 148, 148)",
        "rgb(255, 148, 255)",
        "rgb(101, 111, 252)",
      ],
      count: 0,
    };
  },
  mounted() {
    let myCanvasEle = document.getElementById("myCanvas");
    let mouseMove = document.getElementById("app");
    this.ctx = myCanvasEle.getContext("2d");
    myCanvasEle.width = this.canvasWidth;
    myCanvasEle.height = this.canvasHeight;
    mouseMove.addEventListener("mousemove", (e) => {
      this.count++;
      if (this.count >= 3) {
        this.leafArray.push(
          leaf.getLeaf(
            this.ctx,
            e.clientX,
            e.clientY,
            this.colorArray[Math.floor(Math.random() * this.colorArray.length)]
          )
        );
        this.count = 0;
      }
    });
    setInterval(() => {
      this.clear();
      this.draw();
      if (this.leafArray.length >= 200) {
        this.leafArray = this.leafArray.splice(180);
      }
    }, 50);
    window.onresize = () => {
      return (() => {
        this.canvasWidth = document.body.clientWidth;
        this.canvasHeight = document.body.clientHeight;
        myCanvasEle.width = this.canvasWidth;
        myCanvasEle.height = this.canvasHeight;
      })();
    };
  },
  methods: {
    clear() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    },
    draw() {
      for (let i = 0; i < this.leafArray.length; i++) {
        this.leafArray[i].draw();
        this.leafArray[i].update();
      }
    },
  },
};
</script>

<style scoped>
#myCanvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}
</style>




