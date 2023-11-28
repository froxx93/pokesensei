import clsx from "clsx";
import { cn } from "~/server/utils/cn";

export default function Button({
  variant = "primary",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "primary";
}) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        // this needs to be extra wrapped in clsx because text-shadow is no tailwind class
        // TODO: migrate this to tailwind
        "text-shadow",
        cn(
          "inline-block cursor-pointer break-words rounded px-4 py-2 transition hover:no-underline",
          variant === "primary" &&
            "bg-primary text-white hover:bg-primary-dark disabled:bg-primary-light",
          props.disabled && "cursor-not-allowed",
          props.className,
        ),
      )}
    ></button>
  );
}