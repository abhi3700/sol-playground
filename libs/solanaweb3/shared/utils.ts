export function printLamports(lamports: number): string {
	return (lamports / 1e9).toLocaleString('en', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}
