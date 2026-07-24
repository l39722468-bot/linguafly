import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Navigation } from '@/components/sections/Navigation';
import { getUserProfileByAuthId } from '@/lib/access/user-profile';
import { resolveEntitlements } from '@/lib/access/entitlements';
import AccountSettingsClient from './AccountSettingsClient';

export const dynamic = 'force-dynamic';

function billingMessage(code: string | undefined): string | null {
  if (!code) return null;
  if (code === 'not-configured') return 'La facturación no está configurada ahora mismo. Prueba más tarde o contacta con soporte.';
  if (code === 'no-customer') return 'No encontramos un cliente de pago asociado a tu email. Si ya pagaste, escribe a soporte.';
  if (code === 'error') return 'No se pudo abrir el portal de facturación. Inténtalo de nuevo o contacta con soporte.';
  return null;
}

export default async function MiPanelCuentaPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/cuenta/login?next=/mi-panel/cuenta');
  }

  const profile = await getUserProfileByAuthId<any>(supabase, user.id, '*');
  const studentName =
    (profile?.name as string | undefined) ||
    (user.user_metadata?.full_name as string | undefined) ||
    '';
  const subscriptionStatus = (profile?.subscription_status as string | undefined) ?? 'inactive';
  const subscriptionPlan = (profile?.subscription_plan as string | undefined) ?? 'free';
  const languageLevel = ((profile?.language_level as string | undefined) ?? '—').toUpperCase();
  const subscriptionStartDate =
    (profile?.subscription_start_date as string | undefined) ?? null;
  const entitlements = resolveEntitlements({ subscriptionStatus, subscriptionPlan });

  const params = (await searchParams) ?? {};
  const rawBilling = params.billing;
  const billingCode = Array.isArray(rawBilling) ? rawBilling[0] : rawBilling;

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Mi panel</p>
              <h1 className="text-3xl font-black text-slate-900 mt-1">Configuración de cuenta</h1>
            </div>
            <Link
              href="/mi-panel"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Volver
            </Link>
          </div>

          <AccountSettingsClient
            initialName={studentName}
            email={user.email ?? ''}
            languageLevel={languageLevel}
            subscriptionStatus={subscriptionStatus}
            subscriptionPlan={subscriptionPlan}
            subscriptionStartDate={subscriptionStartDate}
            isPaid={entitlements.isPaid}
            billingAlert={billingMessage(billingCode)}
          />
        </div>
      </main>
    </>
  );
}
