export interface NotaModel {
  produto: string;
  descricao: string;
  dataCompra: string;
  duracaoGarantia: string;
  statusGarantia: "Ativa" | "Expirada";
  tipoNota: string;
  loja: string;
  numeroNota: string;
  valor: string;
  observacoes: string;
  arquivo?: string | null;
}
