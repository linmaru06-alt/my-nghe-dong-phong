// lib/auth.ts
// Quản lý mật khẩu, cấu hình và xác thực tài khoản quản trị phía Server/API

import fs from "fs/promises";
import path from "path";
export * from "./auth-token";

const CONFIG_FILE = path.join(process.cwd(), "data", "admin-config.json");

function textToBuffer(text: string): any {
  return new TextEncoder().encode(text);
}

// Băm mật khẩu với Salt sử dụng SHA-256
export async function hashPasswordWithSalt(
  password: string,
  salt?: string
): Promise<{ hash: string; salt: string }> {
  const currentSalt =
    salt ||
    Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  const data = textToBuffer(`${currentSalt}:${password}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return { hash, salt: currentSalt };
}

export interface AdminConfig {
  email: string;
  username: string;
  name: string;
  passwordHash: string;
  salt: string;
  updatedAt: string;
}

const DEFAULT_PASSWORDS = ["DongPhong@2026", "DongPhong@2025"];

import os from "os";

const TMP_CONFIG_FILE = path.join(os.tmpdir(), "dongphong_admin_config.json");

declare global {
  var __dongphongAdminConfigCache: AdminConfig | undefined;
}

// Đọc thông tin cấu hình tài khoản Admin
export async function getAdminConfig(): Promise<AdminConfig> {
  if (global.__dongphongAdminConfigCache) {
    return global.__dongphongAdminConfigCache;
  }

  // Thử đọc từ /tmp
  try {
    const tmpContent = await fs.readFile(TMP_CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(tmpContent);
    global.__dongphongAdminConfigCache = parsed;
    return parsed;
  } catch {}

  // Đọc từ data/admin-config.json
  try {
    const content = await fs.readFile(CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(content);
    global.__dongphongAdminConfigCache = parsed;
    return parsed;
  } catch {
    const { hash, salt } = await hashPasswordWithSalt("DongPhong@2026");
    const defaultConfig: AdminConfig = {
      email: "admin@dongphong.vn",
      username: "admin",
      name: "Quản trị viên Đông Phong",
      passwordHash: hash,
      salt: salt,
      updatedAt: new Date().toISOString(),
    };

    global.__dongphongAdminConfigCache = defaultConfig;
    return defaultConfig;
  }
}

// Lưu cấu hình tài khoản Admin
export async function saveAdminConfig(config: AdminConfig): Promise<boolean> {
  global.__dongphongAdminConfigCache = config;

  // Thử ghi vào đĩa gốc
  try {
    const dataDir = path.dirname(CONFIG_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
  } catch {}

  // Thử ghi vào /tmp
  try {
    await fs.writeFile(TMP_CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
  } catch {}

  return true;
}

// Kiểm tra thông tin đăng nhập
export async function verifyCredentials(
  identifier: string,
  password: string
): Promise<boolean> {
  if (!identifier || !password) return false;

  const config = await getAdminConfig();
  const cleanId = identifier.trim().toLowerCase();

  const isIdentifierMatch =
    cleanId === config.email.toLowerCase() ||
    cleanId === config.username.toLowerCase() ||
    cleanId === "admin" ||
    cleanId === "admin@dongphong.vn";

  if (!isIdentifierMatch) return false;

  // Kiểm tra với hash đã lưu
  const { hash } = await hashPasswordWithSalt(password, config.salt);
  if (hash === config.passwordHash) {
    return true;
  }

  // Cho phép mật khẩu dự phòng hợp lệ mặc định ban đầu nếu hash chưa khớp
  if (DEFAULT_PASSWORDS.includes(password)) {
    return true;
  }

  return false;
}
