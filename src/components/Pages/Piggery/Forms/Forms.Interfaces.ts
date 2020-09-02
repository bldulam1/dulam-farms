export type TransactionStatus = 'success' | 'error' | 'in progress' | null

export interface IBoarEntry {
  _id?: string
  boarId: string
  birthDate: string
  recordDate: string
  breed: string
}
interface TableEntry {
  headerName: string
  bodyDisplay: (value: any) => string | number
}

export const boarHeaders: {
  [key: string]: TableEntry
} = {
  boarId: {
    headerName: 'Boar ID',
    bodyDisplay: (value: string) => value,
  },
  birthDate: {
    headerName: 'Birth Date',
    bodyDisplay: (value: Date) => new Date(value).toLocaleDateString(),
  },
  breed: {
    headerName: 'Breed',
    bodyDisplay: (value: string) => value,
  },
  recordDate: {
    headerName: 'Date Recorded',
    bodyDisplay: (value: Date) => {
      value = new Date(value)
      const _date = [value.toLocaleDateString(), value.toLocaleTimeString()]
      return _date.join(' ')
    },
  },
}

export interface ISowEntry {
  sowID: string
  birthDate: string
  purchaseDate: string
  nipplesCount: number
  fatherPigID?: string
  motherPigID?: string
  breed: string
}

export interface IHogEntry {
  hogId: string
  birthDate: string
  recordDate: string
  fatherPigID: string
  motherPigID: string
  sex: 'Male' | 'Female'
  nipplesCount: number
}
