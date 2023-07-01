//custom wrapper for the dictionaryapi.dev api

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

interface dictionaryPhonetic {
  text: string;
  audio: string | undefined;
}

interface dictionaryDefinitions {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

interface dictionaryMeanings {
  partOfSpeech: string;
  definitions: dictionaryDefinitions[];
}

export interface dictionaryResult {
  word: string;
  phonetic: string;
  phonetics: dictionaryPhonetic[];
  origin: string | undefined;
  meanings: dictionaryMeanings[];

  source_url: string[];
}

export async function getWord(word: string): Promise<dictionaryResult> {
  const fetch_res = await fetch(`${API_URL}${word}`);
  const fetch_res_json = await fetch_res
    .json()
    .then(async (data) => await data[0]);

  const resut: dictionaryResult = {
    word: fetch_res_json["word"],
    phonetic: fetch_res_json["phonetic"],
    phonetics: [],
    origin: fetch_res_json["origin"] ?? undefined,
    meanings: [],
    source_url: fetch_res_json["sourceUrls"],
  };

  for (const phonetic of fetch_res_json["phonetics"]) {
    resut.phonetics.push({
      text: `${phonetic["text"]}`,
      audio: `${phonetic["audio"] ?? undefined}`,
    });
  }

  for (const meaning of fetch_res_json["meanings"]) {
    resut.meanings.push(meaning);
  }

  return resut;
}
