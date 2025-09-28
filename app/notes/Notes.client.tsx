"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import NoteForm from "../../components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import NoteList from "@/components/NoteList/NoteList";

const NotesClient = () => {
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [page, setPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);

	const closeModal = () => setIsModalOpen(false);

	const debounced = useDebouncedCallback((value: string) => {
		setDebouncedQuery(value);
		setPage(1);
	}, 1000);

	const handleSearch = (text: string) => {
		setQuery(text);
		debounced(text);
	};

	const { data, isFetching } = useQuery({
		queryKey: ["notes", debouncedQuery, page],
		queryFn: () => fetchNotes(debouncedQuery, page),
		placeholderData: keepPreviousData,
	});

	const totalPages = data?.totalPages ?? 0;

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox value={query} onChange={handleSearch} />
				{totalPages > 1 && (
					<Pagination totalPages={totalPages} page={page} setPage={setPage} />
				)}
				<button onClick={openModal} className={css.button}>
					Create note +
				</button>
			</header>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<NoteForm onClose={closeModal} />
				</Modal>
			)}
			<div style={{ position: "relative" }}>
				{data && data.notes.length > 0 && <NoteList notes={data.notes} />}
				{isFetching && <Loader />}
			</div>
		</div>
	);
};

export default NotesClient;
