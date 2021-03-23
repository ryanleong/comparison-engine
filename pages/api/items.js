import { getItems } from 'utils/firebase';

export default async (req, res) => {
  if (req.method === 'GET') {
    const items = await getItems();

    res.statusCode = 200;
    res.json({
      items,
      count: items.length,
    });

    return;
  }

  res.statusCode = 404;
  res.end();
};
