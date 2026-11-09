/** WhatsApp number in international format without + (e.g. "27821234567") */
export const WHATSAPP_NUMBER = "27761526274";

export const EMAIL = "goldenhilltreatments@gmail.com";

export const PHONE = "+27 76 152 6274";
export const PHONE_HREF = "+27761526274";

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const ADDRESS = {
  street: "Somerset West Central",
  suburb: "",
  city: "",
  province: "Western Cape",
  postalCode: "7130",
};

export const HOURS = {
  monday: "9am–6pm (mobile)",
  tuesday: "Closed",
  wednesday: "12pm–4pm",
  thursday: "9am–6pm (mobile)",
  friday: "9am–3pm (mobile)",
  saturday: "8am–12pm",
};

export const INSTAGRAM_HANDLE = "";

export const GOOGLE_MAPS_SRC =
  "https://www.google.com/maps?q=Goldenhill%20Close%2C%20Somerset%20West%2C%20Cape%20Town&output=embed";

export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/59oXNTqhrcYDDepN9";

export const SITE_URL = "https://wellnesswithskyla.co.za";
