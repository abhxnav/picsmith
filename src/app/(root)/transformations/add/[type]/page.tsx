import { Header, TransformationForm } from '@/components'
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions'
import { SearchParamProps, TransformationTypeKey } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth()
  const transformation = transformationTypes[type]
  console.log('transformation', transformation)

  if (!userId) redirect('/sign-in')

  const user = await getUserById(userId)

  return (
    <div>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </div>
  )
}

export default AddTransformationTypePage
