export const navLinks = [
  {
    label: 'Home',
    route: '/',
    icon: '/assets/icons/home.svg',
  },
  {
    label: 'Image Restore',
    route: '/transformations/add/restore',
    icon: '/assets/icons/restore.svg',
  },
  {
    label: 'Generative Fill',
    route: '/transformations/add/fill',
    icon: '/assets/icons/magic-wand.svg',
  },
  {
    label: 'Object Remove',
    route: '/transformations/add/remove',
    icon: '/assets/icons/magic-broom.svg',
  },
  {
    label: 'Object Recolor',
    route: '/transformations/add/recolor',
    icon: '/assets/icons/color-palette.svg',
  },
  {
    label: 'Background Remove',
    route: '/transformations/add/removeBackground',
    icon: '/assets/icons/remove-bg.svg',
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: '/assets/icons/profile.svg',
  },
  {
    label: 'Buy Credits',
    route: '/credits',
    icon: '/assets/icons/buy-creds.svg',
  },
]

export const transformationTypes = {
  restore: {
    type: 'restore',
    title: 'Restore Image',
    subTitle: 'Refine images by removing noise and imperfections',
    config: { restore: true },
    icon: 'restore.svg',
  },
  removeBackground: {
    type: 'removeBackground',
    title: 'Background Remove',
    subTitle: 'Removes the background of the image using AI',
    config: { removeBackground: true },
    icon: 'remove-bg.svg',
  },
  fill: {
    type: 'fill',
    title: 'Generative Fill',
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: 'magic-wand.svg',
  },
  remove: {
    type: 'remove',
    title: 'Object Remove',
    subTitle: 'Identify and eliminate objects from images',
    config: {
      remove: { prompt: '', removeShadow: true, multiple: true },
    },
    icon: 'magic-broom.svg',
  },
  recolor: {
    type: 'recolor',
    title: 'Object Recolor',
    subTitle: 'Identify and recolor objects from the image',
    config: {
      recolor: { prompt: '', to: '', multiple: true },
    },
    icon: 'color-palette.svg',
  },
}

export const transformationDefaultValues = {
  title: '',
  aspectRatio: '',
  color: '',
  prompt: '',
  publicId: '',
}

export const aspectRatioOptions = {
  '1:1': {
    aspectRatio: '1:1',
    label: 'Square (1:1)',
    width: 1000,
    height: 1000,
  },
  '3:4': {
    aspectRatio: '3:4',
    label: 'Standard Portrait (3:4)',
    width: 1000,
    height: 1334,
  },
  '9:16': {
    aspectRatio: '9:16',
    label: 'Phone Portrait (9:16)',
    width: 1000,
    height: 1778,
  },
}
