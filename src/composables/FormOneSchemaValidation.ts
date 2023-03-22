import { toTypedSchema } from "@vee-validate/yup";
import { number, object, ref as yupRef } from "yup";
import { useGlobalFormsState } from "./useGlobalFormsState";

const isLessOrEqual = (val1: number, val2: number): boolean => val1 <= val2;
export const FormOneSchemaValidation = () => {
  return toTypedSchema(
    object({
      number1: number().nullable().max(yupRef("number2")),
      number2: number()
        .nullable()
        .min(yupRef("number1"))
        .test((value) => {
          if (!value) {
            return true;
          }
          let { computedFormTwo: c2, validateFormTwoFn } = useGlobalFormsState();
          //  validateFormTwoFn.value.get('form2')()
          return isLessOrEqual(value, c2.value.number3);
        }),
    })
  );
};
