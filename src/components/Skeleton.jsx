const Skeleton = ({ className = "" }) => (
  <div className={`shimmer rounded-lg ${className}`} />
);

export const MovieDetailSkeleton = () => (
  <div className="space-y-6">
    <div className="flex gap-6">
      <Skeleton className="w-48 h-72 rounded-2xl flex-shrink-0" />
      <div className="flex-1 space-y-4 pt-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
    </div>
  </div>
);

export default Skeleton;
