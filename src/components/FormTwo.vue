<template>
  Form : validity :{{ meta.valid }}
  <pre>values in form 1{{ computedFormOne }}</pre>
  <p>
    number3:
    <input
      type="number"
      name="number3"
      v-model="values.number3"
      @input="update"
    />
    {{ errorsNumber3 }} ---> should be greater or equal than field number 2 >
    {{ computedFormOne.number2 }}
  </p>
  <p>
    number4:
    <input
      type="number"
      name="number3"
      v-model="values.number4"
      @input="update"
    />
    {{ errorsNumber4 }}
  </p>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useGlobalFormsState } from "../composables/useGlobalFormsState";
import { FormTwoSchemaValidation } from "../composables/FormTwoSchemaValidation";

const props = defineProps<{ validateFormOneFn: any }>();

const { computedFormOne, updateFormTwo } = useGlobalFormsState();

const { values, validate, meta } = useForm({
  validateOnMount: true,
  initialValues: {
    number3: null,
    number4: null,
  },
  validationSchema: FormTwoSchemaValidation(),
});

defineExpose({
  validate,
});

const { errors: errorsNumber3 } = useField("number3");
const { errors: errorsNumber4 } = useField("number4");

const update = () => {
  updateFormTwo(values);
  props.validateFormOneFn();
};
</script>
