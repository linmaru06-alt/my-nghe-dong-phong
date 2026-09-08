// lib/auth-token.ts
// Module xử lý Token thuần túy bằng Web Crypto API tiêu chuẩn.
// Tương thích 100% với Next.js Edge Runtime (Middleware) & Node.js mà không cần thư viện bên thứ 3.

const SECRET_KEY_STRING =
  process.env.ADMIN_JWT_SECRET || "dongphong-artisan-woodcraft-secret-key-2026-verified";

export const ADMIN_COOKIE_NAME = "dongphong_admin_token";

function textToBuffer(text: string): any {
  return new TextEncoder().encode(text);
}

function bufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToText(base64Url: string): string {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return atob(base64);
}

async function getCryptoKey(): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    textToBuffer(SECRET_KEY_STRING),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface AdminPayload {
  email: string;
  role: "admin";
  exp: number; // Unix timestamp mili-giây
}

// Tạo JWT/HMAC Token hợp lệ
export async function createAdminToken(
  email: string = "admin@dongphong.vn"
): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const payload: AdminPayload = {
    email,
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 ngày
  };

  const headerB64 = bufferToBase64Url(textToBuffer(JSON.stringify(header)));
  const payloadB64 = bufferToBase64Url(textToBuffer(JSON.stringify(payload)));
  const dataToSign = `${headerB64}.${payloadB64}`;

  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textToBuffer(dataToSign)
  );
  const signatureB64 = bufferToBase64Url(signature);

  return `${dataToSign}.${signatureB64}`;
}

// Xác thực tính hợp lệ của Token
export async function verifyAdminToken(
  token: string | null | undefined
): Promise<{ valid: boolean; payload?: AdminPayload }> {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return { valid: false };
  }

  try {
    const [headerB64, payloadB64, signatureB64] = parts;
    const dataToVerify = `${headerB64}.${payloadB64}`;

    const key = await getCryptoKey();
    const signatureExpected = await crypto.subtle.sign(
      "HMAC",
      key,
      textToBuffer(dataToVerify)
    );
    const expectedB64 = bufferToBase64Url(signatureExpected);

    if (signatureB64 !== expectedB64) {
      return { valid: false };
    }

    const payloadJson = base64UrlToText(payloadB64);
    const payload: AdminPayload = JSON.parse(payloadJson);

    if (Date.now() > payload.exp) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}
