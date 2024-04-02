const Parameters: React.FC = () => {
  return (
    <div className="col-span-5">
      <h3 className="font-bold text-xl mb-4">Parâmetros</h3>
      <div
        className="ml-8
      "
      >
        <p className="text-base py-1 font-medium">
          Os parâmetros de configuração são descritos abaixo:
        </p>
        <ul className=" list-disc flex flex-col gap-2 text-base ml-4">
          <li>
            <span className="font-semibold">code:</span> o identificador do
            processador, usado para referenciá-lo na solicitação de
            processamento.
          </li>
          <li>
            <span className="font-semibold">name:</span> o nome do processador.
          </li>
          <li>
            <span className="font-semibold">description:</span> a descrição do
            processador.
          </li>
          <li>
            <span className="font-semibold">image:</span> a imagem Docker do
            processador, usada para extraí-lo do Docker Hub. A imagem alvo deve
            ser pública.
          </li>
          <li>
            <span className="font-semibold">input_arg:</span> a chave do
            argumento que será usada para passar o caminho do arquivo do
            conjunto de dados para o processador.
          </li>
          <li>
            <span className="font-semibold">input_dir:</span> o diretório onde o
            arquivo do conjunto de dados será colocado no contêiner do
            processador usando volumes.
          </li>
          <li>
            <span className="font-semibold">output_arg:</span> a chave do
            argumento que será usada para passar o caminho do arquivo de
            resultado do processamento para o processador.
          </li>
          <li>
            <span className="font-semibold">output_dir:</span> o diretório onde
            o arquivo de resultado do processamento será colocado no contêiner
            do processador usando volumes.
          </li>
          <li>
            <span className="font-semibold">command:</span> o comando que
            executa a ação desejada no contêiner do processador, usando os
            argumentos fornecidos.
          </li>
          <li>
            <span className="font-semibold">allowed_params:</span> a lista de
            chaves de parâmetros aceitas para o processador.
          </li>
          <li>
            <span className="font-semibold">allowed_mime_types:</span> a lista
            de tipos MIME aceitos para o arquivo do conjunto de dados. Também
            terá impacto na validação do upload do arquivo do conjunto de dados.
          </li>
          <li>
            <span className="font-semibold">default_params:</span> os parâmetros
            padrão do processador. Será utilizado se o parâmetro especificado
            não for fornecido na solicitação de processamento.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Parameters;
