import Link from "next/link";

type ButtonVariant = "btn-1" | "btn-2" | "btn-3" |"btn-4";

interface NavBtnProps {
  text: string;
  href: string;
  variant?: ButtonVariant;
  className?: string;
}

export function NavBtn({
  text,
  href,
  variant = "btn-1",
  className = "",
}: NavBtnProps) {
  return (
    <Link href={href} className={`button block place-content-center text-center ${variant} ${className}`}>
      {text}
    </Link>
  );
}