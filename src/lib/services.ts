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

const HARDCODED_SERVICES: Service[] = [
  {
    id: "reflexology",
    name: "Reflexology",
    category: "Body",
    durationMin: 45,
    priceZar: 300,
    description: "Targeted pressure applied to reflex points on the feet to promote relaxation and restore balance throughout the body.",
    isPackage: false,
  },
];

function applyOverrides(services: Service[]): Service[] {
  const filtered = services
    .filter((s) => !s.name.toLowerCase().includes("theraphi"))
    .map((s) => {
      if (s.name.toLowerCase().includes("back massage")) {
        return { ...s, durationMin: 45, priceZar: 400 };
      }
      return s;
    });

  const sheetIds = new Set(filtered.map((s) => s.id));
  const extras = HARDCODED_SERVICES.filter((s) => !sheetIds.has(s.id));
  return [...filtered, ...extras];
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const rows = parseCSV(await res.text());
    const services = rows
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
    return applyOverrides(services);
  } catch (err) {
    console.error("Could not load services from sheet:", err);
    return [];
  }
}
