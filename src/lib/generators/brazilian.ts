import {
  nome,
  email,
  celular,
  telefone,
  dataNascimento,
  genero,
  endereco,
  cpf,
  cnpj,
  rg,
  cnh,
  pis,
  cns,
  tituloEleitor,
  passaporte,
  profissao,
  escolaridade,
} from "gerador-br";

export interface DadosPessoa {
  nomeCompleto: string;
  email: string;
  telefone: string;
  celular: string;
  dataNascimento: string;
  sexo: string;
  nomeMae: string;
  nomePai: string;
  profissao: string;
  escolaridade: string;
}

export interface DadosDocumentos {
  cpf: string;
  cnpj: string;
  rg: string;
  cnh: string;
  pis: string;
  cns: string;
  tituloEleitor: string;
  passaporte: string;
}

export interface DadosEndereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  enderecoCompleto: string;
}

export interface PessoaCompleta {
  pessoa: DadosPessoa;
  documentos: DadosDocumentos;
  endereco: DadosEndereco;
}

const COMPLEMENTOS: string[] = [
  "Apto 101", "Apto 202", "Apto 305", "Sala 105", "Sala 210", "Bloco A",
  "Bloco B", "Casa 1", "Casa 2", "Loja 3", "Galpão 5", "Sobrado",
  "Fundos", "Cobertura", "Conj 401", "Edifício Centro", "Lote 15",
];

function gerarComplemento(): string {
  return COMPLEMENTOS[Math.floor(Math.random() * COMPLEMENTOS.length)];
}

export function gerarPessoaCompleta(comMascara = true): PessoaCompleta {
  const nomeCompleto = nome.aleatorioCompleto();
  const nomeMae = nome.maeCompleto();
  const nomePai = nome.paiCompleto();

  const end = endereco(comMascara);
  const complemento = end.complemento?.trim() || gerarComplemento();
  const enderecoCompleto = `${end.logradouro}, ${end.numero} - ${complemento} - ${end.bairro}, ${end.localidade}/${end.estado}`;

  return {
    pessoa: {
      nomeCompleto,
      email: email(nomeCompleto),
      telefone: telefone(comMascara),
      celular: celular(comMascara),
      dataNascimento: dataNascimento(),
      sexo: genero() ?? "Não informado",
      nomeMae,
      nomePai,
      profissao: profissao(),
      escolaridade: escolaridade(),
    },
    documentos: {
      cpf: cpf(comMascara),
      cnpj: cnpj(comMascara),
      rg: rg(comMascara),
      cnh: cnh(),
      pis: pis(comMascara),
      cns: cns(comMascara),
      tituloEleitor: tituloEleitor(comMascara),
      passaporte: passaporte(),
    },
    endereco: {
      cep: end.cep,
      logradouro: end.logradouro,
      numero: end.numero,
      complemento,
      bairro: end.bairro,
      cidade: end.localidade,
      estado: end.estado,
      enderecoCompleto,
    },
  };
}
