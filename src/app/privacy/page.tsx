import { Metadata } from 'next';
import Link from 'next/link';
import { getSiteText } from '@/lib/siteText';

export const metadata: Metadata = {
    title: 'Privacy Policy - Divine Models',
    description: 'Privacy policy and data protection information for Divine Models agency.',
};

export default async function PrivacyPage() {
    // Get site texts for the privacy page
    const heroTitle = await getSiteText('privacy.hero.title', 'Politica de Confidențialitate');
    const heroSubtitle = await getSiteText('privacy.hero.subtitle', 'Confidențialitatea datelor dumneavoastră este importantă pentru noi');

    const lastUpdated = await getSiteText('privacy.lastUpdated', 'Ultima actualizare: 30 Iunie 2023');

    const section1Title = await getSiteText('privacy.section1.title', 'Introducere');
    const section1Text = await getSiteText('privacy.section1.text', 'Această Politică de Confidențialitate descrie modul în care Divine Models colectează, utilizează și protejează informațiile personale pe care le furnizați pe site-ul nostru. Ne angajăm să respectăm confidențialitatea vizitatorilor noștri și să protejăm orice date personale pe care ni le furnizați.');

    const section2Title = await getSiteText('privacy.section2.title', 'Informațiile pe care le colectăm');
    const section2Text = await getSiteText('privacy.section2.text', 'Putem colecta următoarele informații:\n\n- Nume și prenume\n- Informații de contact, inclusiv adresa de email\n- Informații demografice precum codul poștal, preferințe și interese\n- Alte informații relevante pentru sondaje și oferte\n\nÎn cazul modelelor, putem colecta informații suplimentare necesare pentru colaborare, inclusiv detalii fizice, experiență profesională și portofoliu.');

    const section3Title = await getSiteText('privacy.section3.title', 'Cum utilizăm informațiile');
    const section3Text = await getSiteText('privacy.section3.text', 'Folosim aceste informații pentru a înțelege mai bine nevoile dumneavoastră și pentru a vă oferi un serviciu mai bun, în special pentru următoarele motive:\n\n- Păstrarea înregistrărilor interne\n- Îmbunătățirea produselor și serviciilor noastre\n- Trimiterea de emailuri promoționale despre produse noi, oferte speciale sau alte informații pe care credem că le-ați putea găsi interesante\n- Contactarea dumneavoastră în scopuri de cercetare de piață\n\nNe angajăm să protejăm confidențialitatea dumneavoastră. Nu vom vinde, distribui sau închiria informațiile dumneavoastră personale unor terțe părți decât dacă avem permisiunea dumneavoastră sau dacă acest lucru este cerut de lege.');

    const section4Title = await getSiteText('privacy.section4.title', 'Securitate');
    const section4Text = await getSiteText('privacy.section4.text', 'Suntem dedicați asigurării securității informațiilor dumneavoastră. Pentru a preveni accesul neautorizat sau divulgarea, am implementat proceduri fizice, electronice și manageriale adecvate pentru a proteja și securiza informațiile pe care le colectăm online.');

    const section5Title = await getSiteText('privacy.section5.title', 'Cookie-uri');
    const section5Text = await getSiteText('privacy.section5.text', 'Un cookie este un fișier mic care cere permisiunea de a fi plasat pe hard disk-ul computerului dumneavoastră. Odată ce sunteți de acord, fișierul este adăugat și cookie-ul ajută la analizarea traficului web sau vă permite să știți când vizitați un anumit site.\n\nCookie-urile ne permit să răspundem la dumneavoastră ca individ. Cookie-urile ne permit să colectăm informații despre modelele de trafic pe site-ul nostru, dar nu vă identifică personal.\n\nPuteți alege să acceptați sau să refuzați cookie-urile. Majoritatea browserelor web acceptă automat cookie-urile, dar puteți modifica de obicei setările browserului pentru a refuza cookie-urile dacă preferați.');

    const section6Title = await getSiteText('privacy.section6.title', 'Drepturile dumneavoastră');
    const section6Text = await getSiteText('privacy.section6.text', 'Aveți dreptul de a solicita o copie a informațiilor personale pe care le deținem despre dumneavoastră, de a le corecta dacă sunt inexacte și de a solicita ștergerea acestora. Pentru a exercita oricare dintre aceste drepturi, vă rugăm să ne contactați la adresa menționată mai jos.');

    const section7Title = await getSiteText('privacy.section7.title', 'Modificări ale politicii noastre de confidențialitate');
    const section7Text = await getSiteText('privacy.section7.text', 'Dacă decidem să ne modificăm politica de confidențialitate, vom posta aceste modificări pe această pagină. Această politică a fost actualizată ultima dată la data menționată mai sus.');

    const section8Title = await getSiteText('privacy.section8.title', 'Cum să ne contactați');
    const section8Text = await getSiteText('privacy.section8.text', 'Dacă aveți întrebări despre această politică de confidențialitate sau despre informațiile pe care le deținem despre dumneavoastră, vă rugăm să ne contactați la:');

    const contactEmail = await getSiteText('privacy.contactEmail', 'contact@divinemodels.ro');
    const contactPhone = await getSiteText('privacy.contactPhone', '+40 748 037 587');

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

            {/* Privacy Content */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="prose prose-lg max-w-none">
                        <h2>{section1Title}</h2>
                        <p>{section1Text}</p>

                        <h2>{section2Title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: section2Text.replace(/\n\n/g, '</p><p>').replace(/\n-/g, '<br/>-') }} />

                        <h2>{section3Title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: section3Text.replace(/\n\n/g, '</p><p>').replace(/\n-/g, '<br/>-') }} />

                        <h2>{section4Title}</h2>
                        <p>{section4Text}</p>

                        <h2>{section5Title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: section5Text.replace(/\n\n/g, '</p><p>') }} />

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
