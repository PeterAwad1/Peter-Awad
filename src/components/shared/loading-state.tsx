type LoadingStateProps = {
  label: string;
};

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center text-zinc-600 dark:text-zinc-400">
      {label}
    </div>
  );
}
