import extractJson from "../services/extract.json.response.js";
import generateResponse from "../services/openRouter.js";
import websiteModel from "../models/website.model.js";
import userModel from "../models/user.model.js";

const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID


--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
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

        // Update the website document
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