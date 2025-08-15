// Updated 2024-12-19: Added client-side validation, CSRF protection, and improved error handling

"use client";

import { useState, useEffect } from "react";
import { VALIDATION_PATTERNS, validateInput } from "@/lib/security";

interface FormErrors {
  email?: string;
  company?: string;
  role?: string;
  phone?: string;
  organizationSize?: string;
  gdprConsent?: string;
  securityConsent?: string;
  general?: string;
}

export default function WaitlistForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    role: '',
    phone: '',
    countryCode: '+358',
    organizationSize: '50-100',
    gdprConsent: false,
    securityConsent: false
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
    
    // Validate phone if provided
    if (formData.phone) {
      const phoneValidation = validateInput(formData.phone, VALIDATION_PATTERNS.PHONE, 'Phone');
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.error;
      }
    }
    
    // Validate organization size
    if (!formData.organizationSize) {
      newErrors.organizationSize = 'Organization size is required';
    }
    
    // Validate GDPR consent
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'GDPR consent is required';
    }
    
    // Validate security consent
    if (!formData.securityConsent) {
      newErrors.securityConsent = 'Security consent is required';
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
    
    setLoading(true);
    
    try {
      // Send data to backend API with CSRF token
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'waitlist-form',
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
      setLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setErrors({ general: errorMessage });
    }
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-all duration-200 hover:border-forest/50 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.email ? 'border-red-500' : 'border-grayLight dark:border-gray-600'
            }`}
            placeholder="your.email@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-all duration-200 hover:border-forest/50 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.company ? 'border-red-500' : 'border-grayLight dark:border-gray-600'
            }`}
            placeholder="Your Organization"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company}</p>
          )}
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
                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-all duration-200 hover:border-forest/50 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                     errors.role ? 'border-red-500' : 'border-grayLight dark:border-gray-600'
                   }`}
                   placeholder="e.g., Operations Manager, Communications Director"
                 />
                 {errors.role && (
                   <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                 )}
               </div>

               <div>
                 <label htmlFor="phone" className="block text-sm font-medium text-forest mb-2">
                   Phone Number
                 </label>
                 <div className="flex gap-3">
                   <div className="relative">
                     <select
                       name="countryCode"
                       value={formData.countryCode}
                       onChange={handleInputChange}
                       className="appearance-none px-4 py-3 pr-10 border border-grayLight dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-forest/50 cursor-pointer shadow-sm"
                     >
                       <option value="+358">🇫🇮 +358</option>
                       <option value="+46">🇸🇪 +46</option>
                       <option value="+47">🇳🇴 +47</option>
                       <option value="+45">🇩🇰 +45</option>
                       <option value="+31">🇳🇱 +31</option>
                       <option value="+49">🇩🇪 +49</option>
                       <option value="+33">🇫🇷 +33</option>
                       <option value="+44">🇬🇧 +44</option>
                       <option value="+1">🇺🇸 +1</option>
                       <option value="+86">🇨🇳 +86</option>
                       <option value="+81">🇯🇵 +81</option>
                       <option value="+91">🇮🇳 +91</option>
                       <option value="+61">🇦🇺 +61</option>
                       <option value="+64">🇳🇿 +64</option>
                     </select>
                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </div>
                   </div>
                   <input
                     type="tel"
                     id="phone"
                     name="phone"
                     value={formData.phone}
                     onChange={handleInputChange}
                     className="flex-1 px-4 py-3 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-all duration-200 hover:border-forest/50 shadow-sm"
                     placeholder="Phone number"
                   />
                 </div>
               </div>

                          <div>
           <label htmlFor="organizationSize" className="block text-sm font-medium text-forest mb-2">
             Organization Size *
           </label>
           <div className="relative">
             <select
               id="organizationSize"
               name="organizationSize"
               required
               value={formData.organizationSize}
               onChange={handleInputChange}
               className="appearance-none w-full px-4 py-3 pr-10 border border-grayLight rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent transition-all duration-200 bg-white hover:border-forest/50 cursor-pointer shadow-sm"
             >
               <option value="1-10">1-10 people</option>
               <option value="10-50">10-50 people</option>
               <option value="50-100">50-100 people</option>
               <option value="100-500">100-500 people</option>
               <option value="500+">500+ people</option>
             </select>
             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
               <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
               </svg>
             </div>
           </div>
         </div>

         <div className="space-y-4">
           <div className="flex items-start gap-3">
             <input
               type="checkbox"
               id="gdpr-consent"
               name="gdprConsent"
               required
               className="mt-1 h-4 w-4 text-forest focus:ring-forest border-grayLight rounded"
             />
             <label htmlFor="gdpr-consent" className="text-sm text-forest">
               I consent to Lyyli.ai processing my personal data for the purpose of joining the waitlist. 
               I understand that my data will be handled in accordance with our{' '}
               <a 
                 href="/en/privacy" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-turquoise hover:text-turquoise/80 underline"
               >
                 Privacy Policy
               </a>
               . I can withdraw my consent at any time by contacting us.
             </label>
           </div>
           {errors.gdprConsent && (
             <p className="text-sm text-red-600">{errors.gdprConsent}</p>
           )}

           <div className="flex items-start gap-3">
             <input
               type="checkbox"
               id="security-consent"
               name="securityConsent"
               required
               className="mt-1 h-4 w-4 text-forest focus:ring-forest border-grayLight rounded"
             />
             <label htmlFor="security-consent" className="text-sm text-forest">
               I acknowledge that Lyyli.ai implements appropriate technical and organizational measures 
               to ensure the security of my personal data, including protection against unauthorized 
               access, alteration, disclosure, or destruction.
             </label>
           </div>
           {errors.securityConsent && (
             <p className="text-sm text-red-600">{errors.securityConsent}</p>
           )}
         </div>

         {/* General Error Display */}
         {errors.general && (
           <div className="bg-red-50 border border-red-200 rounded-lg p-4">
             <p className="text-sm text-red-600">{errors.general}</p>
           </div>
         )}

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
