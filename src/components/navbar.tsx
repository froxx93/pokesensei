import Image from "next/image";
import { Link } from "~/navigation";
import LocaleSelect from "./locale-select";
import { type Session, getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import IntlProvider from "./intl-provider";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return <Content session={session} />;
}

function Content({ session }: { session: Session | null }) {
  return (
    <nav className="fixed left-0 top-0 flex h-header w-full items-center bg-gray-700 shadow-lg">
      <div className="flex w-full items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="relative mr-3">
            <Image
              src="/logo-50h.png"
              width={189}
              height={50}
              alt="logo"
              priority
            />
            <div className="absolute -right-3 bottom-0 -rotate-12 rounded-full border-2 border-red-500 bg-gray-800 px-2 text-xs text-red-500">
              Beta
            </div>
          </Link>
          <LocaleSelect />
        </div>
        <div>
          {session ? (
            <IntlProvider>
              <LogoutButton />
            </IntlProvider>
          ) : (
            <IntlProvider>
              <LoginButton />
            </IntlProvider>
          )}
        </div>
      </div>
    </nav>
  );
}
