import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./env";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mỹ Nghệ Đông Phong API",
      version: "1.0.0",
      description: "Tài liệu API chính thức cho website và ứng dụng di động Mỹ Nghệ Đông Phong",
      contact: {
        name: "Mỹ Nghệ Đông Phong",
        email: "dongphong.woodart@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api/v1`,
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/modules/**/*.ts", "./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
