/* One Calculator, Three Paradigms — playground logic.
 *
 * Loads the three calculator.py files (live from the repo on GitHub,
 * falling back to the bundled copies in docs/paradigms/), executes them
 * in Pyodide (CPython compiled to WebAssembly) and calls into each module
 * the way its paradigm demands.
 */

"use strict";

const REPO = "michael-borck/programming-paradigms";
const BRANCH = "main";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
const BLOB_BASE = `https://github.com/${REPO}/blob/${BRANCH}`;

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";

/* Per-paradigm configuration: where the code lives, how to call it,
 * and which concepts to spotlight in the annotated source view.
 * Line ranges refer to the repo files and double as GitHub anchors. */
const PARADIGMS = {
  imperative: {
    repoPath: "imperative/calculator.py",
    localPath: "paradigms/imperative.py",
    cardId: "card-imperative",
    moduleName: "calc_imperative",
    concepts: [
      {
        title: "Dispatch = if/elif on a string",
        blurb: "Every operation request walks the same chain of explicit branches. The control flow is the program.",
        lines: [19, 37],
      },
      {
        title: "The loop drives everything",
        blurb: "while True: print menu, read input, compute, print. State lives only in local variables and vanishes each iteration.",
        lines: [63, 78],
      },
    ],
  },
  functional: {
    repoPath: "functional/calculator.py",
    localPath: "paradigms/functional.py",
    cardId: "card-functional",
    moduleName: "calc_functional",
    concepts: [
      {
        title: "Functions are first-class values",
        blurb: "The menu is a dictionary that maps a choice directly to a function — no if/elif chain required.",
        lines: [93, 98],
      },
      {
        title: "Immutability: never change, always create",
        blurb: "update_history doesn't touch the old tuple; it returns a brand-new one. The past cannot be rewritten.",
        lines: [135, 148],
      },
      {
        title: "Recursion instead of a loop",
        blurb: "repl calls itself with the new history. Each iteration is a fresh function call with fresh values.",
        lines: [150, 175],
      },
      {
        title: "Higher-order functions",
        blurb: "calculate receives the operation as a function argument — behaviour is passed around like data.",
        lines: [77, 87],
      },
    ],
  },
  oop: {
    repoPath: "object-oriented/calculator.py",
    localPath: "paradigms/object_oriented.py",
    cardId: "card_oop",
    moduleName: "calc_oop",
    concepts: [
      {
        title: "State lives inside the object",
        blurb: "__init__ creates self.history. Every method mutates it — the object remembers what happened to it.",
        lines: [10, 11],
      },
      {
        title: "Methods mutate internal state",
        blurb: "add() computes AND records. Callers never see the history list unless the object chooses to share it.",
        lines: [13, 16],
      },
      {
        title: "Responsibilities become classes",
        blurb: "Menu only talks to the user; Calculator only calculates. Each class encapsulates one job.",
        lines: [40, 41],
      },
    ],
  },
};

const CHOICE = { add: "1", subtract: "2", multiply: "3", divide: "4" };

let pyodide = null;
const modules = {};   // name -> python globals dict (PyProxy)
const broken = {};    // name -> error message, if the module failed to load
let fnHistory = null; // PyProxy holding the functional history tuple

/* ---------- source loading ---------- */

async function fetchSource(cfg) {
  // Bundled copy first: the site should stay stable even if the repo's
  // main branch is mid-experiment. The live raw file is only a fallback.
  try {
    const r = await fetch(cfg.localPath);
    if (r.ok) return { text: await r.text(), origin: "bundled" };
  } catch (_) { /* fall through to live fetch */ }
  const r = await fetch(`${RAW_BASE}/${cfg.repoPath}`);
  if (!r.ok) throw new Error(`Could not load ${cfg.repoPath}`);
  return { text: await r.text(), origin: "live" };
}

/* ---------- annotated source rendering ---------- */

