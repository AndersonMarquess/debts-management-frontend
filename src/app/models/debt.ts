import { NewDebt } from './new-debt';

export interface Debt extends NewDebt{
	id: string,
	currentInstallment: number,
	ownerId: string,
	totalAmountLeft: number
}