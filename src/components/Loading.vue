<template>
    <div class="snippet" data-title="dot-flashing">
        <div class="stage">
            <div class="dot-flashing"></div>
        </div>
    </div>
</template>

<style lang="css" scoped>

/**
 * ==============================================
 * Dot Flashing
 * ==============================================
 */
 .dot-flashing {
  position: relative;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #4ba21d;
  color: #4ba21d;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}
.dot-flashing::before, .dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-flashing::before {
  left: -10px;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #4ba21d;
  color: #4ba21d;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}
.dot-flashing::after {
  left: 10px;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #4ba21d;
  color: #4ba21d;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
    background-color: #4ba21d;
  }
  50%, 100% {
    background-color: rgba(152, 128, 255, 0.2);
  }
}
</style>