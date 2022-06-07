<template>
  <div class="loader">
    <div class="fly-cage">
      <img src="../assets/loader-fly.png" class="loader-fly" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes rotate-fly {
  from {
    transform: rotate(0deg) translate(-300px);
    opacity: 0;
  }

  2% {
    opacity: 1;
  }

  25% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(-180deg);
  }

  75% {
    transform: rotate(-360deg);
  }

  98% {
    opacity: 1;
  }

  to {
    transform: rotate(-360deg) translate(300px);
    opacity: 0;
  }
}

.loader {
  display: flex;
  justify-content: center;

  .fly-cage {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
    animation: rotate-fly 1s linear;
    animation-fill-mode: forwards;
    transform-origin: center center;

    .loader-fly {
      position: relative;
      width: 40px;
      height: 40px;
      top: 160px;
      left: 80px;
    }
  }
}
</style>
