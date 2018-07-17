/**
 * Test the request function
 */

import request from '../request'

describe('request', () => {
  // Before each test, stub the fetch function
  beforeEach(() => {
    window.fetch = jest.fn()
  })

  describe('stubbing successful response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response('{"hello":"world"}', {
        headers: {
          'Content-type': 'application/json'
        },
        status: 200
      })

      window.fetch.mockReturnValue(Promise.resolve(res))
    })

    it('should format the response correctly', done => {
      request('/thisurliscorrect')
        .catch(done)
        .then(json => {
          expect(json.hello).toBe('world')
          done()
        })
    })
  })

  describe('stubbing 204 response', () => {
    // Before each test, pretend we got a successful response
    beforeEach(() => {
      const res = new Response('', {
        status: 204,
        statusText: 'No Content'
      })

      window.fetch.mockReturnValue(Promise.resolve(res))
    })

    it('should return null on 204 response', done => {
      request('/thisurliscorrect')
        .catch(done)
        .then(json => {
          expect(json).toBeNull()
          done()
        })
    })
  })

  describe('stubbing error response', () => {
    const notFoundStatusCode = 404

    // Before each test, pretend we got an unsuccessful response
    beforeEach(() => {
      const res = new Response('', {
        headers: {
          'Content-type': 'application/json'
        },
        status: notFoundStatusCode,
        statusText: 'Not Found'
      })

      window.fetch.mockReturnValue(Promise.resolve(res))
    })

    it('should catch errors', done => {
      request('/thisdoesntexist').catch(err => {
        expect(err.response.status).toBe(notFoundStatusCode)
        expect(err.response.statusText).toBe('Not Found')
        done()
      })
    })
  })
})
