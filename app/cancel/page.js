import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <svg 
          className="w-20 h-20 mx-auto text-red-500 mb-6"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
        
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again or contact support.
        </p>
        
        <div className="space-y-4">
          <Link href="/">
            <button className="btn btn-primary w-full">
              Return to Home
            </button>
          </Link>
          <Link href="/cart">
            <button className="btn btn-secondary w-full">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}