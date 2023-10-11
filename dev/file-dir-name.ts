import { fileURLToPath } from 'url';
import { dirname } from 'path';
//@ts-ignore
export default function fileDirName(meta) {
  const __filename = fileURLToPath(meta.url);

  const __dirname = dirname(__filename);

  return { __dirname, __filename };
}
