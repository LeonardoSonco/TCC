export interface Campaign {
    verbosity: string;
    dense_layer_sizes_g: string;
    dense_layer_sizes_d: string;
    number_epochs: string;
    training_algorithm: string;
}

export interface ListCampaing {
    name: string;
    parameters: Campaign;
}