import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { swaggerDocs } from "./swagger-docs";

const swaggerSpec = {
    openapi: "3.0.0",
    info: {
    title: "API Sysmap",
    version: "1.0.0",
    description: "Documentação da API usando Swagger e Prisma",
    },
    servers: [{ url: "http://localhost:3000" }],
    paths: swaggerDocs.paths,
    components: {
    securitySchemes: {
        bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
            },
        },
    },
};

export function setupSwagger(app: Express) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
