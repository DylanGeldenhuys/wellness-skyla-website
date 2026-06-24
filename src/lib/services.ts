export type ServiceCategory = "Face" | "Body" | "Modality" | "Package";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMin: number;
  priceZar: number;
  description: string;
  isPackage: boolean;
};

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSO5-7SjEWnyvZ0NAhO-o3cUetvJkIRD913owCrl0PKkrb5UGpMzLJ6-mmzDWPznWHcfdzMz8hjhj-c/pub?output=csv";

function parseCSV(text: string): Record<string, string>[] {
  const normalized = text.trim().replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (ch === '"') {
      if (inQuotes && normalized[i + 1] === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      currentRow.push(currentField);
      currentField = "";
    } else if (ch === "\n" && !inQuotes) {
      currentRow.push(currentField);
      currentField = "";
      rows.push(currentRow);
      currentRow = [];
    } else {
      currentField += ch;
    }
  }
  currentRow.push(currentField);
  if (currentRow.some((f) => f)) rows.push(currentRow);

  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((row) =>
    Object.fromEntries(headers.map((h, i) => [h, (row[i] ?? "").trim()]))
  );
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const rows = parseCSV(await res.text());
    return rows
      .filter((row) => row.name)
      .map((row) => ({
        id: row.name.toLowerCase().replace(/\s+/g, "-"),
        name: row.name,
        category: row.category as ServiceCategory,
        durationMin: parseInt(row.duration, 10) || 60,
        priceZar: parseInt(row.price, 10) || 0,
        description: row.description,
        isPackage: row.special?.toLowerCase() === "true",
      }));
  } catch (err) {
    console.error("Could not load services from sheet:", err);
    return [];
  }
}
