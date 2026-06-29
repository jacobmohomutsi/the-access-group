export const boxes = [
    {
        id: "box-1",
        name: "Access to Business",
        shortDescription: "Essential business registration and basic branding for startups.",
        fullDescription: "Get everything you need to formalize your business. From CIPC registration and tax compliance to a starter branding pack, we set the foundation for your entrepreneurial journey.",
        iconName: "building-2",
        tiers: [
            {
                name: "Basic Registration",
                price: 5,
                priceDisplay: "R5",
                paymentLink: "https://pay.yoco.com/the-access-group-basic",
                deliverables: ["CIPC Registration", "BBBEE Certificate", "SARS Tax Number", "Share Certificate"]
            },
            {
                name: "Registration + Basic Profile",
                price: 1200,
                priceDisplay: "R1,200",
                paymentLink: "https://pay.yoco.com/the-access-group-profile",
                deliverables: ["CIPC Registration", "BBBEE Certificate", "SARS Tax Number", "Share Certificate", "3-page Business Profile (Word/Canva)"]
            },
            {
                name: "Full Starter Pack",
                price: 3700,
                priceDisplay: "R3,700",
                paymentLink: "https://pay.yoco.com/the-access-group-starter",
                deliverables: ["CIPC Registration", "BBBEE Certificate", "SARS Tax Number", "Share Certificate", "Basic Logo Design", "5-page Full Graphic Profile"]
            }
        ],
        customFields: [
            { name: "businessName1", label: "Business Name Option 1", type: "text", required: true },
            { name: "businessName2", label: "Business Name Option 2", type: "text", required: true },
        ]
    },
    {
        id: "box-2",
        name: "Access for Creatives",
        shortDescription: "Registrations, funding proposals, and EPKs for creative professionals.",
        fullDescription: "Tailored specifically for artists, musicians, and creatives. We handle industry registrations, build your professional Electronic Press Kit (EPK), and even submit funding proposals on your behalf.",
        iconName: "palette",
        tiers: [
            {
                name: "Essential Toolkit",
                price: 1500,
                priceDisplay: "R1,500",
                paymentLink: "https://pay.yoco.com/the-access-group-creatives-essential",
                deliverables: ["CIPC Registration", "Bank Account Setup", "2 Creative Body Registrations (e.g., MASA, DALRO)", "2-page Booking Kit (PDF)"]
            },
            {
                name: "Professional EPK",
                price: 2500,
                priceDisplay: "R2,500",
                paymentLink: "https://pay.yoco.com/the-access-group-creatives-epk",
                deliverables: ["CIPC Registration", "Bank Account Setup", "2 Creative Body Registrations", "5-page EPK + Booking Card + Template"]
            },
            {
                name: "Funding & Growth",
                price: 5000,
                priceDisplay: "R5,000",
                paymentLink: "https://pay.yoco.com/the-access-group-creatives-funding",
                deliverables: ["CIPC Registration", "Bank Account Setup", "2 Creative Body Registrations", "5-page EPK + Booking Card + Template", "Drafting & Submission of Funding Proposals (MGE, NAC, NHC, SAMPRA, ArtBank)"]
            }
        ],
        customFields: [
            { name: "creativeField", label: "Creative Field (Music, Art, etc.)", type: "text", required: true }
        ]
    },
    {
        id: "box-3",
        name: "Access Digital Media",
        shortDescription: "Social media setup, content planning, and basic SEO.",
        fullDescription: "Establish a strong digital footprint. We set up your business profiles across key social platforms, build a scalable content plan, and implement foundational SEO so customers can find you.",
        iconName: "share-2",
        tiers: [
            {
                name: "Digital Footprint",
                price: 3000,
                priceDisplay: "R3,000",
                paymentLink: "https://pay.yoco.com/the-access-group-digital-media",
                deliverables: ["Setup 3 SM business pages (FB, IG, LinkedIn/TikTok)", "Create & verify Google Business Profile", "3-month tailored content plan (Excel/Notion)", "Basic SEO (Meta tags, Search Console, Keywords)"]
            }
        ],
        customFields: [
            { name: "socialHandles", label: "Current Social Media Handles (if any)", type: "text", required: false },
            { name: "brandColors", label: "Brand Colors / Guidelines Info", type: "text", required: false }
        ]
    },
    {
        id: "box-4",
        name: "Access Communication",
        shortDescription: "Domain, hosting, professional email, and VoIP setup.",
        fullDescription: "Professionalize your comms structure. We manage your domain, provide reliable email hosting, and set up a geographical VoIP number so your business sounds as big as your ambitions.",
        iconName: "phone-call",
        tiers: [
            {
                name: "Monthly Subscription",
                price: 500,
                priceDisplay: "R500 / month",
                paymentLink: "https://pay.yoco.com/the-access-group-comm-monthly",
                isRecurring: true,
                deliverables: ["Unique Domain (.co.za/.com) Registration", "Email Hosting (15GB, unlimited emails)", "VoIP Geo-number (011/014)", "150 minutes talk time (renews monthly)"]
            },
            {
                name: "Annual Plan (Save R1,000)",
                price: 5000,
                priceDisplay: "R5,000 / year",
                paymentLink: "https://pay.yoco.com/the-access-group-comm-annual",
                isRecurring: true,
                deliverables: ["Unique Domain (.co.za/.com) Registration", "Email Hosting (15GB, unlimited emails)", "VoIP Geo-number (011/014)", "150 minutes talk time (renews monthly)"]
            }
        ],
        customFields: [
            { name: "desiredDomain", label: "Desired Domain Name", type: "text", required: true }
        ]
    },
    {
        id: "box-5",
        name: "Access to Market + Procurement",
        shortDescription: "Database registrations, market analysis, and compliance.",
        fullDescription: "Unlock corporate and government procurement opportunities. We register you on key databases, analyze your industry, and set up the agreements you need to secure big contracts.",
        iconName: "briefcase",
        tiers: [
            {
                name: "Market Readiness",
                price: 6500,
                priceDisplay: "R6,500",
                paymentLink: "https://pay.yoco.com/the-access-group-market-readiness",
                deliverables: ["Business Market Analysis (industry trends, competitors)", "Registration on 5 Procurement Databases (Banks, Mines, Govt, Corporate)", "Proudly SA Membership Registration", "2-page Offtake/LOI Agreement Template", "Barcode Registration (GS1 SA)"]
            }
        ],
        customFields: [
            { name: "industrySector", label: "Primary Industry / Sector", type: "text", required: true }
        ]
    },
    {
        id: "box-6",
        name: "Access to Branding",
        shortDescription: "Full premium graphic profile, robust website, and physical brand assets.",
        fullDescription: "A comprehensive brand overhaul. From top-tier logo concepts and a sturdy multi-page website to printed branded apparel delivered to your door.",
        iconName: "pen-tool",
        tiers: [
            {
                name: "Complete Brand Identity",
                price: 15000,
                priceDisplay: "R15,000",
                paymentLink: "https://pay.yoco.com/the-access-group-branding",
                deliverables: ["Professional Logo Design (3 concepts, 2 revisions)", "10-page Graphic Company Profile (Branded)", "Domain Registration & Hosting (15GB, 1 year)", "3-page Responsive Website (WordPress/Webflow)", "3 Branded T-shirts (Printed & Shipped)"]
            }
        ],
        customFields: [
            { name: "tshirtSizes", label: "T-Shirt Sizes (e.g. 1xM, 2xL)", type: "text", required: true }
        ]
    },
    {
        id: "box-7",
        name: "Access to Exhibitors",
        shortDescription: "High-quality physical exhibition materials and pull-up banners.",
        fullDescription: "Stand out at your next trade show or expo. We design, print, and deliver large-format banners, business cards, and director chairs straight to you.",
        iconName: "presentation",
        tiers: [
            {
                name: "Expo Pack",
                price: 15000,
                priceDisplay: "R15,000",
                paymentLink: "https://pay.yoco.com/the-access-group-exhibitors",
                deliverables: ["Banner Design (3x2.25m)", "2 Pull-up Banners", "Branded Tablecloth", "100 Business Cards", "2 Printed Director Chairs", "Printing & Delivery (3-5 days)"]
            }
        ]
    },
    {
        id: "box-8",
        name: "International Market Access",
        shortDescription: "Export readiness, trade desks, and international matchmaking.",
        fullDescription: "Take your business global. We provide an extensive trade roadmap, register you on international networks, and manually match you with viable global partners.",
        iconName: "globe",
        tiers: [
            {
                name: "Global Expansion",
                price: 15000,
                priceDisplay: "R15,000+",
                paymentLink: "https://pay.yoco.com/the-access-group-international",
                deliverables: ["5-country Trade Roadmap (UAE, USA, China, EU, AfCFTA)", "Trade Desk Registration (e.g., DTIC SA)", "Export Readiness Check", "Trade Missions & Events Calendar", "Manual Matchmaking with 15 Global Partners", "Training Protocol on International Business", "Profiling on International Networks", "VIP Ticket to Import Export Access Summit 2026"]
            }
        ],
        customFields: [
            { name: "targetMarkets", label: "Regions of Interest (e.g. EU, USA, Africa)", type: "text", required: true }
        ]
    }
];