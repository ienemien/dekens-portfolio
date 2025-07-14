<template>
  <div class="form-wrapper">
    <h3>Stuur een mail naar info@jojannekedekens.nl om je aan te melden voor mijn nieuwsbrief</h3>
    <form>
      <a class="submit-button" href="mailto:jdekens77@gmail.com">Mail mij</a>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  border-radius: 5px;
  border: 1px solid darkgray;
  padding: 20px;

  h3 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    font-family: Arial, Helvetica, sans-serif;

    input {
      padding: 10px;
      border-radius: 5px;
      margin: 5px;

      &.email-input {
        border: 1px solid darkgray;

        @media screen and (min-width: 768px) {
          width: 90%;
        }
      }
    }

    .submit-button {
      padding: 10px;
      border-radius: 5px;
      margin: 5px;
      color: white;
      background-color: black;
      cursor: pointer;
      width: fit-content;
      border: 0 solid white;
    }
  }

  .mailchimp-button-wrapper {
    width: 25%;
    margin: 10px;

    img {
      border-radius: 5px;
      width: 100%;
    }
  }
}
</style>
