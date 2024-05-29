// Função para dividir a string em id e name
export const dividirStringParaObjeto = (str: string) => {
    const partes = str.split("$$");
    return {
      id: partes[0],
      name: partes[1],
    };
  };

  // Função para extrair o conteúdo entre aspas
export const extrairConteudoEntreAspas = (str: string): string[] => {
  const regex = /"([^"]*)"/g;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    matches.push(match[1]);
  }
  return matches;
};
