import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Home
