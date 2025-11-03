import {
  getNestedValue,
  formatDate,
  debounce,
  throttle,
  generateId,
  isEmpty,
  deepClone,
  toTitleCase,
  truncateText,
  isMobile,
  isTouchDevice
} from '../utils'

// Mock navigator and window for mobile/touch detection tests
const mockNavigator = {
  userAgent: '',
  maxTouchPoints: 0
}

const mockWindow = {
  ontouchstart: undefined
}

Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true
})

Object.defineProperty(window, 'ontouchstart', {
  value: undefined,
  writable: true
})

describe('utils', () => {
  describe('getNestedValue', () => {
    const testObj = {
      user: {
        profile: {
          name: 'John Doe',
          age: 30
        },
        settings: {
          theme: 'dark'
        }
      }
    }

    it('returns nested value when path exists', () => {
      expect(getNestedValue(testObj, 'user.profile.name')).toBe('John Doe')
      expect(getNestedValue(testObj, 'user.profile.age')).toBe(30)
      expect(getNestedValue(testObj, 'user.settings.theme')).toBe('dark')
    })

    it('returns default value when path does not exist', () => {
      expect(getNestedValue(testObj, 'user.profile.email', 'default@example.com')).toBe('default@example.com')
      expect(getNestedValue(testObj, 'user.address.city', null)).toBe(null)
    })

    it('returns undefined when path does not exist and no default provided', () => {
      expect(getNestedValue(testObj, 'nonexistent.path')).toBeUndefined()
    })

    it('handles empty path', () => {
      expect(getNestedValue(testObj, '')).toBe(undefined)
    })
  })

  describe('formatDate', () => {
    const testDate = new Date('2023-12-25T10:30:00Z')

    it('formats date correctly for English locale', () => {
      const result = formatDate(testDate, 'en')
      expect(result).toMatch(/December 25, 2023/)
    })

    it('formats date correctly for Finnish locale', () => {
      const result = formatDate(testDate, 'fi')
      expect(result).toMatch(/25. joulukuuta 2023/)
    })

    it('handles string date input', () => {
      const result = formatDate('2023-12-25', 'en')
      expect(result).toMatch(/December 25, 2023/)
    })

    it('defaults to English locale', () => {
      const result = formatDate(testDate)
      expect(result).toMatch(/December 25, 2023/)
    })
  })

  describe('debounce', () => {
    jest.useFakeTimers()

    it('delays function execution', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(50)
      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(51)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('cancels previous calls when called again', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      jest.advanceTimersByTime(50)

      debouncedFn()
      jest.advanceTimersByTime(50)
      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(51)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    jest.useFakeTimers()

    it('limits function execution rate', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(1)

      throttledFn()
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(1)

      jest.advanceTimersByTime(100)
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })
  })

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()

      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(id1.length).toBeGreaterThan(0)
    })

    it('generates alphanumeric IDs', () => {
      const id = generateId()
      expect(/^[a-zA-Z0-9]+$/.test(id)).toBe(true)
    })
  })

  describe('isEmpty', () => {
    it('returns true for null and undefined', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
    })

    it('returns true for empty strings', () => {
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('   ')).toBe(true)
    })

    it('returns true for empty arrays', () => {
      expect(isEmpty([])).toBe(true)
      expect(isEmpty([])).toBe(true)
    })

    it('returns true for empty objects', () => {
      expect(isEmpty({})).toBe(true)
      expect(isEmpty(new Object())).toBe(true)
    })

    it('returns false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false)
      expect(isEmpty([1, 2, 3])).toBe(false)
      expect(isEmpty({ key: 'value' })).toBe(false)
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty(false)).toBe(false)
    })
  })

  describe('deepClone', () => {
    it('clones primitive values', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('hello')).toBe('hello')
      expect(deepClone(true)).toBe(true)
      expect(deepClone(null)).toBe(null)
    })

    it('clones arrays', () => {
      const original = [1, 2, { nested: 'value' }]
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned[2]).not.toBe(original[2])
    })

    it('clones objects', () => {
      const original = { a: 1, b: { c: 2 } }
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.b).not.toBe(original.b)
    })

    it('clones Date objects', () => {
      const original = new Date('2023-12-25')
      const cloned = deepClone(original)

      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned instanceof Date).toBe(true)
    })
  })

  describe('toTitleCase', () => {
    it('converts string to title case', () => {
      expect(toTitleCase('hello world')).toBe('Hello World')
      expect(toTitleCase('HELLO WORLD')).toBe('Hello World')
      expect(toTitleCase('hELLO wORLD')).toBe('Hello World')
    })

    it('handles single word', () => {
      expect(toTitleCase('test')).toBe('Test')
    })

    it('handles empty string', () => {
      expect(toTitleCase('')).toBe('')
    })

    it('handles multiple spaces', () => {
      expect(toTitleCase('hello   world')).toBe('Hello   World')
    })
  })

  describe('truncateText', () => {
    const longText = 'This is a very long text that should be truncated'

    it('returns original text if shorter than maxLength', () => {
      expect(truncateText('short', 10)).toBe('short')
    })

    it('truncates text and adds suffix', () => {
      expect(truncateText(longText, 20)).toBe('This is a very lo...')
      expect(truncateText(longText, 20, '***')).toBe('This is a very lo***')
    })

    it('handles exact maxLength', () => {
      expect(truncateText('exact', 5)).toBe('exact')
    })

    it('handles empty suffix', () => {
      expect(truncateText(longText, 20, '')).toBe('This is a very long ')
    })
  })

  describe('isMobile', () => {
    beforeEach(() => {
      // Reset mocks
      Object.defineProperty(window, 'navigator', {
        value: { ...mockNavigator },
        writable: true
      })
    })

    it('returns false on server side', () => {
      // Temporarily remove window
      const originalWindow = global.window
      delete (global as any).window

      expect(isMobile()).toBe(false)

      // Restore window
      global.window = originalWindow
    })

    it('detects mobile devices', () => {
      Object.defineProperty(window.navigator, 'userAgent', { value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', configurable: true })
      expect(isMobile()).toBe(true)

      Object.defineProperty(window.navigator, 'userAgent', { value: 'Mozilla/5.0 (Android 11; Mobile)', configurable: true })
      expect(isMobile()).toBe(true)

      Object.defineProperty(window.navigator, 'userAgent', { value: 'Mozilla/5.0 (Linux; Android 10)', configurable: true })
      expect(isMobile()).toBe(true)
    })

    it('returns false for desktop browsers', () => {
      Object.defineProperty(window.navigator, 'userAgent', { value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', configurable: true })
      expect(isMobile()).toBe(false)

      Object.defineProperty(window.navigator, 'userAgent', { value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', configurable: true })
      expect(isMobile()).toBe(false)
    })
  })

  describe('isTouchDevice', () => {
    beforeEach(() => {
      // Reset mocks for each test
      delete (window as any).ontouchstart
      Object.defineProperty(window, 'navigator', {
        value: { ...mockNavigator, maxTouchPoints: 0 },
        writable: true
      })
    })

    it('returns false on server side', () => {
      const originalWindow = global.window
      delete (global as any).window

      expect(isTouchDevice()).toBe(false)

      global.window = originalWindow
    })

    it('detects touch devices by ontouchstart', () => {
      window.ontouchstart = jest.fn()
      expect(isTouchDevice()).toBe(true)
    })

    it('detects touch devices by maxTouchPoints', () => {
      Object.defineProperty(window.navigator, 'maxTouchPoints', { value: 2, configurable: true })
      expect(isTouchDevice()).toBe(true)
    })

    it('returns false for non-touch devices', () => {
      window.ontouchstart = undefined
      Object.defineProperty(window.navigator, 'maxTouchPoints', { value: 0, configurable: true })
      expect(isTouchDevice()).toBe(false)
    })
  })
})
