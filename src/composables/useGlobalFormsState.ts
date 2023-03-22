import { createGlobalState } from "@vueuse/core";
import { computed, ref } from "vue";

export const useGlobalFormsState = createGlobalState(() => {
  // state
  const formOne = ref<Record<string, any>>({});
  const formTwo = ref<Record<string, any>>({});

  const computedFormOne = computed(() => formOne.value);
  const computedFormTwo = computed(() => formTwo.value);


  const validateFormOneFn = ref<Map<string, any>>(new Map<string, any>())

  const setValidateFormOneFn = (fn:any)=> validateFormOneFn.value.set('form1', fn)

  const validateFormTwoFn = ref<Map<string, any>>(new Map<string, any>());

  const setValidateFormTwoFn = (fn:any)=> validateFormTwoFn.value.set('form2', fn);

  const updateFormOne = (form: Record<string, any>) => {
    formOne.value = form;
  };
  const updateFormTwo = (form: Record<string, any>) => {
    formTwo.value = form;
  };

  return { computedFormOne, computedFormTwo, updateFormOne, updateFormTwo, setValidateFormOneFn , validateFormOneFn, setValidateFormTwoFn , validateFormTwoFn };
});
