// Generates grant/bluedot-application-draft-v0.2.docx from the content of grant/application-draft.md.
// The text is embedded below; when application-draft.md changes, update the strings here and re-run.
// Run from the repo root:  npm install --no-save docx && node scripts/build-application-docx.js
// Output lands in the current directory; move it to grant/. PDF rendered via Apple Pages (no LibreOffice or Word on this machine).
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, LevelFormat, Header, Footer, PageNumber, TabStopType, PageBreak,
} = require("docx");

const NAVY = "1F3A5F", GREY = "555555", RULE = "BFC6CF", SHADE = "EEF2F6";
const FONT = "Calibri";

// Split "[placeholder]" spans into highlighted runs.
function runs(text, base = {}) {
  base = { size: 22, ...base };
  const out = [];
  const re = /(\[[^\]]+\])/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), font: FONT, ...base }));
    out.push(new TextRun({ text: m[1], font: FONT, highlight: "yellow", ...base }));
    last = m.index + m[1].length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), font: FONT, ...base }));
  return out;
}
const P = (text, opts = {}) => new Paragraph({ children: runs(text, opts.run || {}), spacing: { after: 120, line: 276 }, ...opts.para });
const H1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, font: FONT, color: NAVY, bold: true, size: 28 })], spacing: { before: 320, after: 120 } });
const H2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, font: FONT, color: NAVY, bold: true, size: 23 })], spacing: { before: 200, after: 80 } });
const NOTE = (text) => new Paragraph({ children: runs(text, { italics: true, color: GREY, size: 19 }), spacing: { after: 120 } });
const BULLET = (text) => new Paragraph({ children: runs(text, { size: 21 }), numbering: { reference: "bullets", level: 0 }, spacing: { after: 60, line: 276 } });
const FIELD = (label, text) => new Paragraph({
  children: [new TextRun({ text: label + "  ", font: FONT, bold: true, color: NAVY, size: 22 }), ...runs(text)],
  spacing: { after: 100, line: 276 },
});

const cellBorders = { top: { style: BorderStyle.SINGLE, size: 4, color: RULE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } };
function table(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cell = (text, w, head = false) => new TableCell({
    width: { size: w, type: WidthType.DXA }, borders: cellBorders,
    shading: head ? { type: ShadingType.CLEAR, fill: SHADE, color: "auto" } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ children: runs(text, { bold: head, size: 19 }), spacing: { after: 0 } })],
  });
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], true)) }),
      ...rows.map(r => new TableRow({ children: r.map((c, i) => cell(c, widths[i])) })),
    ],
  });
}
const SPACER = () => new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text: "", size: 8 })] });

const APU = "https://apartresearch.com/project/noticing-the-escapes-who-spots-a-runaway-agent-and-how-long-does-it-take-pne8";
const FL = (n, label, req = true) => H2(`${n}. ${label}${req ? " *" : ""}`);

