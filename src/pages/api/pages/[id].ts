import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET': {
        const page = await prisma.page.findUnique({ where: { id } });
        return res.json(page);
      }
      case 'PUT': {
        // ← take req.body directly, don’t JSON.parse it
        const data = req.body;
        const updated = await prisma.page.update({ where: { id }, data });
        return res.json(updated);
      }
      case 'DELETE': {
        await prisma.page.delete({ where: { id } });
        return res.status(204).end();
      }
      default: {
        res.setHeader('Allow', ['GET','PUT','DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (error) {
    console.error(`Error in [id] handler:`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}