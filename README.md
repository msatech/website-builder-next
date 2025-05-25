# Next.js Site Builder

A WordPress-like visual site builder built with Next.js, Tailwind CSS, and shadcn/ui. Drag-and-drop widgets, real-time layout & design controls, and dynamic block rendering powered by Prisma and Next.js API routes.

## Admin > Add Pages
![image](https://github.com/user-attachments/assets/0030ca0c-0ee3-4435-881e-5f3ae1d31716)

##Page Preview
![image](https://github.com/user-attachments/assets/d0bcc506-2cf0-4938-b2a3-8b5be7690404)



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
└── package.json                  # Project metadata & scripts  


2. **Databse Setup**
npx prisma migrate dev --name init
npx prisma generate

3. **Run Dev Server**
npm run dev
Open http://localhost:3000.

## API Routes
**GET /api/pages/[id] → fetch page JSON**

**POST /api/pages → create new page**

**PUT /api/pages/[id] → update existing**

**DELETE /api/pages/[id] → remove**

## 🖱 Usage Flow

1. **Open Editor**  
   Go to `/admin/pages/new` to create a new page or `/admin/pages/[id]` to edit an existing one.

2. **Drag & Drop**  
   - Pick widgets from the **WidgetPalette** on the left.  
   - Drop them onto the **DroppableCanvas** or into a grid cell.

3. **Select a Block**  
   Click a block in the canvas to open its **SettingsPanel** on the right.

4. **Configure Styles & Props**  
   Adjust margins, paddings, colors, typography, grid settings, etc., and see the live preview.

5. **Save or Publish**  
   Use the **Save Draft** or **Publish** buttons in the header to persist your changes.

6. **View Public Page**  
   Visit `/[slug]` to view the published page on the front end.





