import path, { dirname } from "path";
import { fileURLToPath } from "url";

export function getAbsolutePath(source, destination) {
  const __dirname = dirname(fileURLToPath(source));
  const absolutePath = path.resolve(__dirname, destination)
  return absolutePath;
}