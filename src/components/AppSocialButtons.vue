<template>
  <div class="social-buttons">
    <nav>
      <a
        href="http://nl.linkedin.com/pub/jojanneke-dekens/17/a4a/378"
        class="social-button"
      >
        <img src="../assets/images/linkedin.png" target="blank" />
      </a>
      <a
        href="https://www.instagram.com/insect.inspection"
        class="social-button"
      >
        <img src="../assets/images/instagram.png" target="blank" />
      </a>
    </nav>
  </div>
</template>

<styles lang="scss" scoped>
.social-buttons {
  display: flex;
  justify-content: center;
  width: 100%;
  grid-column: 2 / span 6;

  .social-button {
    img {
      width: 40px;
      height: 40px;
      margin: 5px;
    }
  }
}
</styles>
