import crypto from "crypto";

export function generateSignature(params: Record<string, string>, passphrase: string): string {
  const entries = Object.entries(params).filter(([, v]) => v !== "");
  if (passphrase) entries.push(["passphrase", passphrase]);
  const str = entries
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`)
    .join("&");
  return crypto.createHash("md5").update(str).digest("hex");
}
