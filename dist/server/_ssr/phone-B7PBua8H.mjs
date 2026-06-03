function normalizeBdPhone(input) {
  if (!input) return null;
  const digits = input.replace(/\D/g, "");
  if (!digits) return null;
  let national = digits;
  if (national.startsWith("880")) national = national.slice(3);
  else if (national.startsWith("0")) national = national.slice(1);
  if (!/^1[0-9]{9}$/.test(national)) return null;
  return `+880${national}`;
}
function defaultStudentPassword(phoneE164) {
  const digits = phoneE164.replace(/\D/g, "");
  return digits.slice(-6);
}
export {
  defaultStudentPassword as d,
  normalizeBdPhone as n
};
