import { importLiteData,exportLiteData } from "../../utils/liteDataUtils";

export function DataPanel() {
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importLiteData(file, (success, result) => {
        if (success) {
          alert('Data imported successfully!');
          window.location.reload(); // optional: reload to re-fetch from localStorage
        } else {
          alert('Failed to import data: ' + result);
        }
      });
    }
  };

  return (
    <div>
      <button onClick={exportLiteData}>Export Data</button>
      <input type="file" accept=".json" onChange={handleImport} />
    </div>
  );
}
