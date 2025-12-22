// Decimal helpers - kept for compatibility. Use decimal string formats like "1234.56".
export function parseDecimal(input: string | number): string {
	const s = String(input).trim();
	if (s === "") return "0.00";
	if (!s.includes(".")) return `${s}.00`;
	const [intPart, frac = ""] = s.split(".");
	const frac2 = `${frac}00`.slice(0, 2);
	return `${intPart}.${frac2}`;
}

export function formatDecimal(input: string | number): string {
	return parseDecimal(input);
}

export default { parseDecimal, formatDecimal };
