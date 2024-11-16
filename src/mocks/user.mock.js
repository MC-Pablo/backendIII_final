import { fakerES_MX as faker } from "@faker-js/faker";
import { createHash } from "../utils/security.js";
import { USER } from "../constants/roles.constant.js";

export const generateUsersMock = async (amount) => {
  const users = [];
  for (let i = 0; i < amount; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: await createHash("coder123"),
      role: [USER],
      pets: [],
    };
    users.push(user);
  }

  return users;
};
