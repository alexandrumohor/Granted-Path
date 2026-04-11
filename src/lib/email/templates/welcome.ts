export function welcomeEmail(name: string): { subject: string; html: string } {
  return {
    subject: "Welcome to Granted Path! 🎓",
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#0d0f1a;color:#e8e6e3;">
  <div style="text-align:center;margin-bottom:32px;">
    <div style="display:inline-block;background:#d4a039;color:#0d0f1a;font-weight:bold;font-size:18px;padding:12px 16px;border-radius:10px;">GP</div>
    <h1 style="margin:16px 0 0;font-size:24px;">Welcome to Granted Path!</h1>
  </div>
  <p>Hey ${name},</p>
  <p>You just made a great decision. Granted Path is not another course platform — it's an AI tutor that actually teaches you.</p>
  <p>Here's what makes us different:</p>
  <ul style="line-height:1.8;">
    <li><strong>Honest AI</strong> — corrects you when you're wrong, like a real teacher</li>
    <li><strong>Adaptive</strong> — adjusts to your learning style and pace</li>
    <li><strong>Smart tracking</strong> — knows what you're about to forget</li>
  </ul>
  <div style="text-align:center;margin:32px 0;">
    <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/onboarding" style="display:inline-block;background:#d4a039;color:#0d0f1a;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:bold;font-size:16px;">Start Learning Now</a>
  </div>
  <p style="color:#888;font-size:13px;">— The Granted Path Team<br/>Granted Training Enterprise SRL</p>
</body></html>`,
  };
}
