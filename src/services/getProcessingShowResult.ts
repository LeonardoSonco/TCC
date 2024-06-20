import { createUrlsPdfs, downloadFiles } from "../utils/downloadFilesResult";
import { getProcessingParametersToId } from "./getProcessingParametersToId";

export const processingShowResult = async (processingId: string) => {
  const filesCategories = {
    fileKNN_Real: ["KNN_Real.pdf"],

    fileKNN_Synth: ["KNN_Synthetic.pdf"],

    fileComparison: ["Comparison_Real_Synthetic.pdf"],

    filesConfusionMatrixReal: [
      "confusion_matrix/CM_Real_KNN_k1.pdf",
      "confusion_matrix/CM_Real_KNN_k2.pdf",
      "confusion_matrix/CM_Real_KNN_k3.pdf",
      "confusion_matrix/CM_Real_KNN_k4.pdf",
      "confusion_matrix/CM_Real_KNN_k5.pdf",
    ],
    filesConfusionMatrixSynthetic: [
      "confusion_matrix/CM_Synthetic_KNN_k1.pdf",
      "confusion_matrix/CM_Synthetic_KNN_k2.pdf",
      "confusion_matrix/CM_Synthetic_KNN_k3.pdf",
      "confusion_matrix/CM_Synthetic_KNN_k4.pdf",
      "confusion_matrix/CM_Synthetic_KNN_k5.pdf",
    ],
    filesTrainingCurve: [
      "training_curve/curve_training_error_k_1.pdf",
      "training_curve/curve_training_error_k_2.pdf",
      "training_curve/curve_training_error_k_3.pdf",
      "training_curve/curve_training_error_k_4.pdf",
      "training_curve/curve_training_error_k_5.pdf",
    ],
  };

  try {
    const images = await Promise.all(
      Object.entries(filesCategories).map(async ([key, files]) => {
        const responses = await downloadFiles(files, processingId);
        const urls = createUrlsPdfs(responses);

        return [key, urls];
      })
    );

    const selectedResultParameters = await getProcessingParametersToId(
      processingId
    );
    const imagesObject = Object.fromEntries(images);

    return { imagesObject, selectedResultParameters };
    //return urls;
  } catch (error) {
    console.error("Falha em buscar o resultados:", error);
  }
};
