<script setup lang="ts">
import PageDetails from "@/components/PageDetails.vue";
import NewsletterSubscriptionForm from "@/components/NewsletterSubscriptionForm.vue";
</script>

<template>
  <PageDetails slug="contact" />
  <div class="contact-options">
    <NewsletterSubscriptionForm/>
    <div class="social-buttons">
      <nav>
        <a
          href="https://nl.linkedin.com/pub/jojanneke-dekens/17/a4a/378"
          class="social-button"
          target="blank"
        >
          <img src="../assets/images/linkedin.png" />
        </a>
        <a
          href="https://www.instagram.com/insect.inspection"
          class="social-button"
          target="blank"
        >
          <img src="../assets/images/instagram.png" />
        </a>
      </nav>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-options {
  display: flex;
  flex-direction: column;
  align-items: center;

  &:deep(div) {
    box-sizing: border-box;
    @media screen and (min-width: 992px) {
      width: 25vw;
    }
  }
}

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
</style>
