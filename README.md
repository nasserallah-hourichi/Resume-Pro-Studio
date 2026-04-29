# Pro Resume Studio

Pro Resume Studio is a browser-based resume builder for creating polished English and French resumes with live editing, layout customization, JSON import/export, drag-and-drop section ordering, PDF export, and Supabase-based authentication.

## Highlights

- Live inline editing directly inside the resume preview
- Bilingual resume support with English and French switching
- Drag-and-drop section reordering with saved order in `localStorage`
- Cloud save per user with Supabase-backed resume records
- Multiple resumes dashboard with create, open, duplicate, and delete actions
- Autosave with last-updated status
- Adjustable typography, colors, and section title sizing
- Multi-column skills layout with 2, 3, or 4 columns
- Optional profile photo and ATS mode toggle
- Prebuilt sections for Projects, Certifications, Awards, and Volunteer Work
- JSON import and export for saving and reusing resume data
- PDF export for clean, print-ready resumes
- Supabase email/password auth with Google and LinkedIn OAuth entry points
- Responsive interface for desktop and mobile screens

## Project Structure

- [index.html](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/index.html) contains the landing page, auth modal, and studio layout
- [style.css](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/style.css) contains the visual design and responsive styles
- [server.js](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/server.js) contains the client-side resume logic, rendering, authentication, import/export, and PDF generation
- [supabase-config.js](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/supabase-config.js) contains your local Supabase client configuration
- [supabase-config.example.js](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/supabase-config.example.js) shows the expected config format
- [supabase-schema.sql](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/supabase-schema.sql) creates the `resumes` table and RLS policies

## How To Run

This project does not require a build step.

1. Clone or download the project.
2. Serve the folder from a local HTTP URL.
3. Open the local app URL in your browser.

Example:

```powershell
npx serve .
```

## Supabase Setup

1. Create a Supabase project.
2. Copy your Supabase project URL and anon key.
3. Use the frontend project URL like `https://your-project-ref.supabase.co`, not the Postgres database connection string.
4. Update [supabase-config.js](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/supabase-config.js) for local development if needed.
5. In Vercel, set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `APP_URL` environment variables.
6. Run [supabase-schema.sql](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/supabase-schema.sql) in the Supabase SQL editor.
7. Add your app URL to Supabase Authentication `URL Configuration`.
8. Enable `Google` and `LinkedIn (OIDC)` in Supabase Authentication providers.
9. Configure Google and LinkedIn credentials inside Supabase before testing social sign-in.

Recommended Vercel environment variables:

```text
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key
APP_URL=https://your-vercel-domain.vercel.app
```

## How To Use

1. Open the landing page.
2. Create an account or sign in with email, Google, or LinkedIn.
3. Edit the name, title, summary, experience, education, skills, and languages directly in the resume preview.
4. Use the language buttons to switch between English and French.
5. Use the design toolbar to change font, text colors, section title color, and sizing.
6. Change the skills layout from 2 to 4 columns.
7. Drag sections using the handle on the left to reorder them.
8. Use `Import JSON` to load a saved resume and `Export` to download the current one.
9. Use `PDF Resume` to generate a downloadable PDF.
10. Use the `My Resumes` dashboard to create blank/sample resumes and let autosave sync changes to Supabase.

## Resume Data Format

Imported JSON should follow the app's data shape:

```json
{
  "fullName": "Jane Doe",
  "title": "Product Manager",
  "phone": "+1 555 123 4567",
  "email": "jane@example.com",
  "address": "Montreal, QC, Canada",
  "linkedin": "linkedin.com/in/janedoe",
  "summaryText": "Short professional summary",
  "experience": [
    {
      "position": "Senior Product Manager",
      "company": "Example Inc.",
      "date": "2022 - Present",
      "description": "Led roadmap and cross-functional delivery."
    }
  ],
  "education": [
    {
      "degree": "MBA, Business Administration",
      "date": "2020 | University Name"
    }
  ],
  "skills": ["Product Strategy", "Agile", "Stakeholder Management"],
  "languages": [
    {
      "name": "English",
      "level": "Fluent"
    }
  ],
  "customSections": [
    {
      "id": "custom-1",
      "title": "Projects",
      "content": "Your custom section content"
    }
  ]
}
```

## Dependencies

The app uses CDN-hosted libraries in the browser:

- `html2pdf.js` for PDF export
- `SortableJS` for drag-and-drop section ordering
- `@supabase/supabase-js` for authentication and session management
- `Font Awesome` for icons
- `Google Fonts` for typography

## Notes

- Section order is saved in the browser with `localStorage`.
- The file named `server.js` is currently frontend JavaScript, not a backend server.
- PDF output hides editing controls before export to keep the final document clean.
- Social login requires correct provider setup in the Supabase dashboard before it will work.

## Copyright

Copyright (c) 2026 Anis Ghabi. All rights reserved.
