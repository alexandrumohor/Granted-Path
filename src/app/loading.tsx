export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
        </div>
        <p className="text-sm text-muted-foreground">{"Loading..."}</p>
      </div>
    </div>
  );
}
