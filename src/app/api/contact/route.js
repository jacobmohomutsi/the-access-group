import { NextResponse } from "next/server";

async function sendNotificationEmail(email, { source, name, company, phone, bestTime, budget, message, recipientEmail, recipientName, subject }) {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Lead Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #1f2937;">
    <div style="max-w: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
        
        <!-- Header -->
        <div style="background-color: #304945; padding: 32px 24px; text-align: center; border-bottom: 4px solid #C2A66B;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">
                The Access Group
            </h1>
            <p style="color: #C2A66B; margin: 8px 0 0 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                New Website Lead
            </p>
        </div>

        <!-- Body Content -->
        <div style="padding: 32px 24px;">
            <p style="margin-top: 0; font-size: 16px; line-height: 1.5; color: #4b5563;">
                A new submission has been received from the website. Below are the details:
            </p>

            <!-- Details Table -->
            <table style="width: 100%; border-collapse: collapse; margin-top: 24px; margin-bottom: 24px;">
                <tbody>
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #374151; width: 140px; vertical-align: top;">
                            Source
                        </td>
                        <td style="padding: 12px 0; font-size: 14px; color: #4b5563; vertical-align: top;">
                            <span style="background-color: #f3f4f6; color: #374151; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600;">
                                ${source}
                            </span>
                        </td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #374151; vertical-align: top;">
                            Full Name
                        </td>
                        <td style="padding: 12px 0; font-size: 14px; color: #111827; font-weight: 600; vertical-align: top;">
                            ${name || "N/A"}
                        </td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #374151; vertical-align: top;">
                            Email Address
                        </td>
                        <td style="padding: 12px 0; font-size: 14px; color: #304945; font-weight: 600; vertical-align: top;">
                            <a href="mailto:${email}" style="color: #304945; text-decoration: none; border-bottom: 1px dashed #304945;">
                                ${email}
                            </a>
                        </td>
                    </tr>
                    ${company ? `
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #374151; vertical-align: top;">
                            Company / Product
                        </td>
                        <td style="padding: 12px 0; font-size: 14px; color: #4b5563; vertical-align: top;">
                            ${company}
                        </td>
                    </tr>
                    ` : ""}
                    ${phone ? `
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #374151; vertical-align: top;">
                            Phone Number
                        </td>
                        <td style="padding: 12px 0; font-size: 14px; color: #4b5563; vertical-align: top;">
                            ${phone}
                        </td>
                    </tr>
                    ` : ""}
                    ${bestTime ? `
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #374151; vertical-align: top;">
                            Best Contact Time
                        </td>
                        <td style="padding: 12px 0; font-size: 14px; color: #4b5563; vertical-align: top;">
                            ${bestTime}
                        </td>
                    </tr>
                    ` : ""}
                    ${budget ? `
                    <tr style="border-bottom: 1px solid #f3f4f6;">
                        <td style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #374151; vertical-align: top;">
                            Budget
                        </td>
                        <td style="padding: 12px 0; font-size: 14px; color: #4b5563; vertical-align: top;">
                            ${budget}
                        </td>
                    </tr>
                    ` : ""}
                </tbody>
            </table>

            <!-- Message Block -->
            ${message ? `
            <div style="margin-top: 24px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 600; color: #374151;">
                    Message / Details:
                </p>
                <div style="background-color: #f9fafb; border-left: 4px solid #C2A66B; border-radius: 4px; padding: 16px; font-family: 'Courier New', Courier, monospace; font-size: 13px; line-height: 1.6; color: #374151; white-space: pre-wrap; word-break: break-all;">
                    ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                </div>
            </div>
            ` : ""}
        </div>

        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                This notification was automatically sent by the website.
            </p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #9ca3af;">
                &copy; 2026 The Access Group. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    const payload = {
        sender: {
            name: "The Access Group Notification",
            email: "info@theaccessgroup.co.za"
        },
        to: [
            {
                email: recipientEmail || "careers@theaccessgroup.co.za",
                name: recipientName || "Simphiwe"
            }
        ],
        subject: subject || `New Lead - ${source || "Website Form"}`,
        htmlContent: htmlContent
    };

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
                "accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        return response.ok;
    } catch (error) {
        console.error("BREVO SMTP ERROR:", error);
        return false;
    }
}

/**
 * Contact Form API Handler
 * 
 * Handles POST requests from the contact form.
 */
export async function POST(req) {
    try {
        let data;
        const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            data = await req.json();
        } else {
            const formData = await req.formData();
            data = Object.fromEntries(formData.entries());
        }

        // Accept forms: MailingListModal, ProposalOffcanvas, CareerApplicationModal, and contact form
        // MailingListModal: fullName, email, company
        // ProposalOffcanvas: fullName, email, company, phone, bestTime, message
        // Contact form: name, email, phone, message, budget, company, startedAt

        // Honeypot (for contact form)
        if (data.company && !data.fullName) {
            return NextResponse.json({ success: true });
        }

        // Time check (for contact form)
        if (data.startedAt && Date.now() - Number(data.startedAt) < 3000) {
            return NextResponse.json({ error: "Bot detected" }, { status: 400 });
        }

        // Determine which form
        const isMailingList = !!(data.fullName && data.email && data.company && !data.message && !data.phone);
        const isProposal = !!(data.fullName && data.email && data.company && (data.message || data.phone));
        const isContact = !!(data.name && data.email && data.message);

        // Validation
        if (!isMailingList && !isProposal && !isContact) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // ENV CHECK
        if (!process.env.BREVO_API_KEY) {
            return NextResponse.json(
                { error: "Server misconfiguration" },
                { status: 500 }
            );
        }

        // Map fields for Brevo
        let email, attributes;
        if (isMailingList) {
            email = data.email;
            attributes = {
                FIRSTNAME: data.fullName,
                COMPANY: data.company,
                SOURCE: "Mailing List Modal",
            };
        } else if (isProposal) {
            email = data.email;
            attributes = {
                FIRSTNAME: data.fullName,
                COMPANY: data.company,
                PHONE_NUMBER: data.phone || "",
                BEST_TIME: data.bestTime || "",
                MESSAGE: data.message || "",
                SOURCE: data.source || "Proposal Offcanvas",
            };
        } else {
            email = data.email;
            attributes = {
                FIRSTNAME: data.name,
                PHONE_NUMBER: data.phone || "",
                MESSAGE: data.message,
                BUDGET: data.budget || "Not specified",
                SOURCE: "Website Contact Form",
            };
        }

        const smtpPayload = {
            source: attributes.SOURCE,
            name: attributes.FIRSTNAME,
            company: attributes.COMPANY || data.company || "",
            phone: attributes.PHONE_NUMBER || "",
            bestTime: attributes.BEST_TIME || "",
            budget: attributes.BUDGET || "",
            message: attributes.MESSAGE || "",
            recipientEmail: data.source === "Partnership Application" ? "info@theaccessgroup.co.za" : data.source === "Career Application" ? "careers@theaccessgroup.co.za" : data.source === "Access Box Order" ? "theaccessgroupsa@gmail.com" : undefined,
            recipientName: data.source === "Partnership Application" ? "The Access Group" : data.source === "Career Application" ? "Simphiwe" : data.source === "Access Box Order" ? "The Access Group" : undefined,
            subject: data.source === "Partnership Application" ? data.subject : undefined
        };

        const emailSent = await sendNotificationEmail(email, smtpPayload);

        if (!emailSent) {
            return NextResponse.json(
                { error: "Email notification failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("API ERROR:", err);
        return NextResponse.json(
            { error: "Internal error" },
            { status: 500 }
        );
    }
}
