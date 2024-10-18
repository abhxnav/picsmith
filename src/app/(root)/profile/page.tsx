import { Collection, Header } from '@/components'
import { getUserImages } from '@/lib/actions/image.actions'
import { getUserById } from '@/lib/actions/user.actions'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const user = await getUserById(userId)
  const images = await getUserImages({ page, userId: user._id })

  return (
    <>
      <Header title="Profile" />

      <section className="mt-5 flex flex-col gap-5 sm:flex-row md:mt-8 md:gap-10">
        <div className="w-full rounded-2xl border-2 border-green-200/40 bg-dark-300 p-5 shadow-lg shadow-green-200/40 md:px-6 md:py-8">
          <p className="text-sm font-medium md:text-base">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/credits.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="text-3xl font-bold md:text-4xl text-dark-800">
              {user.creditBalance}
            </h2>
          </div>
        </div>

        <div className="w-full rounded-2xl border-2 border-green-200/40 bg-dark-300 p-5 shadow-lg shadow-green-200/40 md:px-6 md:py-8">
          <p className="text-sm font-medium md:text-base">
            IMAGE MANIPULATION DONE
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photos.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="text-3xl font-bold md:text-4xl text-dark-800">
              {images?.data.length}
            </h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  )
}

export default Profile
