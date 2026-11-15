// Bouwt de showroom site van LINA in het Nederlands (/) en Engels (/en/).
// Draai: node build.mjs  -> schrijft naar ./dist
import { mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const hier = dirname(fileURLToPath(import.meta.url));
const dist = join(hier, "dist");

const LOGO = `<svg class="merk" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a3df0"/><stop offset=".6" stop-color="#9b4dff"/><stop offset="1" stop-color="#f2559b"/></linearGradient></defs><rect width="48" height="48" rx="15" fill="url(#lg)"/><path d="M15 11v20.5a5.5 5.5 0 0 0 5.5 5.5H34" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/><circle cx="30" cy="20" r="5" fill="#ffd166"/></svg>`;

const ic = {
  dag: `<path d="M4 7h16M4 12h10M4 17h7"/><circle cx="18" cy="16" r="3"/>`,
  mensen: `<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.6 3-5.5 6-5.5s5.4 1.9 6 5.5"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.6c2.6.2 4.4 1.9 5 5.4"/>`,
  team: `<path d="M4 6h16v10H8l-4 4z"/><path d="M8 10h8M8 13h5"/>`,
  hr: `<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 15l2 2 4-4"/>`,
  cijfers: `<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>`,
  koppel: `<circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><path d="M10 12h4"/>`,
  slot: `<rect x="5" y="10" width="14" height="10" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>`,
  tel: `<rect x="7" y="2.5" width="10" height="19" rx="3"/><path d="M11 18.5h2"/>`,
  help: `<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .9-1 1.6v.4"/><circle cx="12" cy="17" r=".6"/>`,
  spraak: `<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>`,
  net: `<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M11 7.2 6.2 15.8M13 7.2l4.8 8.6M7.5 18h9"/>`,
  ster: `<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>`,
};
const svg = (k) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ic[k]}</svg>`;

const T = {
  nl: {
    lang: "nl",
    title: "LINA, ons systeem voor de hele organisatie",
    desc: "LINA is je digitale assistent. Eén systeem voor dagbesteding, deelnemers, team, HR, cijfers en koppelingen. Gemaakt voor franchiseorganisaties die elke vestiging sterk willen maken.",
    nav: ["Wat LINA doet", "Voor franchise", "Veilig", "Starten"],
    demo: "Plan een demo",
    andereTaal: { label: "EN", href: "/en/" },
    hero: {
      kicker: "Next generation organisatie",
      h1a: "Je hele bedrijf.",
      h1b: "Eén systeem.",
      lead: "LINA is je digitale assistent. Van de presentielijst om half negen tot het getekende contract van je nieuwe collega en de omzet van vandaag. Alles op één plek, op elke vestiging, op elke telefoon.",
      cta2: "Bekijk wat LINA doet",
      chips: ["Dagbesteding", "HR en contracten", "Cijfers", "Nmbrs en L1nda", "Op je telefoon"],
    },
    mock: {
      groet: "Goedemorgen, Sanne",
      datum: "Dinsdag 17 november",
      aanwezig: "Aanwezig", ziek: "Ziek", open: "Nog invullen",
      vandaag: "Vandaag",
      menu: ["Vandaag", "Dagbesteding", "Deelnemers", "Team", "HR", "Cijfers", "Beheer"],
      kaart1: "Wie is er vandaag",
      kaart2: "Mijn actiepunten",
      acties: ["Rooster december rondsturen", "Nieuwe collega Jesse inwerken", "Audit voorbereiden"],
      kaart3: "Omzet vandaag",
      omzetSub: "tot 14:00, uit de kassa",
      push1t: "LINA", push1: "Jesse heeft het contract getekend. Zet hem in Nmbrs?",
      push2: "Presentielijst staat nog open voor 3 deelnemers",
      stem: "“Noor is vandaag ziek”",
      stemAntw: "Bedoel je Noor de Vries? Ik zet haar op ziek.",
    },
    marquee: ["Presentielijst", "Digitale map", "Rapportage met spraak", "Ontwikkeldoelen", "Samen plannen", "Gespreksscherm", "Overleg en notulen", "Actiepunten", "Contract digitaal tekenen", "Inwerkplan", "Vakmanschap", "VOG", "Verlof en overuren", "Kassa omzet", "Nmbrs", "L1nda", "Pushmeldingen", "Face ID", "Helpknop", "Vestigingen"],
    intro: {
      kicker: "Waarom LINA",
      h2: "Minder schermen. Minder papier. Meer tijd voor mensen.",
      p: "De meeste organisaties werken met vijf losse systemen, drie Excellijsten en een la vol papier. LINA brengt het samen in één rustige omgeving die iedereen begrijpt, van de stagiair op de vloer tot de eigenaar die op zondagavond de cijfers bekijkt.",
      film: "Zo voelt werken met LINA",
      stats: [["1", "systeem voor de hele organisatie"], ["8", "onderdelen, rustig ingedeeld"], ["0", "papieren mappen nodig"], ["24/7", "op elke telefoon, als app"]],
    },
    modulesKicker: "Wat LINA doet",
    modulesH2: "Alles wat een vestiging draaiende houdt",
    modules: [
      ["dag", "Dagbesteding", "Presentielijst met een tik per deelnemer, werkplekken per dag, ontwikkeldoelen met stappen en een quiz, en een PDF voor het zorgkantoor aan het eind van de maand.", ["Presentie", "Werkplekken", "Doelen", "Zorgkantoor"]],
      ["mensen", "Deelnemers", "Een digitale map per deelnemer met wat belangrijk is om te weten, documenten, formulieren met handtekening op het scherm en gesprekken die je samen plant met ouders en consulenten.", ["Digitale map", "Samen plannen", "Gespreksscherm"]],
      ["spraak", "Rapportage met spraak", "Inspreken in plaats van typen. LINA maakt er een nette, feitelijke rapportage van. Jij kijkt na en keurt goed. Namen gaan nooit mee naar buiten.", ["Inspreken", "Concept", "Goedkeuren"]],
      ["team", "Team en overleg", "De agenda voor het weekoverleg, een notulist, besluiten en actiepunten die vanzelf bij de juiste collega landen. Met mededelingen voor het hele team.", ["Agenda", "Notulen", "Actiepunten"]],
      ["hr", "HR en contracten", "Van meeloopdag tot getekend contract. Vragenlijst via een link, BSN en IBAN gecontroleerd, digitaal tekenen, inwerkplan met buddy, vakmanschap per afdeling, VOG en verlof.", ["Contracten", "Inwerken", "Vakmanschap", "Verlof"]],
      ["cijfers", "Cijfers", "Omzet uit de kassa per dag, per uur en per product. Vandaag, deze maand en het hele bedrijf. Elke week en elke maand een samenvatting in je mail.", ["Vandaag", "Deze maand", "Bedrijf"]],
      ["koppel", "Koppelingen", "Een nieuwe collega met één knop in Nmbrs voor de salarisadministratie. Uren en rooster lopen via L1nda en komen weer terug. Geen dubbel werk meer.", ["Nmbrs", "L1nda", "Kassa"]],
      ["tel", "Op je telefoon", "LINA staat als app op je beginscherm, met pushmeldingen op het juiste moment. Inloggen met Face ID of vingerafdruk. Werkt ook als het internet even wegvalt.", ["App", "Meldingen", "Face ID"]],
      ["help", "Helpknop", "Op elke pagina een helpknop met uitleg in gewone taal. Nieuwe collega's krijgen eenmalig een seintje waar ze moeten beginnen. Zo hoeft niemand een handleiding te lezen.", ["Uitleg per pagina", "Nieuwe collega's"]],
    ],
    franchise: {
      kicker: "Voor franchiseorganisaties",
      h2: "Eén formule. Elke vestiging even sterk.",
      p: "Een franchiseformule staat of valt met hoe goed elke vestiging hem uitvoert. LINA legt de formule vast in het dagelijkse werk, zodat een nieuwe vestiging vanaf dag één werkt zoals de beste.",
      punten: [
        ["net", "Vestigingen verbonden", "Stel een vraag aan alle vestigingen tegelijk, of houd een korte poll. Antwoorden komen binnen zonder account en blijven doorzoekbaar. Kennis die nu in losse appgroepen verdwijnt, blijft bewaard."],
        ["hr", "De formule in elk contract", "Contracten, huisregels, gedragscode en inwerkplannen in de eigen huisstijl van de formule. Elke vestiging start met dezelfde stevige basis."],
        ["ster", "Vakmanschap dat je kunt meten", "Per afdeling vier groeistappen, bevestigd door de leiding. Zo zie je waar een team staat en waar het nog kan groeien."],
        ["cijfers", "Cijfers per vestiging", "Elke vestiging ziet de eigen cijfers. Het hoofdkantoor ziet het geheel. Iedereen praat over dezelfde getallen."],
        ["slot", "Eigen omgeving per vestiging", "Elke vestiging een eigen, afgeschermde omgeving met eigen gegevens. Wat van de vestiging is, blijft van de vestiging."],
        ["help", "Snel aan de slag", "Nieuwe vestigingen hoeven niets te bouwen. Formule erin, team erin, en morgen werkt het."],
      ],
    },
    dag: {
      kicker: "Een dag met LINA",
      h2: "Zo voelt een gewone dinsdag",
      items: [
        ["08:30", "Vandaag", "Je opent LINA en ziet wie er is, hoe deelnemers zich voelen en wat er vandaag op je wacht."],
        ["09:15", "Presentie", "Eén tik per deelnemer. Ziek, vakantie of afwezig staat meteen goed voor de declaratie."],
        ["10:00", "Overleg", "De notulist schrijft mee. LINA vat samen en zet elk actiepunt bij de juiste collega."],
        ["13:30", "Nieuwe collega", "Jesse tekent zijn contract op de telefoon. Met één knop staat hij in Nmbrs en start zijn inwerkplan."],
        ["16:00", "Rapportage", "Even inspreken hoe de dag ging. LINA maakt er een nette rapportage van, jij keurt goed."],
        ["Zondag", "Cijfers", "De weeksamenvatting staat in je mail. Omzet, presentie en wat er openstaat, in één oogopslag."],
      ],
    },
    stem: {
      kicker: "Je digitale assistent",
      h2: "Praat gewoon tegen LINA",
      p: "Druk op de paarse microfoon en zeg wat je nodig hebt. LINA zet een deelnemer op ziek, opent een dossier, meldt een incident of maakt een rapportage. Ze vraagt altijd eerst of ze het goed begrepen heeft, en ze leert de namen en woorden van jouw team.",
      lijst: ["Rapportage inspreken in plaats van typen", "Feitelijk, zonder diagnoses of aannames", "Namen gaan als code naar de AI en komen terug in LINA", "Daglimiet per medewerker, jij houdt de regie"],
    },
    veilig: {
      kicker: "Veilig en AVG",
      h2: "Gebouwd voor zorg. Streng waar het moet.",
      p: "In een organisatie met zorg en personeel gaat het om de meest gevoelige gegevens die er zijn. Daarom is LINA vanaf de eerste regel gebouwd op privacy.",
      punten: [
        ["Versleuteld opgeslagen", "Rapportages, notulen en gevoelige teksten staan versleuteld in de database."],
        ["Tweede stap bij inloggen", "Face ID, vingerafdruk of een code per mail voor iedereen met volledige toegang."],
        ["Bewaartermijnen", "LINA houdt bij wat weg mag, maakt een opruimlijst en ruimt automatisch op."],
        ["Inzageverzoek met één knop", "Alle gegevens van een persoon in één download, binnen de wettelijke termijn."],
        ["Logboek", "Je ziet wie wat bekeek en wanneer. Ook wie een digitale map opende."],
        ["Data in Europa", "Database in Frankfurt, wekelijkse back up, aparte testomgeving zonder echte gegevens."],
      ],
    },
    start: {
      kicker: "Starten",
      h2: "Van kennismaking naar alle vestigingen",
      stappen: [
        ["Kennismaking", "We horen hoe jullie formule werkt en wat vestigingen nu het meeste tijd kost."],
        ["Demo op maat", "Je ziet LINA met jullie eigen onderdelen, huisstijl en voorbeelden."],
        ["Proefvestiging", "Eén vestiging werkt een periode met LINA. We passen aan waar het beter kan."],
        ["Uitrol", "Alle vestigingen over, met uitleg voor elk team en een vast aanspreekpunt."],
      ],
    },
    oorsprong: {
      kicker: "Ontstaan op de werkvloer",
      h2: "Niet bedacht achter een bureau",
      p: "LINA is ontstaan in een echte dagbesteding met een drukke horecazaak, waar elke minuut die je niet aan een scherm besteedt naar mensen gaat. Elke knop is getest door begeleiders, leidinggevenden en nieuwe collega's op hun eerste dag. Daarom voelt LINA niet als software, maar als een collega die meedenkt.",
      quote: "Alles wat we elke dag doen, staat op één plek. En het klopt gewoon.",
      quoteBy: "Zo willen we dat elk team over LINA praat",
    },
    slot: {
      h2: "Laat je vestigingen werken als de beste.",
      p: "Plan een demo van een half uur. We laten zien wat LINA voor jullie formule kan doen.",
      cta2: "Mail ons",
    },
    footer: {
      by: "LINA is bedacht en gebouwd door Reno van Zanten, Studio van Zanten.",
      links: [["Studio van Zanten", "https://studiovanzanten.com"], ["Privacy", "https://studiovanzanten.com/privacy"]],
      fictie: "Alle namen en getallen in de voorbeelden op deze site zijn verzonnen.",
    },
  },
};

T.en = {
  lang: "en",
  title: "LINA, our system for your whole organisation",
  desc: "LINA is your digital assistant. One system for day care, participants, team, HR, numbers and integrations. Made for franchise organisations that want every location to be strong.",
  nav: ["What LINA does", "For franchise", "Secure", "Get started"],
  demo: "Book a demo",
  andereTaal: { label: "NL", href: "/" },
  hero: {
    kicker: "Next generation organisation",
    h1a: "Your whole business.",
    h1b: "One system.",
    lead: "LINA is your digital assistant. From the attendance list at half past eight to the signed contract of your new colleague and today's revenue. Everything in one place, at every location, on every phone.",
    cta2: "See what LINA does",
    chips: ["Day care", "HR and contracts", "Numbers", "Nmbrs and L1nda", "On your phone"],
  },
  mock: {
    groet: "Good morning, Sanne",
    datum: "Tuesday 17 November",
    aanwezig: "Present", ziek: "Sick", open: "To fill in",
    vandaag: "Today",
    menu: ["Today", "Day care", "Participants", "Team", "HR", "Numbers", "Settings"],
    kaart1: "Who is here today",
    kaart2: "My action points",
    acties: ["Send out December rota", "Onboard new colleague Jesse", "Prepare the audit"],
    kaart3: "Revenue today",
    omzetSub: "until 14:00, from the till",
    push1t: "LINA", push1: "Jesse signed his contract. Add him to Nmbrs?",
    push2: "Attendance is still open for 3 participants",
    stem: "“Noor is sick today”",
    stemAntw: "Do you mean Noor de Vries? I will mark her as sick.",
  },
  marquee: ["Attendance", "Digital file", "Voice reports", "Development goals", "Plan together", "Meeting screen", "Team meetings", "Action points", "Digital signing", "Onboarding plan", "Craftsmanship", "Background checks", "Leave and overtime", "Till revenue", "Nmbrs", "L1nda", "Push notifications", "Face ID", "Help button", "Locations"],
  intro: {
    kicker: "Why LINA",
    h2: "Fewer screens. Less paper. More time for people.",
    p: "Most organisations work with five separate systems, three spreadsheets and a drawer full of paper. LINA brings it all together in one calm place that everyone understands, from the intern on the floor to the owner checking the numbers on a Sunday evening.",
    film: "This is what working with LINA feels like",
    stats: [["1", "system for the whole organisation"], ["8", "sections, calmly organised"], ["0", "paper files needed"], ["24/7", "on every phone, as an app"]],
  },
  modulesKicker: "What LINA does",
  modulesH2: "Everything that keeps a location running",
  modules: [
    ["dag", "Day care", "Attendance with one tap per participant, workstations per day, development goals with steps and a quiz, and a ready PDF for the care office at the end of the month.", ["Attendance", "Workstations", "Goals", "Care office"]],
    ["mensen", "Participants", "A digital file per participant with what matters most, documents, forms signed on screen and meetings you plan together with parents and case managers.", ["Digital file", "Plan together", "Meeting screen"]],
    ["spraak", "Voice reports", "Speak instead of type. LINA turns it into a clear, factual report. You review and approve. Names never leave the system.", ["Speak", "Draft", "Approve"]],
    ["team", "Team and meetings", "The agenda for the weekly meeting, a minute taker, decisions and action points that land with the right colleague by themselves. Plus announcements for the whole team.", ["Agenda", "Minutes", "Action points"]],
    ["hr", "HR and contracts", "From trial day to signed contract. Questionnaire by link, ID numbers and bank details checked, digital signing, onboarding with a buddy, craftsmanship per department, background checks and leave.", ["Contracts", "Onboarding", "Craftsmanship", "Leave"]],
    ["cijfers", "Numbers", "Revenue from the till per day, per hour and per product. Today, this month and the whole company. A summary in your inbox every week and every month.", ["Today", "This month", "Company"]],
    ["koppel", "Integrations", "A new colleague in Nmbrs payroll with one button. Hours and rota run through L1nda and come back again. No more double work.", ["Nmbrs", "L1nda", "Till"]],
    ["tel", "On your phone", "LINA sits on your home screen as an app, with push notifications at the right moment. Log in with Face ID or fingerprint. Keeps working when the internet drops for a moment.", ["App", "Notifications", "Face ID"]],
    ["help", "Help button", "A help button on every page with plain language explanations. New colleagues get a one time pointer on where to start. Nobody needs to read a manual.", ["Help on every page", "New colleagues"]],
  ],
  franchise: {
    kicker: "For franchise organisations",
    h2: "One formula. Every location equally strong.",
    p: "A franchise formula is only as good as the way each location runs it. LINA builds the formula into the daily work, so a new location performs like the best one from day one.",
    punten: [
      ["net", "Locations connected", "Ask all locations a question at once, or run a quick poll. Answers come in without an account and stay searchable. Knowledge that now disappears in chat groups is kept."],
      ["hr", "The formula in every contract", "Contracts, house rules, code of conduct and onboarding plans in the formula's own brand style. Every location starts on the same solid base."],
      ["ster", "Craftsmanship you can measure", "Four growth steps per department, confirmed by management. You see where a team stands and where it can still grow."],
      ["cijfers", "Numbers per location", "Each location sees its own numbers. Head office sees the whole picture. Everyone talks about the same figures."],
      ["slot", "Own space per location", "Every location gets its own secure environment with its own data. What belongs to the location stays with the location."],
      ["help", "Up and running fast", "New locations do not have to build anything. Formula in, team in, and it works tomorrow."],
    ],
  },
  dag: {
    kicker: "A day with LINA",
    h2: "This is what a normal Tuesday feels like",
    items: [
      ["08:30", "Today", "You open LINA and see who is here, how participants feel and what is waiting for you today."],
      ["09:15", "Attendance", "One tap per participant. Sick, holiday or absent is instantly right for the invoice."],
      ["10:00", "Meeting", "The minute taker writes along. LINA summarises and puts each action point with the right colleague."],
      ["13:30", "New colleague", "Jesse signs his contract on his phone. One button adds him to Nmbrs and starts his onboarding plan."],
      ["16:00", "Report", "Quickly say how the day went. LINA turns it into a clear report, you approve."],
      ["Sunday", "Numbers", "The weekly summary is in your inbox. Revenue, attendance and open items at a glance."],
    ],
  },
  stem: {
    kicker: "Your digital assistant",
    h2: "Just talk to LINA",
    p: "Press the purple microphone and say what you need. LINA marks a participant as sick, opens a file, reports an incident or writes a report. She always checks first that she understood you, and she learns the names and words of your team.",
    lijst: ["Speak your report instead of typing", "Factual, without diagnoses or assumptions", "Names go to the AI as a code and come back in LINA", "Daily limit per employee, you stay in control"],
  },
  veilig: {
    kicker: "Secure and GDPR",
    h2: "Built for care. Strict where it matters.",
    p: "In an organisation with care and staff, you handle the most sensitive data there is. That is why LINA was built on privacy from the very first line.",
    punten: [
      ["Encrypted storage", "Reports, minutes and sensitive texts are stored encrypted in the database."],
      ["Second step at login", "Face ID, fingerprint or a code by mail for everyone with full access."],
      ["Retention periods", "LINA tracks what may be removed, makes a clean up list and tidies up automatically."],
      ["Access request in one click", "All data of a person in one download, within the legal term."],
      ["Audit log", "See who viewed what and when. Including who opened a digital file."],
      ["Data in Europe", "Database in Frankfurt, weekly backup, separate test environment without real data."],
    ],
  },
  start: {
    kicker: "Get started",
    h2: "From first meeting to every location",
    stappen: [
      ["Introduction", "We learn how your formula works and what takes your locations the most time today."],
      ["Tailored demo", "You see LINA with your own sections, brand style and examples."],
      ["Pilot location", "One location works with LINA for a while. We improve wherever it can be better."],
      ["Roll out", "All locations move over, with guidance for every team and one fixed point of contact."],
    ],
  },
  oorsprong: {
    kicker: "Born on the work floor",
    h2: "Not dreamed up behind a desk",
    p: "LINA was born in a real day care setting with a busy hospitality business, where every minute not spent on a screen goes to people. Every button has been tested by support workers, managers and new colleagues on their first day. That is why LINA does not feel like software, but like a colleague who thinks along.",
    quote: "Everything we do every day is in one place. And it simply works.",
    quoteBy: "How we want every team to talk about LINA",
  },
  slot: {
    h2: "Let every location work like your best one.",
    p: "Book a thirty minute demo. We will show you what LINA can do for your formula.",
    cta2: "Email us",
  },
  footer: {
    by: "LINA is conceived and built by Reno van Zanten, Studio van Zanten.",
    links: [["Studio van Zanten", "https://studiovanzanten.com"], ["Privacy", "https://studiovanzanten.com/privacy"]],
    fictie: "All names and numbers in the examples on this site are made up.",
  },
};

const DEMO_URL = "https://studiovanzanten.com/kennismaking?soort=lina";
const MAIL = "mailto:info@studiovanzanten.com?subject=LINA";

function pagina(t) {
  const m = t.mock;
  const isEn = t.lang === "en";
  const base = isEn ? "https://linanextgeneration.com" : "https://linanextgeneration.nl";
  const marq = t.marquee.map((x) => `<span>${x}</span><i></i>`).join("");
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t.title}</title>
<meta name="description" content="${t.desc}">
<meta name="theme-color" content="#f6f3ff">
<link rel="canonical" href="${base}/">
<link rel="alternate" hreflang="nl" href="https://linanextgeneration.nl/">
<link rel="alternate" hreflang="en" href="https://linanextgeneration.com/">
<meta property="og:title" content="${t.title}">
<meta property="og:description" content="${t.desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="${base}/og.png">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/stijl.css">
</head>
<body>
<div class="achter" aria-hidden="true"><b></b><b></b><b></b></div>

<header class="kop" id="kop">
  <a class="logo" href="${isEn ? "/en/" : "/"}">${LOGO}<span>LINA</span></a>
  <nav class="menu" aria-label="Menu">
    <a href="#onderdelen">${t.nav[0]}</a><a href="#franchise">${t.nav[1]}</a><a href="#veilig">${t.nav[2]}</a><a href="#starten">${t.nav[3]}</a>
  </nav>
  <div class="kop-rechts">
    <a class="taal" href="${t.andereTaal.href}" hreflang="${isEn ? "nl" : "en"}">${t.andereTaal.label}</a>
    <a class="knop knop-klein" href="${DEMO_URL}">${t.demo}</a>
  </div>
</header>

<main>
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-tekst">
      <p class="kicker onthul"><span class="stip"></span>${t.hero.kicker}</p>
      <h1 class="onthul">${t.hero.h1a}<br><span class="sticker">${t.hero.h1b}</span></h1>
      <p class="lead onthul">${t.hero.lead}</p>
      <div class="knoppen onthul">
        <a class="knop" href="${DEMO_URL}">${t.demo}<span class="pijl">→</span></a>
        <a class="knop knop-glas" href="#onderdelen">${t.hero.cta2}</a>
      </div>
      <ul class="chips onthul">${t.hero.chips.map((c) => `<li>${c}</li>`).join("")}</ul>
    </div>

    <div class="podium onthul" aria-hidden="true">
      <div class="scherm">
        <div class="scherm-balk"><i></i><i></i><i></i><span>lina.jouwformule.nl</span></div>
        <div class="app">
          <aside class="app-menu">
            <div class="app-logo">${LOGO}</div>
            ${m.menu.map((x, i) => `<span class="${i === 0 ? "aan" : ""}">${x}</span>`).join("")}
          </aside>
          <div class="app-inhoud">
            <div class="app-kop"><div><small>${m.datum}</small><strong>${m.groet}</strong></div><span class="mic">${svg("spraak")}</span></div>
            <div class="tellers">
              <div><b data-tel="14">14</b><small>${m.aanwezig}</small></div>
              <div><b data-tel="2">2</b><small>${m.ziek}</small></div>
              <div><b data-tel="3">3</b><small>${m.open}</small></div>
            </div>
            <div class="app-raster">
              <div class="mk">
                <small>${m.kaart1}</small>
                <div class="avatars"><span style="--h:262">NV</span><span style="--h:330">SB</span><span style="--h:200">MK</span><span style="--h:40">YD</span><span style="--h:150">TJ</span><span class="meer">+9</span></div>
                <div class="balkjes"><i style="--w:82%"></i><i style="--w:64%"></i><i style="--w:90%"></i></div>
              </div>
              <div class="mk">
                <small>${m.kaart2}</small>
                <ul class="acties">${m.acties.map((a, i) => `<li class="${i === 0 ? "klaar" : ""}"><span></span>${a}</li>`).join("")}</ul>
              </div>
              <div class="mk mk-breed">
                <div class="omzet-kop"><small>${m.kaart3}</small><b>€ 1.284</b></div>
                <svg class="grafiek" viewBox="0 0 300 70" preserveAspectRatio="none"><defs><linearGradient id="gf" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#9b4dff" stop-opacity=".45"/><stop offset="1" stop-color="#9b4dff" stop-opacity="0"/></linearGradient></defs><path d="M0 60 C30 55 40 40 70 42 S110 20 140 26 S190 8 220 16 S270 4 300 10 L300 70 L0 70Z" fill="url(#gf)"/><path class="lijn" d="M0 60 C30 55 40 40 70 42 S110 20 140 26 S190 8 220 16 S270 4 300 10" fill="none" stroke="#b78cff" stroke-width="2.5"/></svg>
                <small class="zacht">${m.omzetSub}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="telefoon">
        <div class="tel-eiland"></div>
        <div class="tel-scherm">
          <div class="tel-tijd">9:41</div>
          <div class="push p1"><div class="push-ic">${LOGO}</div><div><b>${m.push1t}</b><span>${m.push1}</span></div></div>
          <div class="push p2"><div class="push-ic">${LOGO}</div><div><b>${m.push1t}</b><span>${m.push2}</span></div></div>
          <div class="tel-stem">
            <div class="golf"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <p class="zegt">${m.stem}</p>
            <p class="antw">${m.stemAntw}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="marquee" aria-hidden="true"><div class="marquee-rij">${marq}${marq}</div></div>
</section>

<section class="sectie intro">
  <div class="wrap">
    <p class="kicker onthul">${t.intro.kicker}</p>
    <h2 class="groot onthul">${t.intro.h2}</h2>
    <p class="breed onthul">${t.intro.p}</p>
    <figure class="film onthul"><video src="/media/team.mp4" poster="/media/team.jpg" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video><figcaption><span class="stip"></span>${t.intro.film}</figcaption></figure>
    <div class="stats">${t.intro.stats.map(([n, l]) => `<div class="stat onthul"><b>${n}</b><span>${l}</span></div>`).join("")}</div>
  </div>
</section>

<section class="sectie" id="onderdelen">
  <div class="wrap">
    <p class="kicker onthul">${t.modulesKicker}</p>
    <h2 class="onthul">${t.modulesH2}</h2>
    <div class="modules">
      ${t.modules.map(([k, h, p, tags], i) => `<article class="module onthul${i === 0 || i === 4 ? " uit" : ""}" style="--i:${i}">
        <div class="mod-ic">${svg(k)}</div>
        <h3>${h}</h3><p>${p}</p>
        <ul class="tags">${tags.map((x) => `<li>${x}</li>`).join("")}</ul>
      </article>`).join("")}
    </div>
  </div>
</section>

<section class="sectie donker" id="franchise">
  <div class="wrap">
    <div class="split">
      <div>
        <p class="kicker onthul">${t.franchise.kicker}</p>
        <h2 class="groot onthul">${t.franchise.h2}</h2>
        <p class="onthul">${t.franchise.p}</p>
        <a class="knop onthul" href="${DEMO_URL}">${t.demo}<span class="pijl">→</span></a>
      </div>
      <div class="boog onthul" aria-hidden="true">
        <div class="kaartnet">
          <svg viewBox="0 0 400 440" class="net-lijnen"><g stroke="url(#nl)" stroke-width="1.4" fill="none"><path d="M200 220 L90 100"/><path d="M200 220 L320 90"/><path d="M200 220 L340 250"/><path d="M200 220 L270 370"/><path d="M200 220 L110 350"/><path d="M200 220 L60 230"/><path d="M90 100 L60 230 L110 350 L270 370 L340 250 L320 90 Z" opacity=".35"/></g><defs><linearGradient id="nl" x1="0" x2="1"><stop offset="0" stop-color="#8b62ff"/><stop offset="1" stop-color="#f2559b"/></linearGradient></defs></svg>
          <span class="knoop hoofd" style="left:50%;top:50%">${LOGO}</span>
          <span class="knoop" style="left:22%;top:23%">Utrecht</span>
          <span class="knoop" style="left:80%;top:20%">Zwolle</span>
          <span class="knoop" style="left:85%;top:57%">Arnhem</span>
          <span class="knoop" style="left:67%;top:84%">Breda</span>
          <span class="knoop" style="left:27%;top:80%">Leiden</span>
          <span class="knoop" style="left:15%;top:52%">Haarlem</span>
        </div>
      </div>
    </div>
    <div class="punten">
      ${t.franchise.punten.map(([k, h, p]) => `<div class="punt onthul"><div class="mod-ic">${svg(k)}</div><h3>${h}</h3><p>${p}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="sectie">
  <div class="wrap">
    <p class="kicker onthul">${t.dag.kicker}</p>
    <h2 class="onthul">${t.dag.h2}</h2>
    <ol class="tijdlijn">
      ${t.dag.items.map(([tijd, h, p]) => `<li class="onthul"><time>${tijd}</time><div><h3>${h}</h3><p>${p}</p></div></li>`).join("")}
    </ol>
  </div>
