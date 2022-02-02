<template>
  <n-space vertical>
    <n-space>
      <n-slider
        v-model:value="loanAmount"
        :step="5000"
        :min="5000"
        :max="800000"
        :format-tooltip="(value) => `${value} Kč`"
      />
      <n-input-number
        class="loan-amount"
        size="small"
        :step="5000"
        :min="5000"
        :max="800000"
        v-model:value="loanAmount"
        :show-button="false"
      >
        <template #suffix>Kč</template>
      </n-input-number>
    </n-space>
    <n-space>
      <n-slider
        v-model:value="loanDuration"
        :step="1"
        :min="24"
        :max="120"
        :format-tooltip="() => durationString"
      />
      <span class="loan-time">{{ durationString }}</span>
    </n-space>
    <n-space>
      <n-checkbox v-model:checked="loanInsurance">Pojištení</n-checkbox>
    </n-space>
  </n-space>
</template>
<script>
import { NSpace, NSlider, NInputNumber, NCheckbox } from "naive-ui";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { watch } from "vue";

export default {
  components: {
    NSpace,
    NSlider,
    NCheckbox,
    NInputNumber,
  },
  setup(props, context) {
    const loanAmount = ref(300000);
    const loanDuration = ref(24);
    const loanInsurance = ref(false);

    const durationString = computed(
      () =>
        `${Math.floor(loanDuration.value / 12)}r a ${
          loanDuration.value % 12
        }m`
    );

    let emitChangeTimeout = null;
    const emitChanges = () => {
      context.emit("update", {
        amount: loanAmount.value,
        duration: loanDuration.value,
        loanInsurance: loanInsurance.value,
      });
      emitChangeTimeout = null;
    };
    const scheduleEmitChanges = () => {
      if (emitChangeTimeout) {
        clearTimeout(emitChangeTimeout);
        emitChangeTimeout = null;
      }
      emitChangeTimeout = setTimeout(emitChanges, 200);
    };

    watch([loanAmount, loanDuration, loanInsurance], () =>
      scheduleEmitChanges()
    );

    return {
      loanAmount,
      loanDuration,
      loanInsurance,
      durationString,
    };
  },
};
</script>
<style scoped>
.n-slider {
  padding-top: 12px;
  min-width: 500px;
}
.loan-amount {
  max-width: 150px;
}
.loan-time {
  display: inline-block;
  min-width: 150px;
  text-align: left;
}
</style>
