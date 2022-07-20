import * as trpc from "@trpc/server";
import { z } from "zod";
import { getRandomElement } from "../utils/random";
import {
  getNameOfPokemonByImage,
  getTypeOfPokemon,
  QuestionWithAnswers,
  QuestionType,
  questionTypeToDataMap,
} from "../utils/question";
import {
  validateNameOfPokemon,
  validateTypeOfPokemon,
} from "../utils/validate";

export const appRouter = trpc
  .router()

  .query("get-question-by-type", {
    input: z.object({
      lang: z.string(),
      type: z.nativeEnum(QuestionType),
    }),
    resolve({ input: { type, lang } }): Promise<QuestionWithAnswers> {
      switch (type) {
        case QuestionType.TYPE_OF_POKEMON:
          return getTypeOfPokemon(lang);
        case QuestionType.NAME_OF_POKEMON_BY_IMAGE:
          return getNameOfPokemonByImage(lang);

        default:
          throw new Error(`Invalid question type requested: ${type}`);
      }
    },
  })

  .mutation("answer-question", {
    input: z.object({
      type: z.nativeEnum(QuestionType),
      additionalData: z.object({
        id: z.number(),
      }),
      answer: z.string(),
    }),
    resolve({ input: { type, additionalData, answer } }): Promise<boolean> {
      switch (type) {
        case QuestionType.TYPE_OF_POKEMON: {
          return validateTypeOfPokemon(additionalData.id, answer);
        }
        case QuestionType.NAME_OF_POKEMON_BY_IMAGE:
          return validateNameOfPokemon(additionalData.id, answer);

        default:
          throw new Error(`Invalid question type requested: ${type}`);
      }
    },
  })

  .query("get-quiz", {
    input: z.object({
      lang: z.string(),
      amount: z.number().min(1).max(10),
      filters: z
        .object({
          // TODO: add multiple filters here later on
          questionTypes: z.array(z.nativeEnum(QuestionType)).optional(),
        })
        .default({}),
    }),
    resolve({
      input: {
        amount,
        lang,
        filters: { questionTypes },
      },
    }) {
      const pAll: Promise<QuestionWithAnswers>[] = [];
      for (let i = 0; i < amount; i++) {
        // TODO: consider filters
        const questionType = getRandomElement(
          questionTypes || Object.values(QuestionType)
        );
        const p = questionTypeToDataMap[questionType](lang);
        pAll.push(p);
      }

      return Promise.all(pAll);
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
