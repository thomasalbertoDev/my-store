import { retrieveData } from '@/lib/firebase/service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = await retrieveData('users');
  const data = users.map((user: any) => {
    delete user.password;
    return user;
  });

  if (req.method === 'GET') {
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'success',
      data: users,
    });
  }
}