function renderSource(key, cfg, source) {
  const card = document.getElementById(cfg.cardId);
  const lines = source.split("\n");

  const conceptsEl = card.querySelector(".concepts");
  for (const c of cfg.concepts) {
    const [from, to] = c.lines;
    const excerpt = lines.slice(from - 1, to).join("\n");
    const div = document.createElement("div");
    div.className = "concept";
    div.innerHTML =
      `<h4></h4><p></p>` +
      `<pre><code class="language-python"></code></pre>` +
      `<p class="lines"><a target="_blank" rel="noopener">lines ${from}\u2013${to} on GitHub \u2197</a></p>`;
    div.querySelector("h4").textContent = c.title;
    div.querySelector("p").textContent = c.blurb;
    div.querySelector("pre code").textContent = excerpt;
    const a = div.querySelector(".lines a");
    a.href = `${BLOB_BASE}/${cfg.repoPath}#L${from}-L${to}`;
    conceptsEl.appendChild(div);
  }

  card.querySelector(".full-src").textContent = source;
  const gh = card.querySelector(".gh-link a");
  gh.href = `${BLOB_BASE}/${cfg.repoPath}`;

  card.querySelectorAll("pre code").forEach((el) => hljs.highlightElement(el));
}

/* ---------- pyodide ---------- */

function loadModule(name, source) {
  const globals = pyodide.globals.get("dict")();
  globals.set("__name__", name); // keep __main__ guard from firing
  pyodide.runPython(source, { globals });
  return globals;
}

function py(mod, expr) {
  return pyodide.runPython(expr, { globals: modules[mod] });
}

function setInputs(mod, a, b) {
  modules[mod].set("__a", a);
  modules[mod].set("__b", b);
}

/* ---------- run logic ---------- */

function fmtNum(x) {
  return String(x); // JS prints 6 as "6", 2.5 as "2.5" — fine for display
}

function runAll(op, a, b) {
  const choice = CHOICE[op];

  // --- imperative: dispatch on a string, no memory ---
  guard("imperative", () => {
    setInputs("imperative", a, b);
    modules.imperative.set("__c", choice);
    py("imperative", `__r = calculate(__a, __b, __c)\n__out = repr(__r)`);
    fill("imperative", {
      call: `calculate(${fmtNum(a)}, ${fmtNum(b)}, '${choice}')`,
      result: modules.imperative.get("__out"),
      state: "\u2014 nothing is kept",
      note: "The result was computed and <strong>immediately forgotten</strong>. Run as often as you like &mdash; this card will never change.",
    });
  });

  // --- functional: dispatch on a function value; history threaded by the caller ---
  guard("functional", () => {
    setInputs("functional", a, b);
    modules.functional.set("__c", choice);
    modules.functional.set("__hist", fnHistory);
    py(
      "functional",
      [
        "__r = calculate(__a, __b, operators[__c])",
        "__old = __hist",
        "__hist = update_history(__hist, __r)",
        "__out = repr(__r)",
        "__new = repr(__hist)",
        "__prev = repr(__old)",
      ].join("\n")
    );
    fnHistory.destroy?.();
    fnHistory = modules.functional.get("__hist");
    fill("functional", {
      call: `calculate(${fmtNum(a)}, ${fmtNum(b)}, operators['${choice}'])  # = ${op}`,
      result: modules.functional.get("__out"),
      state: `history := ${modules.functional.get("__new")}`,
      note: `The old history <code>${modules.functional.get("__prev")}</code> is <strong>unchanged</strong> &mdash; a brand-new tuple came back and the caller had to keep it. State moves forward by creating, never by editing.`,
    });
  });

  // --- OO: send a message to an object; the object mutates itself ---
  guard("oop", () => {
    setInputs("oop", a, b);
    py(
      "oop",
      `__r = _calc.${op}(__a, __b)\n__out = repr(__r)\n__hist = repr(_calc.history)\n__n = len(_calc.history)`
    );
    const n = modules.oop.get("__n");
    fill("oop", {
      call: `calc.${op}(${fmtNum(a)}, ${fmtNum(b)})`,
      result: modules.oop.get("__out"),
      state: `self.history = ${modules.oop.get("__hist")}`,
      note: `The object <strong>mutated itself</strong>: <code>self.history</code> now holds ${n} ${n === 1 ? "entry" : "entries"}. Same list, new contents &mdash; encapsulation means only the object gets to do that.`,
    });
  });
}

