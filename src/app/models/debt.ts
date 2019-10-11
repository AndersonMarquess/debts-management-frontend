export interface Debt {
	id: string,
	description: string,
	amount: number,
	installment: number,
	dueDay: number,
	ownerId: string,
	totalAmount: number,
	dueDate: string
}