export function queryParam() {
  function get(key) {
    if (process.browser) {
      const query =  document.location.search.replace('?', '').split('&')
      let value = ''

      const find = query.find(value => {
        const find = value.split('=')
        return find[0] === key
      })

      if (find !== undefined) {
        value = find.substring(find.indexOf('=') + 1)
      }

      return decodeURI(value)
    }
  }

  function set(key, value) {
    if (process.browser) {
      const baseUrl = [document.location.protocol, '//', document.location.host, document.location.pathname].join(''),
        urlQueryString = document.location.search,
        newParam = key + '=' + value
      let params = '?' + newParam

      // If the "search" string exists, then build params from it
      if (urlQueryString) {
        const updateRegex = new RegExp('([\?&])' + key + '[^&]*')
        const removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?')

        if (typeof value === 'undefined' || value === null || value === '') { // Remove param if value is empty
          params = urlQueryString.replace(removeRegex, "$1")
          params = params.replace( /[&;]$/, '')

        } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
          params = urlQueryString.replace(updateRegex, "$1" + newParam)

        } else { // Otherwise, add it to end of query string
          params = urlQueryString + '&' + newParam
        }
      }

      // no parameter was set so we don't need the question mark
      params = params === '?' ? '' : params

      window.history.replaceState({}, '', baseUrl + params)
    }
  }

  function clear(key) {
    if (get(key)) {
      set(key, null)
    }
  }

  return {
    get,
    set,
    clear,
  }
}
