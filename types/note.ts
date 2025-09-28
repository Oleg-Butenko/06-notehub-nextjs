export type Note = {
	id: string;
	title: string;
	content: string;
	tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
	createdAt: string;
	updatedAt: string;
};

export type CreateNoteRequest = {
	title: string;
	content: string;
	tag: string;
};
