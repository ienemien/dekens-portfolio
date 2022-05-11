<script setup lang="ts">
</script>

<template>
    <h3>We halen de berichten vliegensvlug voor je op</h3>
    <div class="fly-cage">
        <img src="../assets/loader-fly.png" class="loader-fly" />
    </div>
</template>

<style scoped lang="scss">
@keyframes fly {
    0% {
        // left: 0;
        // top: 20%;
        transform: rotate(45deg);
    }

    30% {
        // left: 60%;
        // top: 60%;
        transform: rotate(0deg);
    }

    40% {
        transform: rotate(-45deg);
    }

    45% {
        // left: 50%;
        // top: 30%;
        transform: rotate(-90deg);
    }

    50% {
        // left: 40%;
        // top: 50%;
        transform: rotate(-135deg);
    }

    55% {
        // left: 40%;
        // top: 50%;
        transform: rotate(-180deg);
    }

    60% {
        // left: 40%;
        // top: 50%;
        transform: rotate(-225deg);
    }

    65% {
        // left: 40%;
        // top: 50%;
        transform: rotate(-270deg);
    }

    70% {
        // left: 40%;
        // top: 50%;
        transform: rotate(-315deg);
    }


    80% {
        // left: 40%;
        // top: 50%;
        transform: rotate(-345deg);
    }

    100% {
        // left: 100%;
        // top: 80%;
        transform: rotate(-360deg);
    }
}

.fly-cage {
    width: auto;
    height: 300px;

    .loader-fly {
        position: relative;
        top: 200px;
        width: 40px;
        height: 40px;
        animation: fly 5s ease;
        animation-fill-mode: forwards;
    }
}
</style>