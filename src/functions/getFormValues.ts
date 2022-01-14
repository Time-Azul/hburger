import { AnyObjects } from "../types/anyObject";

export default function getFormValues(formEl: HTMLFormElement) {
  const form = new FormData(formEl);
  const values: AnyObjects = {};
  form.forEach((value, key) => (values[key] = value));

  return values;
}
