import { Button } from './Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong. Please try again.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <div className="mb-3 text-4xl">⚠️</div>
      <h3 className="text-base font-semibold text-red-800">Unable to load data</h3>
      <p className="mt-1 max-w-sm text-sm text-red-600">{message}</p>
      {onRetry && (
        <Button variant="danger" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
