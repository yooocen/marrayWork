<template>
  <div>
    <div class="paper container">
      <div class="lines">
        <div class="text" contenteditable spellcheck="false">
          
          <img :src="image" 
            class="love-img"
          />

          <img class="word" src="../assets/word.png"/>
          <div class="date">C & C 2021.12.2</div>
        </div>
      </div>
    </div>

    <div class="container" @touchstart="fun">
      <div id="f1" class="finger-prints">
        <finger-prints :fingerId="'1'"></finger-prints>
      </div>
      <div id="f2" class="finger-prints">
        <finger-prints :fingerId="'2'"></finger-prints>
      </div>
    </div>
    <div>
      <button-loading :isOk="isOk" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import FingerPrints from "./FingerPrints.vue";
import ButtonLoading from "./ButtonLoading.vue";
import emitter from "tiny-emitter/instance";
import {image} from "../assets/wechat"
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    FingerPrints,
    ButtonLoading,
  },
  data() {
    
    return {
      posMap: {},
      twoFingers: [false, false],
      time: {},
      text: "",
      isOk: false,
      image
    };
  },
  methods: {
    fun() {},
  },
  mounted() {
    const self = this;
    $(".container").on("touchstart", (e) => {
      e.preventDefault();
      let hasOne = -1;
      for (let i = 0; i < self.twoFingers.length; i++) {
        if (!self.twoFingers[i]) {
          self.twoFingers[i] = true;
          hasOne = i;
          break;
        }
      }
      // 所有的指纹都用上了
      if (hasOne == -1) {
        console.log("return");
        return;
      }
      console.log("ye");
      // self.posMap[e.changedTouches[0].identifier] = hasOne;
      self.posMap[e.changedTouches[0].identifier] = hasOne;
      self.time[e.changedTouches[0].identifier] = new Date().getTime();
      self.text =
        e.changedTouches[0].radiusX +
        ":" +
        e.changedTouches[0].radiusY +
        ":" +
        e.changedTouches[0].rotationAngle;
      let $finger = $("#f" + (hasOne + 1));
      // let left = $(".paper").css('margin-left')
      // let top = $(".paper").css('margin-top')
      $finger.css("top", e.changedTouches[0].clientY- 40);
      $finger.css("left", e.changedTouches[0].clientX - 50);
      $finger.show();
      emitter.emit("fingerStart", hasOne + 1);
      if (hasOne >= 1) {
        this.isOk = true;
      }
    });

    $(".container").on("touchend", (e) => {
      e.preventDefault();
      console.log("no");
      let index = self.posMap[e.changedTouches[0].identifier];
      let lastTime = self.time[e.changedTouches[0].identifier];
      let curTime = new Date().getTime();
      if (index != undefined && index != -1 && curTime - lastTime < 500) {
        self.twoFingers[index] = false;
        delete self.posMap[e.changedTouches[0].identifier];
        delete self.time[e.changedTouches[0].identifier];
        let $finger = $("#f" + (index + 1));
        $finger.css("top", 0);
        $finger.css("left", 0);
        $finger.hide();
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100vh;
  width: 100%;
  z-index: 9;
}

.finger-prints {
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 10;
}

@import url(https://fonts.googleapis.com/css?family=Indie+Flower);

.paper {
  -webkit-transition: opacity 0.9s linear;
  -moz-transition: opacity 0.9s linear;
  -o-transition: opacity 0.9s linear;
  transition: opacity 0.9s linear;
  opacity: 1;
  filter: alpha(opacity=0);
  position: absolute;
  height: 600px;
  width: 800px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 5px 0px #888;
  left: 50%;
  top: 50%;
  margin: -300px 0 0 -400px;
}


/* .text {
  position: absolute;
  top: 65px;
  left: 55px;
  bottom: 10px;
  right: 10px;
  line-height: 25px;
  font-family: "Indie Flower";
  overflow: hidden;
  outline: none;
} */


.fadeIn {
  opacity: 100;
  filter: alpha(opacity=1);
}

.love-img {
  margin: 0 auto;
  width: 480px;
  height: 300px;
  box-shadow: 0px 0px 5px 0px #888;
  margin-left: 150px;
  margin-top: 50px;
  display: block;
}

.word{
  margin-left: 130px;
  margin-top: 0px;
  width: 400px;
  height: 84px;
}

.date {
  margin-left: 510px;
}
</style>
