function selectGameMode(mode) {
  console.log(`Game mode selected: ${mode}`);
  // Implement your game mode selection logic here
  // For example, redirect to the game mode page or load the game mode settings
  switch (mode) {
    case 'classic':
      // Redirect or load classic mode
      break;
    case 'arcade':
      // Redirect or load arcade mode
      break;
    case 'tournament':
      // Redirect or load tournament mode
      break;
    default:
      // Handle default case
      break;
  }
  // Close the modal after selection
  let modal = bootstrap.Modal.getInstance(document.getElementById('gameModeModal'));
  modal.hide();
}
