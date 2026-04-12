"use client";
import { useTranslations } from "@/hooks/use-translations";
export const metadata = { title: "Privacy Policy — Granted Path" };

export default function PrivacyPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: April 11, 2026</p>

      <p>
        Granted Training Enterprise SRL (&ldquo;we&rdquo;) operates Granted Path and is the data controller for personal data processed through the Service. This policy explains what we collect, why, and your rights under GDPR.
      </p>

      <h2>1. What We Collect</h2>
      <ul>
        <li><strong>Account data:</strong> name, email, password hash, OAuth tokens (Google/GitHub).</li>
        <li><strong>Learning data:</strong> courses started, lessons completed, quiz results, flashcard reviews, session timestamps, AI conversations.</li>
        <li><strong>Billing data:</strong> processed by Stripe — we store only subscription IDs and plan info.</li>
        <li><strong>Usage analytics:</strong> page views, feature usage, device type. Processed by PostHog with IP anonymization.</li>
        <li><strong>Technical data:</strong> IP address (truncated), browser, OS, for security and debugging.</li>
      </ul>

      <h2>2. Why We Process It</h2>
      <ul>
        <li><strong>Provide the Service</strong> (legal basis: contract)</li>
        <li><strong>Personalize AI tutoring</strong> based on your learning patterns (legal basis: contract)</li>
        <li><strong>Send transactional emails</strong> (legal basis: contract)</li>
        <li><strong>Send marketing emails</strong> only if you opt in (legal basis: consent)</li>
        <li><strong>Prevent fraud and abuse</strong> (legal basis: legitimate interest)</li>
        <li><strong>Comply with legal obligations</strong> (legal basis: legal obligation)</li>
      </ul>

      <h2>3. Who We Share It With</h2>
      <ul>
        <li><strong>Anthropic</strong> (Claude API) — AI processing. Your conversations are sent with your query but Anthropic does not train on API data.</li>
        <li><strong>Stripe</strong> — billing and payment processing.</li>
        <li><strong>Resend</strong> — email delivery.</li>
        <li><strong>Vercel</strong> — hosting and edge infrastructure.</li>
        <li><strong>Neon</strong> (or equivalent) — managed PostgreSQL hosting.</li>
        <li><strong>PostHog</strong> — product analytics (optional, can be disabled in Settings).</li>
        <li><strong>Sentry</strong> — error monitoring (no personal data, only stack traces).</li>
      </ul>
      <p>
        We do NOT sell your data. We do NOT use it to train models. We do NOT share it for marketing purposes with third parties.
      </p>

      <h2>4. How Long We Keep It</h2>
      <ul>
        <li>Active accounts: for as long as you use the Service.</li>
        <li>Cancelled accounts: 30 days for reinstatement, then permanently deleted.</li>
        <li>Billing records: 10 years (Romanian accounting law).</li>
        <li>Analytics: 12 months, anonymized.</li>
      </ul>

      <h2>5. Your Rights (GDPR)</h2>
      <p>
        Under GDPR, you have the right to: access, rectify, delete, restrict, object, and port your personal data. See our{" "}
        <a href="/legal/gdpr">GDPR page</a> for how to exercise each right.
      </p>

      <h2>6. Cookies</h2>
      <p>
        We use essential cookies for authentication and security. Optional cookies (analytics) require your consent on first visit. You can revoke consent anytime in Settings → Privacy.
      </p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>
        Granted Path is not directed at children under 13. If we learn we have collected personal data from a child under 13 without parental consent, we will delete it promptly.
      </p>

      <h2>8. International Transfers</h2>
      <p>
        Some of our processors (Anthropic, Stripe) are based in the US. Transfers are protected by Standard Contractual Clauses approved by the European Commission.
      </p>

      <h2>9. Contact &amp; DPO</h2>
      <p>
        Data protection inquiries: <a href="mailto:privacy@grantedpath.com">privacy@grantedpath.com</a>.<br />
        Data Protection Officer: Granted Training Enterprise SRL, Bucharest, Romania.
      </p>

      <h2>10. Supervisory Authority</h2>
      <p>
        If you believe we have violated your rights, you can lodge a complaint with the Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP) at{" "}
        <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">www.dataprotection.ro</a>.
      </p>
    </>
  );
}
