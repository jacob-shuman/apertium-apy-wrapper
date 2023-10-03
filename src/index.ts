import axios, { AxiosError } from "axios";
import path from "path";

export interface ApertiumOptions<Params = {}> {
  params: Params;
  baseUrl?: URL;
}

export interface ApertiumResponse<Data = unknown> {
  responseStatus: number;
  responseData: Data;
  responseDetails: unknown;
}

export const BASE_URL = new URL("https://www.apertium.org/");

const _sendRequest = async <T>(
  route: string,
  options: ApertiumOptions
): Promise<T> => {
  try {
    return (
      await axios.get(
        new URL(
          path.join("apy", route),
          options.baseUrl ?? BASE_URL
        ).toString(),
        { params: options.params }
      )
    ).data;
  } catch (err) {
    console.error(
      `Failed with URL: ${new URL(
        path.join("apy", route),
        options.baseUrl ?? BASE_URL
      ).toString()}`
    );

    throw new Error(
      `${(err as AxiosError).message} (${(err as AxiosError).code})`
    );
  }
};

// List available language pairs
export async function listPairs(
  options: ApertiumOptions<{ include_deprecated_codes?: boolean }> = {
    params: {},
  }
): Promise<
  ApertiumResponse<Array<{ sourceLanguage: string; targetLanguage: string }>>
> {
  if (options.params.include_deprecated_codes === false) {
    delete options.params.include_deprecated_codes;
  }

  return await _sendRequest("/listPairs", options);
}

// List available mode information
export async function list(
  options: ApertiumOptions<{
    q: "analyzers" | "analysers" | "generators" | "taggers" | "disambiguators";
  }>
): Promise<Record<string, string>> {
  return await _sendRequest("/list", options);
}

// Translate text
export const translate = async (
  options: ApertiumOptions<
    {
      langpair: string;
      q: string;
      markUnknown?: "no";
    } & (
      | {
          deformat?: "html" | "txt" | "rtf";
          reformat?: "html" | "html-noent" | "txt" | "rtf";
        }
      | { format?: "html" | "txt" | "rtf" }
    )
  >
): Promise<ApertiumResponse<{ translatedText: string }>> => {
  return await _sendRequest("/translate", options);
};

// Morphologically analyze text
export const analyze = async (
  options: ApertiumOptions<{
    lang: string;
    q: string;
  }>
): Promise<Array<Array<string>>> => {
  return await _sendRequest("/analyze", options);
};
export const analyse = analyze;

// Generate surface forms from text
export const generate = async (
  options: ApertiumOptions<{
    lang: string;
    q: string;
  }>
): Promise<Array<Array<string>>> => {
  return await _sendRequest("/generate", options);
};

// Return a list of languages with probabilities of the text being in that language. Uses CLD2 if that's installed, otherwise will try any analyser modes.
export const identifyLang = async (
  options: ApertiumOptions<{ q: string }>
): Promise<Record<string, number>> => {
  return await _sendRequest("/identifyLang", options);
};

// Return some statistics about pair usage, uptime, portion of time spent actively translating
export const stats = async (
  options: ApertiumOptions<{ requests?: number }>
): Promise<
  ApertiumResponse<{
    uptime: number;
    useCount: Record<string, number>;
    holdingPipes: number;
    periodStats: {
      charsPerSec: number;
      totChars: number;
      totTimeSpent: number;
      requests: number;
      ageFirstRequest: number;
    };
  }>
> => {
  return await _sendRequest("/stats", options);
};
