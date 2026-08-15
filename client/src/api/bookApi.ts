import axios from "axios";
import type { BookSummary, BookPage } from "../types/book";

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ||
  "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const bookApi = {
  list: async (): Promise<BookSummary[]> => {
    const response = await api.get<BookSummary[]>("/books/index");
    return response.data;
  },

  getById: async (id: string): Promise<BookPage> => {
    const response = await api.get<BookPage>(`/books/${id}`);
    return response.data;
  },

  create: async (book: BookPage): Promise<BookPage> => {
    const response = await api.post<BookPage>("/books/create", book);
    return response.data;
  },

  update: async (id: string, book: BookPage): Promise<BookPage> => {
    const response = await api.put<BookPage>(`/books/update/${id}`, book);
    return response.data;
  },

  remove: async (id: string): Promise<{ message: string; id: string }> => {
    const response = await api.delete<{ message: string; id: string }>(`/books/delete/${id}`);
    return response.data;
  },
};
