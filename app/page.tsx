"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(3, "Vă rugăm să introduceți numele complet."),
  email: z
    .string()
    .email("Vă rugăm să introduceți o adresă de email validă."),
  phone: z
    .string()
    .min(7, "Vă rugăm să introduceți un număr de telefon valid."),
  domain: z.string().min(1, "Vă rugăm să selectați domeniul juridic."),
  description: z
    .string()
    .min(
      50,
      "Descrierea situației trebuie să conțină cel puțin 50 de caractere."
    ),
  communication: z.enum(["telefon", "email", "whatsapp", "videoconferinta"], {
    errorMap: () => ({
      message:
        "Vă rugăm să selectați modalitatea preferată de comunicare."
    })
  }),
  consent: z.literal(true, {
    errorMap: () => ({
      message:
        "Pentru a trimite formularul, este necesar acordul privind prelucrarea datelor."
    })
  })
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "practice", label: "Domenii de practică" },
    { id: "about", label: "Despre" },
    { id: "process", label: "Proces" },
    { id: "testimonials", label: "Testimoniale" },
    { id: "contact", label: "Contact" }
  ];

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -80;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-soft backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-layout flex items-center justify-between py-4">
        <div className="flex flex-col">
          <span
            className={`font-heading text-xl md:text-2xl tracking-tight ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            [Nume Cabinet Avocat]
          </span>
          <span
            className={`text-xs md:text-sm uppercase tracking-[0.16em] ${
              isScrolled ? "text-textSecondary" : "text-slate-100"
            }`}
          >
            Cabinet de Avocatură
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? "text-textSecondary" : "text-slate-100"
              } hover:text-primary`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://calendly.com/laudatu-roxana/30min"
            target="_blank"
            rel="noreferrer"
            className="ml-4 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primaryDark transition-colors"
          >
            Programează consultație
          </a>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-white/30 p-2 text-white"
          onClick={() => setIsMobileOpen((p) => !p)}
          aria-label="Deschide meniul"
        >
          <span className="sr-only">Deschide meniul</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </div>

      {isMobileOpen && (
        <div
          className={`md:hidden border-t ${
            isScrolled
              ? "border-borderSoft bg-white/95"
              : "border-white/20 bg-slate-900/95"
          }`}
        >
          <div className="container-layout flex flex-col gap-3 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm text-left font-medium ${
                  isScrolled ? "text-textMain" : "text-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://calendly.com/laudatu-roxana/30min"
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primaryDark transition-colors text-center"
            >
              Programează consultație
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primaryDark to-slate-900 opacity-95" />
      <div className="relative z-10 container-layout py-32">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
            Când situația juridică devine complexă, noi vă oferim claritate și
            rezolvare.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-slate-100/90 mb-8">
            Cabinet de avocatură cu [X] ani de experiență în drept comercial,
            civil și contencios. Reprezentăm clienți în negocieri, litigii și
            consultanță juridică strategică, cu focus pe rezultate măsurabile și
            comunicare transparentă.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="https://calendly.com/laudatu-roxana/30min"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-secondary px-8 py-3 text-sm md:text-base font-semibold text-primary shadow-card hover:shadow-lg transition-shadow"
            >
              Programează o consultație
            </a>
            <a
              href="#practice"
              className="inline-flex items-center justify-center rounded-md border-2 border-white px-8 py-3 text-sm md:text-base font-semibold text-white hover:bg-white hover:text-primary transition-colors"
            >
              Vezi domenii de practică
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {[
              "[X]+ ani de experiență",
              "[Y]+ cazuri finalizate cu succes",
              "Consultație inițială gratuită (30 min)",
              "Răspuns în maxim 24 ore"
            ].map((text) => (
              <div key={text} className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/90 text-primary text-xs font-bold">
                  ✓
                </span>
                <span className="text-slate-100/90">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PracticeAreas: React.FC = () => {
  const cards = [
    {
      title: "Drept comercial și corporate",
      icon: "💼",
      description:
        "Asistăm antreprenori și companii în constituirea societăților, redactarea contractelor comerciale, fuziuni și achiziții, restructurări corporative și conformitate GDPR.",
      bullets: [
        "Înființare și structurare societăți comerciale",
        "Redactare și negociere contracte B2B",
        "Due diligence și M&A",
        "Consultanță GDPR și protecție date",
        "Litigii comerciale"
      ],
      button: "Detalii"
    },
    {
      title: "Drept civil și familial",
      icon: "👥",
      description:
        "Gestionăm situații sensibile din sfera personală: divorțuri, partaje, custodie copii, moșteniri și succesiuni. Abordăm fiecare caz cu empatie și profesionalism.",
      bullets: [
        "Divorț și partaj bunuri comune",
        "Stabilire și modificare obligații întreținere",
        "Succesiuni și moșteniri",
        "Acte notariale și tranzacții imobiliare",
        "Reprezentare în instanță"
      ],
      button: "Detalii"
    },
    {
      title: "Drept contencios și litigii",
      icon: "⚖️",
      description:
        "Reprezentăm clienți în fața instanțelor de judecată în litigii civile, comerciale și administrative, cu strategii juridice solide și analiză detaliată a dosarului.",
      bullets: [
        "Litigii comerciale și contractuale",
        "Contencios administrativ",
        "Recuperare creanțe",
        "Contestații decizii autorități",
        "Apeluri și recursuri"
      ],
      button: "Detalii"
    },
    {
      title: "Dreptul muncii",
      icon: "📄",
      description:
        "Asistăm angajatori și angajați în litigii de muncă, concedieri, audit HR și conformitate cu legislația muncii, cu accent pe prevenirea conflictelor.",
      bullets: [
        "Contracte individuale de muncă",
        "Proceduri de concediere conformă",
        "Litigii cu ANAF și ITM",
        "Audit intern HR și conformitate",
        "Reprezentare în instanță"
      ],
      button: "Detalii"
    },
    {
      title: "Drept penal",
      icon: "🛡️",
      description:
        "Apărăm persoane fizice și juridice în proceduri penale: investigații, urmărire penală, judecată. Asigurăm asistență de urgență și reprezentare solidă.",
      bullets: [
        "Asistență în faza de urmărire penală",
        "Apărare în instanță",
        "Constituire parte civilă",
        "Contestații și căi extraordinare de atac",
        "Drept penal al afacerilor"
      ],
      button: "Detalii"
    },
    {
      title: "Retainer juridic (consultanță permanentă)",
      icon: "🎧",
      description:
        "Parteneriat pe termen lung pentru companii care au nevoie de asistență juridică constantă, la un tarif lunar fix și predictibil.",
      bullets: [
        "Acces prioritar la consultanță",
        "Revizuire nelimitată contracte și acte",
        "Reprezentare în negocieri",
        "Tarif lunar fix",
        "Rapoarte lunare și recomandări preventive"
      ],
      button: "Solicită ofertă"
    }
  ];

  return (
    <section
      id="practice"
      className="section bg-backgroundAlt py-16 md:py-24"
    >
      <div className="container-layout">
        <div className="max-w-2xl mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4">
            Domeniile noastre de expertiză juridică
          </h2>
          <p className="text-base md:text-lg text-textSecondary">
            Oferim asistență specializată în multiple arii ale dreptului,
            adaptată nevoilor dumneavoastră și specificului fiecărui caz.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col rounded-lg border border-borderSoft bg-white p-6 shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-2xl">
                  <span>{card.icon}</span>
                </div>
                <h3 className="font-subheading text-xl font-semibold text-primary">
                  {card.title}
                </h3>
              </div>
              <p className="mb-4 text-sm md:text-base text-textSecondary leading-relaxed">
                {card.description}
              </p>
              <ul className="mb-5 space-y-1.5 text-sm text-textSecondary">
                {card.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <button className="text-sm font-semibold text-accent hover:text-primary">
                  {card.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs: React.FC = () => {
  const items = [
    {
      title: "Experiență dovedită în cazuri complexe",
      icon: "🏅",
      text: "[X] ani de practică juridică activă, cu peste [Y] cazuri finalizate cu succes în instanțe și prin negociere. Cunoaștem jurisprudența, anticipăm argumentele adverse și construim strategii câștigătoare."
    },
    {
      title: "Comunicare clară și transparentă",
      icon: "💬",
      text: "Traducem limbajul juridic în termeni simpli. Vă ținem la curent cu evoluția dosarului, explicăm fiecare pas și răspundem prompt la întrebări. Fără surprize neplăcute sau costuri ascunse."
    },
    {
      title: "Focus pe rezultate concrete",
      icon: "🎯",
      text: "Nu ne măsurăm succesul în pagini de documente, ci în probleme rezolvate și drepturi protejate. Obiectivul nostru este să vă oferim soluția cea mai eficientă, nu neapărat cea mai costisitoare."
    }
  ];

  return (
    <section id="why-us" className="section py-16 md:py-20 bg-background">
      <div className="container-layout">
        <div className="max-w-2xl mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4">
            De ce clienții ne aleg și ne recomandă
          </h2>
          <p className="text-base md:text-lg text-textSecondary">
            Înțelegem că decizia de a alege un avocat este una importantă.
            Construim relații pe termen lung, bazate pe încredere, rezultate și
            comunicare deschisă.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-borderSoft bg-backgroundAlt p-6 shadow-soft"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-subheading text-lg font-semibold text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-textSecondary leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="section bg-backgroundAlt py-16 md:py-20"
    >
      <div className="container-layout grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center">
        <div className="relative h-64 md:h-80 rounded-lg bg-primary/90 shadow-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-transparent to-white/10" />
          <div className="relative h-full w-full flex items-center justify-center px-6 text-white text-center">
            <p className="font-subheading text-xl md:text-2xl font-semibold leading-relaxed">
              [Nume Avocat Principal] <br />
              <span className="block mt-2 text-sm font-normal">
                Fondator și avocat coordonator, Cabinet de Avocatură [Nume
                Cabinet]
              </span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4">
            [Nume Avocat Principal] - Fondator și avocat coordonator
          </h2>
          <p className="text-base md:text-lg text-textSecondary leading-relaxed mb-4">
            Cabinet de avocatură fondat în [AN], cu expertiză solidă în drept
            comercial, civil și contencios. De-a lungul anilor, am reprezentat
            cu succes antreprenori, companii și persoane fizice în negocieri,
            litigii și consultanță juridică strategică.
          </p>
          <p className="text-base text-textSecondary leading-relaxed mb-4">
            Am înțeles că un avocat bun nu doar cunoaște legea – o aplică
            strategic pentru a proteja interesele clientului său. Fiecare caz e
            tratat cu seriozitatea și atenția pe care le merită, indiferent de
            mărimea dosarului.
          </p>
          <p className="text-base text-textSecondary leading-relaxed mb-4">
            Suntem membri activi ai Baroului [JUDEȚ/BUCUREȘTI], cu participare
            constantă la programele de formare profesională continuă și
            actualizare legislativă.
          </p>

          <div className="mt-4 mb-6">
            <h3 className="font-subheading text-lg font-semibold text-primary mb-2">
              Certificări și apartenențe
            </h3>
            <ul className="space-y-1.5 text-sm text-textSecondary">
              <li>• Membru Baroul [Județ]</li>
              <li>• [Alte certificări relevante]</li>
              <li>• [Specializări internaționale, dacă există]</li>
            </ul>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primaryDark transition-colors"
          >
            Programează o discuție
          </a>
        </div>
      </div>
    </section>
  );
};

const Process: React.FC = () => {
  const steps = [
    {
      title: "Consultație inițială (gratuită - 30 min)",
      icon: "📅",
      text: "Discutăm situația dumneavoastră, analizăm contextul juridic și vă oferim o primă evaluare a opțiunilor disponibile, fără obligații."
    },
    {
      title: "Analiza detaliată și strategie",
      icon: "🔍",
      text: "Studiem documentele relevante, evaluăm riscurile și oportunitățile și construim strategia juridică optimă pentru cazul dumneavoastră."
    },
    {
      title: "Contract de asistență juridică",
      icon: "✒️",
      text: "Semnăm contractul care definește clar serviciile, onorariile și responsabilitățile ambelor părți. Transparență totală de la început."
    },
    {
      title: "Acțiune și reprezentare",
      icon: "💼",
      text: "Redactăm documentele, reprezentăm interesele dumneavoastră în negocieri sau în instanță și gestionăm toate aspectele juridice ale cazului."
    },
    {
      title: "Rezolvare și consultanță post-caz",
      icon: "✅",
      text: "La final, explicăm rezultatul, implicațiile practice și oferim recomandări pentru a evita situații similare în viitor."
    }
  ];

  return (
    <section id="process" className="section py-16 md:py-20 bg-background">
      <div className="container-layout">
        <div className="max-w-2xl mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4">
            Cum lucrăm împreună: transparent și eficient
          </h2>
          <p className="text-base md:text-lg text-textSecondary">
            Un proces juridic clar, fără confuzie sau pași ascunși. Știți mereu
            unde ne aflăm și ce urmează.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 hidden md:block border-l border-borderSoft" />
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary text-base font-semibold shadow-soft">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mt-2 hidden h-full w-px bg-borderSoft md:block" />
                  )}
                </div>
                <div className="flex-1 rounded-lg border border-borderSoft bg-backgroundAlt p-4 md:p-5 shadow-soft">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="font-subheading text-lg md:text-xl font-semibold text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-textSecondary">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm md:text-base text-textSecondary">
            Este normal să aveți întrebări și neliniști. Rolul nostru este să
            vă oferim claritate și siguranță juridică în fiecare etapă.
          </p>
        </div>
      </div>
    </section>
  );
};

const Results: React.FC = () => {
  const cases = [
    {
      category: "Litigiu comercial",
      situation:
        "Companie din România vs. furnizor internațional – contract nesustenabil, penalități nejustificate.",
      result:
        "Renegociere contractuală avantajoasă și anulare penalități de €47.000 prin arbitraj comercial.",
      impact:
        "Clientul a economisit peste €50.000 și a păstrat relația comercială pe termen lung."
    },
    {
      category: "Drept familial",
      situation:
        "Divorț contestat cu partaj bunuri complexe și stabilire domiciliu copil minor.",
      result:
        "Încheiere divorț prin procedură mediată, partaj echitabil și program de vizitare agreat de ambele părți.",
      impact:
        "Evitarea unui proces îndelungat, costuri reduse semnificativ și protejarea interesului copilului."
    },
    {
      category: "Recuperare creanțe",
      situation:
        "Antreprenor individual cu creanță neachitată de 18 luni (85.000 lei) față de client corporate.",
      result:
        "Recuperare 100% creanță plus dobânzi și cheltuieli de judecată prin executare silită.",
      impact:
        "Salvarea business-ului clientului și reluarea activității fără presiunea datoriei."
    },
    {
      category: "Drept penal al afacerilor",
      situation:
        "Administrator societate acuzat nefondat de evaziune fiscală în urma unui control ANAF.",
      result:
        "Clasare dosar în faza de urmărire penală prin dovezi solide și argumentare juridică.",
      impact:
        "Protejarea reputației profesionale și continuarea afacerii fără umbra unei anchete penale."
    }
  ];

  return (
    <section
      id="results"
      className="section bg-backgroundAlt py-16 md:py-20"
    >
      <div className="container-layout">
        <div className="max-w-2xl mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4">
            Rezultate concrete pentru clienții noștri
          </h2>
          <p className="text-base md:text-lg text-textSecondary">
            Cazuri reprezentative din practica noastră (detalii anonimizate
            conform obligațiilor de confidențialitate).
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <div
              key={c.category}
              className="rounded-lg border border-borderSoft bg-white p-6 shadow-soft"
            >
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                {c.category}
              </div>
              <div className="mb-3">
                <span className="text-xs font-semibold uppercase text-textSecondary">
                  Situație:
                </span>
                <p className="text-sm text-textSecondary">{c.situation}</p>
              </div>
              <div className="mb-3">
                <span className="text-xs font-semibold uppercase text-textSecondary">
                  Rezultat:
                </span>
                <p className="text-sm text-textSecondary">{c.result}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-textSecondary">
                  Impact:
                </span>
                <p className="text-sm text-textSecondary">{c.impact}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-textSecondary">
          *Toate detaliile au fost anonimizate pentru protejarea
          confidențialității clienților noștri.
        </p>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      text: "Am avut o situație juridică complexă cu un partener de afaceri. [Nume Avocat] a înțeles rapid contextul, a construit o strategie clară și am ajuns la o rezolvare favorabilă fără să ajungem în instanță.",
      name: "Andrei M.",
      role: "Antreprenor, Cluj-Napoca"
    },
    {
      text: "După un divorț dificil, aveam nevoie de cineva care să mă reprezinte ferm, dar și să înțeleagă aspectele emoționale. Echipa cabinetului a făcut exact asta.",
      name: "Elena P.",
      role: "Clientă, Cluj-Napoca"
    },
    {
      text: "Colaborăm cu [Nume Cabinet] pe bază de retainer pentru consultanță juridică permanentă. Este ca și cum am avea un departament juridic propriu, dar la o fracțiune din cost.",
      name: "Mihai T.",
      role: "Director SRL, Sector IT"
    },
    {
      text: "Procesul de recuperare creanță părea imposibil. În câteva luni am recuperat totul plus cheltuielile. Strategie juridică impecabilă și execuție la timp.",
      name: "Laura S.",
      role: "Freelancer, București"
    }
  ];

  return (
    <section
      id="testimonials"
      className="section bg-background py-16 md:py-20"
    >
      <div className="container-layout">
        <div className="max-w-2xl mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4">
            Ce spun clienții noștri
          </h2>
          <p className="text-base md:text-lg text-textSecondary">
            Testimoniale reale de la clienți care au ales să lucreze cu noi
            pentru situații juridice importante.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-lg border-l-4 border-secondary bg-backgroundAlt p-5 shadow-soft"
            >
              <blockquote className="text-sm md:text-base text-textSecondary italic leading-relaxed mb-4">
                “{t.text}”
              </blockquote>
              <figcaption className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-semibold text-primary">
                    {t.name}
                  </div>
                  <div className="text-xs text-textSecondary">{t.role}</div>
                </div>
                <div className="text-secondary text-base" aria-label="5 stele">
                  ★★★★★
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Cât costă serviciile dumneavoastră?",
      a: "Onorariile depind de complexitatea cazului și de timpul necesar. Oferim tarife orare pentru consultanță, tarife fixe pentru anumite servicii standard și, în anumite situații, onorarii de succes. În consultația inițială gratuită veți primi o estimare clară pentru situația dumneavoastră specifică."
    },
    {
      q: "Consultația inițială este cu adevărat gratuită?",
      a: "Da. Primele 30 de minute sunt complet gratuite și fără obligația de a continua colaborarea. Este o oportunitate pentru dumneavoastră să ne cunoașteți și pentru noi să înțelegem contextul juridic al situației."
    },
    {
      q: "Cât durează un proces în instanță?",
      a: "Durata depinde de complexitatea cazului și de volumul de lucru al instanței. În medie, un proces civil la prima instanță poate dura între 12 și 18 luni, dar pot exista și situații mai scurte sau mai îndelungate. Oferim estimări realiste în faza de analiză."
    },
    {
      q: "Lucrați și online, la distanță?",
      a: "Da. Oferim consultanță online pentru clienți din întreaga țară și din străinătate prin videoconferință sau telefon. Documentele pot fi transmise electronic sau prin curier, iar semnătura poate fi realizată și electronic, acolo unde legea permite."
    },
    {
      q: "Ce documente trebuie să pregătesc pentru consultație?",
      a: "Nu este obligatoriu să aveți toate documentele la prima discuție. Este suficient să descrieți situația. Dacă aveți contracte, corespondență sau decizii ale autorităților, le puteți transmite înainte de întâlnire pentru o analiză mai eficientă."
    },
    {
      q: "Garantați câștigarea procesului?",
      a: "Niciun avocat serios nu poate garanta rezultatul unui proces. Rezultatul depinde de probe, de interpretarea legii și de decizia instanței. Putem însă garanta un nivel maxim de profesionalism, implicare și transparență."
    },
    {
      q: "Cum se derulează plata serviciilor?",
      a: "Pentru consultanță punctuală, plata se face în baza facturii emise, după prestarea serviciului. Pentru cazuri complexe sau pentru colaborări de tip retainer, lucrăm cu avans și facturare periodică. Acceptăm plata prin transfer bancar și card."
    },
    {
      q: "Ce se întâmplă dacă nu suntem mulțumiți de colaborare?",
      a: "Contractul de asistență juridică poate fi denunțat de oricare dintre părți, cu respectarea termenilor contractuali. Dacă există nemulțumiri, încurajăm o discuție deschisă pentru a găsi soluții. Ne dorim colaborări bazate pe încredere, nu pe obligații stricte."
    }
  ];

  return (
    <section id="faq" className="section py-16 md:py-20 bg-backgroundAlt">
      <div className="container-layout">
        <div className="max-w-2xl mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4">
            Răspunsuri la întrebările dumneavoastră
          </h2>
          <p className="text-base text-textSecondary">
            Dacă aveți întrebări suplimentare, vă invităm să ne contactați
            direct. Vom răspunde cu plăcere.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className="rounded-lg border border-borderSoft bg-white"
              >
                <button
                  className="flex w-full items-center justify-between px-4 py-3 md:px-5 md:py-4 text-left"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                >
                  <span className="text-sm md:text-base font-medium text-textMain">
                    {item.q}
                  </span>
                  <span className="ml-4 text-xl text-textSecondary">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-borderSoft px-4 py-3 md:px-5 md:py-4">
                    <p className="text-sm md:text-base text-textSecondary leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log("Contact form submit:", data);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section py-16 md:py-20 bg-background">
      <div className="container-layout grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-4">
            Programați consultația gratuită acum
          </h2>
          <p className="text-base md:text-lg text-textSecondary mb-6">
            Răspundem în maxim 24 de ore. Primul pas: o discuție clară despre
            situația dumneavoastră.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-lg border border-borderSoft bg-backgroundAlt p-5 md:p-6 shadow-soft"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-textMain mb-1">
                  Nume complet*
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full rounded-md border border-borderSoft bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nume și prenume"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-textMain mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-md border border-borderSoft bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="adresa@exemplu.ro"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-textMain mb-1">
                  Telefon*
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full rounded-md border border-borderSoft bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="+40 ..."
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-textMain mb-1">
                  Domeniu juridic*
                </label>
                <select
                  {...register("domain")}
                  className="w-full rounded-md border border-borderSoft bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selectați domeniul
                  </option>
                  <option value="comercial">Drept comercial / corporate</option>
                  <option value="civil">Drept civil / familial</option>
                  <option value="contencios">Contencios / litigii</option>
                  <option value="munca">Dreptul muncii</option>
                  <option value="penal">Drept penal</option>
                  <option value="retainer">
                    Consultanță permanentă (retainer)
                  </option>
                  <option value="altul">Altul</option>
                </select>
                {errors.domain && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.domain.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMain mb-1">
                Descrierea sumară a situației*
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full rounded-md border border-borderSoft bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Descrieți pe scurt situația juridică pentru care aveți nevoie de asistență..."
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <p className="block text-sm font-medium text-textMain mb-1">
                Cum ați dori să comunicăm?
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { value: "telefon", label: "Telefon" },
                  { value: "email", label: "Email" },
                  { value: "whatsapp", label: "WhatsApp" },
                  { value: "videoconferinta", label: "Videoconferință" }
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 text-sm text-textSecondary"
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      {...register("communication")}
                      className="h-4 w-4 border-borderSoft text-primary focus:ring-primary"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.communication && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.communication.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-1 h-4 w-4 border-borderSoft text-primary focus:ring-primary"
              />
              <span className="text-xs md:text-sm text-textSecondary">
                Sunt de acord cu prelucrarea datelor conform{" "}
                <button
                  type="button"
                  className="font-medium text-accent hover:text-primary"
                >
                  Politicii de confidențialitate
                </button>
                .*
              </span>
            </div>
            {errors.consent && (
              <p className="mt-1 text-xs text-red-600">
                {errors.consent.message}
              </p>
            )}

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-accent transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Se trimite..." : "Trimite solicitarea"}
              </button>
              <p className="text-xs text-textSecondary">
                Confidențialitatea este garantată. Datele dumneavoastră sunt
                protejate conform GDPR și secretului profesional avocat–client.
              </p>
            </div>

            {submitted && (
              <p className="mt-2 text-xs font-medium text-green-700">
                Vă mulțumim! Solicitarea a fost trimisă. Vă vom contacta în
                cel mai scurt timp.
              </p>
            )}
          </form>
        </div>

        <div className="space-y-4 rounded-lg border border-borderSoft bg-backgroundAlt p-5 md:p-6 shadow-soft">
          <h3 className="font-subheading text-lg md:text-xl font-semibold text-primary mb-2">
            Cabinet de Avocatură [Nume Cabinet]
          </h3>

          <div>
            <h4 className="text-sm font-semibold text-textMain mb-1">
              Adresă
            </h4>
            <p className="text-sm text-textSecondary">
              [Strada, Nr., Bloc, Etaj]
              <br />
              [Cod poștal, Oraș, Județ]
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-textMain mb-1">
              Program
            </h4>
            <p className="text-sm text-textSecondary">
              Luni - Vineri: 09:00 - 18:00
              <br />
              Sâmbătă: Doar cu programare (10:00 - 14:00)
              <br />
              Duminică: Închis
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-textMain mb-1">
              Contact
            </h4>
            <p className="text-sm text-textSecondary">
              📞 Telefon: [+40 XXX XXX XXX]
              <br />
              💬 WhatsApp: [+40 XXX XXX XXX]
              <br />
              📧 Email: [contact@numesite.ro]
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-textMain mb-1">
              Consultație urgentă
            </h4>
            <p className="text-sm text-textSecondary">
              Pentru situații urgente (arestări, percheziții, somații cu termen
              scurt), sunați direct la [Telefon urgență].
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="https://calendly.com/laudatu-roxana/30min"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-accent px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
            >
              Alege data consultației
            </a>

            <div className="h-40 w-full rounded-md bg-slate-200 flex items-center justify-center text-xs text-textSecondary">
              Hartă Google Maps – integrare ulterioară
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-slate-100 pt-10">
      <div className="container-layout grid gap-8 md:grid-cols-3 pb-6">
        <div>
          <div className="font-heading text-xl font-semibold mb-2">
            [Nume Cabinet Avocat]
          </div>
          <p className="text-sm text-slate-100/80 mb-3">
            Cabinet de avocatură cu experiență în drept comercial, civil și
            contencios. Asistență juridică profesionistă pentru afaceri și
            persoane fizice.
          </p>
          <div className="text-xs text-slate-100/70">
            <div>[Link LinkedIn]</div>
            <div>[Link pagină Facebook]</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Linkuri rapide</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-100/80">
            <a href="#practice" className="hover:text-white">
              Domenii de practică
            </a>
            <a href="#about" className="hover:text-white">
              Despre cabinet
            </a>
            <a href="#process" className="hover:text-white">
              Proces de lucru
            </a>
            <a href="#testimonials" className="hover:text-white">
              Testimoniale
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">
            Legal și informații
          </h4>
          <div className="space-y-1 text-sm text-slate-100/80">
            <div>Politica de confidențialitate (GDPR)</div>
            <div>Termeni și condiții</div>
            <div>Prelucrarea datelor personale</div>
            <div>Politica de cookies</div>
          </div>

          <div className="mt-3 text-xs text-slate-100/70">
            <p>[Nume Avocat] – Avocat definitiv</p>
            <p>Baroul [Județ/București]</p>
            <p>Decizia de înscriere nr. [XXXXX]/[AN]</p>
            <p>CUI: [XXXXXXX]</p>
          </div>

          <div className="mt-3 text-xs text-slate-100/70">
            <p>Portal instanțe: portal.just.ro</p>
            <p>Baroul [Județ]: [link]</p>
            <p>Monitorul Oficial: [link]</p>
          </div>
        </div>
      </div>

      <div className="border-t border-primaryDark">
        <div className="container-layout flex flex-col gap-2 py-3 text-xs text-slate-100/70 md:flex-row md:items-center md:justify-between">
          <p>
            © 2025 [Nume Cabinet Avocat]. Toate drepturile rezervate.
          </p>
          <div className="text-right">
            <span className="mr-1">
              Vrei și tu un site profesional ca acesta? Ia legătură cu Roxana Laudatu.
            </span>
            <Link
              href="https://calendly.com/laudatu-roxana/30min"
              target="_blank"
              className="font-medium text-secondary hover:text-white transition-colors"
            >
              Programează o discuție gratuită →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/40XXXXXXXXX?text=Bun%C4%83%20ziua!%20A%C8%99%20dori%20s%C4%83%20programez%20o%20consulta%C8%9Bie%20juridic%C4%83."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-whatsapp hover:animate-whatsapp-pulse"
      aria-label="Contactează-ne pe WhatsApp"
      title="Contactează-ne pe WhatsApp – răspundem în max. 30 minute"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M16.04 4C9.94 4 5 8.94 5 15.04c0 2.34.7 4.53 2.03 6.42L5 28l6.7-2.02a11.05 11.05 0 0 0 4.34.88c6.1 0 11.04-4.94 11.04-11.04C27.08 8.94 22.14 4 16.04 4Zm0 19.9c-1.34 0-2.66-.36-3.8-1.03l-.27-.16-3.98 1.2 1.2-3.88-.18-.29A7.89 7.89 0 0 1 8.1 15a7.93 7.93 0 1 1 7.94 8.9Zm4.3-5.92c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.18-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.36.11-.48.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.29-.74-1.77-.2-.48-.4-.4-.54-.4-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.04.4 1.4.51.59.19 1.13.16 1.56.1.48-.07 1.43-.58 1.63-1.13.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z"
        />
      </svg>
    </a>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-textMain">
      <Header />
      <main>
        <Hero />
        <PracticeAreas />
        <WhyUs />
        <About />
        <Process />
        <Results />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

