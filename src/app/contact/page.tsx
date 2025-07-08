import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getSiteText } from '@/lib/siteText';

export const metadata: Metadata = {
    title: 'Contact - Divine Models',
    description: 'Get in touch with Divine Models agency for modeling services, casting opportunities, or any inquiries.',
};

export default async function ContactPage() {
    const settings = await prisma.siteSettings.findFirst();

    // Get site texts for the contact page
    const heroTitle = await getSiteText('contact.hero.title', 'Contact');
    const heroSubtitle = await getSiteText('contact.hero.subtitle', 'Suntem aici pentru a răspunde întrebărilor și solicitărilor tale');

    const addressTitle = await getSiteText('contact.info.address.title', 'Adresa Noastră');
    const addressValue = await getSiteText('contact.info.address.value', settings?.address || 'Targu Jiu, România');

    const emailTitle = await getSiteText('contact.info.email.title', 'Email');
    const emailValue = await getSiteText('contact.info.email.value', settings?.contactEmail || 'contact@divinemodels.ro');

    const phoneTitle = await getSiteText('contact.info.phone.title', 'Telefon');
    const phoneValue = await getSiteText('contact.info.phone.value', settings?.phoneNumber || '+40 748 037 587');

    const formTitle = await getSiteText('contact.form.title', 'Trimite-ne un Mesaj');
    const formSubtitle = await getSiteText('contact.form.subtitle', 'Completează formularul de mai jos și te vom contacta în cel mai scurt timp');
    const formLabelName = await getSiteText('contact.form.label.name', 'Nume');
    const formPlaceholderName = await getSiteText('contact.form.placeholder.name', 'Numele tău');
    const formLabelEmail = await getSiteText('contact.form.label.email', 'Email');
    const formPlaceholderEmail = await getSiteText('contact.form.placeholder.email', 'Email-ul tău');
    const formLabelSubject = await getSiteText('contact.form.label.subject', 'Subiect');
    const formPlaceholderSubject = await getSiteText('contact.form.placeholder.subject', 'Subiectul mesajului');
    const formLabelMessage = await getSiteText('contact.form.label.message', 'Mesaj');
    const formPlaceholderMessage = await getSiteText('contact.form.placeholder.message', 'Mesajul tău');
    const formButtonSubmit = await getSiteText('contact.form.button.submit', 'TRIMITE MESAJUL');

    const castingTitle = await getSiteText('contact.casting.title', 'Aplică pentru Casting');
    const castingSubtitle = await getSiteText('contact.casting.subtitle', 'Ești interesat/ă să devii model? Suntem mereu în căutare de talente noi!');
    const castingButton = await getSiteText('contact.casting.button', 'APLICĂ ACUM');

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-24 hero-bg">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <div className="mb-8" data-aos="fade-up">
                            <div className="section-divider mb-8"></div>
                        </div>

                        <h1
                            className="text-5xl md:text-6xl font-serif font-light heading-primary mb-8 tracking-wide"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            {heroTitle}
                        </h1>

                        <p
                            className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            {heroSubtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center p-8 bg-white shadow-lg rounded-lg" data-aos="fade-up" data-aos-delay="100">
                            <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
                                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif mb-4">{addressTitle}</h3>
                            <p className="text-gray-600">{addressValue}</p>
                        </div>

                        <div className="text-center p-8 bg-white shadow-lg rounded-lg" data-aos="fade-up" data-aos-delay="200">
                            <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
                                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif mb-4">{emailTitle}</h3>
                            <p className="text-gray-600">
                                <a href={`mailto:${emailValue}`} className="hover:text-gold transition-colors">
                                    {emailValue}
                                </a>
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white shadow-lg rounded-lg" data-aos="fade-up" data-aos-delay="300">
                            <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
                                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif mb-4">{phoneTitle}</h3>
                            <p className="text-gray-600">
                                <a href={`tel:${phoneValue.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors">
                                    {phoneValue}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <div className="section-divider mb-8"></div>
                        <h2 className="text-4xl font-serif font-light text-black mb-8 tracking-wide">
                            {formTitle}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {formSubtitle}
                        </p>
                    </div>

                    <form className="bg-white p-8 rounded-lg shadow-xl" data-aos="fade-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    {formLabelName}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-gray-900 placeholder-gray-500"
                                    placeholder={formPlaceholderName}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    {formLabelEmail}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-gray-900 placeholder-gray-500"
                                    placeholder={formPlaceholderEmail}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                {formLabelSubject}
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-gray-900 placeholder-gray-500"
                                placeholder={formPlaceholderSubject}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                {formLabelMessage}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-gray-900 placeholder-gray-500"
                                placeholder={formPlaceholderMessage}
                                required
                            ></textarea>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="btn-primary text-white px-12 py-4 font-semibold tracking-wide relative z-10 inline-block"
                            >
                                {formButtonSubmit}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Apply for Casting Section */}
            <section className="py-24 contact-bg text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center" data-aos="fade-up">
                        <div className="section-divider mb-8"></div>
                        <h2 className="text-4xl font-serif font-light mb-8 tracking-wide">
                            {castingTitle}
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
                            {castingSubtitle}
                        </p>

                        <div className="flex justify-center">
                            <Link
                                href="https://wa.me/40748037587"
                                target="_blank"
                                className="btn-secondary border-2 border-gold text-gold px-10 py-4 font-semibold tracking-wide relative z-10 inline-block hover:text-black"
                            >
                                {castingButton}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
