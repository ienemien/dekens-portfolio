<script setup lang="ts">
import PageDetails from "@/components/PageDetails.vue";
import AppSocialButtons from "@/components/AppSocialButtons.vue";
import NewsletterSubscriptionForm from "../components/NewsletterSubscriptionForm.vue";
</script>

<template>
  <PageDetails slug="contact"></PageDetails>
  <div class="contact-options">
    <NewsletterSubscriptionForm></NewsletterSubscriptionForm>
    <AppSocialButtons></AppSocialButtons>
  </div>
</template>

<style lang="scss" scoped>
.contact-options {
  display: flex;
  flex-direction: column;
  align-items: center;

  &:deep(div) {
    box-sizing: border-box;
    @media screen and (min-width: 768px) {
      width: 40vw;
    }
  }
}
</style>
