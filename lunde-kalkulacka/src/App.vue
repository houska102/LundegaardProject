<template>
  <n-space justify="space-around">
    <n-card title="Vypočítejte si půjčku online">
      <n-space :wrap="false" justify="space-between">
        <loan-parameter-form @update="updateLoanParameters" />
        <loan-results
          :amount="amount"
          :duration="duration"
          :insurance="insurance"
        ></loan-results>
      </n-space>
    </n-card>
  </n-space>
</template>

<script>
import { NCard, NSpace } from "naive-ui";
import LoanParameterForm from "./components/LoanParameterForm.vue";
import { ref } from "@vue/reactivity";
import LoanResults from "./components/LoanResults.vue";

export default {
  name: "App",
  components: {
    LoanParameterForm,
    LoanResults,
    NCard,
    NSpace,
  },
  setup() {
    const amount = ref(300000);
    const duration = ref(24);
    const insurance = ref(false);
    const updateLoanParameters = (newParameters) => {
      amount.value = newParameters.amount;
      duration.value = newParameters.duration;
      insurance.value = newParameters.loanInsurance;
    };

    return {
      amount,
      duration,
      insurance,
      updateLoanParameters,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.n-layout-header {
  background: #a0a0ff;
  height: 50px;
}
</style>
