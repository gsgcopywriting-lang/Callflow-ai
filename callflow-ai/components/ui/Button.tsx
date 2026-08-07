import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className,
  type = "button",
  disabled,
}: ButtonProps) {
  const styles = cn(
    variant === "primary" ? "btn-primary" : "btn-secondary",
    disabled && "pointer-events-none opacity-50",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles} disabled={disabled}>
      {children}
    </button>
  );
}
