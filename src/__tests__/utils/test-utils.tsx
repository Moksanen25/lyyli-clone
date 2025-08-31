import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Simple test utilities without complex providers for now
export * from '@testing-library/react'

// Test utilities module
describe('test-utils', () => {
  it('exports testing library functions', () => {
    expect(typeof render).toBe('function')
  })
})
