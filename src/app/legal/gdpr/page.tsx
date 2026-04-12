"use client";
import { useTranslations } from "@/hooks/use-translations";
export const metadata = { title: "GDPR — Granted Path" };

export default function GdprPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <>
      <h1>GDPR Rights &amp; Compliance</h1>
      <p className="text-sm text-muted-foreground">Last updated: April 11, 2026</p>

      <p>
        Granted Training Enterprise SRL is fully committed to the General Data Protection Regulation (EU 2016/679). This page explains your rights as a data subject and how to exercise them.
      </p>

      <h2>Your Rights</h2>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem" }}>1. Right to Access (Article 15)</h3>
      <p>
        You can download all personal data we hold about you from <strong>Settings → Privacy → Export My Data</strong>. You will receive a ZIP file within 48 hours containing: account info, learning history, AI conversations, billing records, and activity logs.
      </p>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem" }}>2. Right to Rectification (Article 16)</h3>
      <p>
        Correct inaccurate data directly in <strong>Settings → Profile</strong>. For data you cannot edit yourself, email{" "}
        <a href="mailto:privacy@grantedpath.com">privacy@grantedpath.com</a>.
      </p>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem" }}>3. Right to Erasure (Article 17)</h3>
      <p>
        You can delete your account permanently from <strong>Settings → Account → Delete Account</strong>. Your data will be:
      </p>
      <ul>
        <li>Anonymized or removed from our active database immediately</li>
        <li>Permanently erased from backups within 30 days</li>
        <li>Retained only for billing records required by Romanian accounting law (10 years, minimum data)</li>
      </ul>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem" }}>4. Right to Restriction (Article 18)</h3>
      <p>
        You can temporarily pause processing of your data (e.g., during a dispute) by contacting{" "}
        <a href="mailto:privacy@grantedpath.com">privacy@grantedpath.com</a>.
      </p>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem" }}>5. Right to Data Portability (Article 20)</h3>
      <p>
        Your export (from right #1) is in structured, machine-readable JSON format, suitable for importing into another service.
      </p>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem" }}>6. Right to Object (Article 21)</h3>
      <p>
        Opt out of marketing emails from <strong>Settings → Notifications</strong>. Opt out of analytics from <strong>Settings → Privacy → Analytics Opt-out</strong>.
      </p>

      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginTop: "1.5rem" }}>7. Right Not to Be Subject to Automated Decisions (Article 22)</h3>
      <p>
        Granted Path uses AI to personalize your learning experience, but no single automated decision has legal or similarly significant effects on you. You can always override AI recommendations manually.
      </p>

      <h2>Data We Process</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <th style={{ textAlign: "left", padding: "8px 0" }}>Category</th>
            <th style={{ textAlign: "left", padding: "8px 0" }}>Legal Basis</th>
            <th style={{ textAlign: "left", padding: "8px 0" }}>Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <td style={{ padding: "8px 0" }}>Account data</td>
            <td>Contract</td>
            <td>Account lifetime + 30d</td>
          </tr>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <td style={{ padding: "8px 0" }}>Learning data</td>
            <td>Contract</td>
            <td>Account lifetime + 30d</td>
          </tr>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <td style={{ padding: "8px 0" }}>Billing records</td>
            <td>Legal obligation</td>
            <td>10 years</td>
          </tr>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <td style={{ padding: "8px 0" }}>Analytics</td>
            <td>Consent</td>
            <td>12 months</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0" }}>Error logs</td>
            <td>Legitimate interest</td>
            <td>90 days</td>
          </tr>
        </tbody>
      </table>

      <h2>Processors (Sub-processors)</h2>
      <p>
        We use the following service providers, all bound by Data Processing Agreements:
      </p>
      <ul>
        <li><strong>Anthropic PBC</strong> — AI processing (Claude API). USA, SCCs in place. API data NOT used for training.</li>
        <li><strong>Stripe, Inc.</strong> — payment processing. USA, SCCs in place.</li>
        <li><strong>Resend</strong> — email delivery. USA, SCCs in place.</li>
        <li><strong>Vercel Inc.</strong> — hosting. USA, SCCs in place. EU region (Frankfurt).</li>
        <li><strong>Neon Database</strong> — managed PostgreSQL. EU region.</li>
        <li><strong>Upstash</strong> — Redis caching. EU region.</li>
        <li><strong>PostHog</strong> — product analytics. EU cloud region, anonymized.</li>
        <li><strong>Sentry</strong> — error monitoring. EU region.</li>
      </ul>

      <h2>How to Exercise Your Rights</h2>
      <p>
        Most rights can be exercised directly in the app under <strong>Settings → Privacy</strong>. For anything else:
      </p>
      <ul>
        <li>Email <a href="mailto:privacy@grantedpath.com">privacy@grantedpath.com</a></li>
        <li>Include your account email and a description of your request</li>
        <li>We respond within 30 days (usually within 7)</li>
        <li>We may ask for identity verification before acting on the request</li>
      </ul>

      <h2>Complaints</h2>
      <p>
        You have the right to lodge a complaint with the Romanian Data Protection Authority (ANSPDCP) at{" "}
        <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a>, or the DPA of your EU country of residence.
      </p>
    </>
  );
}
