"use client";

import { useState } from "react";
import { TranslationKeys } from "@/lib/i18n";

interface ContactFormProps {
  locale: string;
  translations: TranslationKeys;
}

export default function ContactForm({
  locale,
  translations: t,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    teamSize: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'contact-form'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
      setSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      // Show error state
      alert(
        locale === "fi"
          ? "Lomakkeen lähetys epäonnistui. Yritä uudelleen tai ota yhteyttä suoraan."
          : "Failed to submit form. Please try again or contact us directly."
      );
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
            className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors"
          />
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
            className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors"
          />
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
              className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors"
            />
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
              className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors"
            />
          </div>
        </div>

        {/* Team Size Field */}
        <div>
          <label
            htmlFor="teamSize"
            className="block text-sm font-medium text-foreground mb-2 font-sans"
          >
            {t["contact.form.teamsize.label"]}
          </label>
          <select
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors"
          >
            <option value="">Select team size</option>
            <option value="10-50">{t["contact.form.teamsize.option1"]}</option>
            <option value="50-100">{t["contact.form.teamsize.option2"]}</option>
            <option value="100-500">
              {t["contact.form.teamsize.option3"]}
            </option>
            <option value="500+">{t["contact.form.teamsize.option4"]}</option>
          </select>
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
            className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-forest transition-colors resize-vertical"
          />
        </div>

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
