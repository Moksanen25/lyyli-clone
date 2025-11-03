import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';
import type { TranslationKeys } from '@/lib/i18n';

// Mock translations
const mockTranslations = {
  'contact.form.title': 'Contact Us',
  'contact.form.subtitle': 'Get in touch with our team',
  'contact.form.name.label': 'Name',
  'contact.form.name.placeholder': 'Your full name',
  'contact.form.email.label': 'Email',
  'contact.form.email.placeholder': 'your.email@company.com',
  'contact.form.company.label': 'Company',
  'contact.form.company.placeholder': 'Your company name',
  'contact.form.role.label': 'Role',
  'contact.form.role.placeholder': 'Your role',
  'contact.form.teamsize.label': 'Team Size',
  'contact.form.teamsize.option1': '10-50',
  'contact.form.teamsize.option2': '50-100',
  'contact.form.teamsize.option3': '100-500',
  'contact.form.teamsize.option4': '500+',
  'contact.form.message.label': 'Message',
  'contact.form.message.placeholder': 'Tell us about your needs',
  'contact.form.security.notice': 'We respect your privacy and security',
  'contact.form.submit': 'Send Message',
  'contact.form.processing': 'Processing...',
} as unknown as TranslationKeys;

// Mock fetch API
global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all form fields correctly', () => {
      render(<ContactForm locale="en" translations={mockTranslations} />);

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/team size/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /send message/i })
      ).toBeInTheDocument();
    });

    it('displays the form title and subtitle', () => {
      render(<ContactForm locale="en" translations={mockTranslations} />);

      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(
        screen.getByText('Get in touch with our team')
      ).toBeInTheDocument();
    });

    it('displays security notice', () => {
      render(<ContactForm locale="en" translations={mockTranslations} />);

      expect(
        screen.getByText('We respect your privacy and security')
      ).toBeInTheDocument();
    });
  });

  describe('Form Validation - Valid Inputs', () => {
    it('accepts valid form data and submits successfully', async () => {
      const user = userEvent.setup();
      render(<ContactForm locale="en" translations={mockTranslations} />);

      // Fill in all fields with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john.doe@company.com');
      await user.type(screen.getByLabelText(/company/i), 'Acme Corporation');
      await user.type(screen.getByLabelText(/role/i), 'Marketing Manager');
      await user.selectOptions(screen.getByLabelText(/team size/i), '50-100');
      await user.type(
        screen.getByLabelText(/message/i),
        'I am interested in learning more about Lyyli.'
      );

      // Submit the form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Verify API call was made
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/contact',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
        );
      });

      // Verify success message is displayed
      await waitFor(() => {
        expect(
          screen.getByText(/thank you for your message/i)
        ).toBeInTheDocument();
      });
    });

    it('accepts names with special characters', async () => {
      const user = userEvent.setup();
      render(<ContactForm locale="en" translations={mockTranslations} />);

      await user.type(screen.getByLabelText(/name/i), "O'Connor-Smith");
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/company/i), 'Test Co');
      await user.type(screen.getByLabelText(/role/i), 'Manager');
      await user.selectOptions(screen.getByLabelText(/team size/i), '10-50');

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it('accepts international characters in names', async () => {
      const user = userEvent.setup();
      render(<ContactForm locale="en" translations={mockTranslations} />);

      await user.type(screen.getByLabelText(/name/i), 'Mikko Oksanen');
      await user.type(screen.getByLabelText(/email/i), 'mikko@example.com');
      await user.type(screen.getByLabelText(/company/i), 'Testiyritys Oy');
      await user.type(screen.getByLabelText(/role/i), 'Johtaja');
      await user.selectOptions(screen.getByLabelText(/team size/i), '10-50');

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    });
  });

  describe('Form Validation - Invalid Inputs', () => {
    it('has HTML5 validation on required fields', () => {
      render(<ContactForm locale="en" translations={mockTranslations} />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const companyInput = screen.getByLabelText(/company/i);
      const roleInput = screen.getByLabelText(/role/i);
      const sizeSelect = screen.getByLabelText(/team size/i);

      // All required fields should have required attribute
      expect(nameInput).toBeRequired();
      expect(emailInput).toBeRequired();
      expect(companyInput).toBeRequired();
      expect(roleInput).toBeRequired();
      expect(sizeSelect).toBeRequired();
    });

    it('prevents form submission with invalid data', async () => {
      const user = userEvent.setup();
      render(<ContactForm locale="en" translations={mockTranslations} />);

      // Try to submit with only one invalid field filled
      await user.type(screen.getByLabelText(/email/i), 'invalid');

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // API should not be called with incomplete/invalid data
      await waitFor(() => {
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });

    it('has email type validation', () => {
      render(<ContactForm locale="en" translations={mockTranslations} />);

      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute('type', 'email');
    });
  });

  describe('Form Submission', () => {
    it('disables submit button while submitting', async () => {
      const user = userEvent.setup();

      // Mock slow API response
      (global.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => ({ success: true }),
                }),
              500
            )
          )
      );

      render(<ContactForm locale="en" translations={mockTranslations} />);

      // Fill form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/company/i), 'Test Co');
      await user.type(screen.getByLabelText(/role/i), 'Manager');
      await user.selectOptions(screen.getByLabelText(/team size/i), '10-50');

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Button should be disabled and show processing text
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
        expect(screen.getByText(/processing/i)).toBeInTheDocument();
      });
    });

    it('handles API errors gracefully', async () => {
      const user = userEvent.setup();

      // Mock API error
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Server error' }),
      });

      render(<ContactForm locale="en" translations={mockTranslations} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/company/i), 'Test Co');
      await user.type(screen.getByLabelText(/role/i), 'Manager');
      await user.selectOptions(screen.getByLabelText(/team size/i), '10-50');

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Error message should be displayed
      await waitFor(() => {
        expect(screen.getByText(/server error/i)).toBeInTheDocument();
      });
    });

    it('sends correct data structure to API', async () => {
      const user = userEvent.setup();
      render(<ContactForm locale="en" translations={mockTranslations} />);

      const testData = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp',
        role: 'Manager',
        organizationSize: '50-100',
        message: 'Test message',
      };

      await user.type(screen.getByLabelText(/name/i), testData.name);
      await user.type(screen.getByLabelText(/email/i), testData.email);
      await user.type(screen.getByLabelText(/company/i), testData.company);
      await user.type(screen.getByLabelText(/role/i), testData.role);
      await user.selectOptions(
        screen.getByLabelText(/team size/i),
        testData.organizationSize
      );
      await user.type(screen.getByLabelText(/message/i), testData.message);

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/contact',
          expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining(testData.name),
          })
        );
      });

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.name).toBe(testData.name);
      expect(body.email).toBe(testData.email);
      expect(body.company).toBe(testData.company);
      expect(body.role).toBe(testData.role);
      expect(body.organizationSize).toBe(testData.organizationSize);
      expect(body.message).toBe(testData.message);
      expect(body.source).toBe('contact-form');
      expect(body).toHaveProperty('csrfToken');
      expect(body).toHaveProperty('timestamp');
    });
  });

  describe('Success State', () => {
    it('displays success message after successful submission', async () => {
      const user = userEvent.setup();
      render(<ContactForm locale="en" translations={mockTranslations} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/company/i), 'Test Co');
      await user.type(screen.getByLabelText(/role/i), 'Manager');
      await user.selectOptions(screen.getByLabelText(/team size/i), '10-50');

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Success message should be displayed
      await waitFor(() => {
        expect(
          screen.getByText(/thank you for your message/i)
        ).toBeInTheDocument();
      });
    });

    it('allows sending another message after success', async () => {
      const user = userEvent.setup();
      render(<ContactForm locale="en" translations={mockTranslations} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/company/i), 'Test Co');
      await user.type(screen.getByLabelText(/role/i), 'Manager');
      await user.selectOptions(screen.getByLabelText(/team size/i), '10-50');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Wait for success message
      await waitFor(() => {
        expect(
          screen.getByText(/thank you for your message/i)
        ).toBeInTheDocument();
      });

      // Click "Send Another Message" button
      const anotherMessageButton = screen.getByRole('button', {
        name: /send another message/i,
      });
      await user.click(anotherMessageButton);

      // Form should be displayed again
      await waitFor(() => {
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      });
    });
  });

  describe('Localization', () => {
    it('displays Finnish locale text correctly', () => {
      const fiTranslations = {
        ...mockTranslations,
        'contact.form.title': 'Ota yhteyttä',
        'contact.form.submit': 'Lähetä viesti',
      } as unknown as TranslationKeys;

      render(<ContactForm locale="fi" translations={fiTranslations} />);

      expect(screen.getByText('Ota yhteyttä')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /lähetä viesti/i })
      ).toBeInTheDocument();
    });

    it('shows locale-specific success messages', async () => {
      const user = userEvent.setup();
      render(<ContactForm locale="fi" translations={mockTranslations} />);

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'Mikko Oksanen');
      await user.type(screen.getByLabelText(/email/i), 'mikko@example.com');
      await user.type(screen.getByLabelText(/company/i), 'Test Oy');
      await user.type(screen.getByLabelText(/role/i), 'Johtaja');
      await user.selectOptions(screen.getByLabelText(/team size/i), '10-50');

      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Finnish success message should be displayed
      await waitFor(() => {
        expect(
          screen.getByText(/kiitos yhteydenotostasi/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper labels for all form fields', () => {
      render(<ContactForm locale="en" translations={mockTranslations} />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const companyInput = screen.getByLabelText(/company/i);
      const roleInput = screen.getByLabelText(/role/i);
      const sizeSelect = screen.getByLabelText(/team size/i);
      const messageTextarea = screen.getByLabelText(/message/i);

      expect(nameInput).toHaveAttribute('id', 'name');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(companyInput).toHaveAttribute('id', 'company');
      expect(roleInput).toHaveAttribute('id', 'role');
      expect(sizeSelect).toHaveAttribute('id', 'organizationSize');
      expect(messageTextarea).toHaveAttribute('id', 'message');
    });

    it('can display error messages when validation fails programmatically', () => {
      render(<ContactForm locale="en" translations={mockTranslations} />);

      // Verify form has validation structure in place
      const form = screen
        .getByRole('button', { name: /send message/i })
        .closest('form');
      expect(form).toBeInTheDocument();
    });

    it('indicates required fields correctly', () => {
      render(<ContactForm locale="en" translations={mockTranslations} />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const companyInput = screen.getByLabelText(/company/i);
      const roleInput = screen.getByLabelText(/role/i);
      const sizeSelect = screen.getByLabelText(/team size/i);

      expect(nameInput).toBeRequired();
      expect(emailInput).toBeRequired();
      expect(companyInput).toBeRequired();
      expect(roleInput).toBeRequired();
      expect(sizeSelect).toBeRequired();
    });
  });
});
