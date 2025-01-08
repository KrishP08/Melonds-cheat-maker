document.addEventListener("DOMContentLoaded", () => {
  const cheats = [];
  const cheatPreview = document.getElementById("cheatPreview");

  // Add Cheat Button
  document.getElementById("addCheat").addEventListener("click", () => {
    const gameName = document.getElementById("gameName").value.trim();
    const gameID = document.getElementById("gameID").value.trim();
    const gameDate = document.getElementById("gameDate").value.trim();
    const cheatName = document.getElementById("cheatName").value.trim();
    const cheatNote = document.getElementById("cheatNote").value.trim();
    const cheatCodes = document.getElementById("cheatCodes").value.trim();

    if (!gameName || !gameID || !gameDate || !cheatName || !cheatCodes) {
      alert("Please fill in all required fields.");
      return;
    }

    cheats.push({ cheatName, cheatNote, cheatCodes });
    updateCheatPreview(gameName, gameID, gameDate);
    clearCheatFields();
  });

  // Download XML File Button
  document.getElementById("downloadCheatFile").addEventListener("click", () => {
    if (cheats.length === 0) {
      alert("No cheats to save.");
      return;
    }

    const gameName = document.getElementById("gameName").value.trim();
    const gameID = document.getElementById("gameID").value.trim();
    const gameDate = document.getElementById("gameDate").value.trim();

    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<codelist>\n`;
    xmlContent += `  <game>\n`;
    xmlContent += `    <name>${gameName}</name>\n`;
    xmlContent += `    <gameid>${gameID}</gameid>\n`;
    xmlContent += `    <date>${gameDate}</date>\n`;

    cheats.forEach((cheat) => {
      xmlContent += `    <cheat>\n`;
      xmlContent += `      <name>${cheat.cheatName}</name>\n`;
      if (cheat.cheatNote) xmlContent += `      <note>${cheat.cheatNote}</note>\n`;
      xmlContent += `      <codes>${cheat.cheatCodes}</codes>\n`;
      xmlContent += `    </cheat>\n`;
    });

    xmlContent += `  </game>\n</codelist>`;

    const blob = new Blob([xmlContent], { type: "application/xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${gameName.replace(/\s+/g, "_")}_cheats.xml`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  // Update Cheat Preview
  function updateCheatPreview(gameName, gameID, gameDate) {
    let previewContent = `<?xml version="1.0" encoding="UTF-8"?>\n<codelist>\n`;
    previewContent += `  <game>\n`;
    previewContent += `    <name>${gameName}</name>\n`;
    previewContent += `    <gameid>${gameID}</gameid>\n`;
    previewContent += `    <date>${gameDate}</date>\n`;

    cheats.forEach((cheat) => {
      previewContent += `    <cheat>\n`;
      previewContent += `      <name>${cheat.cheatName}</name>\n`;
      if (cheat.cheatNote) previewContent += `      <note>${cheat.cheatNote}</note>\n`;
      previewContent += `      <codes>${cheat.cheatCodes}</codes>\n`;
      previewContent += `    </cheat>\n`;
    });

    previewContent += `  </game>\n</codelist>`;
    cheatPreview.textContent = previewContent;
  }

  // Clear Form Fields
  function clearCheatFields() {
    document.getElementById("cheatName").value = "";
    document.getElementById("cheatNote").value = "";
    document.getElementById("cheatCodes").value = "";
  }
});
