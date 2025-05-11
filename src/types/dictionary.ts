export interface Dictionary {
  common: {
    home: string
    services: string
    portfolio: string
    about: string
    contact: string
    blog: string
    [key: string]: string
  }
  portfolio: {
    title: string
    subtitle: string
    view_details: string
    view_all: string
    technologies: string
    view_project: string
    categories?: {
      all: string
      web: string
      mobile: string
      blockchain: string
      ai: string
      [key: string]: string
    }
    [key: string]: any
  }
  about_page: {
    title: string
    subtitle: string
    longDescription: string
    heroImage?: string
    skills?: {
      title: string
      items: {
        name: string
        description: string
      }[]
    }
    experience?: {
      title: string
      items: {
        period: string
        role: string
        company: string
        description: string
      }[]
    }
  }
  [key: string]: any
} 