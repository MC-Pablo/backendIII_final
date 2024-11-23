import { expect } from "chai";
import supertest from "supertest";

const petRequest = supertest("http://localhost:8080/api/pets");
const userRequest = supertest("http://localhost:8080/api/users");
const adoptionRequest = supertest("http://localhost:8080/api/adoptions");

describe("Test de integración de Adoptions", () => {
    let user;
    let pet;
    let adoption;

    it("[POST] /api/pets - Debe crear una nueva mascota", async () => {
        const newPet = {
          name: "Pet Test",
          specie: "Gato",
          birthDate: "10/10/2023",
          image: "fdasfadsfa",
        };

        const { status, body } = await petRequest.post("/").send(newPet);
    
        pet = body.payload;
        
        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("Pet Test");
        expect(body.payload.specie).to.be.equal("Gato");
        expect(body.payload.adopted).to.be.equal(false);
    });

    it("[POST] /api/users - Debe crear un nuevo usuario", async () => {
        const newUser = {
          name: "Juan",
          surname: "PÉREZ",
          email: "test@test.com",
          password: "coder123"
        };

        const { status, body } = await userRequest.post("/").send(newUser);
        
        user = body.payload;

        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("JUAN");
        expect(body.payload.surname).to.be.equal("PÉREZ");
        expect(body.payload.email).to.be.equal("test@test.com");
    });

    it("[POST] /api/adoptions - Debe crear una nueva adopción", async () => {
        
        const newAdoption = {
            oid: user.id,
            pid: pet.id
        };
        const { status, body } = await adoptionRequest.post("/").send(newAdoption);
        
        adoption = body.payload
        
        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload.owner).to.be.equal(user.id);
        expect(body.payload.pet).to.be.equal(pet.id);
    });


    it("[GET] /api/users/:uid - Debe retornar el usuario modificado con la nueva mascota cargada", async () => {
        
        const {status, body} = await userRequest.get(`/${user.id}`);
    
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.pets[0]).to.be.equal(pet.id);
    });

    it("[GET] /api/pets/:pid - Debe retornar la mascota modificada con adopted true y con el owner cargado", async () => {

        const { status, body } = await petRequest.get(`/${pet.id}`);
        
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("Pet Test");
        expect(body.payload.adopted).to.be.equal(true);
        expect(body.payload.owner.id).to.be.equal(user.id);
        
    });

    it("[GET] /api/adoptions/:aid - Debe retornar la adopción creada", async () => {

        const { status, body } = await adoptionRequest.get(`/${adoption.id}`);

        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.id).to.be.equal(adoption.id);
        expect(body.payload.owner.id).to.be.equal(user.id);
        expect(body.payload.pet.id).to.be.equal(pet.id);
    });

    it("[DELETE] /api/adoptions/:aid - Debe eliminar la adopción creada", async () => {

        const { status, body } = await adoptionRequest.delete(`/${adoption.id}`);

        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.id).to.be.equal(adoption.id);
    });

    it("[GET] /api/users/:uid - Debe retornar el usuario con el array de mascotas vacío", async () => {

        const {status, body} = await userRequest.get(`/${user.id}`);

        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.pets.length).to.be.equal(0);
    });

    it("[GET] /api/pets/:pid - Debe retornar la mascota modificada con adopted false y sin owner", async () => {

        const { status, body } = await petRequest.get(`/${pet.id}`);
        
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("Pet Test");
        expect(body.payload.adopted).to.be.equal(false);
        expect(body.payload.owner).to.be.equal(null);
        
    });

    it("[DELETE] /api/pets/:pid - Debe eliminar una mascota", async () => {

        const { status, body } = await petRequest.delete(`/${pet.id}`);
        
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.id).to.be.equal(pet.id)
      });

      it("[DELETE] /api/users/:uid - Debe eliminar un usuario", async () => {

        const { status, body } = await userRequest.delete(`/${user.id}`);
        
      expect(status).to.be.equal(200);
      expect(body.payload).to.be.an("object");
      expect(body.payload.id).to.be.equal(user.id)
    });
})