</section>

<section class="sectie stem-sectie">
  <div class="wrap split">
    <div class="boog boog-stem onthul" aria-hidden="true">
      <div class="mic-groot">${svg("spraak")}</div>
      <div class="ringen"><i></i><i></i><i></i></div>
      <p class="zin">${m.stem}</p>
    </div>
    <div>
      <p class="kicker onthul">${t.stem.kicker}</p>
      <h2 class="groot onthul">${t.stem.h2}</h2>
      <p class="onthul">${t.stem.p}</p>
      <ul class="vinkjes onthul">${t.stem.lijst.map((x) => `<li>${x}</li>`).join("")}</ul>
    </div>
  </div>
</section>

<section class="sectie donker" id="veilig">
  <div class="wrap">
    <p class="kicker onthul">${t.veilig.kicker}</p>
    <h2 class="groot onthul">${t.veilig.h2}</h2>
    <p class="breed onthul">${t.veilig.p}</p>
    <div class="veilig-raster">
      ${t.veilig.punten.map(([h, p]) => `<div class="veilig onthul">${svg("slot")}<h3>${h}</h3><p>${p}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="sectie oorsprong">
  <div class="wrap split">
    <div>
      <p class="kicker onthul">${t.oorsprong.kicker}</p>
      <h2 class="groot onthul">${t.oorsprong.h2}</h2>
      <p class="onthul">${t.oorsprong.p}</p>
    </div>
    <figure class="citaat onthul">
      <blockquote>${t.oorsprong.quote}</blockquote>
      <figcaption>${t.oorsprong.quoteBy}</figcaption>
    </figure>
  </div>
</section>

<section class="sectie" id="starten">
  <div class="wrap">
    <p class="kicker onthul">${t.start.kicker}</p>
    <h2 class="onthul">${t.start.h2}</h2>
    <div class="stappen">
      ${t.start.stappen.map(([h, p], i) => `<div class="stap onthul"><span class="nr">${i + 1}</span><h3>${h}</h3><p>${p}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="slot">
  <div class="wrap slot-kaart onthul">
    ${LOGO}
    <h2>${t.slot.h2}</h2>
    <p>${t.slot.p}</p>
    <div class="knoppen">
      <a class="knop knop-wit" href="${DEMO_URL}">${t.demo}<span class="pijl">→</span></a>
      <a class="knop knop-glas" href="${MAIL}">${t.slot.cta2}</a>
    </div>
  </div>
</section>
</main>

<footer class="voet">
  <div class="wrap voet-rij">
    <a class="logo" href="${isEn ? "/en/" : "/"}">${LOGO}<span>LINA</span></a>
    <p>${t.footer.by}</p>
    <nav>${t.footer.links.map(([l, h]) => `<a href="${h}">${l}</a>`).join("")}<a href="${t.andereTaal.href}">${isEn ? "Nederlands" : "English"}</a></nav>
  </div>
  <p class="wrap fictie">${t.footer.fictie}</p>
</footer>
<script src="/site.js" defer></script>
</body>
</html>`;
}

mkdirSync(join(dist, "en"), { recursive: true });
writeFileSync(join(dist, "index.html"), pagina(T.nl));
writeFileSync(join(dist, "en", "index.html"), pagina(T.en));
for (const f of ["stijl.css", "site.js", "icon.svg", "robots.txt"]) copyFileSync(join(hier, "src", f), join(dist, f));
mkdirSync(join(dist, "media"), { recursive: true });
for (const f of ["team.mp4", "team.jpg"]) copyFileSync(join(hier, "src", "media", f), join(dist, "media", f));
console.log("klaar");
