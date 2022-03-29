import { createClient } from '@supabase/supabase-js'
import { useForm } from 'react-hook-form'
import { faker } from '@faker-js/faker'

import Search from '../components/Search'
import BlurImage from '../components/BlurImage'
// import useApi from '../hooks/useApi'
import type { Image } from '../models'

const populateSupabase = (arr: Image[]): Image[] => {
  let images = arr
  if (images.length >= 50) return images
  images.push({
    id: images.length,
    created_at: faker.date.past(),
    name: faker.name.firstName(),
    href: 'https://github.com/EgorArndt',
    username: `@${faker.name.jobDescriptor()}`,
    imageSrc:
      'https://avatars.githubusercontent.com/u/83025581?s=400&u=0400776c6e78edcb522915bac9f39222cc66b9f9&v=4',
  })
  populateSupabase(images)
  return images
}

const Gallery = ({ images }: { images: Image[] }) => {
  const { register } = useForm({
    defaultValues: {
      query: '',
    },
  })

  return (
    <>
      <Search {...register('query')} />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images.map((image) => (
            <BlurImage key={image.id} image={image} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Gallery

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
  supabaseAdmin.from('images').insert(populateSupabase([]))

  const { data } = await supabaseAdmin.from('images').select('*').order('id')

  return {
    props: {
      images: data,
    },
  }
}
