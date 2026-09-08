import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/database";
import { env } from "../../config/env";
import { LoginInput, ChangePasswordInput } from "./auth.schema";

export class AuthService {
  static async login(input: LoginInput, userAgent?: string, ipAddress?: string) {
    const admin = await prisma.admin.findUnique({
      where: { email: input.email },
    });

    if (!admin) {
      throw {
        statusCode: 401,
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không chính xác.",
      };
    }

    const isMatch = await bcrypt.compare(input.password, admin.passwordHash);
    if (!isMatch) {
      throw {
        statusCode: 401,
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không chính xác.",
      };
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { adminId: admin.id, email: admin.email, role: admin.role },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
      { adminId: admin.id },
      env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    // Save session
    await prisma.adminSession.create({
      data: {
        adminId: admin.id,
        tokenHash: bcrypt.hashSync(refreshToken, 8),
        userAgent,
        ipAddress,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    // Update lastLoginAt
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        avatar: admin.avatar,
      },
      accessToken,
      refreshToken,
    };
  }

  static async getProfile(adminId: string) {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (!admin) {
      throw {
        statusCode: 404,
        code: "ADMIN_NOT_FOUND",
        message: "Không tìm thấy thông tin quản trị viên.",
      };
    }

    return admin;
  }

  static async changePassword(adminId: string, input: ChangePasswordInput) {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw {
        statusCode: 404,
        code: "ADMIN_NOT_FOUND",
        message: "Không tìm thấy thông tin quản trị viên.",
      };
    }

    const isMatch = await bcrypt.compare(input.currentPassword, admin.passwordHash);
    if (!isMatch) {
      throw {
        statusCode: 400,
        code: "INVALID_CURRENT_PASSWORD",
        message: "Mật khẩu hiện tại không đúng.",
      };
    }

    const newHash = await bcrypt.hash(input.newPassword, 10);
    await prisma.admin.update({
      where: { id: adminId },
      data: { passwordHash: newHash },
    });

    return { message: "Đổi mật khẩu thành công." };
  }
}
