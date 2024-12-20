import bcryptjs from "bcryptjs";

// Crea un hash de una contraseña proporcionada
export const createHash = (password) => {
  // Genera un salt (por defecto es 10 rounds)
  const salt = bcryptjs.genSaltSync();
  // Crea un hash de la contraseña usando la salt
  return bcryptjs.hashSync(String(password), salt);
};

// Verifica si una contraseña proporcionada es válida para un usuario
export const isValidPassword = (password, hash) => {
  
  if (!password || !hash) {
    throw new Error("Password o Hash son undefined en isValidPassword");
  }
  // Convierte el tipo de dato de la contraseña en String (requerido para hash)
  // Compara la contraseña hasheada del usuario con la contraseña proporcionada
  return bcryptjs.compareSync(String(password), hash);
};
