import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getSiteText } from '@/lib/siteText';

export const metadata: Metadata = {
    title: 'About - Divine Models',
    description: 'Learn more about Divine Models, our history, vision, and what makes us the leading modeling agency in Romania.',
};

export default async function AboutPage() {
    const settings = await prisma.siteSettings.findFirst();

    // Get site texts for the about page
    const heroTitle = await getSiteText('about.hero.title', 'Despre Noi');
    const heroSubtitle = await getSiteText('about.hero.subtitle', 'Eleganță, profesionalism și excelență în industria de modelling din România');

    const storyTitle = await getSiteText('about.story.title', 'Povestea Noastră');
    const storyText1 = await getSiteText('about.story.text1', settings?.aboutText || 'Divine Models este o agenție de modeling premium din România, specializată în descoperirea și dezvoltarea celor mai talentate modele pentru industria modei, publicității și evenimentelor.');
    const storyText2 = await getSiteText('about.story.text2', 'Cu o echipă de profesioniști dedicați și cu ani de experiență în domeniu, ne-am construit reputația prin seriozitate, transparență și rezultate excelente pentru clienții și modelele noastre.');
    const storyText3 = await getSiteText('about.story.text3', 'Ne mândrim cu standardele înalte pe care le menținem și cu relațiile de lungă durată pe care le dezvoltăm cu clienții noștri, bazate pe încredere și profesionalism.');

    const valuesTitle = await getSiteText('about.values.title', 'Valorile Noastre');
    const valuesSubtitle = await getSiteText('about.values.subtitle', 'Principiile care ne ghidează activitatea și ne definesc ca organizație');

    const value1Title = await getSiteText('about.values.value1.title', 'Pasiune');
    const value1Text = await getSiteText('about.values.value1.text', 'Suntem pasionați de industria modei și ne dedicăm dezvoltării talentelor și creșterii lor profesionale.');

    const value2Title = await getSiteText('about.values.value2.title', 'Profesionalism');
    const value2Text = await getSiteText('about.values.value2.text', 'Menținem standarde înalte în toate aspectele activității noastre, de la selecția modelelor până la relațiile cu clienții.');

    const value3Title = await getSiteText('about.values.value3.title', 'Inovație');
    const value3Text = await getSiteText('about.values.value3.text', 'Suntem mereu în căutarea de noi tendințe și abordări inovatoare pentru a ne menține în fruntea industriei.');

    const teamTitle = await getSiteText('about.team.title', 'Echipa Noastră');
    const teamSubtitle = await getSiteText('about.team.subtitle', 'Profesioniști dedicați, cu experiență vastă în industria de modeling');

    const team1Name = await getSiteText('about.team.member1.name', 'Ana Popescu');
    const team1Position = await getSiteText('about.team.member1.position', 'Fondator & Director');
    const team1Bio = await getSiteText('about.team.member1.bio', 'Cu peste 15 ani de experiență în industrie, Ana a fondat Divine Models cu viziunea de a crea o agenție care să seteze noi standarde în modelingul românesc.');

    const team2Name = await getSiteText('about.team.member2.name', 'Mihai Ionescu');
    const team2Position = await getSiteText('about.team.member2.position', 'Director Casting');
    const team2Bio = await getSiteText('about.team.member2.bio', 'Mihai coordonează procesul de selecție și dezvoltarea modelelor, aducând o perspectivă unică datorită experienței sale anterioare în moda internațională.');

    const team3Name = await getSiteText('about.team.member3.name', 'Elena Dumitrescu');
    const team3Position = await getSiteText('about.team.member3.position', 'Manager Relații Clienți');
    const team3Bio = await getSiteText('about.team.member3.bio', 'Elena asigură comunicarea eficientă cu clienții și partenerilor noștri, asigurându-se că fiecare proiect este implementat cu succes și profesionalism.');

    const ctaTitle = await getSiteText('about.cta.title', 'Lucrează Cu Noi');
    const ctaText = await getSiteText('about.cta.text', 'Fie că ești un model aspirant sau un brand în căutarea de talente, suntem aici pentru a te ajuta');
    const ctaButton1 = await getSiteText('about.cta.button1', 'CONTACTEAZĂ-NE');
    const ctaButton2 = await getSiteText('about.cta.button2', 'VEZI MODELELE');

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

            {/* About Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <div data-aos="fade-left">
                            <div className="section-divider mb-8"></div>
                            <h2 className="text-4xl font-serif font-light text-black mb-8 tracking-wide">
                                {storyTitle}
                            </h2>
                            <div className="prose prose-lg max-w-none text-gray-600">
                                <p>
                                    {storyText1}
                                </p>
                                <p className="mt-4">
                                    {storyText2}
                                </p>
                                <p className="mt-4">
                                    {storyText3}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="section-divider mb-8"></div>
                        <h2 className="text-4xl font-serif font-light text-black mb-8 tracking-wide">
                            {valuesTitle}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {valuesSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center p-8 bg-white rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="100">
                            <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
                                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif mb-4">{value1Title}</h3>
                            <p className="text-gray-600">
                                {value1Text}
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
                            <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
                                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif mb-4">{value2Title}</h3>
                            <p className="text-gray-600">
                                {value2Text}
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="300">
                            <div className="inline-block p-4 rounded-full bg-gold/10 mb-6">
                                <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif mb-4">{value3Title}</h3>
                            <p className="text-gray-600">
                                {value3Text}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {/* <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="section-divider mb-8"></div>
                        <h2 className="text-4xl font-serif font-light text-black mb-8 tracking-wide">
                            {teamTitle}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {teamSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                            <div className="relative w-full aspect-square rounded-full overflow-hidden mb-6 mx-auto max-w-[250px] shadow-lg">
                                <Image
                                    src="/images/about-placeholder.svg"
                                    alt={team1Name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-serif mb-2">{team1Name}</h3>
                            <p className="text-gold font-medium mb-4">{team1Position}</p>
                            <p className="text-gray-600">
                                {team1Bio}
                            </p>
                        </div>

                        <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                            <div className="relative w-full aspect-square rounded-full overflow-hidden mb-6 mx-auto max-w-[250px] shadow-lg">
                                <Image
                                    src="/images/about-placeholder.svg"
                                    alt={team2Name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-serif mb-2">{team2Name}</h3>
                            <p className="text-gold font-medium mb-4">{team2Position}</p>
                            <p className="text-gray-600">
                                {team2Bio}
                            </p>
                        </div>

                        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                            <div className="relative w-full aspect-square rounded-full overflow-hidden mb-6 mx-auto max-w-[250px] shadow-lg">
                                <Image
                                    src="/images/about-placeholder.svg"
                                    alt={team3Name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-serif mb-2">{team3Name}</h3>
                            <p className="text-gold font-medium mb-4">{team3Position}</p>
                            <p className="text-gray-600">
                                {team3Bio}
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="py-24 contact-bg text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center" data-aos="fade-up">
                        <div className="section-divider mb-8"></div>
                        <h2 className="text-4xl font-serif font-light mb-8 tracking-wide">
                            {ctaTitle}
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
                            {ctaText}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                href="/contact"
                                className="btn-primary text-white px-10 py-4 font-semibold tracking-wide relative z-10 inline-block"
                            >
                                {ctaButton1}
                            </Link>
                            <Link
                                href="/models"
                                className="btn-secondary border-2 border-gold text-gold px-10 py-4 font-semibold tracking-wide relative z-10 inline-block"
                            >
                                {ctaButton2}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
