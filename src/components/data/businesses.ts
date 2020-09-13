interface Business {
  name: string
  link: string
  image: string
  description: string
}

const businesses: Business[] = [
  {
    name: 'Piggery',
    link: '/piggery/hogs',
    image:
      'https://images.unsplash.com/photo-1574220307753-957783ab948b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    description:
      'This is a media card. You can use this section to describe the content.',
  },
  {
    name: 'Broiler',
    link: '/broiler',
    image:
      'https://images.unsplash.com/photo-1548550035-dd30af4ced74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    description:
      'This is a media card. You can use this section to describe the content.',
  },
  {
    name: 'Cattle',
    link: '/cattle',
    image:
      'https://images.unsplash.com/photo-1551298457-c72eced6d0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    description:
      'This is a media card. You can use this section to describe the content.',
  },
]

export default businesses
