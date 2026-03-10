import type { BandeiraId } from "./cards-types";

export interface CartaoCredito {
  numero: string;
  bandeira: string;
  cvv: string;
  validade: string;
  nomeTitular: string;
}

const BIN_PREFIXES: Record<BandeiraId, number[][]> = {
  visa: [[4]],
  mastercard: [[51], [52], [53], [54], [55]],
  amex: [[34], [37]],
  elo: [[636368], [438935], [504175], [451416], [636297]],
  hipercard: [[38], [60]],
  discover: [[6011], [65], [644], [645], [646], [647], [648], [649]],
  jcb: [[35]],
};

const CARD_LENGTHS: Record<BandeiraId, number> = {
  visa: 16,
  mastercard: 16,
  amex: 15,
  elo: 16,
  hipercard: 16,
  discover: 16,
  jcb: 16,
};

const CVV_LENGTHS: Record<BandeiraId, number> = {
  visa: 3,
  mastercard: 3,
  amex: 4,
  elo: 3,
  hipercard: 3,
  discover: 3,
  jcb: 3,
};

function luhnCheckDigit(digits: number[]): number {
  let sum = 0;
  let alternate = true;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = digits[i];
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return (10 - (sum % 10)) % 10;
}

function gerarNumeroCartao(bandeira: BandeiraId): string {
  const selectedPrefix = BIN_PREFIXES[bandeira][
    Math.floor(Math.random() * BIN_PREFIXES[bandeira].length)
  ];
  const digits = selectedPrefix[0].toString().split("").map(Number);
  const length = CARD_LENGTHS[bandeira];

  while (digits.length < length - 1) {
    digits.push(Math.floor(Math.random() * 10));
  }
  digits.push(luhnCheckDigit(digits));
  return digits.join("");
}

function formatarNumero(numero: string, bandeira: BandeiraId): string {
  if (bandeira === "amex") {
    return numero.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
  }
  return numero.replace(/(\d{4})/g, "$1 ").trim();
}

function gerarValidade(): string {
  const mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const ano = new Date().getFullYear() + Math.floor(Math.random() * 8) + 1;
  return `${mes}/${ano}`;
}

function gerarCVV(bandeira: BandeiraId): string {
  const len = CVV_LENGTHS[bandeira];
  let cvv = "";
  for (let i = 0; i < len; i++) {
    cvv += Math.floor(Math.random() * 10);
  }
  return cvv;
}

export function formatarNomeCartao(nomeCompleto: string): string {
  const parts = nomeCompleto.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1][0]} ${parts[parts.length - 1]}`.toUpperCase();
  }
  return nomeCompleto.toUpperCase();
}

export const BANDEIRAS: { id: BandeiraId; nome: string }[] = [
  { id: "visa", nome: "Visa" },
  { id: "mastercard", nome: "Mastercard" },
  { id: "amex", nome: "Amex" },
  { id: "elo", nome: "Elo" },
  { id: "hipercard", nome: "Hipercard" },
  { id: "discover", nome: "Discover" },
  { id: "jcb", nome: "JCB" },
];

export function gerarCartaoPorBandeira(
  bandeira: BandeiraId,
  nomeCompleto: string,
  comMascara = true
): CartaoCredito {
  const numero = gerarNumeroCartao(bandeira);

  return {
    numero: comMascara ? formatarNumero(numero, bandeira) : numero,
    bandeira: BANDEIRAS.find((b) => b.id === bandeira)?.nome ?? bandeira,
    cvv: gerarCVV(bandeira),
    validade: gerarValidade(),
    nomeTitular: formatarNomeCartao(nomeCompleto),
  };
}
