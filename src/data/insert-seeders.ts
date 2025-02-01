import "dotenv/config";
import { CategoryDB, db, RoleDB, UserDB } from "../config";

import {
  aSeeds,
  bSeeds,
  categoriesSeeds,
  rolesSeeds,
  userSeeds,
} from "./seeders";

const eject = async () => {
  await db
    .authenticate()
    .then(() => {
      console.log("Conexión exitosa a la base de datos");
    })
    .catch((error: any) => {
      console.log("No se pudo conectar a la base de datos");
    });
  insertSeeders();
};

async function insertSeeders() {
  //insertar los seeds en orden de jerarquia, estar pendiente de las relaciones
  const models = {
    roles: "roles",
    users: "users",
    categories: "categories",
  };

  //NIVEL 1
  try {
    console.log(`Insertando seeds de : ${models.roles}`);
    const result = await RoleDB.bulkCreate(rolesSeeds, {
      ignoreDuplicates: true,
      validate: true,
    });
    console.log(`Registros insertado exitosamente de ${models.roles}`);
  } catch (error) {
    console.error(`Error al insertar registros de ${models.roles}:`, error);
  }
  try {
    console.log(`Insertando seeds de : ${models.categories}`);
    const result = await CategoryDB.bulkCreate(categoriesSeeds, {
      ignoreDuplicates: true,
      validate: true,
    });
    console.log(`Registros insertado exitosamente de ${models.categories}`);
  } catch (error) {
    console.error(
      `Error al insertar registros de ${models.categories}:`,
      error
    );
  }
  //NIVEL 2
  try {
    console.log(`Insertando seeds de : ${models.users}`);
    const result = await UserDB.bulkCreate(userSeeds, {
      ignoreDuplicates: true,
      validate: true,
    });
    console.log(`Registros insertado exitosamente de ${models.users}`);
  } catch (error) {
    console.error(`Error al insertar registros de ${models.users}:`, error);
  }
  //NIVEL 3
}
eject();
