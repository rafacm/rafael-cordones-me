---
author: Rafael Cordones
pubDatetime: 2025-11-24T12:00:00Z
modDatetime:  2025-11-24T12:00:00Z
title: Uniting JavaScript and Python in the browser with PyScript
slug: uniting-javascript-and-python-in-the-browser-with-pyscript
featured: true
draft: false
tags:
  - python
  - javascript
  - web
description:
  How to use Pyscript to have Python code running on the browser to provide interactive content.
---

<figure>
  <img
    src="/assets/William_Blake_Moses_and_the_brazen_serpent.jpg"
    alt="Free Classic wooden desk with writing materials, vintage clock, and a leather bag. Stock Photo"
  />
    <figcaption class="text-center">
    William Blake's "Moses Erecting the Brazen Serpent". Photo from <a href="https://commons.wikimedia.org/wiki/File:William_Blake_Moses_and_the_brazen_serpent.jpg">Wikimedia Commons</a>.
  </figcaption>
</figure>

I recently came across [PyScript](https://pyscript.net/) which allows you to run Python code on the browser.
In this article, I will show how to use PyScript to have Python running on a webpage and interact with elements of that page using Python on a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) running on this very same page.

With the help of Claude, let's first set the playground by creating a row of squares with different colors and a JavaScript class to represent them:

<style>
    /* Custom styles for responsive square aspect ratio */
    .square {
        aspect-ratio: 1 / 1;
    }
</style>

<div class="sticky max-w-full mx-auto">
    <!-- Main container with flex layout -->
    <div class="flex gap-4 justify-center">
        <!-- Group 1: up -->
        <div class="flex-1 min-w-0">
            <h3 class="text-center font-semibold mb-2">U</h3>
            <div class="grid grid-cols-4 gap-1">
                <div class="square bg-white rounded-md shadow-md" data-group="0" data-index="0"></div>
                <div class="square bg-green-500 rounded-md shadow-md" data-group="0" data-index="1"></div>
                <div class="square bg-yellow-500 rounded-md shadow-md" data-group="0" data-index="2"></div>
                <div class="square bg-orange-500 rounded-md shadow-md" data-group="0" data-index="3"></div>
            </div>
        </div>
        <!-- Group 2: left -->
        <div class="flex-1 min-w-0">
            <h3 class="text-center font-semibold mb-2">L</h3>
            <div class="grid grid-cols-4 gap-1">
                <div class="square bg-red-500 rounded-md shadow-md" data-group="1" data-index="4"></div>
                <div class="square bg-blue-500 rounded-md shadow-md" data-group="1" data-index="5"></div>
                <div class="square bg-white rounded-md shadow-md" data-group="1" data-index="6"></div>
                <div class="square bg-green-500 rounded-md shadow-md" data-group="1" data-index="7"></div>
            </div>
        </div>
        <!-- Group 3: front -->
        <div class="flex-1 min-w-0">
            <h3 class="text-center font-semibold mb-2">F</h3>
            <div class="grid grid-cols-4 gap-1">
                <div class="square bg-yellow-500 rounded-md shadow-md" data-group="2" data-index="8"></div>
                <div class="square bg-orange-500 rounded-md shadow-md" data-group="2" data-index="9"></div>
                <div class="square bg-red-500 rounded-md shadow-md" data-group="2" data-index="10"></div>
                <div class="square bg-blue-500 rounded-md shadow-md" data-group="2" data-index="11"></div>
            </div>
        </div>
        <!-- Group 4: right -->
        <div class="flex-1 min-w-0">
            <h3 class="text-center font-semibold mb-2">R</h3>
            <div class="grid grid-cols-4 gap-1">
                <div class="square bg-white rounded-md shadow-md" data-group="3" data-index="12"></div>
                <div class="square bg-green-500 rounded-md shadow-md" data-group="3" data-index="13"></div>
                <div class="square bg-yellow-500 rounded-md shadow-md" data-group="3" data-index="14"></div>
                <div class="square bg-orange-500 rounded-md shadow-md" data-group="3" data-index="15"></div>
            </div>
        </div>
        <!-- Group 5: back -->
        <div class="flex-1 min-w-0">
            <h3 class="text-center font-semibold mb-2">B</h3>
            <div class="grid grid-cols-4 gap-1">
                <div class="square bg-red-500 rounded-md shadow-md" data-group="4" data-index="16"></div>
                <div class="square bg-blue-500 rounded-md shadow-md" data-group="4" data-index="17"></div>
                <div class="square bg-white rounded-md shadow-md" data-group="4" data-index="18"></div>
                <div class="square bg-green-500 rounded-md shadow-md" data-group="4" data-index="19"></div>
            </div>
        </div>
        <!-- Group 6: down -->
        <div class="flex-1 min-w-0">
            <h3 class="text-center font-semibold mb-2">D</h3>
            <div class="grid grid-cols-4 gap-1">
                <div class="square bg-yellow-500 rounded-md shadow-md" data-group="5" data-index="20"></div>
                <div class="square bg-orange-500 rounded-md shadow-md" data-group="5" data-index="21"></div>
                <div class="square bg-red-500 rounded-md shadow-md" data-group="5" data-index="22"></div>
                <div class="square bg-blue-500 rounded-md shadow-md" data-group="5" data-index="23"></div>
            </div>
        </div>
    </div>
</div>

