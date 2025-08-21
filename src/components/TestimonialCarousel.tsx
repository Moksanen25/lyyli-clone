"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Koskinen",
    role: "Marketing Director",
    company: "Nordic Consulting Group",
    content: "Lyyli.ai has transformed how we communicate with our clients. The AI-generated content is consistently on-brand and saves us hours every week. Our team can now focus on strategy instead of content creation.",
    rating: 5
  },
  {
    id: 2,
    name: "Erik Andersson",
    role: "CEO",
    company: "Tech Solutions Finland",
    content: "The multi-channel publishing feature is a game-changer. We can now maintain consistent messaging across Slack, Teams, and social media without any manual work. ROI was visible within the first month.",
    rating: 5
  },
  {
    id: 3,
    name: "Anna Lindberg",
    role: "Communications Manager",
    company: "Scandinavian Partners",
    content: "Lyyli.ai understands our brand voice perfectly. The AI suggestions are always relevant and professional, making our communications more engaging and effective. Highly recommended for any professional service company.",
    rating: 5
  },
  {
    id: 4,
    name: "Johan Bergman",
    role: "Operations Director",
    company: "Baltic Business Solutions",
    content: "We've seen a 40% reduction in time spent on internal communications. The approval workflows are seamless, and our team collaboration has improved significantly. This tool pays for itself.",
    rating: 5
  },
  {
    id: 5,
    name: "Sofia Nilsson",
    role: "Head of Marketing",
    company: "Nordic Innovation Hub",
    content: "The analytics and insights have given us unprecedented visibility into our communication performance. We can now make data-driven decisions about our content strategy and see real results.",
    rating: 5
  }
];

const customerLogos = [
  { name: "Nordic Consulting Group", logo: "NCG" },
  { name: "Tech Solutions Finland", logo: "TSF" },
  { name: "Scandinavian Partners", logo: "SP" },
  { name: "Baltic Business Solutions", logo: "BBS" },
  { name: "Nordic Innovation Hub", logo: "NIH" },
  { name: "Finnish Digital Agency", logo: "FDA" },
  { name: "Baltic Tech Group", logo: "BTG" },
  { name: "Scandinavian Legal", logo: "SL" }
];

export default function TestimonialCarousel() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Customer Logos */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-lg font-medium text-mediumGray dark:text-white mb-4 font-sans">
              Trusted by leading organizations
            </h3>
          </div>
          
          <div className="flex items-center justify-center space-x-12 md:space-x-16 lg:space-x-20 overflow-hidden">
            {customerLogos.map((company, index) => (
              <motion.div
                key={company.name}
                className="flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-24 h-16 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl flex items-center justify-center border border-forest/20 dark:border-white/20">
                  <span className="text-forest dark:text-white font-semibold text-lg font-sans">
                    {company.logo}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl md:text-5xl text-forest dark:text-white mb-6 font-playfair font-normal leading-tight">
            What our customers say
          </h2>
          <p className="text-xl text-mediumGray dark:text-white max-w-3xl mx-auto font-sans leading-relaxed">
            Real feedback from professional service organizations that have transformed their communication with Lyyli.ai
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={itemVariants}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 h-full"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-mediumGray dark:text-white font-sans leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-forest to-turquoise rounded-full flex items-center justify-center mx-auto mb-4 text-white font-semibold text-lg font-sans">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="font-semibold text-forest dark:text-white font-sans">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-mediumGray dark:text-white font-sans">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button className="swiper-button-prev w-12 h-12 bg-forest text-white rounded-full flex items-center justify-center hover:bg-turquoise transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="swiper-button-next w-12 h-12 bg-forest text-white rounded-full flex items-center justify-center hover:bg-turquoise transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a 
            href="#cta" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-forest to-turquoise text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-sans"
          >
            Join our satisfied customers
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #2F5D50;
          opacity: 0.3;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          position: static;
          margin: 0;
          transform: none;
        }
      `}</style>
    </section>
  );
}
