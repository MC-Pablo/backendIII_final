import dotenv from "dotenv";
import path from "path";

export const config = () => {
    const p = path.join(path.dirname(""),"src", ".env")
    dotenv.config(path.join(path.dirname(""),"src", ".env"));
};