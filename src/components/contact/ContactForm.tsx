// Updated 2024-12-19: Added client-side validation, CSRF protection, and improved error handling

"use client";

import { useState, useEffect } from "react";
import { TranslationKeys } from "@/lib/i18n";
import { VALIDATION_PATTERNS, validateInput } from "@/lib/security";

interface ContactFormProps {
  locale: string;
  translations: TranslationKeys;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  organizationSize?: string;
  message?: string;
  general?: string;
}

export default function ContactForm({
  locale,
  translations: t,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    organizationSize: "",
    message: "",
  });

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    setCsrfToken(token);
  }, []);

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate name
    const nameValidation = validateInput(formData.name, VALIDATION_PATTERNS.NAME, 'Name');
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }
    
    // Validate email
    const emailValidation = validateInput(formData.email, VALIDATION_PATTERNS.EMAIL, 'Email');
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }
    
    // Validate company
    const companyValidation = validateInput(formData.company, VALIDATION_PATTERNS.COMPANY, 'Company');
    if (!companyValidation.isValid) {
      newErrors.company = companyValidation.error;
    }
    
    // Validate role
    const roleValidation = validateInput(formData.role, VALIDATION_PATTERNS.ROLE, 'Role');
    if (!roleValidation.isValid) {
      newErrors.role = roleValidation.error;
    }
    
    // Validate organization size
    if (!formData.organizationSize) {
      newErrors.organizationSize = 'Organization size is required';
    }
    
    // Validate message if provided
    if (formData.message) {
      const messageValidation = validateInput(formData.message, VALIDATION_PATTERNS.MESSAGE, 'Message');
      if (!messageValidation.isValid) {
        newErrors.message = messageValidation.error;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Send data to backend API with CSRF token
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'contact-form',
          csrfToken
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
      setSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setErrors({ general: errorMessage });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-playfair font-bold text-forest mb-2">
            {locale === "fi" ? "Kiitos yhteydenotostasi!" : "Thank you for your message!"}
          </h3>
          <p className="text-mediumGray mb-4">
            {locale === "fi" 
              ? "Otamme yhteyttä pian ja varaamme sinulle kartoituskeskustelun."
              : "We'll be in touch soon and schedule a discovery call for you."
            }
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-forest text-white px-6 py-2 rounded-lg hover:bg-forest/90 transition-colors"
          >
            {locale === "fi" ? "Lähetä toinen viesti" : "Send Another Message"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-soft p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
          {t["contact.form.title"]}
        </h2>
        <p className="text-lg text-muted-foreground font-sans leading-relaxed">
          {t["contact.form.subtitle"]}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2 font-sans"
          >
            {t["contact.form.name.label"]}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t["contact.form.name.placeholder"]}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors ${
              errors.name ? 'border-red-500' : 'border-grayLight'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2 font-sans"
          >
            {t["contact.form.email.label"]}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t["contact.form.email.placeholder"]}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors ${
              errors.email ? 'border-red-500' : 'border-grayLight'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Company and Role Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-foreground mb-2 font-sans"
            >
              {t["contact.form.company.label"]}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder={t["contact.form.company.placeholder"]}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors ${
                errors.company ? 'border-red-500' : 'border-grayLight'
              }`}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-foreground mb-2 font-sans"
            >
              {t["contact.form.role.label"]}
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder={t["contact.form.role.placeholder"]}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors ${
                errors.role ? 'border-red-500' : 'border-grayLight'
              }`}
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>
        </div>

        {/* Organization Size Field */}
        <div>
          <label
            htmlFor="organizationSize"
            className="block text-sm font-medium text-foreground mb-2 font-sans"
          >
            {t["contact.form.teamsize.label"]}
          </label>
          <div className="relative">
            <select
              id="organizationSize"
              name="organizationSize"
              value={formData.organizationSize}
              onChange={handleChange}
              required
              className={`appearance-none w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors ${
                errors.organizationSize ? 'border-red-500' : 'border-grayLight'
              }`}
            >
              <option value="">Select organization size</option>
              <option value="10-50">{t["contact.form.teamsize.option1"]}</option>
              <option value="50-100">{t["contact.form.teamsize.option2"]}</option>
              <option value="100-500">
                {t["contact.form.teamsize.option3"]}
              </option>
              <option value="500+">{t["contact.form.teamsize.option4"]}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.organizationSize && (
            <p className="mt-1 text-sm text-red-600">{errors.organizationSize}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-2 font-sans"
          >
            {t["contact.form.message.label"]}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t["contact.form.message.placeholder"]}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors resize-vertical ${
              errors.message ? 'border-red-500' : 'border-grayLight'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* General Error Display */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-forest/5 border border-forest/20 p-4 rounded-lg">
          <p className="text-sm text-forest font-medium font-sans">
            {t["contact.form.security.notice"]}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-forest text-white py-4 px-8 rounded-lg hover:bg-forest/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 font-sans"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t["contact.form.processing"]}
            </>
          ) : (
            <>
              {t["contact.form.submit"]}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
