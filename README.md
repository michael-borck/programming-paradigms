# Calculator Program Showcase

**▶ [programmingparadigms.borck.education](https://programmingparadigms.borck.education/)** — run all three versions in your browser.

<!-- BADGES:START -->
[![calculator](https://img.shields.io/badge/-calculator-blue?style=flat-square)](https://github.com/topics/calculator) [![cli-tool](https://img.shields.io/badge/-cli--tool-blue?style=flat-square)](https://github.com/topics/cli-tool) [![functional-programming](https://img.shields.io/badge/-functional--programming-blue?style=flat-square)](https://github.com/topics/functional-programming) [![imperative-programming](https://img.shields.io/badge/-imperative--programming-blue?style=flat-square)](https://github.com/topics/imperative-programming) [![object-oriented-programming](https://img.shields.io/badge/-object--oriented--programming-blue?style=flat-square)](https://github.com/topics/object-oriented-programming) [![programming-paradigms](https://img.shields.io/badge/-programming--paradigms-blue?style=flat-square)](https://github.com/topics/programming-paradigms) [![python](https://img.shields.io/badge/-python-3776ab?style=flat-square)](https://github.com/topics/python) [![edtech](https://img.shields.io/badge/-edtech-4caf50?style=flat-square)](https://github.com/topics/edtech) [![educational](https://img.shields.io/badge/-educational-blue?style=flat-square)](https://github.com/topics/educational) [![code-examples](https://img.shields.io/badge/-code--examples-blue?style=flat-square)](https://github.com/topics/code-examples)
<!-- BADGES:END -->

This repository contains three different implementations of a simple calculator program, each demonstrating a different programming paradigm: imperative, functional, and object-oriented.

> **Try it in your browser:** [One Calculator, Three Paradigms](https://michael-borck.github.io/programming-paradigms/) — an interactive playground that runs all three implementations side-by-side (via WebAssembly), with annotated source and practice katas. No install needed.

## Table of Contents

- [Calculator Program Showcase](#calculator-program-showcase)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Program Versions](#program-versions)
  - [How to Use](#how-to-use)
  - [Paradigm Overview](#paradigm-overview)
  - [Website](#website)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

Programming paradigms are different approaches to writing code, each with its own set of principles and concepts. This repository showcases three programming paradigms used to create a basic calculator program. The goal is to provide insights into how the same functionality can be implemented using different programming styles.

## Program Versions

1. **Imperative**: This version of the calculator program uses traditional control structures like loops and conditionals for logic flow.

2. **Functional**: The functional version employs concepts like pure functions, immutability, and higher-order functions to perform calculations.

3. **Object-Oriented**: In the object-oriented version, the calculator's functionality is encapsulated within classes, allowing for modular and organized code.

Each version provides the same core features, including addition, subtraction, multiplication, and division operations.

## How to Use

1. Clone the repository to your local machine:

    git clone https://github.com/michael-borck/programming-paradigms.git


2. Navigate to the directory of the specific programming paradigm you want to explore:

    cd programming-paradigms/imperative

3. Run the calculator program using your preferred Python interpreter:

  python calculator.py


4. Follow the on-screen prompts to choose an operation and input operands. The program will display the result of the calculation.

5. Repeat steps 2-4 for the functional and object-oriented versions.

## Paradigm Overview

- **Imperative Paradigm**: Focuses on describing "how" to achieve a task using explicit instructions and control structures.

- **Functional Paradigm**: Emphasises "what" needs to be done by composing functions and avoiding side effects. It relies on immutability and higher-order functions.

- **Object-Oriented Paradigm**: Organises code around objects that encapsulate data and behaviour. It promotes modularity and reusability through classes and inheritance.

## Website

The companion site is served by GitHub Pages from the [`docs/`](docs/) folder. It runs the three calculators in the browser with [Pyodide](https://pyodide.org) and includes five practice katas. If you edit any `calculator.py`, run `./scripts/sync-site.sh` to refresh the copies the site executes.

## Contributing

Contributions are welcome! If you'd like to enhance or expand the calculator program for any of the paradigms, feel free to fork this repository and submit a pull request with your changes.

## Related

Part of [programming.borck.education](https://programming.borck.education), alongside the
[Speak Software labs](https://programminglabs.borck.education),
[Programming Toys](https://programmingtoys.borck.education), and the
[HandsOnAI](https://handsonai.borck.education) toolkit.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code as permitted by the license.

---

Enjoy exploring the different programming paradigms showcased in this repository! If you have any questions or suggestions, feel free to open an issue or reach out to the repository owner.
