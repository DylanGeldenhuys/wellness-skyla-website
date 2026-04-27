export type ServiceCategory = "Face" | "Body" | "Modality" | "Package";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMin: number;
  priceZar: number;
  description: string; // TODO: replace with real copy from Skyla
  isPackage: boolean;
};

export const services: Service[] = [
  // ── Individual rituals ────────────────────────────────────────────
  {
    id: "face-drainage-30",
    name: "Face Drainage Massage",
    category: "Face",
    durationMin: 30,
    priceZar: 250,
    description:
      "TODO: A gentle, targeted treatment to release tension and encourage lymphatic flow across the face and décolletage.",
    isPackage: false,
  },
  {
    id: "lymphatic-90",
    name: "Lymphatic Drainage Massage",
    category: "Body",
    durationMin: 90,
    priceZar: 680,
    description:
      "TODO: A slow, rhythmic full-body treatment that supports the lymphatic system, reduces puffiness, and leaves you feeling deeply clear.",
    isPackage: false,
  },
  {
    id: "aroma-60",
    name: "Aroma Oil Massage",
    category: "Body",
    durationMin: 60,
    priceZar: 600,
    description:
      "TODO: A nourishing blend of therapeutic oils worked into tired muscles — warming, grounding, and wholly restorative.",
    isPackage: false,
  },
  {
    id: "therapi-30",
    name: "Therapi Machine Session",
    category: "Modality",
    durationMin: 30,
    priceZar: 200,
    description:
      "TODO: Advanced therapeutic technology to support recovery, circulation, and deep tissue relief.",
    isPackage: false,
  },
  {
    id: "thai-120",
    name: "Thai Massage",
    category: "Body",
    durationMin: 120,
    priceZar: 750,
    description:
      "TODO: An ancient practice of guided stretching and acupressure that opens the body and restores energetic flow.",
    isPackage: false,
  },

  // ── Packages ──────────────────────────────────────────────────────
  {
    id: "pkg-aroma-face-90",
    name: "Aroma Oil + Face Drainage",
    category: "Package",
    durationMin: 90,
    priceZar: 750,
    description:
      "TODO: A full-body oil massage followed by a targeted face drainage ritual — the perfect head-to-toe reset.",
    isPackage: true,
  },
  {
    id: "pkg-lymphatic-face-120",
    name: "Lymphatic + Face Drainage",
    category: "Package",
    durationMin: 120,
    priceZar: 850,
    description:
      "TODO: Deep lymphatic work paired with a face drainage massage — profound detoxification from crown to sole.",
    isPackage: true,
  },
  {
    id: "pkg-aroma-therapi-95",
    name: "Aroma Oil + Therapi",
    category: "Package",
    durationMin: 95,
    priceZar: 750,
    description:
      "TODO: Therapeutic oils meet advanced Therapi technology for an experience that works on both surface and cellular levels. Includes ~5 min setup time.",
    isPackage: true,
  },
  {
    id: "pkg-face-therapi-65",
    name: "Face Massage + Therapi",
    category: "Package",
    durationMin: 65,
    priceZar: 450,
    description:
      "TODO: A focused facial treatment enhanced with Therapi — ideal when you want targeted renewal without a full-body session. Includes ~5 min setup time.",
    isPackage: true,
  },
];

export const rituals = services.filter((s) => !s.isPackage);
export const packages = services.filter((s) => s.isPackage);
