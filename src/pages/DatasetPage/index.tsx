const DatasetPage: React.FC = () => {
  return (
    <section className=" w-7/12 mx-auto mb-20 max-lg:w-9/12 max-lg:max-sm:w-11/12 max-sm:text-justify">
      <div className="flex flex-col gap-4 ">
        <h3 className="font-bold text-xl max-sm:text-center">
          Conjunto de dados
        </h3>

        <div className="px-5 max-sm:px-1 text-justify">
          <p className="pb-4">
            O arquivo do conjunto de dados pode ser carregado pelo usuário
            usando a API REST. O arquivo do conjunto de dados deve ser um
            arquivo válido com tipo MIME válido, de acordo com a configuração do
            processador.
          </p>

          <p className="pb-4">
            A referência do usuário serve apenas para mencionar o usuário que
            carregou o arquivo do conjunto de dados. Ele pode ser baixado,
            alterado ou excluído por qualquer outro usuário.
          </p>

          <p className="pb-4">
            Há um exemplo de conjunto de dados no repositório do github, caso
            não for carregado nenhum conjunto de dados você pode usar para
            testar o aplicativo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DatasetPage;
