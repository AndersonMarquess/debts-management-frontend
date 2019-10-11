export interface Debt {
	id: string,
	description: string,
	category: string,
	amount: number,
	currentInstallment: number,
	totalInstallment: number,
	ownerId: string,
	dueDate: number,
	totalAmountLeft: number,
	totalAmount: number
}