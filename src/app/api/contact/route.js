import { NextResponse } from "next/server";

/**
 * Contact Form API Handler
 * 
 * Handles POST requests from the contact form.
 * 
 * Workflow:
 * 1. Parses form data.
 * 2. Checks for honeypot (spam protection).
 * 3. Validates submission time (bot protection).
 * 4. Validates required fields.
 * 5. Sends contact details to Brevo (CRM) via API.
 * 6. Returns success/error response.
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

        // Accept both forms: MailingListModal and ProposalOffcanvas
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
        if (!process.env.BREVO_API_KEY || !process.env.BREVO_LIST_ID) {
            console.error("Missing Brevo env vars");
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
                SOURCE: "Proposal Offcanvas",
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

        const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
                email,
                attributes,
                listIds: [Number(process.env.BREVO_LIST_ID)],
                updateEnabled: true,
            }),
        });

        const brevoText = await brevoRes.text();
        console.log("BREVO RESPONSE:", brevoRes.status, brevoText);

        if (!brevoRes.ok) {
            return NextResponse.json(
                { error: "Brevo error", details: brevoText },
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