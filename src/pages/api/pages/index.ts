import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { method } = req;
  try {
    switch (method) {
      case 'GET': {
        const pages = await prisma.page.findMany();
        return res.json(pages);
      }
      case 'POST': {
        // Use req.body directly—do NOT JSON.parse it
        const data = req.body;
        const page = await prisma.page.create({ data });
        return res.status(201).json(page);
      }
      default: {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (error) {
    console.error('Error in POST /api/pages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
