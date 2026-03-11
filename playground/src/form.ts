export type LinkItem = {
  label: string
  url: string
  primary: boolean
  meta: {
    category: string
    createdAt: string
  }
}

export type FormValues = {
  profile: {
    firstName: string
    lastName: string
    email: string
    password: string
    bio: string
    phone: string
    website: string
    searchTerm: string
    favoriteColor: string
    avatar: FileList | null
    referralCode: string
  }
  schedule: {
    birthDate: string
    meetingTime: string
    reminderAt: string
    startMonth: string
    planningWeek: string
  }
  metrics: {
    age: number | null
    salary: number | null
    satisfaction: number
  }
  preferences: {
    role: string
    contactMethod: "email" | "phone" | "none"
    skills: string[]
    frameworks: string[]
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    termsAccepted: boolean
    newsletter: boolean
  }
  address: {
    street: string
    city: string
    state: string
    postalCode: string
    geo: {
      lat: number | null
      lng: number | null
    }
  }
  links: LinkItem[]
}

export const defaultLink = (): LinkItem => ({
  label: "",
  url: "",
  primary: false,
  meta: {
    category: "work",
    createdAt: "",
  },
})

export const defaultValues = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    phone: "",
    website: "",
    searchTerm: "",
    favoriteColor: "#4f46e5",
    avatar: null,
    referralCode: "RHF-DEV-001",
  },
  schedule: {
    birthDate: "",
    meetingTime: "",
    reminderAt: "",
    startMonth: "",
    planningWeek: "",
  },
  metrics: {
    age: null,
    salary: null,
    satisfaction: 50,
  },
  preferences: {
    role: "developer",
    contactMethod: "email" as const,
    skills: ["typescript"],
    frameworks: ["react"],
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    termsAccepted: false,
    newsletter: false,
  },
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    geo: {
      lat: null,
      lng: null,
    },
  },
  links: [defaultLink()],
}
