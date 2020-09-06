function createBoar(data) {
  return {
    ...data,
    birthDate: new Date(data.birthDate),
    recordDate: new Date(data.recordDate),
  }
}

export const convertData = (data, collection) => {
  data = JSON.parse(data)

  switch (collection) {
    case 'boars':
      return createBoar(data)
    default:
      return data
  }
}
