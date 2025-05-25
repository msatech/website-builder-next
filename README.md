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
