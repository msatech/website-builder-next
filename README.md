# Next.js Site Builder

A WordPress-like visual site builder built with Next.js, Tailwind CSS, and shadcn/ui. Drag-and-drop widgets, real-time layout & design controls, and dynamic block rendering powered by Prisma and Next.js API routes.

## Features

- **Visual Drag-and-Drop Editor**: Use a widget palette to drag blocks (heading, paragraph, image, list, quote, code, table, gallery, audio, video, grid) onto the canvas.
- **Grid Layouts**: Create nested grid blocks with configurable columns and horizontal/vertical gaps.
- **Real-Time Styling**: Adjust margins, padding (per side), font size (with units), colors, border radius, and object-fit directly in the settings panel.
- **Content Blocks**: Rich block types including lists, quotes, code snippets, tables, galleries, audio/video, and nested grids.
- **Responsive Tailwind CSS**: Fully styled using Tailwind and shadcn/ui components for a clean, responsive design.
- **Next.js API Routes + Prisma**: Save/load pages via RESTful API endpoints and a PostgreSQL (or SQLite) database using Prisma.
- **Authentication**: (Optional) Integrate NextAuth for secure access to the admin editor.

## Getting Started

### Prerequisites

- Node.js v18+  
- PostgreSQL (or SQLite) for database

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/msatech/website-builder-next.git
   cd website-builder-next

2. **Project Structure**
├── prisma/
│   └── schema.prisma             # Data model (Page, blocks stored as JSON)
├── public/                       # Static assets
├── src/
│   ├── app/
│   │   └── admin/pages/          # Admin editor UI (drag + drop)
│   ├── components/               # Reusable components
│   │   ├── BlockEditor/          # Types & context for blocks
│   │   ├── BlockRenderers/       # Heading, Paragraph, Image, Grid, etc.
│   │   ├── DroppableCanvas.tsx   # Canvas dropzone
│   │   ├── SettingsPanel.tsx     # Style & prop controls
│   │   └── WidgetPalette.tsx     # Drag-and-drop widget list
│   ├── lib/
│   │   └── prisma.ts             # Prisma client
│   ├── pages/
│   │   └── api/pages/            # CRUD API routes for pages
│   ├── styles/                   # Tailwind + global styles
│   └── hooks/                    # Custom React hooks (optional)
├── .env.example                  # Example environment vars
├── README.md                     # This file
└── package.json                  # Scripts & dependencies

2. **Databse Setup**
npx prisma migrate dev --name init
npx prisma generate

3. **Run Dev Server**
npm run dev
Open http://localhost:3000.

##  Project Structure
├── prisma/
│   └── schema.prisma             # Data model (Page, blocks stored as JSON)
├── public/                       # Static assets
├── src/
│   ├── app/
│   │   └── admin/pages/          # Admin editor UI (drag + drop)
│   ├── components/               # Reusable components
│   │   ├── BlockEditor/          # Types & context for blocks
│   │   ├── BlockRenderers/       # Heading, Paragraph, Image, Grid, etc.
│   │   ├── DroppableCanvas.tsx   # Canvas dropzone
│   │   ├── SettingsPanel.tsx     # Style & prop controls
│   │   └── WidgetPalette.tsx     # Drag-and-drop widget list
│   ├── lib/
│   │   └── prisma.ts             # Prisma client
│   ├── pages/
│   │   └── api/pages/            # CRUD API routes for pages
│   ├── styles/                   # Tailwind + global styles
│   └── hooks/                    # Custom React hooks (optional)
├── .env.example                  # Example environment vars
├── README.md                     # This file
└── package.json                  # Scripts & dependencies

## API Routes
**GET /api/pages/[id] → fetch page JSON**

**POST /api/pages → create new page**

**PUT /api/pages/[id] → update existing**

**DELETE /api/pages/[id] → remove**




