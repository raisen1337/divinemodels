import prisma from '../src/lib/prisma';

async function seedSiteTexts() {
    console.log('Seeding site texts...');

    // Homepage texts
    const homepageTexts = [
        {
            key: 'homepage.hero.title',
            value: 'Divine Models',
            description: 'Main title on the homepage hero section',
            location: 'Homepage'
        },
        {
            key: 'homepage.hero.tagline',
            value: 'Eleganță, profesionalism și excelență în industria de modelling din România',
            description: 'Tagline below the main title on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.hero.button.models',
            value: 'DESCOPERĂ MODELELE',
            description: 'CTA button to browse models on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.hero.button.contact',
            value: 'APLICĂ LA CASTING',
            description: 'CTA button for casting applications on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.models.title',
            value: 'Modelele Noastre',
            description: 'Title for the featured models section on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.models.subtitle',
            value: 'Talente excepționale care definesc standardele industriei',
            description: 'Subtitle for the featured models section on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.models.button.all',
            value: 'VIEW ALL MODELS',
            description: 'Button to view all models on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.about.title',
            value: 'Despre Noi',
            description: 'Title for the about section on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.about.text1',
            value: 'Divine Models este o agenție de modeling premium din România, specializată în descoperirea și dezvoltarea celor mai talentate modele pentru industria modei, publicității și evenimentelor.',
            description: 'First paragraph of about text on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.about.text2',
            value: 'Cu o echipă de profesioniști dedicați și cu ani de experiență în domeniu, ne-am construit reputația prin seriozitate, transparență și rezultate excelente pentru clienții și modelele noastre.',
            description: 'Second paragraph of about text on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.about.button',
            value: 'AFLĂ MAI MULTE',
            description: 'Button to learn more about the agency on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.contact.title',
            value: 'Contact',
            description: 'Title for the contact section on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.contact.subtitle',
            value: 'Suntem aici pentru a răspunde întrebărilor și solicitărilor tale',
            description: 'Subtitle for the contact section on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.contact.address.title',
            value: 'Adresa Noastră',
            description: 'Title for the address card on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.contact.email.title',
            value: 'Email',
            description: 'Title for the email card on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.contact.phone.title',
            value: 'Telefon',
            description: 'Title for the phone card on homepage',
            location: 'Homepage'
        },
        {
            key: 'homepage.contact.button',
            value: 'CONTACTEAZĂ-NE',
            description: 'Contact button on homepage',
            location: 'Homepage'
        },

        // About page texts
        {
            key: 'about.hero.title',
            value: 'Despre Noi',
            description: 'Main title on the about page',
            location: 'About Page'
        },
        {
            key: 'about.hero.subtitle',
            value: 'Eleganță, profesionalism și excelență în industria de modelling din România',
            description: 'Subtitle on the about page',
            location: 'About Page'
        },
        {
            key: 'about.story.title',
            value: 'Povestea Noastră',
            description: 'Title for the story section on about page',
            location: 'About Page'
        },
        {
            key: 'about.story.text1',
            value: 'Divine Models este o agenție de modeling premium din România, specializată în descoperirea și dezvoltarea celor mai talentate modele pentru industria modei, publicității și evenimentelor.',
            description: 'First paragraph of the story text on about page',
            location: 'About Page'
        },
        {
            key: 'about.story.text2',
            value: 'Cu o echipă de profesioniști dedicați și cu ani de experiență în domeniu, ne-am construit reputația prin seriozitate, transparență și rezultate excelente pentru clienții și modelele noastre.',
            description: 'Second paragraph of the story text on about page',
            location: 'About Page'
        },
        {
            key: 'about.story.text3',
            value: 'Ne mândrim cu standardele înalte pe care le menținem și cu relațiile de lungă durată pe care le dezvoltăm cu clienții noștri, bazate pe încredere și profesionalism.',
            description: 'Third paragraph of the story text on about page',
            location: 'About Page'
        },
        {
            key: 'about.values.title',
            value: 'Valorile Noastre',
            description: 'Title for the values section on about page',
            location: 'About Page'
        },
        {
            key: 'about.values.subtitle',
            value: 'Principiile care ne ghidează activitatea și ne definesc ca organizație',
            description: 'Subtitle for the values section on about page',
            location: 'About Page'
        },
        {
            key: 'about.values.value1.title',
            value: 'Pasiune',
            description: 'Title for the first value on about page',
            location: 'About Page'
        },
        {
            key: 'about.values.value1.text',
            value: 'Suntem pasionați de industria modei și ne dedicăm dezvoltării talentelor și creșterii lor profesionale.',
            description: 'Text for the first value on about page',
            location: 'About Page'
        },
        {
            key: 'about.values.value2.title',
            value: 'Profesionalism',
            description: 'Title for the second value on about page',
            location: 'About Page'
        },
        {
            key: 'about.values.value2.text',
            value: 'Menținem standarde înalte în toate aspectele activității noastre, de la selecția modelelor până la relațiile cu clienții.',
            description: 'Text for the second value on about page',
            location: 'About Page'
        },
        {
            key: 'about.values.value3.title',
            value: 'Inovație',
            description: 'Title for the third value on about page',
            location: 'About Page'
        },
        {
            key: 'about.values.value3.text',
            value: 'Suntem mereu în căutarea de noi tendințe și abordări inovatoare pentru a ne menține în fruntea industriei.',
            description: 'Text for the third value on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.title',
            value: 'Echipa Noastră',
            description: 'Title for the team section on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.subtitle',
            value: 'Profesioniști dedicați, cu experiență vastă în industria de modeling',
            description: 'Subtitle for the team section on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.member1.name',
            value: 'Ana Popescu',
            description: 'Name of the first team member on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.member1.position',
            value: 'Fondator & Director',
            description: 'Position of the first team member on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.member1.bio',
            value: 'Cu peste 15 ani de experiență în industrie, Ana a fondat Divine Models cu viziunea de a crea o agenție care să seteze noi standarde în modelingul românesc.',
            description: 'Biography of the first team member on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.member2.name',
            value: 'Mihai Ionescu',
            description: 'Name of the second team member on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.member2.position',
            value: 'Director Casting',
            description: 'Position of the second team member on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.member2.bio',
            value: 'Mihai coordonează procesul de selecție și dezvoltarea modelelor, aducând o perspectivă unică datorită experienței sale anterioare în moda internațională.',
            description: 'Biography of the second team member on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.member3.name',
            value: 'Elena Dumitrescu',
            description: 'Name of the third team member on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.member3.position',
            value: 'Manager Relații Clienți',
            description: 'Position of the third team member on about page',
            location: 'About Page'
        },
        {
            key: 'about.team.member3.bio',
            value: 'Elena asigură comunicarea eficientă cu clienții și partenerilor noștri, asigurându-se că fiecare proiect este implementat cu succes și profesionalism.',
            description: 'Biography of the third team member on about page',
            location: 'About Page'
        },
        {
            key: 'about.cta.title',
            value: 'Lucrează Cu Noi',
            description: 'Title for the CTA section on about page',
            location: 'About Page'
        },
        {
            key: 'about.cta.text',
            value: 'Fie că ești un model aspirant sau un brand în căutarea de talente, suntem aici pentru a te ajuta',
            description: 'Text for the CTA section on about page',
            location: 'About Page'
        },
        {
            key: 'about.cta.button1',
            value: 'CONTACTEAZĂ-NE',
            description: 'First CTA button on about page',
            location: 'About Page'
        },
        {
            key: 'about.cta.button2',
            value: 'VEZI MODELELE',
            description: 'Second CTA button on about page',
            location: 'About Page'
        },

        // Contact page texts
        {
            key: 'contact.hero.title',
            value: 'Contact',
            description: 'Main title on the contact page',
            location: 'Contact Page'
        },
        {
            key: 'contact.hero.subtitle',
            value: 'Suntem aici pentru a răspunde întrebărilor și solicitărilor tale',
            description: 'Subtitle on the contact page',
            location: 'Contact Page'
        },
        {
            key: 'contact.info.address.title',
            value: 'Adresa Noastră',
            description: 'Title for the address card on contact page',
            location: 'Contact Page'
        },
        {
            key: 'contact.info.email.title',
            value: 'Email',
            description: 'Title for the email card on contact page',
            location: 'Contact Page'
        },
        {
            key: 'contact.info.phone.title',
            value: 'Telefon',
            description: 'Title for the phone card on contact page',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.title',
            value: 'Trimite-ne un Mesaj',
            description: 'Title for the contact form section',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.subtitle',
            value: 'Completează formularul de mai jos și te vom contacta în cel mai scurt timp',
            description: 'Subtitle for the contact form section',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.label.name',
            value: 'Nume',
            description: 'Label for the name field in contact form',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.placeholder.name',
            value: 'Numele tău',
            description: 'Placeholder for the name field in contact form',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.label.email',
            value: 'Email',
            description: 'Label for the email field in contact form',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.placeholder.email',
            value: 'Email-ul tău',
            description: 'Placeholder for the email field in contact form',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.label.subject',
            value: 'Subiect',
            description: 'Label for the subject field in contact form',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.placeholder.subject',
            value: 'Subiectul mesajului',
            description: 'Placeholder for the subject field in contact form',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.label.message',
            value: 'Mesaj',
            description: 'Label for the message field in contact form',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.placeholder.message',
            value: 'Mesajul tău',
            description: 'Placeholder for the message field in contact form',
            location: 'Contact Page'
        },
        {
            key: 'contact.form.button.submit',
            value: 'TRIMITE MESAJUL',
            description: 'Submit button text for contact form',
            location: 'Contact Page'
        },
        {
            key: 'contact.casting.title',
            value: 'Aplică pentru Casting',
            description: 'Title for the casting application section',
            location: 'Contact Page'
        },
        {
            key: 'contact.casting.subtitle',
            value: 'Ești interesat/ă să devii model? Suntem mereu în căutare de talente noi!',
            description: 'Subtitle for the casting application section',
            location: 'Contact Page'
        },
        {
            key: 'contact.casting.button',
            value: 'APLICĂ ACUM',
            description: 'Button text for casting application',
            location: 'Contact Page'
        },

        // Models page texts
        {
            key: 'models.hero.title',
            value: 'Modelele Noastre',
            description: 'Main title on the models page',
            location: 'Models Page'
        },
        {
            key: 'models.hero.subtitle',
            value: 'Descoperă talentele noastre excepționale, pregătite să dea viață viziunii tale creative',
            description: 'Subtitle on the models page',
            location: 'Models Page'
        },
        {
            key: 'models.filter.all',
            value: 'Toate',
            description: 'Label for the "all" filter option on models page',
            location: 'Models Page'
        },
        {
            key: 'models.grid.showing.all',
            value: 'Showing all {count} models',
            description: 'Text showing the count of all models',
            location: 'Models Page'
        },
        {
            key: 'models.grid.showing.category',
            value: 'Showing {count} models in category "{category}"',
            description: 'Text showing the count of models in a specific category',
            location: 'Models Page'
        },
        {
            key: 'models.grid.no.image',
            value: 'No image',
            description: 'Text shown when a model has no image',
            location: 'Models Page'
        },
        {
            key: 'models.grid.model.suffix',
            value: 'MODEL',
            description: 'Suffix added to the category name for a model',
            location: 'Models Page'
        },
    ];

    // Insert site texts
    for (const text of homepageTexts) {
        const existingText = await prisma.siteText.findUnique({
            where: { key: text.key },
        });

        if (!existingText) {
            await prisma.siteText.create({
                data: text,
            });
        } else {
            console.log(`Site text with key "${text.key}" already exists.`);
        }
    }

    console.log('Site texts seeding completed!');
}

async function main() {
    try {
        await seedSiteTexts();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
