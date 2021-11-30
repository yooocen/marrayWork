<template>
  <div>
    <!-- Shoutout to: https://thenounproject.com/search/?q=fingerprint&i=202332  -->
    <div class="wrap">
      <div class="jb">
        <svg
          :id="fingerId1"
          class="fingerprint"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 100 100"
          xml:space="preserve"
        >
          <g>
            <path
              id="inner"
              stroke="#c0392b"
              stroke-linecap="round"
              stroke-width="2"
              fill="none"
              d="M51.5,5c-0.9-0.2-1.9,0.4-2.1,1.3c-0.2,0.9,0.4,1.9,1.3,2.1C66.3,12.1,77.2,26,77.2,42.1v15.8c0,11.1-9,20.1-20,20.1   c-11,0-20-9-20-20.1V42.1c0-3.1,2.5-5.6,5.5-5.6c3,0,5.5,2.5,5.5,5.6v15.8V58c0,0,0,0.1,0,0.1c0.1,4.9,4.1,8.9,9,8.9   c4.9,0,8.9-4,9-8.9c0,0,0-0.1,0-0.1V42.1c0-13-10.5-23.6-23.5-23.6c-12.9,0-23.4,10.5-23.5,23.4c0,0,0,0,0,0v15.9   c0,17.7,12,32.9,29.2,37c0.1,0,0.3,0,0.4,0c0.8,0,1.5-0.5,1.7-1.3c0.2-0.9-0.4-1.9-1.3-2.1C33.7,87.9,22.8,74,22.8,57.9V42.1   c0-11.1,9-20.1,20-20.1c11,0,20,9,20,20.1v15.8c0,3.1-2.5,5.6-5.5,5.6c-3,0-5.5-2.5-5.5-5.6V42.1V42c0,0,0-0.1,0-0.1   c-0.1-4.9-4.1-8.9-9-8.9c-4.9,0-8.9,4-9,8.9c0,0,0,0.1,0,0.1v15.9c0,13,10.5,23.6,23.5,23.6c12.9,0,23.4-10.5,23.5-23.4   c0,0,0,0,0,0V42.1C80.7,24.4,68.7,9.1,51.5,5z"
            ></path>
            <path
              id="outer"
              fill="none"
              stroke="#c0392b"
              stroke-width="2"
              d="M28.8,18.6c4.2-2.5,9-3.9,13.9-3.9C57.8,14.7,70,27,70,42.1v15.8c0,7.1-5.7,12.8-12.7,12.8c-7,0-12.7-5.8-12.7-12.8V42   c0-1-0.8-1.7-1.7-1.7c-1,0-1.7,0.8-1.7,1.7v15.9c0,9,7.3,16.3,16.2,16.3c8.9,0,16.1-7.2,16.2-16.1c0,0,0-0.1,0-0.1V42.1   c0-17-13.8-30.8-30.7-30.8c-5.5,0-11,1.5-15.7,4.3c-0.8,0.5-1.1,1.6-0.6,2.4S28,19.1,28.8,18.6z"
            ></path>
            <path
              id="outermost"
              stroke="#c0392b"
              stroke-width="2"
              fill="none"
              d="M71.2,81.4c-4.2,2.5-9,3.9-13.9,3.9C42.2,85.3,30,73,30,57.9V42.1c0-7.1,5.7-12.8,12.7-12.8c7,0,12.7,5.8,12.7,12.8V58   c0,1,0.8,1.7,1.7,1.7c1,0,1.7-0.8,1.7-1.7V42.1c0-9-7.3-16.3-16.2-16.3c-8.9,0-16.1,7.2-16.2,16.1c0,0,0,0.1,0,0.1v15.9   c0,17,13.8,30.8,30.7,30.8c5.5,0,11-1.5,15.7-4.3c0.8-0.5,1.1-1.6,0.6-2.4C73.1,81.2,72,80.9,71.2,81.4z"
            ></path>
          </g>
        </svg>
      </div>

      <i class="success fa fa-check-circle fa-2x"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { onMounted } from "vue-demi";
import $ from "jquery";
import Vivus from "vivus";
import emitter from "tiny-emitter/instance";

export default defineComponent({
  props: {
    fingerId: String,
  },
  setup(props) {
    onMounted(() => {
      var successIcon = $(".success");

      var finishedDrawing = function () {
        var drawStatus = animation.getStatus();

        if (drawStatus === "end") {
          successIcon.addClass("active");
        } else {
          successIcon.removeClass("active");
        }
      };

      var options = {
        duration: 80,
        type: "scenario",
        animTimingFunction: Vivus.EASE_OUT,
      };

      var animation = new Vivus(fingerId1, options, finishedDrawing);
      animation.stop();
      emitter.on("fingerStart", (num) => {
        if (num == fingerId1) {
          animation.reset();
          animation.play(1);
        }
      });
    });

    const fingerId1 = props.fingerId;

    return {
      fingerId1,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.fingerprint {
  width: 80px;
  z-index: 9;
  cursor: grab;
}
</style>
