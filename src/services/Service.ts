import type { NotaModel } from "../types/NotaModel";
import { notasFiscais } from "../mock/notasFiscais";

const STORAGE_KEY = "notas_fiscais";

export function carregarNotas(): NotaModel[] {
  const storage = localStorage.getItem(STORAGE_KEY);

  if (storage) {
    return JSON.parse(storage) as NotaModel[];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(notasFiscais));
  return notasFiscais;
}

export function salvarNotas(novasNotas: NotaModel[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(novasNotas));
}
