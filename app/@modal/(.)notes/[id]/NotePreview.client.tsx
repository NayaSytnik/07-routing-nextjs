'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <Modal onClose={() => router.back()}>
      <button onClick={() => router.back()}>
        Close
      </button>

      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{data.tag}</p>
      <p>{data.createdAt}</p>
    </Modal>
  );
}