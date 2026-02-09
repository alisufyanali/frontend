"use client";

import { useState } from "react";
import Footer from "../Desktop/Sections/Footer";
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaPaperPlane
} from "react-icons/fa";

// Dynamic page configuration
const contactData = {
  hero: {
    title: "Get In Touch",
    highlight: "With Us",
    subtitle: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
  },
  contactInfo: [
    {
      icon: FaPhone,
      title: "Phone",
      details: ["+92 300 1234567", "+92 321 9876543"],
      link: "tel:+923001234567"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: ["info@pansariinn.com", "support@pansariinn.com"],
      link: "mailto:info@pansariinn.com"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      details: ["123 Herbal Street", "Karachi, Sindh, Pakistan"],
      link: "https://maps.google.com"
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      link: null
    }
  ],
  socialMedia: [
    { icon: FaFacebook, name: "Facebook", link: "https://facebook.com/pansariinn", color: "hover:text-blue-600" },
    { icon: FaInstagram, name: "Instagram", link: "https://instagram.com/pansariinn", color: "hover:text-pink-600" },
    { icon: FaWhatsapp, name: "WhatsApp", link: "https://wa.me/923001234567", color: "hover:text-green-600" },
    { icon: FaTwitter, name: "Twitter", link: "https://twitter.com/pansariinn", color: "hover:text-blue-400" }
  ],
  formFields: [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      required: true,
      fullWidth: false
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
      required: true,
      fullWidth: false
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+92 300 1234567",
      required: false,
      fullWidth: false
    },
    {
      id: "subject",
      label: "Subject",
      type: "text",
      placeholder: "How can we help you?",
      required: true,
      fullWidth: false
    },
    {
      id: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Tell us more about your inquiry...",
      required: true,
      fullWidth: true,
      rows: 6
    }
  ],
  faq: [
    {
      question: "What are your delivery charges?",
      answer: "We offer free shipping on orders above PKR 5000. For orders below this amount, a nominal delivery charge applies based on your location."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-5 business days within major cities and 5-7 business days for other areas across Pakistan."
    },
    {
      question: "Do you accept returns?",
      answer: "Yes, we accept returns within 7 days of delivery if the product is unused and in original packaging. Please refer to our return policy for more details."
    },
    {
      question: "Are your products certified?",
      answer: "Yes, all our products are certified and tested for quality. We ensure 100% natural and authentic herbs with no adulteration."
    }
  ]
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {contactData.hero.title} <span className="text-[#197B33]">{contactData.hero.highlight}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {contactData.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactData.contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 text-center hover:border-[#197B33] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="text-2xl text-[#197B33]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {info.link && idx === 0 ? (
                        <a href={info.link} className="hover:text-[#197B33] transition-colors">
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <FaPaperPlane className="text-green-600" />
                  <p className="text-green-800">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactData.formFields.map((field) => {
                    if (field.type === "textarea") {
                      return (
                        <div key={field.id} className="md:col-span-2">
                          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          <textarea
                            id={field.id}
                            rows={field.rows}
                            required={field.required}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#197B33] focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={field.id} className={field.fullWidth ? "md:col-span-2" : ""}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          required={field.required}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#197B33] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#197B33] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#156529] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map and Social Media */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.2315840481626!2d67.0099609!3d24.8829208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pansari Inn Location"
                ></iframe>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {contactData.socialMedia.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-4 border-2 border-gray-100 rounded-lg hover:border-[#197B33] transition-all duration-300 ${social.color}`}
                      >
                        <IconComponent className="text-2xl" />
                        <span className="font-medium">{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Quick answers to common questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactData.faq.map((item, index) => (
            <div key={index} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-[#197B33] transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#197B33] to-emerald-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Natural Wellness?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Browse our collection of premium herbal products and start your journey to better health today.
          </p>
          <button className="px-8 py-3 bg-white text-[#197B33] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}