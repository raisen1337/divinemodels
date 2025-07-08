import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteText } from '@/lib/siteText';

export const metadata: Metadata = {
    title: 'Terms and Conditions - Divine Models',
    description: 'Terms and conditions for Divine Models agency.',
};

export default async function TermsPage() {
    // Get site texts for the terms page
    const heroTitle = await getSiteText('terms.hero.title', 'Termeni și Condiții');
    const heroSubtitle = await getSiteText('terms.hero.subtitle', 'Vă rugăm să citiți cu atenție termenii și condițiile de utilizare');

    const lastUpdated = await getSiteText('terms.lastUpdated', 'Ultima actualizare: 30 Iunie 2023');

    const section1Title = await getSiteText('terms.section1.title', 'Introducere');
    const section1Text = await getSiteText('terms.section1.text', 'Acești termeni și condiții stabilesc regulile și reglementările pentru utilizarea site-ului web Divine Models. Accesând acest site web, presupunem că acceptați acești termeni și condiții în totalitate. Nu continuați să utilizați site-ul web Divine Models dacă nu acceptați toți termenii și condițiile menționate pe această pagină.');

    const section2Title = await getSiteText('terms.section2.title', 'Drepturile de autor');
    const section2Text = await getSiteText('terms.section2.text', 'Conținutul acestui site web este proprietatea Divine Models și este protejat de legile internaționale privind drepturile de autor. Toate drepturile sunt rezervate. Nicio reproducere, copiere sau redistribuire pentru uz comercial a materialelor de pe site nu este permisă fără acordul explicit în scris din partea Divine Models.');

    const section3Title = await getSiteText('terms.section3.title', 'Licență de utilizare');
    const section3Text = await getSiteText('terms.section3.text', 'Se acordă permisiunea de a descărca temporar o copie a materialelor (informații sau software) de pe site-ul web Divine Models, doar pentru vizualizare personală, netransferabilă. Aceasta este acordarea unei licențe, nu un transfer de titlu, și în cadrul acestei licențe nu puteți:\n\n- modifica sau copia materialele;\n- utiliza materialele în orice scop comercial sau pentru expunere publică;\n- încerca să decompilați sau să refaceți ingineria inversă a oricărui software conținut pe site-ul web Divine Models;\n- elimina orice drepturi de autor sau alte notații de proprietate din materiale; sau\n- transfera materialele către o altă persoană sau să "oglinditi" materialele pe orice alt server.\n\nAceastă licență va înceta automat dacă încălcați oricare dintre aceste restricții și poate fi reziliată de Divine Models în orice moment.');

    const section4Title = await getSiteText('terms.section4.title', 'Limite de responsabilitate');
    const section4Text = await getSiteText('terms.section4.text', 'Materialele de pe site-ul web Divine Models sunt furnizate "așa cum sunt". Divine Models nu oferă nicio garanție, expresă sau implicită, și prin prezenta neagă și respinge toate celelalte garanții, inclusiv, fără limitare, garanții implicite sau condiții de vandabilitate, adecvare pentru un anumit scop sau neîncălcare a proprietății intelectuale sau alte încălcări ale drepturilor.\n\nÎn plus, Divine Models nu garantează sau face nicio reprezentare privind acuratețea, rezultatele probabile sau fiabilitatea utilizării materialelor de pe site-ul său web sau altfel legate de astfel de materiale sau de orice site-uri legate de acest site.');

    const section5Title = await getSiteText('terms.section5.title', 'Modificări ale termenilor de utilizare');
    const section5Text = await getSiteText('terms.section5.text', 'Divine Models poate revizui acești termeni de utilizare a site-ului în orice moment, fără notificare prealabilă. Prin utilizarea acestui site web, sunteți de acord să fiți obligat de versiunea curentă a acestor termeni și condiții de utilizare.');

    const section6Title = await getSiteText('terms.section6.title', 'Legislația aplicabilă');
    const section6Text = await getSiteText('terms.section6.text', 'Orice reclamație legată de site-ul web Divine Models va fi guvernată de legile statului România, fără a ține cont de conflictul prevederilor legale.');

    const section7Title = await getSiteText('terms.section7.title', 'Despăgubire');
    const section7Text = await getSiteText('terms.section7.text', 'Sunteți de acord să despăgubiți, să apărați și să considerați Divine Models și afiliații săi nevinovați de orice reclamație, daună, cost și cheltuială, inclusiv onorariile avocaților, care decurg din sau în legătură cu utilizarea site-ului web de către dumneavoastră.');

    const section8Title = await getSiteText('terms.section8.title', 'Contact');
    const section8Text = await getSiteText('terms.section8.text', 'Dacă aveți întrebări despre acești termeni și condiții, vă rugăm să ne contactați la:');

    const contactEmail = await getSiteText('terms.contactEmail', 'contact@divinemodels.ro');
    const contactPhone = await getSiteText('terms.contactPhone', '+40 748 037 587');

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
                            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            {heroSubtitle}
                        </p>

                        <p className="text-sm text-gray-500" data-aos="fade-up" data-aos-delay="500">
                            {lastUpdated}
                        </p>
                    </div>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="prose prose-lg max-w-none">
                        <h2>{section1Title}</h2>
                        <p>{section1Text}</p>

                        <h2>{section2Title}</h2>
                        <p>{section2Text}</p>

                        <h2>{section3Title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: section3Text.replace(/\n\n/g, '</p><p>').replace(/\n-/g, '<br/>-') }} />

                        <h2>{section4Title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: section4Text.replace(/\n\n/g, '</p><p>') }} />

                        <h2>{section5Title}</h2>
                        <p>{section5Text}</p>

                        <h2>{section6Title}</h2>
                        <p>{section6Text}</p>

                        <h2>{section7Title}</h2>
                        <p>{section7Text}</p>

                        <h2>{section8Title}</h2>
                        <p>{section8Text}</p>
                        <p>
                            Email: <a href={`mailto:${contactEmail}`} className="text-gold hover:underline">{contactEmail}</a><br />
                            Telefon: <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="text-gold hover:underline">{contactPhone}</a>
                        </p>

                        <div className="mt-12 text-center">
                            <Link href="/" className="text-gold hover:underline">
                                Înapoi la pagina principală
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
