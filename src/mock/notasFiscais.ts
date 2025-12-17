import type { NotaModel } from "../types/NotaModel";

export const notasFiscais: NotaModel[] = [
  {
    produto: "Smartphone Samsung",
    descricao: "Galaxy A54 128GB",
    dataCompra: "10/01/2023",
    duracaoGarantia: "12 meses",
    statusGarantia: "Ativa",
    tipoNota: "Nota Fiscal Digital",
    loja: "Magazine Luiza",
    numeroNota: "NF-2023-001234",
    valor: "R$ 2.499,00",
    observacoes: "Garantia estendida por 6 meses",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+Samsung"
  },
  {
    produto: "Notebook Lenovo",
    descricao: "Ideapad 3i 8GB RAM",
    dataCompra: "22/02/2023",
    duracaoGarantia: "12 meses",
    statusGarantia: "Expirada",
    tipoNota: "Nota Fiscal Física",
    loja: "FastShop",
    numeroNota: "NF-2023-005678",
    valor: "R$ 3.199,00",
    observacoes: "Sem observações",
    arquivo: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    produto: "Fone Bluetooth JBL",
    descricao: "JBL Tune 510BT",
    dataCompra: "05/03/2023",
    duracaoGarantia: "6 meses",
    statusGarantia: "Expirada",
    tipoNota: "Nota Fiscal Digital",
    loja: "Submarino",
    numeroNota: "NF-2023-009876",
    valor: "R$ 299,00",
    observacoes: "Produto sem defeitos",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+JBL"
  },
  {
    produto: "TV LG",
    descricao: "Smart TV 50 polegadas",
    dataCompra: "18/05/2023",
    duracaoGarantia: "12 meses",
    statusGarantia: "Ativa",
    tipoNota: "Nota Fiscal Digital",
    loja: "Casas Bahia",
    numeroNota: "NF-2023-012345",
    valor: "R$ 2.799,00",
    observacoes: "Inclui suporte de parede",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+TV+LG"
  },
  {
    produto: "Geladeira Electrolux",
    descricao: "Frost Free 350L",
    dataCompra: "07/07/2023",
    duracaoGarantia: "12 meses",
    statusGarantia: "Ativa",
    tipoNota: "Nota Fiscal Física",
    loja: "Magazine Luiza",
    numeroNota: "NF-2023-016789",
    valor: "R$ 3.499,00",
    observacoes: "Entrega agendada",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+Geladeira"
  },
  {
    produto: "Air Fryer Mondial",
    descricao: "4L preta",
    dataCompra: "13/08/2023",
    duracaoGarantia: "6 meses",
    statusGarantia: "Expirada",
    tipoNota: "Nota Fiscal Digital",
    loja: "Americanas",
    numeroNota: "NF-2023-020123",
    valor: "R$ 399,00",
    observacoes: "Produto testado",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+AirFryer"
  },
  {
    produto: "Relógio Xiaomi",
    descricao: "Mi Band 7",
    dataCompra: "02/09/2023",
    duracaoGarantia: "12 meses",
    statusGarantia: "Ativa",
    tipoNota: "Nota Fiscal Digital",
    loja: "Amazon",
    numeroNota: "NF-2023-025678",
    valor: "R$ 249,00",
    observacoes: "Sem observações",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+Xiaomi"
  },
  {
    produto: "Ventilador Arno",
    descricao: "Turbo Silence 40cm",
    dataCompra: "28/10/2023",
    duracaoGarantia: "12 meses",
    statusGarantia: "Ativa",
    tipoNota: "Nota Fiscal Física",
    loja: "Leroy Merlin",
    numeroNota: "NF-2023-030123",
    valor: "R$ 199,00",
    observacoes: "Entrega realizada",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+Ventilador"
  },
  {
    produto: "Cafeteira Philips",
    descricao: "Expresso Automática",
    dataCompra: "15/11/2023",
    duracaoGarantia: "12 meses",
    statusGarantia: "Ativa",
    tipoNota: "Nota Fiscal Digital",
    loja: "FastShop",
    numeroNota: "NF-2023-035678",
    valor: "R$ 1.299,00",
    observacoes: "Inclui café grátis",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+Cafeteira"
  },
  {
    produto: "Console PlayStation 5",
    descricao: "Edição com leitor",
    dataCompra: "25/11/2023",
    duracaoGarantia: "12 meses",
    statusGarantia: "Ativa",
    tipoNota: "Nota Fiscal Digital",
    loja: "Americanas",
    numeroNota: "NF-2023-040123",
    valor: "R$ 4.499,00",
    observacoes: "Entrega em 7 dias",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+PS5"
  },
  {
    produto: "Macbook Air",
    descricao: "M1 256GB",
    dataCompra: "25/11/2022",
    duracaoGarantia: "13 meses",
    statusGarantia: "Ativa",
    tipoNota: "Nota Fiscal Física",
    loja: "Apple Store",
    numeroNota: "NF-2022-050123",
    valor: "R$ 9.499,00",
    observacoes: "Produto sem danos",
    arquivo: "https://via.placeholder.com/300x200.png?text=Nota+Macbook"
  }
];

export default notasFiscais;
