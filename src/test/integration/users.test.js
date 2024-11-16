import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/users");

describe("Test de integración Users", () => {
    let test_user;
    it("[GET] /api/users - Debe devolver un array de usuarios", async () => {
      const { status, body } = await request.get("/");
      expect(status).to.be.equal(200);
      expect(body.payload.docs).to.be.an("array");
    });
  
    it("[POST] /api/users - Debe crear un nuevo usuario", async () => {
      const newUser = {
        name: "Juan",
        surname: "PÉREZ",
        email: "test@test.com",
        password: "coder123"
      };
      const { status, body } = await request.post("/").send(newUser);
      test_user = body.payload;
      expect(status).to.be.equal(201);
      expect(body.payload).to.be.an("object");
      expect(body.payload.name).to.be.equal("JUAN");
      expect(body.payload.surname).to.be.equal("PÉREZ");
      expect(body.payload.email).to.be.equal("test@test.com");
    });

    it("[GET] /api/users/:id - Debe devolver un usuario", async () => {
        const {status, body} = await request.get(`/${test_user.id}`);

        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("JUAN");
        expect(body.payload.surname).to.be.equal("PÉREZ");
        expect(body.payload.email).to.be.equal("test@test.com");
        expect(body.payload.roles).to.be.an("array");
    });

    it("[PUT] /api/users/update/:id - Debe actualizar un usuario", async () => {
      const newUser = {
        surname: "GONZÁLEZ",
      };
  
      const { status, body } = await request.put(`/update/${test_user.id}`).send(newUser);
  
      expect(status).to.be.equal(200);
      expect(body.payload).to.be.an("object");
      expect(body.payload.name).to.be.equal("JUAN");
      expect(body.payload.surname).to.be.equal("GONZÁLEZ");
      expect(body.payload.email).to.be.equal("test@test.com");
      expect(body.payload.roles).to.be.an("array");
    });
  
    it("[DELETE] /api/users/delete/:id - Debe eliminar un usuario", async () => {
        const { status, body } = await request.delete(`/delete/${test_user.id}`);
        
      expect(status).to.be.equal(200);
      expect(body.payload).to.be.an("object");
      expect(body.payload.id).to.be.equal(test_user.id)
    });
  });