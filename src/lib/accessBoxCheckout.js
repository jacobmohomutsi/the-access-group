function buildBoxRequirementsMessage(selectedProduct, formData) {
    if (!selectedProduct.customFields?.length) {
        return "None";
    }

    return selectedProduct.customFields
        .map((field) => `- ${field.label}: ${formData[field.name] || "Not specified"}`)
        .join("\n");
}

function buildEmailMessage({ selectedProduct, selectedTier, formData, paymentData }) {
    const boxRequirementsMsg = buildBoxRequirementsMessage(selectedProduct, formData);

    return `
Access Box Order:
-----------------------------------------
Product: ${selectedProduct.name}
Selected Tier: ${selectedTier.name} (${selectedTier.priceDisplay})
Total Price: ${selectedTier.priceDisplay}

Client Details:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}

Yoco Payment:
- Checkout ID: ${paymentData.id || "Not provided"}
- Payment ID: ${paymentData.orderId || "Not provided"}
- Payment URL: ${paymentData.url}

Box Requirements:
${boxRequirementsMsg}
    `.trim();
}

async function getErrorMessage(response, fallback) {
    const data = await response.json().catch(() => ({}));
    return data.error || fallback;
}

export async function submitAccessBoxCheckout({ selectedProduct, selectedTier, formData }) {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const paymentResponse = await fetch("/api/yoco/payment-link", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId: selectedProduct.id,
            tierName: selectedTier.name,
            customerReference: fullName,
            customerDescription: `${selectedProduct.name} - ${selectedTier.name} (${selectedTier.priceDisplay})`,
        }),
    });

    if (!paymentResponse.ok) {
        throw new Error(await getErrorMessage(paymentResponse, "Failed to create Yoco payment link."));
    }

    const paymentData = await paymentResponse.json();

    if (!paymentData.url) {
        throw new Error("Yoco did not return a payment link.");
    }

    const contactResponse = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fullName,
            email: formData.email,
            company: selectedProduct.name,
            phone: formData.phone,
            bestTime: "morning",
            source: "Access Box Order",
            message: buildEmailMessage({
                selectedProduct,
                selectedTier,
                formData,
                paymentData,
            }),
        }),
    });

    if (!contactResponse.ok) {
        throw new Error(await getErrorMessage(contactResponse, "Failed to submit order details."));
    }

    return paymentData;
}
