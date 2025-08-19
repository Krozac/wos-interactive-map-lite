export function exportLiteData() {
  try {
    const users = JSON.parse(localStorage.getItem('lite_users') || '[]');
    const guilds = JSON.parse(localStorage.getItem('lite_guilds') || '[]');
    const buildings = JSON.parse(localStorage.getItem('lite_buildings') || '[]');

    const combined = { users, guilds, buildings };
    const jsonStr = JSON.stringify(combined, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lite_data.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error exporting data:', err);
  }
}


export function importLiteData(file, onComplete) {
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const data = JSON.parse(event.target.result);

      if (data.users) localStorage.setItem('lite_users', JSON.stringify(data.users));
      if (data.guilds) localStorage.setItem('lite_guilds', JSON.stringify(data.guilds));
      if (data.buildings) localStorage.setItem('lite_buildings', JSON.stringify(data.buildings));

      if (onComplete) onComplete(true, data);
    } catch (err) {
      console.error('Error importing data:', err);
      if (onComplete) onComplete(false, err);
    }
  };
  reader.readAsText(file);
}
