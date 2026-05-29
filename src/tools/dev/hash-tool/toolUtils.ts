/**
 * Lógica pura do Módulo Hash Generator (MD5, SHA-1, SHA-256)
 * TypeScript Puro e Web Crypto API
 */

// Função MD5 em JavaScript Puro (síncrona)
export const md5 = (string: string): string => {
  function k(a: number, b: number) {
    return (a << b) | (a >>> (32 - b));
  }
  function l(a: number, b: number) {
    const c = (a & 65535) + (b & 65535);
    return ((((a >> 16) + (b >> 16) + (c >> 16)) & 65535) << 16) | (c & 65535);
  }
  const g: number[] = [];
  for (let f = 0; 64 > f; f++) {
    g[f] = Math.round(Math.abs(Math.sin(f + 1)) * 4294967296);
  }
  const h: number[] = (function(a) {
    const b: number[] = [];
    const c = a.length * 8;
    for (let d = 0; d < c; d += 8) {
      b[d >> 5] |= (a.charCodeAt(d / 8) & 255) << (d % 32);
    }
    return b;
  })(unescape(encodeURIComponent(string)));
  h[string.length >> 2] |= 128 << ((string.length % 4) * 8);
  h[(((string.length + 8) >> 6) + 1 << 4) - 2] = string.length * 8;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  for (let f = 0; f < h.length; f += 16) {
    let q = a;
    let r = b;
    let s = c;
    let t = d;
    for (let e = 0; 64 > e; e++) {
      let m: number;
      let p: number;
      if (16 > e) {
        m = (b & c) | (~b & d);
        p = e;
      } else if (32 > e) {
        m = (d & b) | (~d & c);
        p = (5 * e + 1) % 16;
      } else if (48 > e) {
        m = b ^ c ^ d;
        p = (3 * e + 5) % 16;
      } else {
        m = c ^ (b | ~d);
        p = (7 * e) % 16;
      }
      const u = l(l(a, m), l(g[e], h[f + p]));
      a = d;
      d = c;
      c = b;
      b = l(b, k(u, [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][e]));
    }
    a = l(a, q);
    b = l(b, r);
    c = l(c, s);
    d = l(d, t);
  }
  const f = [a, b, c, d];
  let x = '';
  for (let e = 0; 4 > e; e++) {
    for (let m = 0; 4 > m; m++) {
      x += '0123456789abcdef'.charAt((f[e] >> (m * 8 + 4)) & 15) + '0123456789abcdef'.charAt((f[e] >> (m * 8)) & 15);
    }
  }
  return x;
};

// Web Crypto Hasher síncronos simulados ou assíncronos oficiais
export const hashMessage = async (algo: 'SHA-1' | 'SHA-256', message: string): Promise<string> => {
  if (!message) return '';
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algo, msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
