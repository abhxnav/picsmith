'use client'

import { TypingEffect } from '@/components'
import {
  fadeIn,
  navLinkVariants,
  slideIn,
  staggerContainer,
} from '@/lib/motion'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ImageAnimation from '@/../public/assets/animations/image.json'
import Lottie from 'lottie-react'

const navLinks = [
  {
    name: 'Features',
    href: '#features',
  },
  {
    name: 'How It Works',
    href: '#how-it-works',
  },
  {
    name: 'Contact',
    href: '#contact',
  },
]

const Home = () => {
  return (
    <motion.div
      variants={staggerContainer(0.2, 1)}
      initial="hidden"
      whileInView="show"
      className="h-screen w-screen relative md:p-28 sm:p-14 p-5 flex md:flex-row flex-col gap-8 items-center justify-center md:justify-end"
    >
      <div className="absolute top-0 right-0 landing-gradient w-screen h-screen -z-50" />

      <nav className="py-8 bg-transparent text-base md:text-xl text-white font-semibold absolute top-0 z-50 left-1/2 -translate-x-1/2 w-full">
        <ul className="flex items-center justify-center gap-5">
          {navLinks.map((link, idx) => (
            <motion.li
              variants={navLinkVariants(idx)}
              initial="hidden"
              whileInView="show"
              key={link.name}
              className="hover:-translate-y-1"
            >
              <Link
                href={link.href}
                className="hover:text-accent-300 transition duration-300"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div
        variants={slideIn('left', 'spring', 0.2, 1)}
        className="absolute z-0 top-[10%] md:top-0 left-[10%] md:left-0 w-[70%] md:w-3/5 brightness-[0.4] max-w-[1000px]"
      >
        <Lottie animationData={ImageAnimation} className="-rotate-[20deg]" />
      </motion.div>

      <motion.div
        variants={slideIn('right', 'spring', 0.2, 1)}
        className="flex flex-col gap-2 sm:gap-4 md:gap-6 items-center justify-center text-center md:text-right z-50 size-full md:w-[80%] max-w-[1000px]"
      >
        <TypingEffect title="Unleash Your Creativity with AI-Powered Photo Editing" />
        <motion.p
          variants={fadeIn('up', 'tween', 2, 3)}
          className="text-sm sm:text-xl md:text-2xl text-dark-800"
        >
          Transform photos like never before with PicSmith. Remove backgrounds,
          recolor images, and bring new life to your photos effortlessly.
        </motion.p>
        <motion.div
          variants={fadeIn('up', 'tween', 3, 3)}
          initial="hidden"
          whileInView="show"
          className="flex gap-2 w-full justify-center md:justify-end mt-2 sm:mt-0"
        >
          <motion.div
            variants={slideIn('right', 'spring', 3.5, 1)}
            className="bg-accent-300 text-black font-semibold sm:py-3 sm:px-6 py-2 px-4 rounded-lg shadow-lg hover:bg-accent-400 transition duration-300 text-sm sm:text-base"
          >
            <Link href="/sign-in">Get Started</Link>
          </motion.div>
          <motion.div
            variants={slideIn('right', 'spring', 4, 1)}
            className="border border-accent-300 text-accent-300 sm:px-6 py-2 px-4 rounded-lg hover:bg-accent-300 hover:text-black transition duration-300 shadow-md text-sm sm:text-base"
          >
            <Link href="#features">Learn More</Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Home
