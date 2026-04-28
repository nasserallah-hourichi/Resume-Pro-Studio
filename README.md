# Pro Resume Studio

Pro Resume Studio is a browser-based resume builder for creating polished English and French resumes with live editing, layout customization, JSON import/export, drag-and-drop section ordering, and PDF export.

## Highlights

- Live inline editing directly inside the resume preview
- Bilingual resume support with English and French switching
- Drag-and-drop section reordering with saved order in `localStorage`
- Adjustable typography, colors, and section title sizing
- Multi-column skills layout with 2, 3, or 4 columns
- JSON import and export for saving and reusing resume data
- PDF export for clean, print-ready resumes
- Responsive interface for desktop and mobile screens

## Project Structure

- [index.html](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/index.html) contains the app layout and toolbar
- [style.css](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/style.css) contains the visual design and responsive styles
- [server.js](/c:/Users/Anis%20Ghabi/Desktop/resume_generator/server.js) contains the client-side resume logic, rendering, import/export, and PDF generation

## How To Run

This project does not require a build step.

1. Clone or download the project.
2. Open `index.html` in your browser.
3. Start editing the resume content directly on the page.

If your browser blocks some local features, serve the folder with a lightweight local server instead.

Example:

```powershell
npx serve .
```

Then open the local URL shown in the terminal.

## How To Use

1. Edit the name, title, summary, experience, education, skills, and languages directly in the resume preview.
2. Use the language buttons to switch between English and French.
3. Use the design toolbar to change font, text colors, section title color, and sizing.
4. Change the skills layout from 2 to 4 columns.
5. Drag sections using the handle on the left to reorder them.
6. Use `Import JSON` to load a saved resume and `Export` to download the current one.
7. Use `PDF Resume` to generate a downloadable PDF.

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
  ]
}
```

## Dependencies

The app uses CDN-hosted libraries in the browser:

- `html2pdf.js` for PDF export
- `SortableJS` for drag-and-drop section ordering
- `Font Awesome` for icons
- `Google Fonts` for typography

## Notes

- Section order is saved in the browser with `localStorage`.
- The file named `server.js` is currently frontend JavaScript, not a backend server.
- PDF output hides editing controls before export to keep the final document clean.

## Future Improvements

- Rename `server.js` to something like `app.js` for clarity
- Add section deletion controls
- Add template presets
- Add autosave for full resume content
- Add validation for imported JSON

## Copyright

Copyright © 2026 Anis Ghabi. All rights reserved.
