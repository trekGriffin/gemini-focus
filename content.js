// --- Constants and Setup ---
const GEMINI_INPUT_SELECTOR = ".ql-editor";
const MAX_ATTEMPTS = 5;
let attempts = 0;

/**
 * Attempts to find the Gemini input box and set focus.
 * Since the input box might load asynchronously, we retry a few times.
 */
function trySetFocus() {
  console.log("try to get focus");

  const inputElement = document.querySelector(GEMINI_INPUT_SELECTOR);

  if (inputElement) {
    // Found the element, set focus
    inputElement.focus();
    inputElement.click();
    console.log("Gemini Focus: Input box focused successfully.");
    return true; // Success
  } else if (attempts < MAX_ATTEMPTS) {
    // Not found yet, retry after a short delay
    attempts++;
    console.log(
      `Gemini Focus: Input not found, retry ${attempts}/${MAX_ATTEMPTS}`
    );
    setTimeout(trySetFocus, 500);
    return false;
  } else {
    console.error(
      "Gemini Focus: Failed to find input element after multiple attempts."
    );
    return false; // Failure
  }
}

/**
 * Listener function that executes when the tab's visibility changes.
 */
function handleVisibilityChange() {
  // 1. Check if the tab is currently visible (i.e., user switched to it)
  if (document.visibilityState === "visible") {
    // 2. Reset attempts and try to set focus
    attempts = 0;
    trySetFocus();
  }
  // If state is 'hidden', we do nothing.
}

// --- Main Execution ---

// 1. Attach the listener for visibility changes
document.addEventListener("visibilitychange", handleVisibilityChange);

// 2. Run the focus function immediately on initial page load,
// as the visibilitychange event might not fire immediately upon loading.
console.log("Gemini Focus: Page loaded, attempting initial focus.");
trySetFocus();
