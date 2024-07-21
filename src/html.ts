export function html(strings: any, ...values: any[]) {
  let str = "";
  strings.forEach((string: any, i: number) => {
    str += string + (values[i] || "");
  });
  return str;
}
