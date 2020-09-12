function createBoar(data) {
  return {
    ...data,
    birthDate: new Date(data.birthDate),
    recordDate: new Date(data.recordDate),
  }
}

function createHog(data) {
  return {
    ...data,
    birthDate: new Date(data.birthDate),
    recordDate: new Date(data.recordDate),
    nipplesCount: Number(data.nipplesCount),
  }
}

function createSow(data) {
  return {
    ...data,
    birthDate: new Date(data.birthDate),
    recordDate: new Date(data.recordDate),
    nipplesCount: Number(data.nipplesCount),
  }
}

export const convertData = (data, collection) => {
  data = JSON.parse(data)

  switch (collection) {
    case 'boars':
      return createBoar(data)
    case 'hogs':
      return createHog(data)
    case 'sows':
      return createSow(data)
    default:
      return data
  }
}
