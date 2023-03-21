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
import { toTypedSchema } from "@vee-validate/yup";
import { number, object, ref as yupRef } from "yup";
import { useGlobalFormsState } from "../composables/useGlobalFormsState";
import { watch } from "vue";

const { computedFormOne, updateFormTwo } = useGlobalFormsState();

const typedSchema = toTypedSchema(
  object({
    number3: number()
      .nullable()
      .test((value, context) => {
        if (!value) return true;
        return value >= computedFormOne.value.number2;
      })
      .max(yupRef("number3")),
    number4: number().nullable().min(yupRef("number3")),
  })
);

const { values, validate, meta } = useForm({
  validateOnMount: true,
  initialValues: {
    number3: null,
    number4: null,
  },
  validationSchema: typedSchema,
});

const { errors: errorsNumber3 } = useField("number3");
const { errors: errorsNumber4 } = useField("number4");

watch(
  () => computedFormOne.value,
  (v) => {
    console.log("validate form 2");
    validate();
  },
  { deep: true }
);

const update = () => {
  updateFormTwo(values);
};
</script>

<style scoped></style>
