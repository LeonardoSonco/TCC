import axios from "axios";

export function createUrlsPdfs(files: { data: BlobPart }[]) {
  const urls = files.map((response: { data: BlobPart }) => {
    const blob = new Blob([response.data], { type: "application/pdf" }); // cria um arquivo de dados do tipo pdf
    return URL.createObjectURL(blob); // cria uma url para referenciar o blob e assim permite exibir a imagem
  });

  return urls;
}

export function createUrlsCsv(files: { data: BlobPart }[]){
  const urls = files.map((response: { data: BlobPart }) => {
    const blob = new Blob([response.data], { type: "text/csv" }); // cria um arquivo de dados do tipo pdf
    return URL.createObjectURL(blob); // cria uma url para referenciar o blob e assim permite exibir a imagem
  });

  return urls;

}

export function downloadFiles(files: any, processId: any) {
  return Promise.all(
    files.map((file: any) =>
      axios.get(`/api/processing/${processId}/download/${file}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userId")}`,
        },
        responseType: "arraybuffer", //transforma o retorno em binario para facilitar a manipulçao (PDF e Img)
      })
    )
  );
}
