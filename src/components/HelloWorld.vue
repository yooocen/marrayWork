<template>
  <div class="bg-wrapper">
    <div class="envelope-wrapper">
      <div class="envelope">
        <div class="card" @click="onclick">
          <span class="fa fa-close close-icon"></span>
          <div class="text">The first anniversary of our Marriage.</div>
        </div>
      </div>
      <div class="heart"></div>
    </div>
  </div>
</template>

<script>
import * as $ from "jquery";
import {router} from '../main'
export default {
  mounted: () => {
    $(document).ready(() => {
      $(".envelope-wrapper .heart").click(() => {
        $(".envelope-wrapper").addClass("flap");
      });

      $(".envelope-wrapper .close-icon").click(() => {
        $(".envelope-wrapper").removeClass("flap");
      });
    });
  },
  methods: {
    onclick : () => {
      router.push('painting')
    }
  }
};
</script>

<style >
.bg-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #444;
}
.bg-wrapper .envelope-wrapper {
  background: #b4d2ee;
}
.bg-wrapper .envelope-wrapper .envelope {
  position: relative;
  width: 150px;
  height: 100px;
}
.bg-wrapper .envelope-wrapper .envelope:before {
  content: "";
  position: absolute;
  top: 0px;
  z-index: 2;
  border-top: 55px solid #d3eafd;
  border-right: 75px solid transparent;
  border-left: 75px solid transparent;
  transform-origin: top;
  transition: all 0.5s ease-in-out 0.7s;
}
.bg-wrapper .envelope-wrapper .envelope:after {
  content: "";
  position: absolute;
  z-index: 2;
  width: 0px;
  height: 0px;
  border-top: 50px solid transparent;
  border-right: 75px solid #b4d2ee;
  border-bottom: 50px solid #b4d2ee;
  border-left: 75px solid #b4d2ee;
}
.bg-wrapper .envelope-wrapper .envelope .card {
  position: absolute;
  right: 20%;
  bottom: 0;
  width: 60%;
  height: 90%;
  background: #fff;
  text-align: center;
  transition: all 1s ease-in-out;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.bg-wrapper .envelope-wrapper .envelope .card .close-icon {
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 10px;
  color: rgba(68, 68, 68, 0.7);
  cursor: pointer;
}
.bg-wrapper .envelope-wrapper .envelope .card .text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-family: "Great Vibes", cursive;
  color: #c51803;
  transform: translate(-50%, -50%);
}
.bg-wrapper .envelope-wrapper .heart {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px;
  height: 15px;
  background: #c51803;
  z-index: 4;
  transform: translate(-50%, -20%) rotate(45deg);
  transition: transform 0.5s ease-in-out 1s;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}
.bg-wrapper .envelope-wrapper .heart:before,
.bg-wrapper .envelope-wrapper .heart:after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #c51803;
  border-radius: 50%;
}
.bg-wrapper .envelope-wrapper .heart:before {
  top: -7.5px;
}
.bg-wrapper .envelope-wrapper .heart:after {
  right: 7.5px;
}
.bg-wrapper .flap .envelope:before {
  transform: rotateX(180deg);
  z-index: 0;
}
.bg-wrapper .flap .envelope .card {
  bottom: 100px;
  transform: scale(1.5);
  transition-delay: 1s;
}
.bg-wrapper .flap .heart {
  transform: rotate(90deg);
  transition-delay: 0.4s;
}
</style>