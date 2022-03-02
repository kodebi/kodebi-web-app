export async function performFetch(url, id, token, method, body) {
  let config = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type':
        body === typeof FormData ? 'multipart/form-data' : 'application/json',
    },
    body: body !== typeof FormData && JSON.stringify(body),
  }
  return fetch(`${id ? url + id : url}`, config).then(async (res) => {
    if (res.status === 401) {
      return Promise.reject('You are not authorized. Please refresh your token')
    }
    let data = await res.json()
    if (res.ok) {
      if (data.length > 1) {
        const chronologicalData = data.reverse()
        return chronologicalData
      } else {
        return data
      }
    } else {
      return Promise.reject(data)
    }
  })
}
