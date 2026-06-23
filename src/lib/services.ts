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

function parseCSVRow(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().replace(/\r/g, "").split("\n");
  if (lines.length < 2) return [];
  const headers = parseCSVRow(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = parseCSVRow(line);
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] ?? "").trim()]));
  });
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
        priceZar: parseInt(row.price, 10),
        description: row.description,
        isPackage: row.special?.toLowerCase() === "true",
      }));
  } catch (err) {
    console.error("Could not load services from sheet:", err);
    return [];
  }
}
