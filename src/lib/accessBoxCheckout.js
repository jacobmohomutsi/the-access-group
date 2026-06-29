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

export async function submitAccessBoxCheckout({ selectedProduct, selectedTier, formData, gateway = 'paystack' }) {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const metadata = {
        type: "access_box",
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        tierName: selectedTier.name,
        priceDisplay: selectedTier.priceDisplay,
        fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || selectedProduct.name,
        boxRequirements: buildBoxRequirementsMessage(selectedProduct, formData)
    };

    const endpoint = gateway === 'paystack' ? '/api/boxes/paystack/initialize' : '/api/yoco/payment-link';

    const payload = gateway === 'paystack' ? {
        email: formData.email,
        amount: selectedTier.price,
        metadata,
        reference: `BOX-${Date.now()}`
    } : {
        productId: selectedProduct.id,
        tierName: selectedTier.name,
        customerReference: fullName,
        customerDescription: `${selectedProduct.name} - ${selectedTier.name} (${selectedTier.priceDisplay})`,
        metadata
    };

    const paymentResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!paymentResponse.ok) {
        throw new Error(await getErrorMessage(paymentResponse, `Failed to initialize ${gateway} payment.`));
    }

    const paymentData = await paymentResponse.json();

    if (!paymentData.url) {
        throw new Error(`${gateway} did not return a payment link.`);
    }

    return paymentData;
}
