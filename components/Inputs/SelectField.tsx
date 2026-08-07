import { SelectHTMLAttributes } from "react";
import styles from "./FormField.module.css";
import selectStyles from "./SelectField.module.css";

type FieldSize = "name" | "stack" | "instagram" | "mission" | "superpower" | "mode";

const POSITIONS: Record<FieldSize, { left: number; top: number; width: number; height: number }> = {
  name:       { left: 915, top: 355, width: 611, height: 107 },
  stack:      { left: 915, top: 462, width: 300, height: 105 },
  instagram:  { left: 1189, top: 462, width: 290, height: 105 },
  mission:    { left: 909, top: 575, width: 611, height: 105 },
  superpower: { left: 909, top: 676, width: 611, height: 105 },
  mode:       { left: 909, top: 779, width: 611, height: 105 },
};

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  fieldKey: FieldSize;
  label: string;
  options: { value: string; label: string }[];
}

export function SelectField({ fieldKey, label, id, options, ...selectProps }: SelectFieldProps) {
  const pos = POSITIONS[fieldKey];
  return (
    <div className={styles.field} style={pos}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select className={`${styles.input} ${selectStyles.select}`} id={id} {...selectProps}>
        <option value="">— select —</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
