import { Banner, Collection, Features } from '@/components'
import { getAllImages } from '@/lib/actions/image.actions'
import { SearchParamProps } from '@/types'

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1
  const searchQuery = (searchParams?.query as string) || ''
  const images = await getAllImages({ page, searchQuery })

  return (
    <div>
      <section>
        <Banner />
      </section>

      <section className="sm:mt-8">
        <Features />
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </div>
  )
}

export default Home
