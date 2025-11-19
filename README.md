# Clinic Management System

Modern, modular clinic management system with Firebase and GoHighLevel integration.

## Features

- Patient booking system
- Doctor portal with Kanban board
- Staff management portal
- Super admin dashboard
- Bilingual support (English/Arabic)
- Real-time updates with Firebase
- GHL automation integration

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, CSS3
- **Styling**: TailwindCSS
- **Database**: Firebase Firestore
- **External API**: GoHighLevel
- **Hosting**: Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
clinic-management/
├── public/          # HTML pages
├── js/
│   ├── config/      # Firebase & GHL config
│   ├── utils/       # Utilities (auth, i18n, toast, validation)
│   ├── services/    # Firestore & GHL API services
│   ├── components/  # Reusable components
│   └── pages/       # Page-specific logic
├── css/             # Stylesheets
└── api/             # Vercel serverless functions
```

## License

ISC
