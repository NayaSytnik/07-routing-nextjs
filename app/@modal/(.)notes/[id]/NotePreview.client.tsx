'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <div
      onClick={() => router.back()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          padding: 20,
          borderRadius: 12,
          minWidth: 300,
        }}
      >
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <p>{data.tag}</p>
      </div>
    </div>
  );
}