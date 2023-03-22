<template>
  Form 1 : validity :{{ meta.valid }}
  <pre>values in form2 {{ computedFormTwo }}</pre>
  <p>
    number1:
    <input type="number" name="name" v-model="values.number1" @input="update" />
    {{ errorsNumber1 }}
  </p>
  <p>
    number2:
    <input type="number" name="name" v-model="values.number2" @input="update" />
    {{ errorsNumber2 }} ---> should be less or equal than field number 3 >
    {{ computedFormTwo.number3 }}
  </p>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useGlobalFormsState } from "../composables/useGlobalFormsState";
import { FormOneSchemaValidation } from "../composables/FormOneSchemaValidation";

const { computedFormTwo, updateFormOne } = useGlobalFormsState();

const props = defineProps<{ validateFormTwoFn: any }>();

const { values, validate, meta } = useForm({
  validateOnMount: true,
  initialValues: {
    number1: null,
    number2: null,
  },
  validationSchema: FormOneSchemaValidation(),
});

const { errors: errorsNumber1 } = useField("number1");
const { errors: errorsNumber2 } = useField("number2");

const update = () => {
  updateFormOne(values);
  props.validateFormTwoFn();
};

defineExpose({
  validate,
});
</script>
