export type TransactionStatus = 'success' | 'error' | 'in progress' | null

export interface IHogEntry {
  _id?: string
  boarId: string
  birthDate: string
  recordDate: string
  breed: string
}
