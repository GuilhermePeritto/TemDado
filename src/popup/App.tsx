import { useState, useCallback, useEffect, useRef } from "react";
import { CategoryTabs, type Category } from "@/components/CategoryTabs";
import { DataField } from "@/components/DataField";
import { FormatToggle } from "@/components/FormatToggle";
import { CardBrandIcon } from "@/components/CardBrandIcons";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { gerarPessoaCompleta, type PessoaCompleta } from "@/lib/generators/brazilian";
import {
  gerarCartaoPorBandeira,
  BANDEIRAS,
  type BandeiraId,
  type CartaoCredito,
} from "@/lib/generators/cards";
import { RefreshCw } from "lucide-react";
import { CardDataDisplay } from "@/components/CardDataDisplay";

function App() {
  const [category, setCategory] = useState<Category>("pessoa");
  const [comMascara, setComMascara] = useState(true);
  const [bandeiraSelecionada, setBandeiraSelecionada] = useState<BandeiraId>("visa");
  const { copy, isCopied } = useCopyToClipboard();

  const initialState = (() => {
    const d = gerarPessoaCompleta(true);
    return {
      dados: d,
      cartao: gerarCartaoPorBandeira("visa", d.pessoa.nomeCompleto, true),
    };
  })();
  const [dados, setDados] = useState<PessoaCompleta>(initialState.dados);
  const [cartao, setCartao] = useState<CartaoCredito>(initialState.cartao);

  const formatChanged = useRef(false);
  useEffect(() => {
    if (!formatChanged.current) {
      formatChanged.current = true;
      return;
    }
    const novo = gerarPessoaCompleta(comMascara);
    setDados(novo);
    setCartao(gerarCartaoPorBandeira(bandeiraSelecionada, novo.pessoa.nomeCompleto, comMascara));
  }, [comMascara]);

  const gerarTudo = useCallback(() => {
    const novo = gerarPessoaCompleta(comMascara);
    setDados(novo);
    setCartao(gerarCartaoPorBandeira(bandeiraSelecionada, novo.pessoa.nomeCompleto, comMascara));
  }, [comMascara, bandeiraSelecionada]);

  const trocarBandeira = useCallback(
    (b: BandeiraId) => {
      setBandeiraSelecionada(b);
      setCartao(gerarCartaoPorBandeira(b, dados.pessoa.nomeCompleto, comMascara));
    },
    [dados.pessoa.nomeCompleto, comMascara]
  );

  return (
    <div className="flex h-[560px] w-[420px] flex-col overflow-hidden rounded-3xl bg-background shadow-2xl">
      <header className="border-b border-white/5 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Tem Dado?
            </h1>
            <p className="text-xs text-muted-foreground">
              Gerador de dados fictícios
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Máscara</span>
              <FormatToggle comMascara={comMascara} onChange={setComMascara} />
            </div>
            <button
              type="button"
              onClick={gerarTudo}
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/15 hover:text-accent-purple"
            >
              <RefreshCw className="h-4 w-4" />
              Gerar
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4">
        <div className="shrink-0">
          <CategoryTabs active={category} onSelect={setCategory} />
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
          {category === "pessoa" && (
            <div className="flex flex-col gap-2">
                <DataField
                  label="Nome completo"
                  value={dados.pessoa.nomeCompleto}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.nomeCompleto)}
                />
                <DataField
                  label="E-mail"
                  value={dados.pessoa.email}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.email)}
                />
                <DataField
                  label="Telefone"
                  value={dados.pessoa.telefone}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.telefone)}
                />
                <DataField
                  label="Celular"
                  value={dados.pessoa.celular}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.celular)}
                />
                <DataField
                  label="Data de nascimento"
                  value={dados.pessoa.dataNascimento}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.dataNascimento)}
                />
                <DataField
                  label="Sexo"
                  value={dados.pessoa.sexo}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.sexo)}
                />
                <DataField
                  label="Nome da mãe"
                  value={dados.pessoa.nomeMae}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.nomeMae)}
                />
                <DataField
                  label="Nome do pai"
                  value={dados.pessoa.nomePai}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.nomePai)}
                />
                <DataField
                  label="Profissão"
                  value={dados.pessoa.profissao}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.profissao)}
                />
                <DataField
                  label="Escolaridade"
                  value={dados.pessoa.escolaridade}
                  onCopy={copy}
                  copied={isCopied(dados.pessoa.escolaridade)}
                />
              </div>
          )}

          {category === "docs" && (
            <div className="flex flex-col gap-2">
                <DataField
                  label="CPF"
                  value={dados.documentos.cpf}
                  onCopy={copy}
                  copied={isCopied(dados.documentos.cpf)}
                />
                <DataField
                  label="CNPJ"
                  value={dados.documentos.cnpj}
                  onCopy={copy}
                  copied={isCopied(dados.documentos.cnpj)}
                />
                <DataField
                  label="RG"
                  value={dados.documentos.rg}
                  onCopy={copy}
                  copied={isCopied(dados.documentos.rg)}
                />
                <DataField
                  label="CNH"
                  value={dados.documentos.cnh}
                  onCopy={copy}
                  copied={isCopied(dados.documentos.cnh)}
                />
                <DataField
                  label="PIS/PASEP"
                  value={dados.documentos.pis}
                  onCopy={copy}
                  copied={isCopied(dados.documentos.pis)}
                />
                <DataField
                  label="CNS"
                  value={dados.documentos.cns}
                  onCopy={copy}
                  copied={isCopied(dados.documentos.cns)}
                />
                <DataField
                  label="Título de eleitor"
                  value={dados.documentos.tituloEleitor}
                  onCopy={copy}
                  copied={isCopied(dados.documentos.tituloEleitor)}
                />
                <DataField
                  label="Passaporte"
                  value={dados.documentos.passaporte}
                  onCopy={copy}
                  copied={isCopied(dados.documentos.passaporte)}
                />
              </div>
          )}

          {category === "cartao" && (
            <>
              <div className="mb-3 flex min-h-[100px] overflow-x-auto gap-2 py-3 pb-2">
                {BANDEIRAS.map(({ id, nome: nomeBandeira }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => trocarBandeira(id)}
                    className={`flex shrink-0 flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all ${
                      bandeiraSelecionada === id
                        ? "border-white/20 bg-white/10"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5 hover:text-accent-purple"
                    }`}
                    title={nomeBandeira}
                  >
                    <CardBrandIcon bandeira={id} />
                    <span className="text-[9px] font-medium text-muted-foreground">
                      {nomeBandeira}
                    </span>
                  </button>
                ))}
              </div>
              <CardDataDisplay
                bandeira={bandeiraSelecionada}
                numero={cartao.numero}
                validade={cartao.validade}
                cvv={cartao.cvv}
                nomeTitular={cartao.nomeTitular}
                onCopy={copy}
                isCopied={isCopied}
              />
            </>
          )}

          {category === "endereco" && (
            <div className="flex flex-col gap-2">
                <DataField
                  label="CEP"
                  value={dados.endereco.cep}
                  onCopy={copy}
                  copied={isCopied(dados.endereco.cep)}
                />
                <DataField
                  label="Logradouro"
                  value={dados.endereco.logradouro}
                  onCopy={copy}
                  copied={isCopied(dados.endereco.logradouro)}
                />
                <DataField
                  label="Número"
                  value={dados.endereco.numero}
                  onCopy={copy}
                  copied={isCopied(dados.endereco.numero)}
                />
                <DataField
                  label="Complemento"
                  value={dados.endereco.complemento || "—"}
                  onCopy={copy}
                  copied={isCopied(dados.endereco.complemento)}
                />
                <DataField
                  label="Bairro"
                  value={dados.endereco.bairro}
                  onCopy={copy}
                  copied={isCopied(dados.endereco.bairro)}
                />
                <DataField
                  label="Cidade"
                  value={dados.endereco.cidade}
                  onCopy={copy}
                  copied={isCopied(dados.endereco.cidade)}
                />
                <DataField
                  label="Estado"
                  value={dados.endereco.estado}
                  onCopy={copy}
                  copied={isCopied(dados.endereco.estado)}
                />
                <DataField
                  label="Endereço completo"
                  value={dados.endereco.enderecoCompleto}
                  onCopy={copy}
                  copied={isCopied(dados.endereco.enderecoCompleto)}
                />
              </div>
          )}
        </div>
      </div>

      <footer className="border-t border-white/5 px-5 py-2.5 text-center text-[10px] text-muted-foreground">
        Dados fictícios para testes • Uso responsável
      </footer>
    </div>
  );
}

export default App;
