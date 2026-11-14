# Fola Creative Agency — Claude Code project starter

This package is a project brief and operating guide for Claude Code. Copy the contents of this folder into the **root of your existing repository**, alongside (not inside) your existing `images/` folder.

## Your repository should look like this before Claude starts

```text
fca-website/
├── images/                 # Your existing images; preserve every file
├── CLAUDE.md
├── PROMPT.md
├── START_HERE.md
└── docs/
    ├── BRAND_AND_DESIGN.md
    ├── ARCHITECTURE.md
    ├── CONTENT_AND_FUNCTIONALITY.md
    └── QUALITY_GATES.md
```

If your image folder has a different name or location, do not rename it just to match this example. Tell Claude where it is and have it adapt.

## Recommended first steps

1. Open the existing repository folder in VS Code.
2. Extract/copy these files into the repository root. Do not delete or move your image assets.
3. Open Claude Code in that repository.
4. Give Claude the full instruction in `PROMPT.md`.
5. Let Claude inspect assets and produce the design/architecture plan before it starts implementation. The prompt explicitly requires it to continue through implementation after the plan is approved by its own documented checks; it should not stop to ask routine questions.

## Skills to install

Use these commands in the repository terminal. Review the package/repository details before confirming any install prompt:

```bash
npx skills add anthropics/claude-code --skill frontend-design
npx skills add nicohodt/claude-code-ui-ux-skill
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices
```

The first two focus on design quality and UI/UX reasoning; the Vercel skill focuses on React/Next.js performance patterns. Claude must verify the current installation instructions and actual skill names before running commands. If a repository or skill has moved, find its current official instructions rather than silently substituting an unrelated skill.

Next.js 16.3+ can generate agent guidance and bundled documentation when the development server is started. Claude should use the documentation matching the installed Next.js version. Do not blindly install outdated Next.js skills or copy old APIs from tutorials.

Official references:
- Claude Code skills: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Anthropic frontend-design skill: https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design
- UI UX Pro Max: https://github.com/nicohodt/claude-code-ui-ux-skill
- Vercel agent skills: https://vercel.com/docs/agent-resources/skills
- Vercel skills repository: https://github.com/vercel-labs/agent-skills

## Important

This package is not a finished website or a guarantee that third-party services are configured. Claude must inspect the actual repository, asset files, current package versions, and deployment environment. It must not invent client testimonials, performance statistics, awards, service guarantees, or project outcomes.
