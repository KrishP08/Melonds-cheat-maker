document.addEventListener("DOMContentLoaded", () => {
  const cheats = [];
  const cheatPreview = document.getElementById("cheatPreview");

  // Add Cheat Button
  document.getElementById("addCheat").addEventListener("click", () => {
    const description = document.getElementById("cheatDescription").value.trim();
    const code = document.getElementById("cheatCode").value.trim();
    const enable = document.getElementById("cheatEnable").checked;

    if (!description || !code) {
      alert("Please fill in both the cheat description and code.");
      return;
    }

    cheats.push({ description, code, enable });
    updateCheatPreview();
    clearFormFields();
  });

  // Download .xml File Button
  document.getElementById("downloadCheatFile").addEventListener("click", () => {
    if (cheats.length === 0) {
      alert("No cheats to save.");
      return;
    }

    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<cheats>\n`;
    cheats.forEach((cheat) => {
      xmlContent += `  <cheat>\n`;
      xmlContent += `    <desc>${cheat.description}</desc>\n`;
      xmlContent += `    <code>${cheat.code}</code>\n`;
      xmlContent += `    <enable>${cheat.enable}</enable>\n`;
      xmlContent += `  </cheat>\n`;
    });
    xmlContent += `</cheats>`;

    const blob = new Blob([xmlContent], { type: "application/xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cheats.xml";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  // Update Cheat Preview
  function updateCheatPreview() {
    let previewContent = `<?xml version="1.0" encoding="UTF-8"?>\n<cheats>\n`;
    cheats.forEach((cheat) => {
      previewContent += `  <cheat>\n`;
      previewContent += `    <desc>${cheat.description}</desc>\n`;
      previewContent += `    <code>${cheat.code}</code>\n`;
      previewContent += `    <enable>${cheat.enable}</enable>\n`;
      previewContent += `  </cheat>\n`;
    });
    previewContent += `</cheats>`;
    cheatPreview.textContent = previewContent;
  }

  // Clear Form Fields
  function clearFormFields() {
    document.getElementById("cheatDescription").value = "";
    document.getElementById("cheatCode").value = "";
    document.getElementById("cheatEnable").checked = false;
  }
});
