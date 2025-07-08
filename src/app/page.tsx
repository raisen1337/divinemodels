import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { getSiteText } from '@/lib/siteText';

// Cache for homepage data
let cachedHomepageData: any = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getHomepageData() {
  const now = Date.now();

  if (!cachedHomepageData || now - cacheTime > CACHE_TTL) {
    try {
      // Fetch all data in parallel
      const [settings, featuredModels, allSiteTexts] = await Promise.all([
        prisma.siteSettings.findFirst(),
        prisma.model.findMany({
          where: {
            featured: true,
            active: true,
          },
          include: {
            images: {
              take: 1, // Only take the first image for performance
              orderBy: {
                featured: 'desc',
              },
            },
            categories: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
          take: 4,
        }),
        prisma.siteText.findMany(),
      ]);

      // Process site texts into a map for faster lookup
      const siteTextMap: Record<string, string> = {};
      allSiteTexts.forEach((text) => {
        siteTextMap[text.key] = text.value;
      });

      cachedHomepageData = {
        settings,
        featuredModels,
        siteTexts: siteTextMap,
      };
      cacheTime = now;
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      cachedHomepageData = {
        settings: null,
        featuredModels: [],
        siteTexts: {},
      };
    }
  }

  return cachedHomepageData;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { settings, featuredModels, siteTexts } = await getHomepageData();

  // Helper function to get site text with fallback
  const getSiteTextValue = (key: string, fallback: string) => {
    return siteTexts[key] || fallback;
  };

  // Get site texts for the homepage
  const heroTitle = getSiteTextValue('homepage.hero.title', settings?.siteName || 'Divine Models');
  const heroTagline = getSiteTextValue('homepage.hero.tagline', settings?.siteTagline || 'Eleganță, profesionalism și excelență în industria de modelling din România');
  const heroButtonModels = getSiteTextValue('homepage.hero.button.models', 'DESCOPERĂ MODELELE');
  const heroButtonContact = getSiteTextValue('homepage.hero.button.contact', 'APLICĂ LA CASTING');

  const modelsTitle = getSiteTextValue('homepage.models.title', 'Modelele Noastre');
  const modelsSubtitle = getSiteTextValue('homepage.models.subtitle', 'Talente excepționale care definesc standardele industriei');
  const modelsButtonAll = getSiteTextValue('homepage.models.button.all', 'VIEW ALL MODELS');

  const aboutTitle = getSiteTextValue('homepage.about.title', 'Despre Noi');
  const aboutText1 = getSiteTextValue('homepage.about.text1', settings?.aboutText || 'Divine Models este o agenție de modeling premium din România, specializată în descoperirea și dezvoltarea celor mai talentate modele pentru industria modei, publicității și evenimentelor.');
  const aboutText2 = getSiteTextValue('homepage.about.text2', 'Cu o echipă de profesioniști dedicați și cu ani de experiență în domeniu, ne-am construit reputația prin seriozitate, transparență și rezultate excelente pentru clienții și modelele noastre.');
  const aboutButton = getSiteTextValue('homepage.about.button', 'AFLĂ MAI MULTE');

  const contactTitle = getSiteTextValue('homepage.contact.title', 'Contact');
  const contactSubtitle = getSiteTextValue('homepage.contact.subtitle', 'Suntem aici pentru a răspunde întrebărilor și solicitărilor tale');
  const contactAddressTitle = getSiteTextValue('homepage.contact.address.title', 'Adresa Noastră');
  const contactAddress = getSiteTextValue('homepage.contact.address.value', settings?.address || 'Targu Jiu, România');
  const contactEmailTitle = getSiteTextValue('homepage.contact.email.title', 'Email');
  const contactEmailValue = getSiteTextValue('homepage.contact.email.value', settings?.contactEmail || 'contact@divinemodels.ro');
  const contactPhoneTitle = getSiteTextValue('homepage.contact.phone.title', 'Telefon');
  const contactPhoneValue = getSiteTextValue('homepage.contact.phone.value', settings?.phoneNumber || '+40 748 037 587');
  const contactButton = getSiteTextValue('homepage.contact.button', 'CONTACTEAZĂ-NE');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center hero-bg pt-24">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="mb-8" data-aos="fade-up">
              <div className="section-divider mb-8"></div>
            </div>

            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-serif font-light heading-primary mb-8 tracking-wide float-animation"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {heroTitle}
            </h1>

            <p
              className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {heroTagline}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Link
                href="/models"
                className="btn-primary text-white px-12 py-5 font-semibold tracking-wide relative z-10"
              >
                {heroButtonModels}
              </Link>
              <Link
                href="/contact"
                className="btn-secondary border-2 border-gold text-gold px-12 py-5 font-semibold tracking-wide relative z-10 flex items-center justify-center"
              >
                {heroButtonContact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16 category-nav">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <Link
              href="/models"
              className="text-gray-700 hover:text-gold font-semibold tracking-wider gold-line transition-colors text-lg"
            >
              MODELE
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Models Section */}
      <section id="models" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20" data-aos="fade-up">
            <div className="section-divider mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-serif font-light text-black mb-8 tracking-wide">
              {modelsTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {modelsSubtitle}
            </p>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredModels.map((model: any, index: any) => (
              <div
                key={model.id}
                className="model-card group relative"
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >
                <div className="w-full aspect-[3/4] relative overflow-hidden rounded-lg">
                  {model.images && model.images.length > 0 ? (
                    <Image
                      src={model.images[0].url}
                      alt={model.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 2} // Prioritize loading first 2 images
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No image</p>
                    </div>
                  )}
                  <div className="model-card-overlay absolute inset-0"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-serif font-medium mb-2">{model.name}</h3>
                    <p className="text-sm text-white/90 tracking-wider font-medium">
                      {model.categories && model.categories.length > 0
                        ? model.categories[0].name.toUpperCase() + ' MODEL'
                        : 'PROFESSIONAL MODEL'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/models"
              className="btn-primary text-white px-10 py-4 font-semibold tracking-wide relative z-10 inline-block"
            >
              {modelsButtonAll}
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <div className="section-divider mb-8"></div>
              <h2 className="text-5xl font-serif font-light text-black mb-8 tracking-wide">
                {aboutTitle}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>
                  {aboutText1}
                </p>
                <p className="mt-4">
                  {aboutText2}
                </p>
              </div>
              <div className="mt-10">
                <Link
                  href="/about"
                  className="btn-secondary border-2 border-gold text-gold px-8 py-3 font-semibold tracking-wide relative z-10 inline-block"
                >
                  {aboutButton}
                </Link>
              </div>
            </div>
            {/* <div className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl" data-aos="fade-left">
              <Image
                src="/images/about-placeholder.svg"
                alt="Divine Models Team"
                fill
                className="object-cover"
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 contact-bg text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="section-divider mb-8"></div>
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-8 tracking-wide">
              {contactTitle}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {contactSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-lg" data-aos="fade-up" data-aos-delay="100">
              <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-4">{contactAddressTitle}</h3>
              <p className="text-white/70">{contactAddress}</p>
            </div>

            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-lg" data-aos="fade-up" data-aos-delay="200">
              <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-4">{contactEmailTitle}</h3>
              <p className="text-white/70">{contactEmailValue}</p>
            </div>

            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-lg" data-aos="fade-up" data-aos-delay="300">
              <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-4">{contactPhoneTitle}</h3>
              <p className="text-white/70">{contactPhoneValue}</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/contact"
              className="btn-primary text-white px-10 py-4 font-semibold tracking-wide relative z-10 inline-block"
            >
              {contactButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
