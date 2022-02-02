<template>
  <n-card style="width: 200px">
    <n-space vertical :style="{ position: relative }">
      <div class="overlay" v-if="loading">
        <n-spin size="large" style="margin: auto auto" />
      </div>
      <n-space justify="space-between">
        <span>Měsíčně:</span><span>{{ monthlyPayment }} Kč</span>
      </n-space>
      <n-space justify="space-between">
        <span>Úrok:</span><span>{{ interestPercentage }}</span>
      </n-space>
      <n-space justify="space-between">
        <span>Celkem:</span><span>{{ totalAmount }} Kč</span>
      </n-space>
    </n-space>
  </n-card>
</template>
<script>
import { NCard, NSpace, NSpin } from "naive-ui";
import { ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
export default {
  props: ["amount", "duration", "insurance"],
  components: {
    NCard,
    NSpace,
    NSpin,
  },
  setup(props) {
    const loading = ref(false);
    const interest = ref(0.047);
    const totalAmount = ref(0);
    const monthlyPayment = ref(0);
    console.log(props.insurance);

    const interestPercentage = computed(
      () => `${Math.round(interest.value * 1000) / 10}%`
    );
    const totalAmountWithInsurance = computed(() =>
      props.insurance ? totalAmount.value + 20000 : totalAmount
    );

    const getNewInsuranceData = () => {
      loading.value = true;
      const requestUrl = `http://localhost:5000/interest-rate?duration=${props.duration}&amount=${props.amount}`;
      fetch(requestUrl)
        .then((result) => {
          if (result.ok) {
            return result.json();
          }
        })
        .then((data) => {
          interest.value = data.interest_rate;
          totalAmount.value = data.total_amount;
          monthlyPayment.value = data.monthly_payment;
          loading.value = false;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    watch([() => props.duration, () => props.amount], () => {
      getNewInsuranceData();
    });

    onMounted(getNewInsuranceData);

    return {
      totalAmount: totalAmountWithInsurance,
      monthlyPayment,
      interestPercentage,
      loading,
    };
  },
};
</script>
<style scoped>
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  background: #ffffff;
}
</style>
