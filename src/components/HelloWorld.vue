<template>
  <div class="container" @touchstart="fun">
    <!-- <div id="f1" class="finger-prints">
      <finger-prints :fingerId="'1'"></finger-prints>
    </div>
    <div id="f2" class="finger-prints">
      <finger-prints :fingerId="'2'"></finger-prints>
    </div> -->
    <div>
      <button-loading/>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
import FingerPrints from "./FingerPrints.vue";
import ButtonLoading from "./ButtonLoading.vue"
import emitter from "tiny-emitter/instance";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    FingerPrints,
    ButtonLoading
  },
  data() {
    return {
      posMap: {},
      twoFingers: [false, false],
      time: {},
      text: ""
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
      self.text = e.changedTouches[0].radiusX+":"+e.changedTouches[0].radiusY+":"+e.changedTouches[0].rotationAngle
      let $finger = $("#f" + (hasOne + 1));
      $finger.css("top", e.changedTouches[0].clientY - 90);
      $finger.css("left", e.changedTouches[0].clientX - 50);
      $finger.show();
      emitter.emit("fingerStart", hasOne + 1);
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
  width: 100%;
  height: 100%;
  border: 1px solid black;
}

.finger-prints {
  width: 100px;
  height: 100px;
  position: absolute;
}
</style>
