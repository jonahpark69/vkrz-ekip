var ht = Object.defineProperty;
var ut = (n, t, i) => t in n ? ht(n, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : n[t] = i;
var a = (n, t, i) => (ut(n, typeof t != "symbol" ? t + "" : t, i), i), tt = (n, t, i) => {
  if (!t.has(n))
    throw TypeError("Cannot " + i);
};
var e = (n, t, i) => (tt(n, t, "read from private field"), i ? i.call(n) : t.get(n)), r = (n, t, i) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, i);
}, o = (n, t, i, s) => (tt(n, t, "write to private field"), s ? s.call(n, i) : t.set(n, i), i), z = (n, t, i, s) => ({
  set _(l) {
    o(n, t, l, i);
  },
  get _() {
    return e(n, t, s);
  }
});
const ct = /px\) rotate\(|translate\(|deg\)|px,/;
function dt(n) {
  const t = getComputedStyle(n).transform;
  if (t === "none")
    return { x: 0, y: 0 };
  if (t.includes("translate")) {
    const s = t.split(ct);
    return { x: Number(s[1]), y: Number(s[2]) };
  }
  const i = t.slice(0, -1).split(", ").slice(-2).map(Number);
  return { x: i[0] || 0, y: i[1] || 0 };
}
function u(n) {
  return Math.round(n * 10) / 10;
}
function et(n) {
  return n instanceof HTMLElement;
}
var M, C, H, B;
const m = class {
  constructor() {
    a(this, "name", "mouse");
    a(this, "target", "mouse");
  }
  setup() {
    e(m, C) === 0 && (window.addEventListener(
      "mousemove",
      e(m, H)
    ), window.addEventListener(
      "touchmove",
      e(m, B)
    )), z(m, C)._++;
  }
  cleanup() {
    z(m, C)._--, e(m, C) === 0 && (window.removeEventListener(
      "mousemove",
      e(m, H)
    ), window.removeEventListener(
      "touchmove",
      e(m, B)
    ));
  }
  update() {
    return e(m, M);
  }
};
let k = m;
M = new WeakMap(), C = new WeakMap(), H = new WeakMap(), B = new WeakMap(), r(k, M, null), r(k, C, 0), r(k, H, (t) => {
  o(m, M, {
    x: u(t.clientX),
    y: u(t.clientY)
  });
}), r(k, B, (t) => {
  o(m, M, {
    x: u(t.touches[0].clientX),
    y: u(t.touches[0].clientY)
  });
});
class ft {
  constructor(t) {
    a(this, "name", "dom");
    a(this, "target", null);
    try {
      if (typeof t == "string") {
        this.target = document.querySelector(t);
        return;
      }
      this.target = t;
    } catch {
      this.target = null;
    }
  }
  setup() {
  }
  cleanup() {
  }
  update() {
    if (!this.target)
      return null;
    const t = this.target.getBoundingClientRect(), i = u(t.left + t.width / 2), s = u(t.top + t.height / 2);
    return { x: i, y: s };
  }
}
var g;
class mt {
  constructor(t) {
    a(this, "name", "input");
    a(this, "target", null);
    r(this, g, null);
    try {
      if (typeof t == "string") {
        this.target = document.querySelector(t);
        return;
      }
      this.target = t;
    } catch {
      this.target = null;
    }
  }
  setup() {
    var t;
    o(this, g, document.createElement("pre")), (t = document.querySelector("body")) == null || t.append(e(this, g));
  }
  cleanup() {
    !e(this, g) || (e(this, g).remove(), o(this, g, null));
  }
  update() {
    if (!this.target || !e(this, g))
      return null;
    e(this, g).innerText !== this.target.value && (e(this, g).innerText = this.target.value);
    const { font: t, letterSpacing: i, width: s, lineHeight: l, paddingLeft: c } = getComputedStyle(this.target), d = Number(c.slice(0, -2)), f = this.target.getBoundingClientRect(), x = e(this, g).getBoundingClientRect();
    e(this, g).setAttribute(
      "style",
      `
        position: absolute;
        opacity: 0;
        top: 0;
        left: -100%;
        pointer-events: none;
        display: inline-block;
        line-height: ${l};
        font: ${t};
        max-width: ${s};
        letter-spacing: ${i};
      `
    );
    const W = u(
      f.left + x.width + d
    ), R = u(f.top + x.height / 2);
    return { x: W, y: R };
  }
}
g = new WeakMap();
var p, P;
class gt {
  constructor(t) {
    a(this, "name", "textarea");
    a(this, "target", null);
    r(this, p, null);
    r(this, P, "");
    try {
      if (typeof t == "string") {
        this.target = document.querySelector(t);
        return;
      }
      this.target = t;
    } catch {
      this.target = null;
    }
  }
  setup() {
    var t;
    o(this, p, document.createElement("pre")), (t = document.querySelector("body")) == null || t.append(e(this, p));
  }
  cleanup() {
    !e(this, p) || (e(this, p).remove(), o(this, p, null));
  }
  update() {
    var Q;
    if (!this.target || !e(this, p))
      return null;
    const {
      font: t,
      letterSpacing: i,
      width: s,
      lineHeight: l,
      paddingLeft: c,
      whiteSpace: d,
      overflowWrap: f,
      wordBreak: x
    } = getComputedStyle(this.target), W = Number(c.slice(0, -2));
    if (e(this, P) !== this.target.value) {
      o(this, P, this.target.value);
      const Z = this.target.value.split(`
`), lt = Z[Z.length - 1], w = document.createElement("pre");
      w.setAttribute(
        "style",
        `
          display: inline-block;
          width: ${this.target.clientWidth}px;
          white-space: ${d};
          overflow-wrap: ${f};
          word-break: ${x};
          line-height: ${l};
          min-height: 1em;
          height: auto;
          font: ${t};
          letter-spacing: ${i};
        `
      ), (Q = document.querySelector("body")) == null || Q.append(w);
      let J = 0;
      lt.split("").forEach((O) => {
        if (w.innerText += O, J || (J = w.clientHeight), w.clientHeight !== J) {
          if (O === " ")
            return;
          const _ = w.innerText.split(" "), at = _[_.length - 1];
          w.innerText = at;
        }
      }), e(this, p).innerText = w.innerText.trimEnd(), w.remove();
    }
    const R = this.target.getBoundingClientRect(), st = e(this, p).getBoundingClientRect();
    e(this, p).setAttribute(
      "style",
      `
      position: absolute;
      opacity: 0;
      top: 0;
      left: -100%;
      pointer-events: none;
      display: inline-block;
      word-break: keep-all;
      line-height: ${l};
      font: ${t};
      letter-spacing: ${i};
      `
    );
    const K = Number(s.slice(0, -2));
    let j = st.width % K;
    j === 0 && (j = e(this, p).innerText ? K : 0);
    const rt = u(R.left + j + W), ot = u(R.top + R.height / 2);
    return { x: rt, y: ot };
  }
}
p = new WeakMap(), P = new WeakMap();
const pt = {
  mouse: k,
  dom: ft,
  input: mt,
  textarea: gt
}, it = 50, yt = "mouse", nt = {
  translate: { x: 0, y: 0 },
  rotate: 0
};
var Y, h, b, v, y, q, A, L, N, E, S, $, T, I, F, D, V, X, U, G;
class bt {
  constructor(t, i = {}) {
    r(this, Y, null);
    r(this, h, null);
    r(this, b, null);
    r(this, v, null);
    r(this, y, null);
    r(this, q, null);
    r(this, A, null);
    r(this, L, !0);
    r(this, N, !0);
    r(this, E, it);
    r(this, S, it);
    r(this, $, null);
    r(this, T, null);
    r(this, I, () => {
      if (e(this, h) === null) {
        e(this, Y) !== null && o(this, h, document.querySelector(e(this, Y)));
        return;
      }
      const t = e(this, h).getBoundingClientRect(), i = dt(e(this, h)), s = u(t.left - i.x + t.width / 2), l = u(t.top - i.y + t.height / 2);
      o(this, b, { x: s, y: l });
    });
    r(this, F, () => {
      o(this, v, e(this, y).update());
    });
    r(this, D, () => {
      if (!e(this, h))
        return !1;
      const t = e(this, h).getBoundingClientRect(), i = e(this, S) * 2, s = e(this, E) * 2;
      return !(t.top - i > (window.innerHeight || document.documentElement.clientHeight) || t.bottom + i < 0 || t.left - s > (window.innerWidth || document.documentElement.clientWidth) || t.right + s < 0);
    });
    r(this, V, () => {
      const t = {
        translate: { x: 0, y: 0 },
        rotate: 0
      };
      if (!e(this, b) || !e(this, v) || !e(this, N) && !e(this, L))
        return t;
      const i = e(this, v).x - e(this, b).x, s = e(this, v).y - e(this, b).y, l = i >= 0 ? 1 : -1, c = s >= 0 ? 1 : -1;
      if (e(this, N)) {
        const d = Math.abs(i), f = Math.abs(s), x = Math.atan2(f, d), W = Math.min(d, Math.cos(x) * e(this, E)) * l, R = Math.min(f, Math.sin(x) * e(this, S)) * c;
        t.translate.x = u(W), t.translate.y = u(R);
      }
      if (e(this, L)) {
        const d = Math.atan2(s, i) * 180 / Math.PI;
        t.rotate = u(d + 90);
      }
      return t;
    });
    r(this, X, (t) => {
      !e(this, h) || (e(this, h).style.transform = `translate3d(${t.translate.x}px,${t.translate.y}px,0px) rotate(${t.rotate}deg)`);
    });
    r(this, U, () => {
      var t, i, s, l, c, d, f, x;
      return ((t = e(this, q)) == null ? void 0 : t.x) !== ((i = e(this, b)) == null ? void 0 : i.x) || ((s = e(this, q)) == null ? void 0 : s.y) !== ((l = e(this, b)) == null ? void 0 : l.y) || ((c = e(this, A)) == null ? void 0 : c.x) !== ((d = e(this, v)) == null ? void 0 : d.x) || ((f = e(this, A)) == null ? void 0 : f.y) !== ((x = e(this, v)) == null ? void 0 : x.y);
    });
    r(this, G, () => {
      const t = e(this, V).call(this);
      e(this, $) ? e(this, $).call(this, t) : e(this, X).call(this, t), o(this, q, e(this, b)), o(this, A, e(this, v));
    });
    a(this, "getState", () => {
      var i, s, l, c;
      return {
        watcher: e(this, h),
        watcherPosition: {
          x: ((i = e(this, b)) == null ? void 0 : i.x) || 0,
          y: ((s = e(this, b)) == null ? void 0 : s.y) || 0
        },
        target: e(this, y).target,
        targetPosition: {
          x: ((l = e(this, v)) == null ? void 0 : l.x) || 0,
          y: ((c = e(this, v)) == null ? void 0 : c.y) || 0
        },
        targetType: e(this, y).name,
        rotatable: e(this, L),
        movable: e(this, N),
        power: {
          x: e(this, E),
          y: e(this, S)
        },
        active: !!e(this, T)
      };
    });
    a(this, "setWatcher", (t) => {
      !t || (et(t) ? o(this, h, t) : typeof t == "string" ? (o(this, Y, t), o(this, h, document.querySelector(t))) : console.error(`Unexpected watcher: ${JSON.stringify(t)}`));
    });
    a(this, "setRotatable", (t = !0) => {
      o(this, L, !!t);
    });
    a(this, "setMovable", (t = !0) => {
      o(this, N, !!t);
    });
    a(this, "setTarget", (t) => {
      e(this, T) !== null && e(this, y) !== null && e(this, y).cleanup();
      let i = yt;
      t && !t.targetType && !!t.target ? i = "dom" : t != null && t.targetType && (i = t.targetType), o(this, y, new pt[i](
        t == null ? void 0 : t.target
      )), e(this, T) !== null && e(this, y) !== null && e(this, y).setup();
    });
    a(this, "setCustomRender", (t) => {
      t !== void 0 && o(this, $, t);
    });
    a(this, "setPower", (t) => {
      if (t !== void 0) {
        if (typeof t == "number") {
          o(this, E, t), o(this, S, t);
          return;
        }
        (t == null ? void 0 : t.x) !== void 0 && o(this, E, t.x), (t == null ? void 0 : t.y) !== void 0 && o(this, S, t.y);
      }
    });
    a(this, "start", () => {
      if (e(this, T) !== null)
        return;
      e(this, y).setup();
      const t = () => {
        e(this, D).call(this) && (e(this, I).call(this), e(this, F).call(this), e(this, U).call(this) && e(this, G).call(this)), o(this, T, requestAnimationFrame(t));
      };
      t();
    });
    a(this, "stop", () => {
      e(this, T) !== null && (e(this, y).cleanup(), cancelAnimationFrame(e(this, T) || 0), o(this, T, null), e(this, h) && (e(this, $) ? e(this, $).call(this, nt) : e(this, X).call(this, nt)));
    });
    const s = typeof t == "object" && !et(t), l = s ? t.watcher : t, c = s ? t : i, {
      power: d,
      rotatable: f,
      movable: x,
      customRender: W,
      ...R
    } = c;
    this.setCustomRender(W), this.setWatcher(l), this.setTarget(R), this.setPower(d), this.setRotatable(f), this.setMovable(x);
  }
}
Y = new WeakMap(), h = new WeakMap(), b = new WeakMap(), v = new WeakMap(), y = new WeakMap(), q = new WeakMap(), A = new WeakMap(), L = new WeakMap(), N = new WeakMap(), E = new WeakMap(), S = new WeakMap(), $ = new WeakMap(), T = new WeakMap(), I = new WeakMap(), F = new WeakMap(), D = new WeakMap(), V = new WeakMap(), X = new WeakMap(), U = new WeakMap(), G = new WeakMap();
export {
  bt as default
};
