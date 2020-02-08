/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * modified by Gotys
 * =============================================================================
 */

const MOBILENET_BASE_URL =
    'https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet/';
const RESNET50_BASE_URL =
    'https://storage.googleapis.com/tfjs-models/savedmodel/posenet/resnet50/';

// The PoseNet 2.0 ResNet50 models use the latest TensorFlow.js 1.0 model
// format.
export function resNet50Checkpoint(stride: number, quantBytes: number): string {
  const graphJson = `model-stride${stride}.json`;
  let retUrl = '';
  // quantBytes=4 corresponding to the non-quantized full-precision checkpoints.
  if (quantBytes === 4) {
    retUrl = RESNET50_BASE_URL + `float/` + graphJson;
  } else {
    retUrl = RESNET50_BASE_URL + `quant${quantBytes}/` + graphJson;
  }
  console.log("REturning "+retUrl);
  return retUrl;
}

// The PoseNet 2.0 MobileNetV1 models use the latest TensorFlow.js 1.0 model
// format.
export function mobileNetCheckpoint(
    stride: number, multiplier: number, quantBytes: number): string {
  const toStr: {[key: number]: string} = {1.0: '100', 0.75: '075', 0.50: '050'};
  const graphJson = `model-stride${stride}.json`;
  // quantBytes=4 corresponding to the non-quantized full-precision checkpoints.
  if (quantBytes === 4) {
    return MOBILENET_BASE_URL + `float/${toStr[multiplier]}/` + graphJson;
  } else {
    return MOBILENET_BASE_URL + `quant${quantBytes}/${toStr[multiplier]}/` +
        graphJson;
  }
}