<script>
    // Color mapping for the squares
    const COLORS = {
        WHITE: 'bg-white',
        GREEN: 'bg-green-500',
        YELLOW: 'bg-yellow-500',
        ORANGE: 'bg-orange-500',
        RED: 'bg-red-500',
        BLUE: 'bg-blue-500'
    };
    // SquareRow class to manage the row of squares
    class SquareRow {
        constructor() {
            // Get all square elements
            this.squares = document.querySelectorAll('.square');
            this.totalSquares = 24;
            // Store initial colors for reset functionality
            this.initialColors = [];
            this.squares.forEach(square => {
                const currentColor = this.getCurrentColor(square);
                this.initialColors.push(currentColor);
            });
        }
        // Get the current color class of a square
        getCurrentColor(square) {
            for (const [name, className] of Object.entries(COLORS)) {
                if (square.classList.contains(className)) {
                    return className;
                }
            }
            return COLORS.WHITE; // default
        }
        // Get the current color of a square given its index 
        getSquareColor(index) {
          if (index < 0 || index >= this.totalSquares) {
                console.error(`Invalid square index: ${index}. Must be between 0 and ${this.totalSquares - 1}`);
                return;
            }
            const square = this.squares[index];
            return this.getCurrentColor(square);
        }
        // Change the color of a specific square
        changeSquareColor(index, color) {
            if (index < 0 || index >= this.totalSquares) {
                console.error(`Invalid square index: ${index}. Must be between 0 and ${this.totalSquares - 1}`);
                return;
            }
            if (!Object.values(COLORS).includes(color)) {
                console.error(`Invalid color: ${color}. Use one of the COLORS constants.`);
                return;
            }
            const square = this.squares[index];
            // Remove all color classes
            Object.values(COLORS).forEach(colorClass => {
                square.classList.remove(colorClass);
            });
            // Add the new color class
            square.classList.add(color);
        }
        // Reset all squares to their initial colors
        reset() {
            this.squares.forEach((square, index) => {
                // Remove all color classes
                Object.values(COLORS).forEach(colorClass => {
                    square.classList.remove(colorClass);
                });
                // Add the initial color class
                square.classList.add(this.initialColors[index]);
            });
        }
        // Get the color of a specific square
        getSquareColor(index) {
            if (index < 0 || index >= this.totalSquares) {
                console.error(`Invalid square index: ${index}`);
                return null;
            }
            return this.getCurrentColor(this.squares[index]);
        }
    }
    // Create an instance of the SquareRow class
    const squareRow = new SquareRow();
    // Demo function to show the functionality
    function demo() {
        // Change some random squares to demonstrate the functionality
        const changes = [
            { index: 0, color: COLORS.BLUE },
            { index: 5, color: COLORS.RED },
            { index: 10, color: COLORS.GREEN },
            { index: 15, color: COLORS.YELLOW },
            { index: 20, color: COLORS.ORANGE },
            { index: 23, color: COLORS.WHITE }
        ];
        let delay = 0;
        changes.forEach(change => {
            setTimeout(() => {
                squareRow.changeSquareColor(change.index, change.color);
            }, delay);
            delay += 200;
        });
    }
    // Reset function
    function reset() {
        squareRow.reset();
    }
    // Example usage in console:
    console.log('SquareRow instance created. You can use:');
    console.log('- squareRow.changeSquareColor(index, COLORS.COLOR_NAME)');
    console.log('- squareRow.getSquareColor(index)');
    console.log('- squareRow.reset()');
    console.log('Available values for COLOR_NAME:', Object.keys(COLORS).join(", "));
</script>

You can open your browser's [developer tools](https://developer.chrome.com/docs/devtools/open) and use 
the [elements panel](https://developer.chrome.com/docs/devtools/overview#elements) to inspect the HTML and JavaScript
used to build the row of colored squares above.

If you activate the [console panel](https://developer.chrome.com/docs/devtools/overview#console) in your browser, you should see the following output:
```
SquareRow instance created. You can use:
- squareRow.changeSquareColor(index, COLORS.COLOR_NAME)
- squareRow.getSquareColor(index)
- squareRow.reset()
Available values for COLOR_NAME: WHITE, GREEN, YELLOW, ORANGE, RED, BLUE
```

You can now use the `changeSquareColor` and `reset` functions on the `squareRow` instance in your browser's console panel 
to change the colors of the squares. For example, you can change the color of the first square to orange with the following JavaScript code (note that we use zero-based indexing):
```
squareRow.changeSquareColor(0, COLORS.ORANGE)
```

Using the [REPL example](https://pyscript.com/@examples/repl/latest) from the [PyScripts Examples page](https://pyscript.com/@examples), adapting script and CSS URLs to the [2025.11.1 release](https://pyscript.net/releases/2025.11.1/) and choosing the [Option 1: mini-coi](https://docs.pyscript.net/2025.11.1/user-guide/workers/#option-1-mini-coi)) we can now embed a Python REPL on this page!👇🏻

<!-- PyScript -->
<link rel="stylesheet" href="https://pyscript.net/releases/2025.11.1/core.css">
<script type="module" src="https://pyscript.net/releases/2025.11.1/core.js"></script>

<script type="mpy" terminal worker>
import code

code.interact()
</script>

We can now try the same examples as before but now in Python! 

> 💡 Tip: You can press Ctrl+L in the REPL to clear the previous output.

For example, we can change the color of the first square to orange with the following Python code:
```python
# Get a reference to the squareRow instance
squareRow = py.squareRow
```
