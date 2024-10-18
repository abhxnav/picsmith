import { Checkout, Header } from '@/components'
import { Button } from '@/components/ui'
import { subsPlans } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions'
import { SignedIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const CreditsPage = async () => {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const user = await getUserById(userId)

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />

      <section>
        <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3">
          {subsPlans.map((plan) => (
            <li
              key={plan.name}
              className="w-full rounded-2xl border-2 border-green-200/40 bg-dark-300 p-8 shadow-xl shadow-green-200/40 lg:max-w-none"
            >
              <div className="flex items-center justify-center flex-col gap-3">
                <p className="text-xl font-semibold text-accent-400">
                  {plan.name}
                </p>
                <p className="text-4xl font-semibold sm:text-5xl text-dark-800">
                  ${plan.price}
                </p>
                <p className="text-base font-normal">{plan.credits} Credits</p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? 'check.svg' : 'cross.svg'
                      }`}
                      alt="check"
                      width={28}
                      height={28}
                    />
                    <p className="text-base font-normal">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === 'Free' ? (
                <Button
                  variant="outline"
                  className="w-full rounded-full bg-dark-300 text-accent-400 hover:text-accent-400 cursor-not-allowed hover:bg-transparent"
                >
                  Free
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default CreditsPage
