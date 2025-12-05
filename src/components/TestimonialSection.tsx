'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import type { TranslationKeys } from '@/lib/i18n';
const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false, loading: () => <div /> }
);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface TestimonialSectionProps {
  translations?: TranslationKeys;
}

const getTestimonials = (t?: TranslationKeys): Testimonial[] => {
  if (!t) {
    return [];
  }

  return [
    {
      id: 1,
      name: t['testimonials.1.name'] || 'Maria Koskinen',
      role: t['testimonials.1.role'] || 'Marketing Director',
      company: t['testimonials.1.company'] || 'Nordic Consulting Group',
      content: t['testimonials.1.content'] || '',
      rating: 5,
    },
    {
      id: 2,
      name: t['testimonials.2.name'] || 'Erik Andersson',
      role: t['testimonials.2.role'] || 'CEO',
      company: t['testimonials.2.company'] || 'Tech Solutions Finland',
      content: t['testimonials.2.content'] || '',
      rating: 5,
    },
    {
      id: 3,
      name: t['testimonials.3.name'] || 'Anna Lindberg',
      role: t['testimonials.3.role'] || 'Communications Manager',
      company: t['testimonials.3.company'] || 'Scandinavian Partners',
      content: t['testimonials.3.content'] || '',
      rating: 5,
    },
    {
      id: 4,
      name: t['testimonials.4.name'] || 'Johan Bergman',
      role: t['testimonials.4.role'] || 'Operations Director',
      company: t['testimonials.4.company'] || 'Baltic Business Solutions',
      content: t['testimonials.4.content'] || '',
      rating: 5,
    },
    {
      id: 5,
      name: t['testimonials.5.name'] || 'Sofia Nilsson',
      role: t['testimonials.5.role'] || 'Head of Marketing',
      company: t['testimonials.5.company'] || 'Nordic Innovation Hub',
      content: t['testimonials.5.content'] || '',
      rating: 5,
    },
  ];
};

const customerLogos = [
  {
    name: 'Logo 1',
    logo: '/images/general/2.png',
    width: 200,
    height: 100,
  },
  {
    name: 'EX BW Logo',
    logo: '/images/general/EX BW 500 x 250 px.png',
    width: 250,
    height: 125,
  },
];

export default function TestimonialSection({
  translations: t,
}: TestimonialSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const testimonials = getTestimonials(t);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Customer Logos */}
        <MotionDiv
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-lg font-medium text-mediumGray  mb-4 font-sans">
              {t?.['testimonials.trustedBy'] ||
                'Trusted by leading organizations'}
            </h3>
          </div>

          <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 overflow-hidden flex-wrap">
            {customerLogos.map((company, index) => (
              <MotionDiv
                key={company.name}
                className="flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative w-32 h-16 sm:w-40 sm:h-20 md:w-48 md:h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={company.width}
                    height={company.height}
                    className="object-contain"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    unoptimized
                  />
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* Testimonials Section */}
        <MotionDiv
          ref={ref}
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2 className="text-4xl md:text-5xl text-forest  mb-6 font-playfair font-bold leading-tight">
            {t?.['testimonials.title'] || 'What our customers say'}
          </h2>
          <p className="text-xl text-mediumGray  max-w-3xl mx-auto font-sans leading-relaxed">
            {t?.['testimonials.subtitle'] ||
              'Real feedback from professional service organizations that have transformed their communication with Lyyli.ai'}
          </p>
        </MotionDiv>

        {/* Static Testimonials Grid */}
        <MotionDiv className="max-w-7xl mx-auto" variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <MotionDiv
                key={testimonial.id}
                className="bg-white  rounded-2xl p-8 shadow-lg  border border-gray-200  h-full"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
              >
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-mediumGray  font-sans leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-forest to-turquoise rounded-full flex items-center justify-center mx-auto mb-4 text-white font-semibold text-lg font-sans">
                    {testimonial.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                  <h4 className="text-forest font-playfair font-normal">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-mediumGray  font-sans">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* Bottom CTA */}
        <MotionDiv
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="https://app.lyyli.ai"
            className="inline-flex items-center px-8 py-4 bg-forest text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans hover:bg-turquoise"
          >
            {t?.['testimonials.cta'] || 'Join our satisfied customers'}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </MotionDiv>
      </div>
    </section>
  );
}
