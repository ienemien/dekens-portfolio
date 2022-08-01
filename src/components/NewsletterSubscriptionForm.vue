<template>
  <div class="form-wrapper">
    <h3>Meld je aan voor mijn nieuwsbrief</h3>
    <form
      action="https://jojannekedekens.us3.list-manage.com/subscribe/post"
      method="POST"
    >
      <input type="hidden" name="u" value="c168708afa9927d6454971672" />
      <input type="hidden" name="id" value="5b6ff15a68" />
      <input
        type="email"
        name="MERGE0"
        id="MERGE0"
        placeholder="Uw emailadres"
        class="email-input"
      />
      <input type="submit" value="Aanmelden" class="submit-button" />
    </form>
    <div class="mailchimp-button-wrapper">
      <span class="mailchimp-button"
        ><a
          href="http://www.mailchimp.com/email-referral/?utm_source=freemium_newsletter&utm_medium=email&utm_campaign=referral_marketing&aid=c168708afa9927d6454971672&afl=1"
          ><img
            src="https://cdn-images.mailchimp.com/monkey_rewards/MC_MonkeyReward_15.png"
            alt="Email Marketing Powered by Mailchimp"
            title="Mailchimp Email Marketing" /></a
      ></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;
  border-radius: 5px;
  border: 1px solid darkgray;

  form {
    display: flex;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;

    input {
      padding: 10px;
      border-radius: 5px;
      margin: 5px;

      &.email-input {
        border: 1px solid darkgray;
      }

      &.submit-button {
        color: white;
        background-color: black;
        cursor: pointer;
      }
    }
  }

  .mailchimp-button-wrapper {
    margin: 10px;
    img {
      border-radius: 5px;
      width: 10vw;
      height: auto;
    }
  }
}
</style>
