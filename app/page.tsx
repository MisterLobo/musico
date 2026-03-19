import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ClockIcon, MapPin, PinIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>musico</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 w-5xl p-5">
          <main className="flex flex-col gap-6 px-4 w-full">
            <h2 className="font-medium text-xl mb-4">Next step</h2>
            {(new Array(10)).fill(0).map((_, i) => (
              <Link href={`/studio/${i+1}`} key={i}>
                <Card className="w-full cursor-pointer">
                  <CardHeader>
                    <CardTitle>Studio 1</CardTitle>
                    <CardDescription>Open 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent className="space-x-4 inline-flex relative">
                    <div className="flex space-x-1 justify-center">
                      <Clock size={16} />
                      <span>Now open</span>
                    </div>
                    <div className="flex space-x-1 justify-center">
                      <MapPin size={16} />
                      <span>Somewhere, Out there, Earth</span>
                    </div>
                    <div className="absolute right-5">
                      <button className="cursor-pointer">Book now</button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </main>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
