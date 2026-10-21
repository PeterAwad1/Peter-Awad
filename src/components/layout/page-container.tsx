import { cn } from "@/lib/utils/cn";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black",
        className,
      )}
    >
      <div className="flex w-full max-w-3xl flex-col gap-6">{children}</div>
    </div>
  );
}
