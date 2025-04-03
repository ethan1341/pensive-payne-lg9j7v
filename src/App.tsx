/**
 * Creates a deterministic random number generator function with a given seed.
 * @param {number} seed - The initial seed for the random number generator
 * @returns {Function} A function that generates deterministic random numbers in a given range
 */
function createDeterministicRandom(seed) {
  // Simple linear congruential generator (LCG) parameters
  const a = 1664525; // multiplier
  const c = 1013904223; // increment
  const m = Math.pow(2, 32); // modulus

  // The current state starts with the seed
  let state = seed;

  /**
   * Generates a random number within a specific range
   * @param {number} minVal - The minimum value (inclusive)
   * @param {number} maxVal - The maximum value (inclusive)
   * @returns {number} A pseudo-random number within the specified range
   */
  return function getRandomInRange(minVal, maxVal) {
    // Update the state using the LCG formula
    state = (a * state + c) % m;

    // Map the state to the desired range
    return Math.floor(minVal + (state % (maxVal - minVal + 1)));
  };
}

/**
 * Play the number guessing game with a deterministic random number generator
 */
function playNumberGame() {
  console.log("Welcome to the Number Guessing Game!");

  const minVal = 1;
  const maxVal = 100;
  const seed = 42; // Fixed seed ensures the same "random" number each time

  // Create our deterministic random generator
  const randomGenerator = createDeterministicRandom(seed);

  // Generate the target number
  const targetNumber = randomGenerator(minVal, maxVal);

  let attempts = 0;
  let playing = true;

  // In a browser environment, you might want to use DOM elements for input/output
  // This example uses a simple prompt-based approach for demonstration
  while (playing) {
    // In a real implementation, this would be handled with an input field and button
    const userInput = prompt(`Guess a number between ${minVal} and ${maxVal}:`);

    // Handle cancel button or empty input
    if (userInput === null || userInput === "") {
      console.log("Game canceled.");
      playing = false;
      continue;
    }

    const guess = parseInt(userInput, 10);
    attempts++;

    // Check if input is a valid number
    if (isNaN(guess)) {
      console.log("Please enter a valid number.");
      continue;
    }

    // Check if guess is within range
    if (guess < minVal || guess > maxVal) {
      console.log(`Please enter a number between ${minVal} and ${maxVal}.`);
      continue;
    }

    // Provide feedback based on the guess
    if (guess < targetNumber) {
      console.log("Too low!");
    } else if (guess > targetNumber) {
      console.log("Too high!");
    } else {
      console.log(
        `Congratulations! You found the number ${targetNumber} in ${attempts} attempts!`
      );
      playing = false;
    }
  }
}

// For browser environments, you might want this to run when a button is clicked
// For Node.js environments, this will run when the script is executed
playNumberGame();

// Alternative browser-based implementation that uses the DOM instead of prompts
function setupBrowserGame() {
  const minVal = 1;
  const maxVal = 100;
  const seed = 42;
  const randomGenerator = createDeterministicRandom(seed);
  const targetNumber = randomGenerator(minVal, maxVal);
  let attempts = 0;

  document
    .getElementById("submit-guess")
    .addEventListener("click", function () {
      const guessInput = document.getElementById("guess-input");
      const guess = parseInt(guessInput.value, 10);
      const resultElement = document.getElementById("result");

      attempts++;

      if (isNaN(guess)) {
        resultElement.textContent = "Please enter a valid number.";
        return;
      }

      if (guess < minVal || guess > maxVal) {
        resultElement.textContent = `Please enter a number between ${minVal} and ${maxVal}.`;
        return;
      }

      if (guess < targetNumber) {
        resultElement.textContent = "Too low!";
      } else if (guess > targetNumber) {
        resultElement.textContent = "Too high!";
      } else {
        resultElement.textContent = `Congratulations! You found the number ${targetNumber} in ${attempts} attempts!`;
        document.getElementById("submit-guess").disabled = true;
      }

      guessInput.value = "";
      guessInput.focus();
    });
}

// Uncomment this line to use the DOM-based version in a browser environment
// document.addEventListener('DOMContentLoaded', setupBrowserGame);
