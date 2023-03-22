import { toTypedSchema } from "@vee-validate/yup";
import { number, object, ref as yupRef } from "yup";
import { useGlobalFormsState } from "./useGlobalFormsState";

const isLessOrEqual = (val1: number, val2: number): boolean => val1 <= val2;
export const FormTwoSchemaValidation = () => {
  return toTypedSchema(
        object({
            number3: number()
                .nullable()
                .test((value, context) => {
                    if (!value) return true;
                    let { computedFormOne: c1, validateFormOneFn } = useGlobalFormsState()
                    console.log('c1', c1, c1.value.number2 )
                        //        validateFormOneFn.value.get('form1')()
                    return value >= c1.value.number2;
                })
                .max(yupRef("number3")),
            number4: number().nullable().min(yupRef("number3")),
        })
    )
};
