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

export const services: Service[] = [
  // ── Individual treatments ─────────────────────────────────────────
  {
    id: "face-drainage-30",
    name: "Face drainage massage",
    category: "Face",
    durationMin: 30,
    priceZar: 250,
    description:
      "A gentle, rhythmic facial drainage massage designed to support the body's natural detox process. This treatment helps reduce puffiness, improve circulation, and leave your skin looking refreshed, lifted, and radiant.",
    isPackage: false,
  },
  {
    id: "lymphatic-90",
    name: "Lymphatic Massage",
    category: "Body",
    durationMin: 90,
    priceZar: 680,
    description:
      "The lymphatic massage is designed to activate the lymphatic system, assisting in the removal of excess fluid and metabolic waste. It supports reduced inflammation, improved circulation, and a more defined, radiant complexion.",
    isPackage: false,
  },
  {
    id: "aroma-60",
    name: "Aroma Oil Massage",
    category: "Body",
    durationMin: 60,
    priceZar: 600,
    description:
      "A gentle, relaxation-focused massage designed to ease muscular tension and calm the body, enhanced with aromatherapy using essential oils.",
    isPackage: false,
  },
  {
    id: "therapi-30",
    name: "Theraphi Session",
    category: "Modality",
    durationMin: 30,
    priceZar: 200,
    description:
      "This advanced frequency therapy uses targeted energy patterns to support the body's natural processes, assisting with circulation, relaxation, and overall system balance. Setup time is still being tested.",
    isPackage: false,
  },

  // ── Bundled treatments ────────────────────────────────────────────
  {
    id: "pkg-aroma-face-90",
    name: "Aroma oil + Face Drainage massage",
    category: "Package",
    durationMin: 90,
    priceZar: 750,
    description:
      "A full-body aroma oil massage paired with a face drainage massage. Full description to be confirmed.",
    isPackage: true,
  },
  {
    id: "pkg-lymphatic-face-120",
    name: "Lymphatic + Face Drainage massage",
    category: "Package",
    durationMin: 120,
    priceZar: 850,
    description:
      "A lymphatic massage paired with a face drainage massage. Full description to be confirmed.",
    isPackage: true,
  },
  {
    id: "pkg-aroma-therapi-95",
    name: "Theraphi + Aroma Oil massage",
    category: "Package",
    durationMin: 95,
    priceZar: 750,
    description:
      "Aroma oil massage paired with a Theraphi session. Includes about 5 min setup time. Full description to be confirmed.",
    isPackage: true,
  },
  {
    id: "pkg-face-therapi-65",
    name: "Theraphi + Face massage",
    category: "Package",
    durationMin: 65,
    priceZar: 450,
    description:
      "Face massage paired with a Theraphi session. Includes about 5 min setup time. Full description to be confirmed.",
    isPackage: true,
  },
];

export const rituals = services.filter((s) => !s.isPackage);
export const packages = services.filter((s) => s.isPackage);
