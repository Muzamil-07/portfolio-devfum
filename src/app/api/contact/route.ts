import { Resend } from "resend";
import { NextResponse } from "next/server";

const PROJECT_TYPES = ["ai", "xr", "ai-consultancy", "web-cloud"] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  ai: "AI",
  xr: "XR",
  "ai-consultancy": "AI consultancy",
  "web-cloud": "Web and cloud solution",
};

type ContactPayload = {
  name: string;
  email: string;
  projectType: ProjectType;
  message: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validatePayload(body: unknown): ContactPayload | string {
  if (!body || typeof body !== "object") {
    return "Invalid request body.";
  }

  const { name, email, projectType, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return "Name is required.";
  }
  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return "A valid email is required.";
  }
  if (typeof projectType !== "string" || !PROJECT_TYPES.includes(projectType as ProjectType)) {
    return "A valid project type is required.";
  }
  if (typeof message !== "string" || !message.trim()) {
    return "Message is required.";
  }

  return {
    name: name.trim(),
    email: email.trim(),
    projectType: projectType as ProjectType,
    message: message.trim(),
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validatePayload(body);
  if (typeof validated === "string") {
    return NextResponse.json({ error: validated }, { status: 400 });
  }

  const { name, email, projectType, message } = validated;
  const projectLabel = PROJECT_TYPE_LABELS[projectType];
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `New Devfum inquiry — ${name}`,
    html: `
      <h2>New portfolio inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(projectLabel)}</p>
      <p><strong>Brief:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
