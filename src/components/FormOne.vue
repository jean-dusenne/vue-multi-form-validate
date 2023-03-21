<template>
  Form 1 : validity :{{ meta.valid }}
  <p>values in form2 {{ computedFormTwo }}</p>
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
import { toTypedSchema } from "@vee-validate/yup";
import { number, object, ref as yupRef, string } from "yup";
import { useGlobalFormsState } from "../composables/useGlobalFormsState";
import { watch } from "vue";

const { computedFormTwo, updateFormOne } = useGlobalFormsState();

const typedSchema = toTypedSchema(
  object({
    number1: number().nullable().max(yupRef("number2")),
    number2: number()
      .nullable()
      .min(yupRef("number1"))
      .test((value) => {
        if (!value) {
          return true;
        }
        return value <= computedFormTwo.value.number3;
      }),
  })
);

const { values, validate, meta } = useForm({
  validateOnMount: true,
  initialValues: {
    number1: null,
    number2: null,
  },
  validationSchema: typedSchema,
});

const { errors: errorsNumber1 } = useField("number1");
const { errors: errorsNumber2 } = useField("number2");

const update = () => {
  updateFormOne(values);
};

watch(
  () => computedFormTwo.value,
  (v) => {
    console.log("validate form one");
    validate();
  },
  { deep: true }
);
</script>

<style scoped></style>
