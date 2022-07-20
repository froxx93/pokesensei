import CenteredLayout from "@/components/CenteredLayout";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Quiz from "@/components/Quiz";
import Loader from "@/components/Loader";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Locale } from "@/utils/i18n";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import qs from "query-string";
import { QuestionWithAnswers } from "@/server/utils/question";
import { QuizFilter } from "./setup";

const Play: NextPage = () => {
  const { t } = useTranslation();

  const [data, updateData] = useState(
    undefined as QuestionWithAnswers[] | undefined
  );

  const { locale, asPath } = useRouter();
  const filters = qs.parse(asPath.split("?")[1], {
    arrayFormat: "index",
  }) as unknown as QuizFilter;

  trpc.useQuery(
    [
      "get-quiz",
      {
        lang: locale || Locale.en,
        amount: 5,
        filters,
      },
    ],
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: updateData,
    }
  );

  return (
    <CenteredLayout>
      <div className="w-boxed max-w-full">
        <Loader isLoading={!data}>{data && <Quiz data={data} />}</Loader>
      </div>
      <Link href="/" passHref>
        <a className="fixed bottom-0 text-error opacity-25 hover:opacity-100">
          {t("page_play_cancel")}
        </a>
      </Link>
    </CenteredLayout>
  );
};

export default Play;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
