import CenteredLayout from "@/components/CenteredLayout";
import LocaleSelect from "@/components/LocaleSelect";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/future/image";
import Link from "next/link";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <CenteredLayout>
      <h1 className="relative">
        <Image
          src="/logo-150h.png"
          width={594}
          height={150}
          alt="PokéSensei"
          priority
        />
        <div className="absolute bottom-0 -right-6 -rotate-12 text-3xl px-2 border-2 rounded-full border-red-500 text-red-500 bg-gray-800">
          Beta
        </div>
      </h1>
      <p className="mt-3">{t("page_home_copy")}</p>
      <div className="pb-6" />
      <Link href="/play" passHref>
        <a className="btn-primary text-2xl">
          {t("page_home_quick_start_button")}
        </a>
      </Link>
      <div className="pb-6" />
      <Link href="/setup" passHref>
        <a className="text-lg">{t("page_home_custom_game_button")}</a>
      </Link>
      <div className="pb-6" />
      <LocaleSelect />
    </CenteredLayout>
  );
};

export default Home;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
