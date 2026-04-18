"use client";
import { useState } from "react";
import { Mail, Phone, Send, Copy, Check, Linkedin } from "lucide-react";
import PageShell from "../_components/PageShell";
import { useLang } from "../../lib/useLang";

function CopyRow({ icon: Icon, label, value, copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <button
      onClick={copy}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-violet-500/40 transition-colors text-left"
    >
      <div className="w-9 h-9 rounded-lg bg-violet-500/15 text-violet-300 flex items-center justify-center flex-shrink-0">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-gray-500">{label}</div>
        <div className="text-sm text-gray-100 truncate">{value}</div>
      </div>
      <span className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
        {copied ? (
          <><Check size={13} className="text-green-400" /> {copiedLabel}</>
        ) : (
          <><Copy size={13} /></>
        )}
      </span>
    </button>
  );
}

function PayRow({ k, v, copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-gray-500">{k}</div>
        <div className="text-sm text-gray-200 truncate font-mono">{v}</div>
      </div>
      <button
        onClick={copy}
        className="text-xs text-gray-500 hover:text-violet-300 flex items-center gap-1 flex-shrink-0"
      >
        {copied ? <><Check size={12} className="text-green-400" /> {copiedLabel}</> : <><Copy size={12} /></>}
      </button>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useLang();

  const contact = {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "tornikepe@gmail.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+995 5XX XX XX XX",
    telegram: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || "@tornikepe",
    linkedin: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "linkedin.com/in/tornike-peitrishvili",
  };
  const payment = {
    beneficiary: process.env.NEXT_PUBLIC_PAYMENT_BENEFICIARY || "Tornike Peitrishvili",
    bankName: process.env.NEXT_PUBLIC_PAYMENT_BANK || "TBC Bank",
    iban: process.env.NEXT_PUBLIC_PAYMENT_IBAN || "GE00TB0000000000000000",
    paypal: process.env.NEXT_PUBLIC_PAYMENT_PAYPAL || "paypal.me/tornikepe",
    revolut: process.env.NEXT_PUBLIC_PAYMENT_REVOLUT || "@tornikepe",
  };

  return (
    <PageShell>
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-14 pb-10">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-100 mb-4">
          {t.contact.heading}
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">{t.contact.sub}</p>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-10">
        <div className="grid sm:grid-cols-2 gap-3">
          <CopyRow icon={Mail} label={t.contact.emailLabel} value={contact.email} copiedLabel={t.contact.copied} />
          <CopyRow icon={Phone} label={t.contact.phoneLabel} value={contact.phone} copiedLabel={t.contact.copied} />
          <CopyRow icon={Send} label={t.contact.telegramLabel} value={contact.telegram} copiedLabel={t.contact.copied} />
          <CopyRow icon={Linkedin} label={t.contact.linkedinLabel} value={contact.linkedin} copiedLabel={t.contact.copied} />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-20">
        <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10">
          <h2 className="text-xl font-semibold text-gray-100 mb-1.5">{t.payment.heading}</h2>
          <p className="text-sm text-gray-400 mb-6">{t.payment.sub}</p>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <span>🏦</span> {t.payment.bank}
              </h3>
              <div className="space-y-2">
                <PayRow k={t.payment.beneficiary} v={payment.beneficiary} copiedLabel={t.contact.copied} />
                <PayRow k={t.payment.bankName} v={payment.bankName} copiedLabel={t.contact.copied} />
                <PayRow k={t.payment.iban} v={payment.iban} copiedLabel={t.contact.copied} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <span>🌍</span> {t.payment.intl}
              </h3>
              <div className="space-y-2">
                <PayRow k="PayPal" v={payment.paypal} copiedLabel={t.contact.copied} />
                <PayRow k="Revolut" v={payment.revolut} copiedLabel={t.contact.copied} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
