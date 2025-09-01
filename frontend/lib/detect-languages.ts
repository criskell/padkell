// adapted: https://github.com/microsoft/vscode/blob/e6ef6f8e2eecb4212ed8ee0c60d1048a8b17d468/src/vs/workbench/services/languageDetection/browser/languageDetectionWebWorker.ts#L172-L282

import type { GuessLang, ModelResult } from '@ray-d-song/guesslang-js';
import type { GuessLangWorker } from '@ray-d-song/guesslang-js/worker';

const expectedRelativeConfidence = 0.08;
const positiveConfidenceCorrectionBucket1 = 0.05;
const positiveConfidenceCorrectionBucket2 = 0.025;
const negativeConfidenceCorrection = 0.5;

const adjustLanguageConfidence = (modelResult: ModelResult): ModelResult => {
  switch (modelResult.languageId) {
    // For the following languages, we increase the confidence because
    // these are commonly used languages in VS Code and supported
    // by the model.
    case 'js':
    case 'html':
    case 'json':
    case 'ts':
    case 'css':
    case 'py':
    case 'xml':
    case 'php':
      modelResult.confidence += positiveConfidenceCorrectionBucket1;
      break;
    // case 'yaml': // YAML has been know to cause incorrect language detection because the language is pretty simple. We don't want to increase the confidence for this.
    case 'cpp':
    case 'sh':
    case 'java':
    case 'cs':
    case 'c':
      modelResult.confidence += positiveConfidenceCorrectionBucket2;
      break;

    // For the following languages, we need to be extra confident that the language is correct because
    // we've had issues like #131912 that caused incorrect guesses. To enforce this, we subtract the
    // negativeConfidenceCorrection from the confidence.

    // languages that are provided by default in VS Code
    case 'bat':
    case 'ini':
    case 'makefile':
    // languages that aren't provided by default in VS Code
    case 'csv':
    case 'toml':
      // Other considerations for negativeConfidenceCorrection that
      // aren't built in but suported by the model include:
      // * Assembly, TeX - These languages didn't have clear language modes in the community
      // * Markdown, Dockerfile - These languages are simple but they embed other languages
      modelResult.confidence -= negativeConfidenceCorrection;
      break;

    default:
      break;
  }
  return modelResult;
};

export async function* detectLanguages(
  modelOperations: GuessLang | GuessLangWorker,
  content: string
): AsyncGenerator<ModelResult, void, unknown> {
  let modelResults: ModelResult[] | undefined;

  try {
    modelResults = await modelOperations.runModel(content);
  } catch (e) {
    console.warn(e);
  }

  console.log(modelResults);

  if (
    !modelResults ||
    modelResults.length === 0 ||
    modelResults[0].confidence < expectedRelativeConfidence
  ) {
    return;
  }

  const firstModelResult = adjustLanguageConfidence(modelResults[0]);
  if (firstModelResult.confidence < expectedRelativeConfidence) {
    return;
  }

  const possibleLanguages: ModelResult[] = [firstModelResult];

  for (let current of modelResults) {
    if (current === firstModelResult) {
      continue;
    }

    current = adjustLanguageConfidence(current);
    const currentHighest = possibleLanguages[possibleLanguages.length - 1];

    if (
      currentHighest.confidence - current.confidence >=
      expectedRelativeConfidence
    ) {
      while (possibleLanguages.length) {
        yield possibleLanguages.shift()!;
      }
      if (current.confidence > expectedRelativeConfidence) {
        possibleLanguages.push(current);
        continue;
      }
      return;
    } else {
      if (current.confidence > expectedRelativeConfidence) {
        possibleLanguages.push(current);
        continue;
      }
      return;
    }
  }
}
