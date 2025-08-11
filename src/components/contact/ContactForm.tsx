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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real implementation, this would send the data securely
    console.log("Form submitted securely:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      role: "",
      teamSize: "",
      message: "",
    });

    setIsSubmitting(false);
    alert(
      locale === "fi"
        ? "Kiitos! Otamme yhteyttä pian."
        : "Thank you! We'll be in touch soon.",
    );
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
        <div className="bg-rose p-4 rounded-lg">
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
