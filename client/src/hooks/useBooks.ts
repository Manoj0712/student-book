import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookApi } from "../api/bookApi";
import type { BookPage } from "../types/book";

export const bookKeys = {
  all: ["books"] as const,
  list: () => [...bookKeys.all, "list"] as const,
  detail: (id: string) => [...bookKeys.all, "detail", id] as const,
};

/** Full book list — used by the Editor's "Open" dropdown and the Reader's "Load Book" control. */
export function useBooksQuery() {
  return useQuery({
    queryKey: bookKeys.list(),
    queryFn: () => bookApi.list(),
  });
}

export function useCreateBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (book: BookPage) => bookApi.create(book),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bookKeys.all }),
  });
}

export function useUpdateBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, book }: { id: string; book: BookPage }) => bookApi.update(id, book),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bookKeys.all }),
  });
}

export function useDeleteBookMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bookKeys.all }),
  });
}
