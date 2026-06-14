import { NextResponse } from "next/server";
import { boxes } from "@/lib/data/boxes";

const YOCO_CHECKOUTS_URL = "https://payments.yoco.com/api/checkouts";

function cleanText(value, maxLength) {
    return String(value || "").trim().slice(0, maxLength);
}

function findTier(productId, tierName) {
    const product = boxes.find((item) => item.id === productId);
    const tier = product?.tiers.find((item) => item.name === tierName);

    if (!product || !tier) {
        return null;
    }

    return { product, tier };
}

export async function POST(request) {
    try {
        const token = process.env.YOCO_API_TOKEN;

        if (!token) {
            return NextResponse.json(
                { error: "Yoco API token is not configured." },
                { status: 500 }
            );
        }

        const data = await request.json();
        const productId = cleanText(data.productId, 100);
        const tierName = cleanText(data.tierName, 100);
        const match = findTier(productId, tierName);

        if (!match) {
            return NextResponse.json(
                { error: "Invalid product or tier selected." },
                { status: 400 }
            );
        }

        const { product, tier } = match;
        const amount = Math.round(Number(tier.price) * 100);
        const customerReference = cleanText(data.customerReference, 100);
        const customerDescription = cleanText(
            data.customerDescription || `${product.name} - ${tier.name}`,
            255
        );

        if (!amount || amount <= 0 || !customerReference) {
            return NextResponse.json(
                { error: "Missing required payment details." },
                { status: 400 }
            );
        }

        const response = await fetch(YOCO_CHECKOUTS_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                currency: "ZAR",
                clientReferenceId: customerReference,
                metadata: {
                    productId,
                    productName: product.name,
                    tierName: tier.name,
                    customerDescription,
                },
            }),
        });

        const responseData = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error("YOCO PAYMENT LINK ERROR:", responseData);
            return NextResponse.json(
                { error: responseData.detail || responseData.message || responseData.title || "Failed to create Yoco payment link." },
                { status: response.status }
            );
        }

        return NextResponse.json({
            id: responseData.id,
            orderId: responseData.paymentId,
            status: responseData.status,
            url: responseData.redirectUrl,
        });
    } catch (error) {
        console.error("YOCO PAYMENT LINK API ERROR:", error);
        return NextResponse.json(
            { error: "Failed to create Yoco payment link." },
            { status: 500 }
        );
    }
}
