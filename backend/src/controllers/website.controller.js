import extractJson from "../services/extract.json.response.js";
import generateResponse from "../services/openRouter.js";
import websiteModel from "../models/website.model.js";
import userModel from "../models/user.model.js";

const masterPrompt = `
YOU ARE THE WORLD'S BEST FRONTEND ARCHITECT,
AWARD-WINNING UI/UX DESIGNER,
CREATIVE DIRECTOR,
AND SENIOR JAVASCRIPT ENGINEER.

YOU CREATE WEBSITES THAT LOOK LIKE THEY BELONG ON:

• Awwwards
• CSS Design Awards
• Dribbble
• Behance
• Apple
• Stripe
• Vercel
• Framer

YOUR DESIGNS ARE MODERN, PREMIUM, IMMERSIVE,
AND VISUALLY UNFORGETTABLE.

EVERY WEBSITE SHOULD MAKE THE USER SAY:
"WOW... THIS LOOKS LIKE A $20,000 WEBSITE."

YOUR JOB IS NOT TO BUILD A NORMAL WEBSITE.

YOUR JOB IS TO CREATE A MASTERPIECE.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USER REQUIREMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{USER_PROMPT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIMARY GOAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Even if the user's prompt is extremely short
(example: "make a pizza website")

You MUST intelligently expand the idea into a
complete premium website with beautiful UI,
professional content,
high-end layouts,
and polished interactions.

NEVER create a basic landing page.

ALWAYS surprise the user.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN PHILOSOPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The UI MUST feel:

✔ Premium
✔ Modern
✔ Luxury
✔ Minimal
✔ Elegant
✔ Interactive
✔ Professional
✔ Memorable
✔ Creative

Every section should have proper spacing,
depth,
hierarchy,
beautiful typography,
soft shadows,
glassmorphism where appropriate,
modern gradients,
rounded corners,
and premium color combinations.

Avoid generic layouts.

Every project should feel unique.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISUAL QUALITY (VERY IMPORTANT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every generated website MUST include:

• Beautiful Hero Section
• Large visual impact
• Strong typography
• High-quality imagery
• Premium cards
• Hover animations
• Micro interactions
• Scroll animations
• Floating decorative elements
• Soft gradients
• Elegant shadows
• Modern buttons
• Section separators
• Professional icons (SVG only)
• Glass effects where suitable
• Modern spacing system
• Smooth transitions
• Beautiful footer

The website should look alive.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEADER (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EVERY WEBSITE MUST HAVE A PREMIUM STICKY HEADER.

Header requirements:

✔ Logo

✔ Navigation Buttons

Example:

Home

About

Services

Portfolio (if applicable)

Menu (if restaurant)

Products (if business)

Pricing (if suitable)

Testimonials

FAQ (if suitable)

Contact

The navigation should appear as modern rounded buttons.

The active page should be visually highlighted.

Hover animations are mandatory.

On mobile:

• Responsive hamburger menu
• Smooth open/close animation
• Touch-friendly navigation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WEBSITE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create all sections that logically fit the business.

Examples:

Restaurant

Home
About
Menu
Services
Gallery
Testimonials
Reservation
Contact
Footer

Agency

Home
About
Services
Portfolio
Pricing
Testimonials
Contact

E-commerce

Home
Products
Categories
Features
Reviews
Contact

The model should intelligently determine
which sections best fit the user's request.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSIVE DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THIS IS ABSOLUTELY REQUIRED.

The website must look PERFECT on:

✔ Mobile
✔ Tablet
✔ Laptop
✔ Desktop
✔ Ultra-wide monitors

Use:

• Mobile-first design
• CSS Grid
• Flexbox
• clamp()
• minmax()
• rem
• %
• vw
• vh

Every image must resize correctly.

Every section must adapt.

No horizontal scrolling.

No broken layouts.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Include premium interactions such as:

• Button hover effects

• Card lift animation

• Smooth transitions

• Animated navigation underline

• Scroll reveal animations

• Fade-in sections

• Floating objects

• Image zoom on hover

• Gradient button animations

• Ripple effects

• Soft glowing accents

• Scroll-to-top button

• Active navigation highlight

The website should feel dynamic without
using external libraries.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use ONLY

https://images.unsplash.com/

Every image URL MUST include

?auto=format&fit=crop&w=1600&q=80

Images must:

✔ Look premium

✔ Be visually consistent

✔ Be responsive

✔ Never overflow

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEVER use:

Lorem Ipsum

Dummy Text

Placeholder Paragraphs

Generate realistic,
professional,
business-quality copy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Output ONE HTML file only.

Exactly ONE

<style>

Exactly ONE

<script>

No external CSS

No external JS

No frameworks

No libraries

System fonts only.

Everything must work inside iframe srcdoc.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPA REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Navigation MUST behave like a Single Page Application.

Clicking header navigation buttons should:

✔ Smoothly navigate to the corresponding section

OR

✔ Switch between pages without reload.

No dead buttons.

No broken links.

No refreshes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FUNCTIONALITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Include JavaScript functionality where appropriate:

• Navigation

• Mobile menu

• Form validation

• Active navigation state

• Smooth scrolling

• Scroll-to-top button

• Interactive cards

Everything visible should work.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUALITY STANDARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Imagine this website is being judged by
professional designers.

It should be:

Beautiful.

Elegant.

Premium.

Creative.

Highly polished.

Award-worthy.

NEVER produce a generic template.

ALWAYS produce something visually impressive.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINAL SELF CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before responding verify:

✔ Beautiful premium UI

✔ Stunning Hero

✔ Sticky Header

✔ Navigation Buttons

✔ Responsive

✔ Mobile Menu

✔ Premium Color Palette

✔ Great Typography

✔ Professional Spacing

✔ Working JavaScript

✔ Hover Effects

✔ Responsive Images

✔ Modern Footer

✔ No Placeholder Content

✔ No Broken Buttons

✔ No Horizontal Scroll

✔ Production Ready

If any item fails,
rewrite before responding.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return RAW JSON ONLY

{
  "message":"Professional confirmation.",
  "code":"FULL HTML DOCUMENT"
}

NO Markdown.

NO Explanations.

NO Extra Text.

ONLY VALID JSON.
`;




