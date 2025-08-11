"use client";

import { useEffect, useState } from "react";

export default function WaitlistForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    role: '',
    teamSize: '50-100'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
          <h3 className="text-xl font-playfair font-bold text-forest mb-2">Thank you for joining our waitlist!</h3>
          <p className="text-mediumGray mb-4">We'll notify you as soon as Lyyli is available for your organization.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-forest text-white px-6 py-2 rounded-lg hover:bg-forest/90 transition-colors"
          >
            Join Another Person
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-forest mb-2">
            Business Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-colors"
            placeholder="your.email@company.com"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-forest mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-colors"
            placeholder="Your Organization"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-forest mb-2">
            Your Role *
          </label>
          <input
            type="text"
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-colors"
            placeholder="e.g., Operations Manager, Communications Director"
          />
        </div>

        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium text-forest mb-2">
            Team Size *
          </label>
          <select
            id="teamSize"
            name="teamSize"
            required
            value={formData.teamSize}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-colors"
          >
            <option value="10-50">10-50 people</option>
            <option value="50-100">50-100 people</option>
            <option value="100-500">100-500 people</option>
            <option value="500+">500+ people</option>
          </select>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-amber-800">
              <p className="font-medium">Note:</p>
              <p>This is a temporary form while we resolve our HubSpot integration. Your information will be manually processed and you'll receive updates via email.</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-forest text-white py-3 px-6 rounded-lg hover:bg-forest/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Joining Waitlist...
            </div>
          ) : (
            'Join Waitlist'
          )}
        </button>
      </form>
    </div>
  );
}