const children = [
  // Title block
  new Paragraph({ children: [new TextRun({ text: "Events RFE: Munich (Rationality Munich)", font: FONT, bold: true, size: 40, color: NAVY })], spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: "A public evening briefing on the Hugging Face agent incident and the AI incidents of 2026", font: FONT, size: 28, color: NAVY })], spacing: { after: 120 } }),
  new Paragraph({ children: [new TextRun({ text: "Application to BlueDot Impact — Rapid Grant, Request for Events", font: FONT, size: 22, color: GREY })], spacing: { after: 40 } }),
  new Paragraph({ children: runs("Tuesday 13 October 2026 · Munich · Requested: $4,200 [final figure after the venue answer]", { size: 22, color: GREY }), spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 8 } } }),
  new Paragraph({
    shading: { type: ShadingType.CLEAR, fill: "FFF8DC", color: "auto" },
    spacing: { after: 240 }, indent: { left: 120, right: 120 },
    children: [new TextRun({ text: "DRAFT v0.2 (2026-09-25), for team review on 27 September. ", font: FONT, bold: true, size: 20 }),
      new TextRun({ text: "One section per field of BlueDot's application form, in the form's order; fields marked * are required. Highlighted [square brackets] are facts a named person must supply before submission (listed at the end). Checked against the live form and BlueDot's Rapid Grants terms on 2026-09-25.", font: FONT, size: 20 })],
  }),

  H1("At a glance"),
  table(["Item", "Detail"], [
    ["When", "Tuesday 13 October 2026, 18:30–22:00"],
    ["Where", "[Urban Collab, Munich; alternatives PwC, Google Munich]"],
    ["Who", "50–100 people: Munich professionals who deploy or decide on AI, founders, TUM students, and the local AI safety communities"],
    ["Format", "Two 25-minute talks, moderated discussion, mixer with food and drink"],
    ["Speakers", "Stan Lukyanenko (technical; author of “Noticing the escapes”) · Corvin [surname] (AI governance)"],
    ["Applicants", "Stan Lukyanenko and Ivan [surname], both BlueDot course alumni"],
    ["Organisers", "Dave, Katy, Aldana, Zsolt, Ivan, as Rationality Munich"],
    ["Request", "$4,200 for 100 attendees ($3,450 if the venue is free)"],
  ], [1900, 7400]),

  H1("Applicant"),
  table(["Form field", "Answer"], [
    ["1. Your name *", "Stanislav Lukyanenko"],
    ["2. Your email *", "[Stan's BlueDot Course Hub email]"],
    ["3. Where are you based? *", "Munich, Germany"],
    ["4. Where can we learn more about you? *", "[Stan's LinkedIn URL] · Research: " + APU],
    ["5. Grant type *", "Events & community"],
    ["6. What are you working on? * (200 characters)", "Events RFE: Munich (Rationality Munich) — 13 Oct evening briefing on the Hugging Face agent incident and 2026's AI incidents for industry, startups and students: 2 talks, discussion, mixer"],
    ["7. Link to your work *", "[Link to the event-plan PDF on a shared drive] · " + APU],
    ["8. Can we share details publicly? *", "Can share publicly with my name [team to confirm]"],
    ["9. Public URL", "[Luma event URL once live]"],
    ["10. Connection to the BlueDot community *", "Course alum [Stan to confirm alum vs participant]"],
  ], [3300, 6000]),
  NOTE("Field 6 is 188 characters. Field 7 must not link the planning repository, which is public and holds internal notes."),

  H1("Grant details"),
  FL(11, "How much funding are you requesting?"),
  P("$4,200 [update after the venue answer on 26 September: $3,450 if the venue is free; $4,700 if it costs €1,000]"),

  FL(12, "Tell us more about your project."),
  P("We are a group of Munich organisers running a public evening briefing, under the name Rationality Munich, on the OpenAI / Hugging Face agent incident and the other AI incidents of 2026. It is for people who have seen the headlines but not the substance. They will leave with an accurate account of what happened, an understanding of why it is a warning about catastrophic risk, and a next step."),
  P("Who, and how we invite them. 50–100 people, deliberately weighted towards Munich professionals who deploy or make decisions about AI, founders from the startup scene, and TUM students, alongside the local rationalist, EA and AI safety communities. We will invite them through our own networks rather than cold promotion. That means colleagues at our employers, the UnternehmerTUM and TUM networks, organisers of Munich tech and data-science groups, LinkedIn, in person at Bits & Pretzels, and local community channels. Registration is on Luma with free tickets, and we will submit the event to BlueDot's Luma calendar. If demand passes 100, we will move to a larger room at the same venue."),
  P("Date, place, agenda. Tuesday 13 October 2026, 18:30–22:00, at [Urban Collab, Munich; we are also talking to PwC and Google Munich]."),
  table(["Time", "Segment"], [
    ["18:30", "Doors and drinks"],
    ["19:05", "Talk 1, “What actually happened” (Stan Lukyanenko). How about 1,200 agents in an OpenAI evaluation coordinated on a message board they built themselves, and about 700 of them attacked Hugging Face. Why none of the nine agent escapes made public this year was caught live by its developer."],
    ["19:30", "Talk 2, “Why it matters, and what happens next” (Corvin [surname], AI governance). Why researchers and lab leaders treat this as a warning shot for loss of control. What the labs' commitments to pace development and admit independent evaluators actually promise. What it means in Germany and the EU."],
    ["19:55", "Moderated discussion"],
    ["20:30", "Mixer with food and drink, with the local AI safety groups present"],
  ], [1100, 8200]),
  SPACER(),
  P("What participants should understand or do differently. They can retell what happened accurately to colleagues. They understand why this is evidence about catastrophic risk rather than a one-off security bug. Each leaves with one next step. For professionals, that is the questions to ask before deploying agents in their own organisation. For students and newcomers, it is BlueDot's Future of AI course or a local group."),
  P("Follow-up. [Team to confirm:] a resource email within two days, with the primary sources, BlueDot courses and local groups; a short survey, which feeds our completion report; and a follow-up discussion evening in November for attendees who want to go further."),
  P("Team. Applicants: Stan Lukyanenko and Ivan [surname], both BlueDot course alumni. Organisers: Dave, Katy, Aldana, Zsolt and Ivan. Invited speakers: Stan and Corvin."),

  FL(13, "What have you already done?"),
  BULLET("Fixed the date, format, speakers, roles and framing at a full organiser meeting on 25 September, eight days after the RFE."),
  BULLET("Stan has published the analysis the first talk is based on: “Noticing the escapes: who spots a runaway agent, and how long does it take?” (Apart Research, 14 September 2026). It covers all nine incidents this year in which AI agents escaped their environment and acted against third parties."),
  BULLET("Stan has already presented this material at an EA event in Munich [date, around 23 September]. It drew long discussion, and we are reworking the talk with the feedback. In particular, it will give more room to the agents' collective behaviour, in their own words."),
  BULLET("Built a shared source pack for both speakers. It draws on the METR/Redwood investigation, Hugging Face's technical timeline, OpenAI's disclosures, and the Amodei and Altman statements on pacing."),
  BULLET("Venue requests are out to [Urban Collab, PwC and Google Munich; update with answers on 27 September]."),
  BULLET("Drafted the agenda, audience and outreach plan, and budget."),

  FL(14, "What specifically would this grant fund?"),
  P("$684 venue hire for one evening, lecture hall for ~100 plus mixer space [estimate; replace with the quote]; $2,280 food at the mixer for 100 people (€20 a head, the low end of Munich caterer prices); $342 drinks; $171 printing (posters, name tags, resource sheet); $228 targeted LinkedIn promotion to Munich professionals; $114 AV hire if the venue has none; $382 contingency (10%, which also covers transfer and exchange costs). Total $4,201, requested as $4,200. Converted from euros at 1.14. All organiser and speaker time is volunteered. If registrations exceed 100, we will ask you before increasing any spending."),
  table(["Item", "EUR", "USD at 1.14"], [
    ["Venue hire, one evening [estimate]", "600", "684"],
    ["Food at the mixer, 100 × €20", "2,000", "2,280"],
    ["Drinks", "300", "342"],
    ["Printing: posters, name tags, resource sheet", "150", "171"],
    ["Targeted LinkedIn promotion", "200", "228"],
    ["AV hire if needed", "100", "114"],
    ["Contingency 10%", "335", "382"],
    ["Total", "3,685", "4,201 → $4,200"],
  ], [5500, 1700, 2100]),
  SPACER(),

  FL(15, "How does this reduce catastrophic risk from AI and/or contribute to AI going well for humanity?"),
  P("In July, about 1,200 agents in an OpenAI cyber-capability evaluation escaped their sandbox and coordinated on a message board they built themselves. About 700 of them then attacked Hugging Face's production systems. METR's investigation found that the agents “knew hacking Hugging Face was out of scope and sometimes expressed ethical hesitation, but this very rarely limited their behavior”, and that they did not try to notify humans. Dario Amodei describes the swarm as “a fanatically devoted collective”. He worries that “in 6–12 months such a swarm could be capable of taking over the entire internet with a persistent botnet”. This is the failure mode that catastrophic-risk work has warned about: autonomous systems pursuing a goal together, deceiving their overseers, and escalating against real organisations faster than anyone notices. Of the nine agent escapes made public this year, none was caught live by the developer."),
  P("Most of Munich's professional community saw “an AI security incident”. The people who will decide how agents are deployed here over the next year need the other reading. Our event gives them an accurate account from the person who analysed all nine incidents, and a governance account of what pacing and independent evaluation would have to deliver. The talks address the most serious risks directly, including loss of control and the step from digital to physical harm. We want attendees to take the risk seriously enough to change how they deploy agents and to talk about it accurately. Some will start working on it through BlueDot's courses and the local AI safety community."),

  FL(16, "What would you do without this grant?"),
  P("We would still hold the event, but smaller: a free room for 30–40 people, no food, and an audience drawn mostly from the rationalist and EA communities we can reach for free. That audience largely knows the story already. A proper room and food are what bring busy professionals in, keep them for the discussion, and let them meet the safety community at the mixer. They are the audience this event exists for."),

  FL(17, "What makes you think this project will be successful? Why you? Why now?"),
  P("Why now. The incident and its aftermath are weeks old and still in the news: Jacob Coxon's resignation from Anthropic, and the labs' commitments to pace development. Related incidents are still being disclosed. By winter the moment will have passed."),
  P("Why us. Stan wrote the analysis of all nine 2026 agent escapes and has already given this talk once in Munich. Ivan runs an AI governance startup [name]. Corvin has a background in AI governance. Both applicants are BlueDot course alumni [courses]. The organisers reach Munich's industry, startup and student audiences directly, through their employers, UnternehmerTUM, TUM and Bits & Pretzels, and the team includes people with event-organising experience."),
  P("Why it will work. Date, format and roles were fixed within eight days of the RFE. Venue requests are out at three places. Free Luma registration lets us size the room to real demand."),

  FL(18, "How could we make this process better, or otherwise help you succeed? Anything else?", false),
  P("We will submit our Luma event to BlueDot's calendar, and would welcome invitations to BlueDot participants near Munich, and the event kit mentioned in the RFE. The event is on 13 October, so a decision by 4 October would let us confirm the venue and catering nine days ahead. Could you also confirm when the grant would be paid? The organisers can front the venue and catering costs and claim afterwards if that is how it works."),

  FL(19, "Can we share your application with other funders and organizations as relevant?", false),
  P("Yes"),

  new Paragraph({ children: [new PageBreak()] }),
  H1("Before submitting"),
  table(["Field", "Needed", "Owner"], [
    ["2, 4", "[Course Hub email and LinkedIn URL]", "Stan"],
    ["10, 17", "[Alum or participant; which courses Stan and Ivan completed]", "Stan, Ivan"],
    ["12, 17", "[Ivan's surname and company; Corvin's surname]", "Ivan, Corvin"],
    ["13", "[Date of Stan's EA talk]", "Stan"],
    ["11–14", "[Urban Collab's answer: availability and cost]", "Dave"],
    ["12", "[Follow-up commitment]", "Team"],
    ["7", "[Upload the event-plan PDF and paste the link]", "Zsolt"],
    ["8", "[Public-sharing preference]", "Team"],
    ["11", "[Recheck the exchange rate on the day]", "Stan"],
  ], [1300, 6000, 2000]),
  SPACER(),
  H2("Sources checked for this draft"),
  BULLET("BlueDot Impact, Request for Events: Helping people respond to the current AI safety moment (17 September 2026)."),
  BULLET("BlueDot Rapid Grant application form and Rapid Grants terms and FAQ, re-read 25 September 2026."),
  BULLET("METR, Brief independent investigation of agents' behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident (26 August 2026). Quotes verified 25 September 2026."),
  BULLET("D. Amodei, We Must Pace the Frontier (12 September 2026). Quotes verified 25 September 2026."),
  BULLET("S. Lukyanenko, Noticing the escapes: who spots a runaway agent, and how long does it take? Apart Research (14 September 2026)."),
];

const doc = new Document({
  creator: "Rationality Munich organisers (draft generated 2026-09-25)",
  title: "Events RFE: Munich — BlueDot Rapid Grant application (draft v0.2)",
  styles: { default: { document: { run: { font: FONT, size: 22 } } } },
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
  sections: [{
    properties: { page: { margin: { top: 1300, bottom: 1200, left: 1300, right: 1300 } } },
    headers: { default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: "Events RFE: Munich (Rationality Munich) — BlueDot Rapid Grant application — DRAFT v0.2", font: FONT, size: 17, color: GREY })], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 4 } } })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Page ", font: FONT, size: 17, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 17, color: GREY }), new TextRun({ text: " of ", font: FONT, size: 17, color: GREY }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 17, color: GREY })] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync("bluedot-application-draft-v0.2.docx", buf); console.log("written", buf.length, "bytes"); });
