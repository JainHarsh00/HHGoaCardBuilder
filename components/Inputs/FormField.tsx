import { InputHTMLAttributes } from "react";
import styles from "./FormField.module.css";

type FieldSize = "name" | "stack" | "instagram" | "mission" | "superpower" | "mode";

const POSITIONS: Record<FieldSize, { left: number; top: number; width: number; height: number }> = {
  name:       { left: 915, top: 355, width: 611, height: 107 },
  stack:      { left: 915, top: 462, width: 300, height: 105 },
  instagram:  { left: 1189, top: 462, width: 290, height: 105 },
  mission:    { left: 909, top: 575, width: 611, height: 105 },
  superpower: { left: 909, top: 676, width: 611, height: 105 },
  mode:       { left: 909, top: 779, width: 611, height: 105 },
};

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldKey: FieldSize;
  label: string;
}

export function FormField({ fieldKey, label, id, ...inputProps }: FormFieldProps) {
  const pos = POSITIONS[fieldKey];
  return (
    <div className={styles.field} style={pos}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input className={styles.input} id={id} {...inputProps} />
    </div>
  );
}
