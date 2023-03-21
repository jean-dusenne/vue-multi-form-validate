import { createGlobalState } from "@vueuse/core";
import { computed, ref } from "vue";

export const useGlobalFormsState = createGlobalState(() => {
  // state
  const formOne = ref<Record<string, any>>({});
  const formTwo = ref<Record<string, any>>({});

  const computedFormOne = computed(() => formOne.value);
  const computedFormTwo = computed(() => formTwo.value);

  const updateFormOne = (form: Record<string, any>) => {
    formOne.value = form;
  };
  const updateFormTwo = (form: Record<string, any>) => {
    formTwo.value = form;
  };

  return { computedFormOne, computedFormTwo, updateFormOne, updateFormTwo };
});
