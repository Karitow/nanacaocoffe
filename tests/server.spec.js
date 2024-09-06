const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200 y un arreglo con objeto", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        const cafes = response.body;
        expect(status).toBe(200);
        expect(Array.isArray(cafes)).toBe(true);
        expect(cafes.length).toBeGreaterThan(0);
        });

    it("Retornando 404 eliminando café ", async () => {
        const idCafe = 999;
        const jwt = ' token';
        const { statusCode, body } = await request(server).delete(`/cafes/${idCafe}`).set("Authorization", jwt).send();
        console.log(body);
        expect(statusCode).toBe(404);
      });

    it("Agregando un cafe y retorna un 201", async () =>{
        const nuevoCafe = { id: 5, nombre: "Irlandés" };
        const response = await request(server).post("/cafes").send(nuevoCafe);                
        const status = response.statusCode;           
        const cafe = response.body;
        expect(status).toBe(201);
        expect(cafe).toContainEqual(nuevoCafe);
    });

    it("Retorna un 400 ", async () => {
        const cafeActualizado = { id: 6, nombre: "Latte" }; 
        const response = await request(server).put("/cafes/5").send(cafeActualizado);
        const status = response.statusCode;
        const body = response.body;
        expect(status).toBe(400);
        expect(body).toEqual({ message: "El id del parámetro no coincide con el id del café recibido" });
    });
});

