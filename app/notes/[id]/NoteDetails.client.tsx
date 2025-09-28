"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

const NoteDetailsClient = () => {
	const { id } = useParams<{ id: string }>();

	const {
		data: note,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
		refetchOnMount: false,
	});

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-EN", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	if (isLoading) return <p>Loading, please wait...</p>;

	if (error || !note) return <p>Something went wrong.</p>;

	const formattedDate = note.updatedAt
		? `Updated at: ${formatDate(note.updatedAt)}`
		: `Created at: ${formatDate(note.createdAt)}`;

	return (
		<div className={css.container}>
			<div className={css.item}>
				<div className={css.header}>
					<h2>{note.title}</h2>
				</div>
				<p className={css.content}>{note.content}</p>
				<p className={css.date}>{formattedDate}</p>
			</div>
		</div>
	);
};

export default NoteDetailsClient;
