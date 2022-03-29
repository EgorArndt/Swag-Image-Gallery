import useSWR, { SWRConfiguration } from 'swr'

import { fetcher } from '../utils'

type UseApiProps = {
  url: string
  params?: URLSearchParams
  cb?: () => void
  config?: SWRConfiguration
}

const useApi = <DataType>({ url, params, cb, config }: UseApiProps) => {
  const usp = new URLSearchParams(params)

  usp.sort()
  const qs = usp.toString()

  const { data, error } = useSWR(
    qs !== '' ? `${url}?${qs}` : url,
    cb || fetcher,
    config
  ) as { data: DataType; error: any }

  return {
    loading: !error && !data,
    data,
    error,
  }
}

export default useApi
