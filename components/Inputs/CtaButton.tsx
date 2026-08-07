import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./CtaButton.module.css";

interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  labelLeft: number; // "enter the realm.." and "share on x" sit at different left offsets
}

export const CtaButton = forwardRef<HTMLButtonElement, CtaButtonProps>(
  function CtaButton({ label, labelLeft, ...buttonProps }, ref) {
    return (
      <button ref={ref} className={styles.cta} {...buttonProps}>
        <span className={styles.label} style={{ left: labelLeft }}>
          {label}
        </span>
      </button>
    );
  }
);