export const generateWebsite = async (req, res) => {

    try {
        const { prompt } = req.body

        const slug =
            prompt
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")
            + "-" +
            Date.now();

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is Required!" })

        }

        const user = await userModel.findById(req.user._id)

        if (!user) {
            return res.status(400).json({ message: "User Not Found!" })
        }

        if (user.credits < 50) {
            return res.status(400).json({ message: "Not Enough Credits!" })
        }

        const finalPrompt = masterPrompt.replace("{USER_PROMPT}", prompt)

        let raw = ""
        let parsed = null

        for (let i = 0; i < 2 && !parsed; i++) {
            raw = await generateResponse(finalPrompt)
            parsed = await extractJson(raw)

            if (!parsed) {
                raw = await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON")
                parsed = await extractJson(raw)

            }
        }

        if (!parsed.code) {
            console.log("Ai Response have no Code!")
        }

        const website = await websiteModel.create({

            user: user._id,
            title: prompt.slice(0, 60),
            latestCode: parsed.code,
            slug: slug,
            conversation: [

                {
                    role: "Ai",
                    content: parsed.message
                },
                {
                    role: "User",
                    content: prompt
                },

            ]
        })

        user.credits = user.credits - 50
        await user.save()

        return res.status(201).json({
            website: website._id,
            remainingCredits: user.credits
        })
    } catch (error) {

        return res.status(500).json(`Generate website Error ${error}`)
    }
}

export const getWebsiteById = async (req, res) => {

    try {
        const website = await websiteModel.findOne({
            _id: req.params.id,
            user: req.user._id
        })
        if (!website) {
            return res.status(400).json({ message: "Website not Found!" })
        }

        return res.status(200).json(website)

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
            stack: error.stack
        })

    }

}

const updateMasterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT.
I HAVE AN EXISTING HTML/JS/CSS CODE AND I NEED YOU TO UPDATE IT BASED ON A NEW REQUIREMENT.

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

--------------------------------------------------
CURRENT CODE:
{CURRENT_CODE}
--------------------------------------------------

Apply the updates carefully without breaking existing functionality unless requested.
Maintain the responsive design, styling, and SPA structure.

OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence about what was updated",
  "code": "<FULL VALID HTML DOCUMENT INCLUDING PREVIOUS CODE AND NEW UPDATES>"
}

ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;

export const updateWebsite = async (req, res) => {
    try {
        const { websiteId, prompt, currentCode } = req.body;

        if (!websiteId || !prompt || !currentCode) {
            return res.status(400).json({ message: "Website ID, Prompt, and Current Code are required!" });
        }

        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User Not Found!" });
        }

        if (user.credits < 5) {
            return res.status(400).json({ message: "Not Enough Credits!" });
        }

        const website = await websiteModel.findOne({
            _id: websiteId,
            user: req.user._id
        });

        if (!website) {
            return res.status(404).json({ message: "Website not found!" });
        }

        const finalPrompt = updateMasterPrompt
            .replace("{USER_PROMPT}", prompt)
            .replace("{CURRENT_CODE}", currentCode);

        let raw = "";
        let parsed = null;

        for (let i = 0; i < 2 && !parsed; i++) {
            raw = await generateResponse(finalPrompt);
            parsed = await extractJson(raw);

            if (!parsed) {
                raw = await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON");
                parsed = await extractJson(raw);
            }
        }

        if (!parsed || !parsed.code) {
            return res.status(500).json({ message: "AI failed to generate valid code format." });
        }

        website.latestCode = parsed.code;
        website.conversation.push(
            { role: "User", content: prompt },
            { role: "Ai", content: parsed.message }
        );

        await website.save();

        user.credits = user.credits - 5;
        await user.save();

        return res.status(200).json({
            success: true,
            updatedCode: parsed.code,
            message: parsed.message,
            remainingCredits: user.credits
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Update website error: ${error.message}`,
            stack: error.stack
        });
    }
};

export const getAllWebsites = async (req, res) => {
    try {

        const websites = await websiteModel.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        return res.status(200).json(websites);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching projects" });
    }
};

export const deploy = async (req, res) => {

    try {
        const website = await websiteModel.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if (!website) {
            return res.status(400).json({ message: "Website not Found!" })
        }

        if (!website.slug) {

            website.slug = website.title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 60)
                + "-" + website._id.toString().slice(-5);
        }

        website.deployed = true;
        website.deployURL = `${process.env.FRONTEND_URL}/site/${website.slug}`

        await website.save()

        return res.status(200).json({
            url: website.deployURL
        })

    } catch (error) {
        return res.status(500).json({ message: "Deploy Backend Error" });
    }

}

export const getWebsiteBySlug = async (req, res) => {
    try {
        const website = await websiteModel.findOne({ slug: req.params.slug });
        if (!website) return res.status(404).json({ message: "Site not found" });
        return res.status(200).json(website);
    } catch (error) {
        return res.status(500).json({ message: "Error" });
    }
};
