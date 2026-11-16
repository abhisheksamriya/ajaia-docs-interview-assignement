# AI Workflow & Tooling Note

##  AI Tools Used
- **Gemini & Stich** i use gemini as an assistant or stich as a graphic designer for this application i use gemini for rapid component boiler code, writing Express route boilerplate, resolving TypeScript compiler errors, and fixing Tailwind CSS layouts.

##  Where AI Materially Sped Up Work
- **Boilerplate & Routing:** Quickly generated the boilerplate structure for Next.js app pages and Express controllers, saving hours of manual typing.
- **Debugging Types & Build Errors:** Helped instantly debug tricky TypeScript issues (like handling async route params in Next.js `Suspense` and resolving Mongoose typing overlaps).
- **UI Layouts:** Sped up styling the dark obsidian theme and structuring sidebar/editor split views.

## What AI-Generated Output Was Changed or Rejected
- **Rejected Generic AI UI Themes:** Initial AI suggestions often lean towards bright gradients or generic purple/indigo floating cards that every ai ui looks like . I rejected those and forced a strict, minimalist, high-contrast Linear/Obsidian dark aesthetic to match professional developer tools.I also rejected using something like cloudinary suggestion to store files i normally store text in database , also i reject ai comple single file code instead i use components to keep ui clean .
- **Kept Scope Tight:** When AI suggested adding extra features like comments or version history, I explicitly rejected them to stay strictly focused on the core assignment requirements and avoid overcomplicating the build.

## 🔍 Verification & Reliability
- Tested all user flows manually: created documents, checked auto-save triggers, imported `.txt`/`.md` files, and simulated document sharing between two test accounts (`user_1` and `user_2`).
- Verified production builds locally and fixed deployment blockers before pushing to GitHub and Vercel.