/* Run fn for one paradigm, turning failures into a message on that card
 * instead of taking down the whole playground. */
function guard(key, fn) {
  if (broken[key]) {
    const card = document.getElementById(PARADIGMS[key].cardId);
    const lastLine = broken[key].trim().split("\n").filter(Boolean).pop();
    card.querySelector(".note").textContent = `Could not load this module: ${lastLine}`;
    return;
  }
  try {
    fn();
  } catch (err) {
    const card = document.getElementById(PARADIGMS[key].cardId);
    card.querySelector(".note").textContent = `Python error: ${err.message}`;
    console.error(err);
  }
}

function fill(key, { call, result, state, note }) {
  const card = document.getElementById(PARADIGMS[key].cardId);
  card.querySelector(".call").textContent = call;
  card.querySelector(".result").textContent = result;
  card.querySelector(".state").textContent = state;
  card.querySelector(".note").innerHTML = note;
}

/* ---------- UI wiring ---------- */

function currentOp() {
  return document.querySelector(".op-btn.active").dataset.op;
}

function readOperands() {
  const a = parseFloat(document.getElementById("input-a").value);
  const b = parseFloat(document.getElementById("input-b").value);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return [a, b];
}

function wireUi() {
  document.querySelectorAll(".op-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelector(".op-btn.active").classList.remove("active");
      btn.classList.add("active");
    })
  );

  document.getElementById("run-btn").addEventListener("click", () => {
    const operands = readOperands();
    if (!operands) return;
    try {
      runAll(currentOp(), ...operands);
    } catch (err) {
      console.error(err);
    }
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (!pyodide) return;
    py("functional", "__hist = ()");
    fnHistory.destroy?.();
    fnHistory = modules.functional.get("__hist");
    py("oop", "_calc.history.clear()");
    for (const key of Object.keys(PARADIGMS)) {
      const card = document.getElementById(PARADIGMS[key].cardId);
      card.querySelector(".state").textContent = "\u2014";
      card.querySelector(".note").textContent = "";
    }
  });
}

/* ---------- boot ---------- */

async function boot() {
  const runBtn = document.getElementById("run-btn");
  try {
    wireUi();

    const origins = [];
    const sources = {};
    for (const [key, cfg] of Object.entries(PARADIGMS)) {
      const { text, origin } = await fetchSource(cfg);
      sources[key] = text;
      origins.push(origin);
      renderSource(key, cfg, text);
    }

    document.getElementById("source-badge").textContent =
      origins.every((o) => o === "bundled")
        ? "Running the exact calculator.py files from the repo, bundled with this site — nothing is re-implemented in JavaScript."
        : "Some code was fetched live from github.com (bundled copy unavailable).";

    pyodide = await loadPyodide({ indexURL: PYODIDE_URL });

    for (const [key, cfg] of Object.entries(PARADIGMS)) {
      try {
        modules[key] = loadModule(cfg.moduleName, sources[key]);
      } catch (err) {
        broken[key] = err.message;
        console.error(`Failed to load ${key}:`, err);
      }
    }
    if (modules.functional) {
      py("functional", "__hist = ()");
      fnHistory = modules.functional.get("__hist");
    }
    if (modules.oop) py("oop", "_calc = Calculator()");

    runBtn.disabled = Object.keys(modules).length === 0;
    runBtn.textContent = runBtn.disabled ? "Failed to load — see console" : "Run all three";

    // Show a first calculation immediately so the cards aren't empty.
    runAll("add", 6, 2);
  } catch (err) {
    runBtn.textContent = "Failed to load — see console";
    console.error(err);
  }
}

boot();
