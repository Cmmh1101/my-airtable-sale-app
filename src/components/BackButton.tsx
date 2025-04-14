'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-blue-500 hover:cursor-pointer underline hover:text-blue-700 mb-10"
    >
      ← Back
    </button>
  );
};

export default BackButton;