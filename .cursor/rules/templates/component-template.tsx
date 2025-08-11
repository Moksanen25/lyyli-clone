import { cn } from "@/lib/cn";

export type ComponentProps = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

export function Section({ title, className, children }: ComponentProps) {
  return (
    <section className={cn("py-12 md:py-16", className)} aria-label={title}>
      {title && <h2 className="font-playfair text-3xl md:4xl">{title}</h2>}
      <div className="mt-6">{children}</div>
    </section>
  );
}
