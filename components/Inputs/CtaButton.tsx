import { ButtonHTMLAttributes } from "react";
import styles from "./CtaButton.module.css";

interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  labelLeft: number; // "enter the realm.." and "share on x" sit at different left offsets
}

export function CtaButton({ label, labelLeft, ...buttonProps }: CtaButtonProps) {
  return (
    <button className={styles.cta} {...buttonProps}>
      <span className={styles.label} style={{ left: labelLeft }}>
        {label}
      </span>
    </button>
  );
}
