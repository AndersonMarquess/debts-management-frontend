import { FormGroup, ValidatorFn } from '@angular/forms';

/**
 * true for invalid or null for valid
 */
export const passwordNotEqualsValidator: ValidatorFn = (formGroup: FormGroup) => {
	const password = formGroup.get('password').value;
	const confirm = formGroup.get('confirm').value;

	if (confirm.trim()) {
		if (password == confirm) {
			return null;
		}
		return { passwordNotEqualsValidator: true }
	}

	return null;
}