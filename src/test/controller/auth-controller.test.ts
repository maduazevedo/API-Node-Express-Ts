import { describe, expect, test, jest } from "@jest/globals";
import request from "supertest";
import express, { json } from "express";
import { authController } from "../../controller/auth-controller";
import { ServerError } from "../../exceptions/server-error";
import bcrypt from "bcryptjs";

const server = express();
server.use(json());
authController(server);

jest.mock("../../service/auth-service", () => ({
  createUser: (name: string, email: string, cpf: string, password: string) => {
    if (email === "eduarda@gmail.com") {
      throw new ServerError("Email já cadastrado", 409);
    }

    if (cpf === "15500719475") {
      throw new ServerError("CPF já cadastrado", 409);
    }

    return { id: 1, name, email, cpf };
  },
  
  loginUser: (data: { email: string; password: string }) => {
    if (data.email === "eduarda@gmail.com" && data.password === "123456") {
      return {
        token: "fake-jwt-token",
        id: 1,
        name: "Eduarda",
        email: "eduarda@gmail.com",
        cpf: "15500719476",
        avatar: "avatar.png",
        xp: 100,
        level: 1,
        achievements: ["achievement1", "achievement2"],
      };
    } else if (data.email === "emailinexistente@gmail.com") {
      throw new ServerError("E4 - Usuário não encontrado", 404);
    } else if (data.password !== "123456") {
      throw new ServerError("E5 - Senha incorreta", 401);
    }
  },
}));

jest.mock("../../service/user-service", () => ({
  getUserByEmail: (email: string) => {
    if (email === "eduarda@gmail.com") {
      return {
        id: 1,
        name: "Eduarda",
        email,
        cpf: "15500719476",
        password: bcrypt.hashSync("123456", 10),
        avatar: "avatar.png",
        xp: 100,
        level: 1,
      };
    }
    return null;
  },
  getDeletedAtById: (id: number) => {
    if (id === 1) {
      return null;
    }
    return "2021-01-01";
  },
  getAchievementsById: (id: number) => {
    return ["achievement1", "achievement2"];
  },
}));

jest.mock("jsonwebtoken", () => ({
  sign: () => "fake-jwt-token",
}));

jest.mock("bcryptjs", () => ({
  compare: (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
  },
}));

describe("Auth Controller", () => {
  describe("POST /auth/register", () => {
    test("Should return 409 when email is already taken", async () => {
      const response = await request(server).post("/auth/register").send({
        name: "Eduarda",
        email: "eduarda@gmail.com",
        cpf: "15500719476",
        password: "123456",
      });

      expect(response.status).toBe(409);
      expect(response.body.error).toBe("Email já cadastrado");
    });

    test("Should return 409 when CPF is already taken", async () => {
      const response = await request(server).post("/auth/register").send({
        name: "Eduarda",
        email: "eduarda2@gmail.com",
        cpf: "15500719475",
        password: "123456",
      });

      expect(response.status).toBe(409);
      expect(response.body.error).toBe("CPF já cadastrado");
    });

    test("Should return 201 when user is successfully created", async () => {
      const response = await request(server).post("/auth/register").send({
        name: "Eduarda",
        email: "eduarda2@gmail.com",
        cpf: "15500719476",
        password: "123456",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Usuário criado com sucesso.");
    });
  });

  describe("POST /auth/sign-in", () => {
    test("Should return 200 and token when login is successful", async () => {
      const response = await request(server).post("/auth/sign-in").send({
        email: "eduarda@gmail.com",
        password: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe("fake-jwt-token");
      expect(response.body.name).toBe("Eduarda");
      expect(response.body.email).toBe("eduarda@gmail.com");
      expect(response.body.xp).toBe(100);
      expect(response.body.level).toBe(1);
      expect(response.body.achievements).toEqual(expect.arrayContaining(["achievement1", "achievement2"]));
    });

    test("Should return 404 when email is not registered", async () => {
      const response = await request(server).post("/auth/sign-in").send({
        email: "emailinexistente@gmail.com",
        password: "123456",
      });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("E4 - Usuário não encontrado");
    });

    test("Should return 401 when password is incorrect", async () => {
      const response = await request(server).post("/auth/sign-in").send({
        email: "eduarda@gmail.com",
        password: "senhaerrada",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("E5 - Senha incorreta");
    });
  });
});
