
import { ball_1, deleteSphere } from './sphere.js';

import { square, deleteSquare } from './cube.js';

import { naturalMesh, deleteNaturalMesh } from './naturalMesh.js';




document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // Function to load the appropriate content based on the current hash
  function loadContent() {
    const contentDiv = document.getElementById("content");
    const hash = window.location.hash.substring(1); // Get the hash value without the '#'
    console.log(`Current hash: ${hash}`);

    switch (hash) {
      case 'home':
        contentDiv.innerHTML = "<h1>Home</h1><p>Welcome to the home page!</p>";
        // deleteSquare();
        // deleteNaturalMesh();
        ball_1();
        break;
      case 'about':
        contentDiv.innerHTML = "<h1>About</h1><p>This is the about page.</p>";

        // deleteNaturalMesh();
        // deleteSphere();
        square();

        break;
      case 'contact':
        contentDiv.innerHTML = "<h1>Contact</h1><p>Get in touch with us.</p>";

        // deleteSphere();
        // deleteSquare();
        naturalMesh();
        break;
      default:
        contentDiv.innerHTML = "<h1>Home</h1><p>Welcome to the home page!</p>";
        // loadHomeScript();
        break;
    }
  }

  // Event listener for hash changes
  window.addEventListener("hashchange", loadContent);

  // Load the initial content
  loadContent();
});

// Functions to be called for each page
function loadHomeScript() {
  console.log("Home script loaded.");
  // Add any JavaScript specific to the home page here
}

function loadAboutScript() {
  console.log("About script loaded.");
  // Add any JavaScript specific to the about page here
}

function loadContactScript() {
  console.log("Contact script loaded.");
  // Add any JavaScript specific to the contact page here
}


