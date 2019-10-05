let a: boolean;
let b: boolean;
let c = 0;
let d = 0;
let e = 0;
let f = 0;
export default (isNumber?: boolean): unknown => {
  if (isNumber) {
    return { a, b, c, d, e, f };
  }
  if (c > 10000) {
    d += d;
    c = 0;
  }
  if (e > 10000) {
    f += f;
    e = 0;
  }
  e += e;
  const prevA = a;
  if (a) {
    a = false;
  } else if (!b) {
    c += c;
    b = true;
    setTimeout((): void => {
      a = true;
      b = false;
    }, 1000 * ((c % 600) + 1));
  }
  if (a === undefined) {
    return true;
  }
  return prevA;
};
