<template >
  <div class="pagination">
    <div
      @click="handleClick(-1)"
      :class="'pagination-page-block pagination-page-block-' + name"
    >
      &lt;
    </div>
    <div
      v-for="page in pages"
      :key="page"
      @click="handleClick(page)"
      :class="'pagination-page-block pagination-page-block-' + name"
    >
      {{ page }}
    </div>
    <div
      @click="handleClick(0)"
      :class="'pagination-page-block pagination-page-block-' + name"
    >
      &gt;
    </div>
    <select
      name="selected"
      id=""
      class="pagination-select"
      v-model="selected"
      @change="handleClick(selected)"
    >
      <option :value="page" v-for="page in pages" :key="page">
        {{ page }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: ["count", "number", "name"],
  components: {},
  data() {
    return {
      pages: 0,
      myCount: 0,
      current: 1,
      selected: 1,
      className: "pagination-page-block-" + this.name,
    };
  },
  created() {
    this.sendPageToParent();
  },
  methods: {
    sendPageToParent: function () {
      this.$emit("getPageNumber", this.current);
    },
    handleClick: function (page) {
      if (page > 0) {
        this.current = page;
      } else {
        if (page == -1) {
          if (this.current > 1) {
            this.current -= 1;
          }
        }
        if (page == 0) {
          if (this.current < this.pages) {
            this.current += 1;
          }
        }
      }
      this.changePageState();
      this.sendPageToParent();
      this.selected = this.current;
    },
    changePageState: function () {
      let blocks = document.getElementsByClassName(this.className);
      blocks[this.current].style.boxShadow =
        "0 0 20px rgba(117, 252, 177, 0.8)";
      blocks[this.current].style.border = "1px solid rgb(117,252,177)";
      if (this.pages > this.number) {
        if (this.current <= 3) {
          for (let i = 1; i <= this.pages; i++) {
            if (i > 5) {
              blocks[i].style.display = "none";
            } else {
              if (i != this.current) {
                blocks[i].style.boxShadow = "none";
                blocks[i].style.border = "none";
              }
              blocks[i].style.display = "block";
            }
          }
        } else if (this.current >= this.pages - 2) {
          for (let i = 1; i <= this.pages; i++) {
            if (i < this.pages - 4) {
              blocks[i].style.display = "none";
            } else {
              if (i != this.current) {
                blocks[i].style.boxShadow = "none";
                blocks[i].style.border = "none";
              }
              blocks[i].style.display = "block";
            }
          }
        } else {
          for (let i = 1; i <= this.pages; i++) {
            if (i < this.current - 2 || i > this.current + 2) {
              blocks[i].style.display = "none";
            } else {
              if (i != this.current) {
                blocks[i].style.boxShadow = "none";
                blocks[i].style.border = "none";
              }
              blocks[i].style.display = "block";
            }
          }
        }
      } else {
        for (let i = 1; i <= this.pages; i++) {
          if (i != this.current) {
            blocks[i].style.boxShadow = "none";
            blocks[i].style.border = "none";
          }
          blocks[i].style.display = "block";
        }
      }
    },
  },
  mounted() {},
  watch: {
    count: function (newData) {
      this.myCount = newData;
      this.pages = Math.ceil(this.myCount / this.number);
    },
    pages: function () {
      this.$nextTick(function () {
        let blocks = document.getElementsByClassName(this.className);
        blocks[this.current].style.boxShadow =
          "0 0 20px rgba(117, 252, 177, 0.8)";
        blocks[this.current].style.border = "1px solid rgb(117,252,177)";
        if (this.pages > this.number) {
          if (this.current <= 3) {
            for (let i = 1; i <= this.pages; i++) {
              if (i > 5) {
                blocks[i].style.display = "none";
              }
            }
          }
        } else {
          for (let i = 1; i <= this.pages; i++) {
            if (i != this.current) {
              blocks[i].style.boxShadow = "none";
              blocks[i].style.border = "none";
            }
            blocks[i].style.display = "block";
          }
        }
      });
    },
  },
};
</script>
<style>
.pagination-page-block {
  float: left;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  margin: 5px 5px;
  line-height: 30px;
  text-align: center;
}
.pagination-select {
  float: left;
  width: 50px;
  height: 30px;
  border: rgba(255, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0.8);
  outline: none;
  margin: 5px 5px;
  border-radius: 5px;
  color: inherit;
}
.pagination-select option {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>




