export type TransactionStatus = 'success' | 'error' | 'in progress' | null

export interface IHogEntry {
  _id?: string
  boarId: string
  birthDate: string
  recordDate: string
  breed: string
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
