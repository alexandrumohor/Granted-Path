"use client";
import { useTranslations } from "@/hooks/use-translations";
export const metadata = { title: "Terms of Service — Granted Path" };

export default function TermsPage() {
  const t = useTranslations("common");
  const tc = useTranslations("common");
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="text-sm text-muted-foreground">Last updated: April 11, 2026</p>

      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Granted Path (the &ldquo;Service&rdquo;), operated by
        Granted Training Enterprise SRL (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By accessing or using the Service, you agree to be
        bound by these Terms.
      </p>

      <h2>1. Account Registration</h2>
      <p>
        You must be at least 13 years old to create an account. If you are under 18, you represent that you have parental or guardian consent. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.
      </p>

      <h2>2. Subscriptions &amp; Billing</h2>
      <p>
        Paid plans are billed in advance on a monthly or annual basis through Stripe. Subscriptions renew automatically unless cancelled before the next billing cycle. Refunds are issued at our discretion within 14 days of a charge, unless required by applicable EU consumer protection law.
      </p>

      <h2>3. Acceptable Use</h2>
      <ul>
        <li>Do not use the Service to generate content that is illegal, harmful, defamatory, or infringes intellectual property.</li>
        <li>Do not attempt to reverse-engineer, scrape, or circumvent rate limits.</li>
        <li>Do not share your account credentials or resell access.</li>
        <li>Do not use the Service to build a competing AI tutoring product.</li>
      </ul>

      <h2>4. AI-Generated Content</h2>
      <p>
        Granted Path uses large language models (Claude by Anthropic) to generate educational content. We make reasonable efforts to ensure accuracy, but AI output may contain errors. You are responsible for verifying information before relying on it for high-stakes decisions (exams, certifications, professional use).
      </p>

      <h2>5. User Content</h2>
      <p>
        You retain ownership of content you create on the Service (notes, uploads, flashcards). You grant us a limited license to store, process, and display that content solely to provide the Service to you. We do not train our models on your private content.
      </p>

      <h2>6. Termination</h2>
      <p>
        You may cancel your account at any time from Settings → Account. We may suspend or terminate accounts that violate these Terms, with notice where reasonable. Upon termination, your data will be retained for 30 days in case of reinstatement, then permanently deleted.
      </p>

      <h2>7. Disclaimers</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or meet your specific learning goals. Results vary based on your effort and consistency.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Granted Training Enterprise SRL shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Service. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by the laws of Romania. Any disputes shall be resolved in the courts of Bucharest, Romania, except where mandatory consumer protection laws require otherwise.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these Terms from time to time. Material changes will be notified via email at least 30 days in advance. Continued use after changes take effect constitutes acceptance.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms? Email <a href="mailto:legal@grantedpath.com">legal@grantedpath.com</a>.
      </p>
    </>
  );
}
