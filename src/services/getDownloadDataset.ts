import { createUrlsCsv, downloadFiles } from "../utils/downloadFilesResult";

export const getDownloadDataset = async (processingId: string) => {
  const filesCategories = {
    fileForDownload: ["synthetic_data_fold_5.csv"],
  };

  try {
    const filesCsv = await Promise.all(
      Object.entries(filesCategories).map(async ([key, files]) => {
        const responses = await downloadFiles(files, processingId);
        const urls = createUrlsCsv(responses);

        return [key, urls];
      })
    );
    const filesCsvObject = Object.fromEntries(filesCsv);
    return filesCsvObject;
  } catch (error) {
    console.log("Falha em baixar o dataset:", error);
  }
};
