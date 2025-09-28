import type { CreateNoteRequest, Note } from "@/types/note";
import axios from "axios";

export type NoteListResponse = {
	notes: Note[];
	totalPages: number;
};

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
	notes: string,
	page: number
): Promise<NoteListResponse> => {
	const response = await axios.get<NoteListResponse>(`/notes`, {
		params: {
			search: `${notes}`,
			page,
			perPage: 12,
		},
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
	});

	return response.data;
};

export const createNote = async (newNote: CreateNoteRequest) => {
	const response = await axios.post<Note>(`/notes`, newNote, {
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
	});
	return response.data;
};

export const deleteNote = async (noteId: string) => {
	const response = await axios.delete<Note>(`/notes/${noteId}`, {
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
	});
	return response.data;
};

export const fetchNoteById = async (id: string) => {
	const response = await axios.get<Note>(`/notes/${id}`, {
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
	});

	return response.data;
};
