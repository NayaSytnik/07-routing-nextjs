'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

export default function NotesClient({ tag }: { tag: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
      }),
    placeholderData: prev => prev,
  });

  return (
    <main>
      <SearchBox onSearch={setSearch} />

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {(data?.totalPages ?? 0) > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data?.totalPages ?? 0}
        />
      )}
    </main>
  );
}