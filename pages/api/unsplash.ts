import type { NextApiRequest, NextApiResponse } from 'next'

import { fetcher } from '../../utils'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const data = await fetcher(
    'https://api.unsplash.com/search/photos/?client_id=6nCUwyQ6mIUoStAoT5u6_4wPUjlglPEkbc4GuiGMkaM'
  )
  res.status(200).json(data)
}
