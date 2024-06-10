export interface Campaign {
  verbosity: string;
  dense_layer_sizes_g: string;
  dense_layer_sizes_d: string;
  number_epochs: string;
  training_algorithm: string;
  datasetSelected: Blob;
}


export interface ListCampaing {
  name: string;
  parameters: Campaign;
}


export type ProcessingResultType = {
  fileKNN_Real: string[],
  fileKNN_Synth: string[],
  fileComparison: string[],
  filesConfusionMatrixReal: string[],
  filesConfusionMatrixSynthetic: string[],
  filesTrainingCurve: string[]
};


export interface ParametersDefault {
  activation_function: string;
  batch_size: string;
  data_type: string;
  dropout_decay_rate_d: string;
  dropout_decay_rate_g: string;
  initializer_deviation: string;
  initializer_mean: string;
  k_fold: string;
  latent_dimension: string;
  latent_mean_distribution: string;
  latent_stander_deviation: string;
  num_samples_class_benign: string;
  num_samples_class_malware: string;
  number_epochs: string;
  path_confusion_matrix: string;
  path_curve_loss: string;
  save_models: string;
  training_algorithm: string;
}
