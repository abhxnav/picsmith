const Banner = () => {
  return (
    <div className="sm:flex items-center justify-center hidden h-72 flex-col gap-4 rounded-3xl border accent-gradient-ud p-10 shadow-inner">
      <div className="flex flex-wrap items-center justify-center gap-2 text-4xl font-semibold sm:text-5xl max-w-[700px] text-dark-400 shadow-sm">
        <h1 className="text-nowrap font-baloo">Unleash your creativity with</h1>
        <span className="font-bold bg-dark-400 text-accent-400 px-4 py-2 rounded-2xl font-dancing">
          PicSmith
        </span>
      </div>
    </div>
  )
}

export default Banner
