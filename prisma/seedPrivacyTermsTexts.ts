import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPrivacyTermsTexts() {
    console.log('Seeding privacy and terms page texts...');

    // Privacy page texts
    const privacyTexts = [
        {
            key: 'privacy.hero.title',
            value: 'Politica de Confidențialitate',
            description: 'Main title on the privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.hero.subtitle',
            value: 'Confidențialitatea datelor dumneavoastră este importantă pentru noi',
            description: 'Subtitle on the privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.lastUpdated',
            value: 'Ultima actualizare: 30 Iunie 2023',
            description: 'Last updated date on the privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section1.title',
            value: 'Introducere',
            description: 'Title for the introduction section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section1.text',
            value: 'Această Politică de Confidențialitate descrie modul în care Divine Models colectează, utilizează și protejează informațiile personale pe care le furnizați pe site-ul nostru. Ne angajăm să respectăm confidențialitatea vizitatorilor noștri și să protejăm orice date personale pe care ni le furnizați.',
            description: 'Text for the introduction section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section2.title',
            value: 'Informațiile pe care le colectăm',
            description: 'Title for the information section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section2.text',
            value: 'Putem colecta următoarele informații:\n\n- Nume și prenume\n- Informații de contact, inclusiv adresa de email\n- Informații demografice precum codul poștal, preferințe și interese\n- Alte informații relevante pentru sondaje și oferte\n\nÎn cazul modelelor, putem colecta informații suplimentare necesare pentru colaborare, inclusiv detalii fizice, experiență profesională și portofoliu.',
            description: 'Text for the information section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section3.title',
            value: 'Cum utilizăm informațiile',
            description: 'Title for the information usage section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section3.text',
            value: 'Folosim aceste informații pentru a înțelege mai bine nevoile dumneavoastră și pentru a vă oferi un serviciu mai bun, în special pentru următoarele motive:\n\n- Păstrarea înregistrărilor interne\n- Îmbunătățirea produselor și serviciilor noastre\n- Trimiterea de emailuri promoționale despre produse noi, oferte speciale sau alte informații pe care credem că le-ați putea găsi interesante\n- Contactarea dumneavoastră în scopuri de cercetare de piață\n\nNe angajăm să protejăm confidențialitatea dumneavoastră. Nu vom vinde, distribui sau închiria informațiile dumneavoastră personale unor terțe părți decât dacă avem permisiunea dumneavoastră sau dacă acest lucru este cerut de lege.',
            description: 'Text for the information usage section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section4.title',
            value: 'Securitate',
            description: 'Title for the security section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section4.text',
            value: 'Suntem dedicați asigurării securității informațiilor dumneavoastră. Pentru a preveni accesul neautorizat sau divulgarea, am implementat proceduri fizice, electronice și manageriale adecvate pentru a proteja și securiza informațiile pe care le colectăm online.',
            description: 'Text for the security section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section5.title',
            value: 'Cookie-uri',
            description: 'Title for the cookies section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section5.text',
            value: 'Un cookie este un fișier mic care cere permisiunea de a fi plasat pe hard disk-ul computerului dumneavoastră. Odată ce sunteți de acord, fișierul este adăugat și cookie-ul ajută la analizarea traficului web sau vă permite să știți când vizitați un anumit site.\n\nCookie-urile ne permit să răspundem la dumneavoastră ca individ. Cookie-urile ne permit să colectăm informații despre modelele de trafic pe site-ul nostru, dar nu vă identifică personal.\n\nPuteți alege să acceptați sau să refuzați cookie-urile. Majoritatea browserelor web acceptă automat cookie-urile, dar puteți modifica de obicei setările browserului pentru a refuza cookie-urile dacă preferați.',
            description: 'Text for the cookies section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section6.title',
            value: 'Drepturile dumneavoastră',
            description: 'Title for the rights section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section6.text',
            value: 'Aveți dreptul de a solicita o copie a informațiilor personale pe care le deținem despre dumneavoastră, de a le corecta dacă sunt inexacte și de a solicita ștergerea acestora. Pentru a exercita oricare dintre aceste drepturi, vă rugăm să ne contactați la adresa menționată mai jos.',
            description: 'Text for the rights section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section7.title',
            value: 'Modificări ale politicii noastre de confidențialitate',
            description: 'Title for the changes section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section7.text',
            value: 'Dacă decidem să ne modificăm politica de confidențialitate, vom posta aceste modificări pe această pagină. Această politică a fost actualizată ultima dată la data menționată mai sus.',
            description: 'Text for the changes section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section8.title',
            value: 'Cum să ne contactați',
            description: 'Title for the contact section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.section8.text',
            value: 'Dacă aveți întrebări despre această politică de confidențialitate sau despre informațiile pe care le deținem despre dumneavoastră, vă rugăm să ne contactați la:',
            description: 'Text for the contact section on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.contactEmail',
            value: 'contact@divinemodels.ro',
            description: 'Contact email on privacy page',
            location: 'Privacy'
        },
        {
            key: 'privacy.contactPhone',
            value: '+40 748 037 587',
            description: 'Contact phone on privacy page',
            location: 'Privacy'
        },
    ];

    // Terms page texts
    const termsTexts = [
        {
            key: 'terms.hero.title',
            value: 'Termeni și Condiții',
            description: 'Main title on the terms page',
            location: 'Terms'
        },
        {
            key: 'terms.hero.subtitle',
            value: 'Vă rugăm să citiți cu atenție termenii și condițiile de utilizare',
            description: 'Subtitle on the terms page',
            location: 'Terms'
        },
        {
            key: 'terms.lastUpdated',
            value: 'Ultima actualizare: 30 Iunie 2023',
            description: 'Last updated date on the terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section1.title',
            value: 'Introducere',
            description: 'Title for the introduction section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section1.text',
            value: 'Acești termeni și condiții stabilesc regulile și reglementările pentru utilizarea site-ului web Divine Models. Accesând acest site web, presupunem că acceptați acești termeni și condiții în totalitate. Nu continuați să utilizați site-ul web Divine Models dacă nu acceptați toți termenii și condițiile menționate pe această pagină.',
            description: 'Text for the introduction section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section2.title',
            value: 'Drepturile de autor',
            description: 'Title for the copyright section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section2.text',
            value: 'Conținutul acestui site web este proprietatea Divine Models și este protejat de legile internaționale privind drepturile de autor. Toate drepturile sunt rezervate. Nicio reproducere, copiere sau redistribuire pentru uz comercial a materialelor de pe site nu este permisă fără acordul explicit în scris din partea Divine Models.',
            description: 'Text for the copyright section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section3.title',
            value: 'Licență de utilizare',
            description: 'Title for the license section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section3.text',
            value: 'Se acordă permisiunea de a descărca temporar o copie a materialelor (informații sau software) de pe site-ul web Divine Models, doar pentru vizualizare personală, netransferabilă. Aceasta este acordarea unei licențe, nu un transfer de titlu, și în cadrul acestei licențe nu puteți:\n\n- modifica sau copia materialele;\n- utiliza materialele în orice scop comercial sau pentru expunere publică;\n- încerca să decompilați sau să refaceți ingineria inversă a oricărui software conținut pe site-ul web Divine Models;\n- elimina orice drepturi de autor sau alte notații de proprietate din materiale; sau\n- transfera materialele către o altă persoană sau să "oglinditi" materialele pe orice alt server.\n\nAceastă licență va înceta automat dacă încălcați oricare dintre aceste restricții și poate fi reziliată de Divine Models în orice moment.',
            description: 'Text for the license section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section4.title',
            value: 'Limite de responsabilitate',
            description: 'Title for the disclaimer section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section4.text',
            value: 'Materialele de pe site-ul web Divine Models sunt furnizate "așa cum sunt". Divine Models nu oferă nicio garanție, expresă sau implicită, și prin prezenta neagă și respinge toate celelalte garanții, inclusiv, fără limitare, garanții implicite sau condiții de vandabilitate, adecvare pentru un anumit scop sau neîncălcare a proprietății intelectuale sau alte încălcări ale drepturilor.\n\nÎn plus, Divine Models nu garantează sau face nicio reprezentare privind acuratețea, rezultatele probabile sau fiabilitatea utilizării materialelor de pe site-ul său web sau altfel legate de astfel de materiale sau de orice site-uri legate de acest site.',
            description: 'Text for the disclaimer section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section5.title',
            value: 'Modificări ale termenilor de utilizare',
            description: 'Title for the changes section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section5.text',
            value: 'Divine Models poate revizui acești termeni de utilizare a site-ului în orice moment, fără notificare prealabilă. Prin utilizarea acestui site web, sunteți de acord să fiți obligat de versiunea curentă a acestor termeni și condiții de utilizare.',
            description: 'Text for the changes section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section6.title',
            value: 'Legislația aplicabilă',
            description: 'Title for the governing law section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section6.text',
            value: 'Orice reclamație legată de site-ul web Divine Models va fi guvernată de legile statului România, fără a ține cont de conflictul prevederilor legale.',
            description: 'Text for the governing law section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section7.title',
            value: 'Despăgubire',
            description: 'Title for the indemnification section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section7.text',
            value: 'Sunteți de acord să despăgubiți, să apărați și să considerați Divine Models și afiliații săi nevinovați de orice reclamație, daună, cost și cheltuială, inclusiv onorariile avocaților, care decurg din sau în legătură cu utilizarea site-ului web de către dumneavoastră.',
            description: 'Text for the indemnification section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section8.title',
            value: 'Contact',
            description: 'Title for the contact section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.section8.text',
            value: 'Dacă aveți întrebări despre acești termeni și condiții, vă rugăm să ne contactați la:',
            description: 'Text for the contact section on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.contactEmail',
            value: 'contact@divinemodels.ro',
            description: 'Contact email on terms page',
            location: 'Terms'
        },
        {
            key: 'terms.contactPhone',
            value: '+40 748 037 587',
            description: 'Contact phone on terms page',
            location: 'Terms'
        },
    ];

    try {
        // Create privacy texts
        for (const text of privacyTexts) {
            await prisma.siteText.upsert({
                where: { key: text.key },
                update: {
                    value: text.value,
                    description: text.description,
                    location: text.location
                },
                create: text
            });
        }

        // Create terms texts
        for (const text of termsTexts) {
            await prisma.siteText.upsert({
                where: { key: text.key },
                update: {
                    value: text.value,
                    description: text.description,
                    location: text.location
                },
                create: text
            });
        }

        console.log('Privacy and terms page texts seeded successfully!');
    } catch (error) {
        console.error('Error seeding privacy and terms page texts:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedPrivacyTermsTexts()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
