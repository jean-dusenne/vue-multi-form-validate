<script setup lang="ts">
import FormOne from "./components/FormOne.vue";
import FormTwo from "./components/FormTwo.vue";
import { ref } from "vue";

const form1 = ref<any>(null);
const form2 = ref<any>(null);
</script>

<template>
  <FormOne ref="form1" :validate-form-two-fn="form2?.validate"></FormOne>
  <FormTwo ref="form2" :validate-form-one-fn="form1?.validate"></FormTwo>
</template>
