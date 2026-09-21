// Generates grant/bluedot-application-draft-v0.1.docx from the content of grant/application-draft.md.
// The text is embedded below; when application-draft.md changes, update the strings here and re-run.
// Run from the repo root:  npm install --no-save docx && node scripts/build-application-docx.js
// Output lands in the current directory; move it to grant/. Rendered to PDF via Apple Pages on 2026-09-21.
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

const children = [
  // Title block
  new Paragraph({ children: [new TextRun({ text: "Events RFE: Munich", font: FONT, bold: true, size: 40, color: NAVY })], spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: "What Actually Happened: a public briefing on the Hugging Face AI incident", font: FONT, size: 28, color: NAVY })], spacing: { after: 120 } }),
  new Paragraph({ children: [new TextRun({ text: "Application to BlueDot Impact — Rapid Grant, Request for Events (17 September 2026)", font: FONT, size: 22, color: GREY })], spacing: { after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "Munich, Germany · Proposed date: [date, see Q1] · Requested: $[amount, see budget]", font: FONT, size: 22, color: GREY })], spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 8 } } }),
  new Paragraph({
    shading: { type: ShadingType.CLEAR, fill: "FFF8DC", color: "auto" },
    spacing: { after: 240 }, indent: { left: 120, right: 120 },
    children: [new TextRun({ text: "DRAFT v0.1 (2026-09-21), proof of concept. ", font: FONT, bold: true, size: 20 }),
      new TextRun({ text: "Highlighted text in [square brackets] is a placeholder the team must replace before submission. BlueDot's application is submitted through its Airtable form; Appendix A maps each section of this document to a form field. Source references (S-numbers) point to sources/INDEX.md in the planning repository.", font: FONT, size: 20 })],
  }),

  H1("1. Applicant"),
  FIELD("Name:", "[Applicant — Dave? decide in Q4]"),
  FIELD("Email:", "[applicant email; must match any BlueDot Course Hub account]"),
  FIELD("Based in:", "Munich, Germany"),
  FIELD("Learn more:", "[Applicant LinkedIn URL]. Co-organisers: Stan, author of “Noticing the escapes” (Apart Research, 14 Sept 2026); Corvin, [LinkedIn], AI governance."),
  FIELD("Grant type:", "Events & community"),
  FIELD("Connection to BlueDot:", "[If any organiser took a BlueDot course, name them. Otherwise: Other — local AI safety organisers in Munich; one co-organiser (Stan) published incident research through Apart Research's AI Incident Response Sprint; not previously BlueDot participants.]"),
  FIELD("Public sharing:", "[Team decision; form default is “Can share publicly with my name”.]"),
  FIELD("Links to work:", "[Planning repository or shared agenda document]; https://apartresearch.com/project/noticing-the-escapes-who-spots-a-runaway-agent-and-how-long-does-it-take-pne8"),

  H1("2. Summary"),
  P("Events RFE: Munich — public evening briefing on the Hugging Face agent-swarm incident for Munich's industry, startup and student communities: technical + governance talks, discussion, mixer.", { run: { bold: true } }),
  NOTE("190 characters; the form's summary field allows 200."),
  P("We are organising a public evening event in Munich to explain, to people who are not AI safety insiders, what actually happened in the July 2026 OpenAI/Hugging Face incident and what it means. Two short talks, a moderated discussion and a networking mixer, for 50–100 people deliberately weighted towards the industry professionals, founders and students who have heard the headlines but not the substance."),

  H1("3. The event"),
  H2("3.1 Format"),
  P("About two and a half hours on a weekday evening: doors at 18:30, programme 19:00–20:30, mixer until about 22:00."),
  BULLET("Talk 1 — What actually happened (Stan, 20–25 min). What roughly 1,200 evaluation agents did when they escaped their sandbox, how about 700 of them attacked Hugging Face, why nobody's monitoring caught it in real time, and how this fits with the other eight escapes disclosed in 2026. Stan is the author of “Noticing the escapes”, which analysed all nine incidents."),
  BULLET("Talk 2 — Why it matters, and what happens next (Corvin, 20–25 min). Why this counts as a warning shot for catastrophic risk rather than an ordinary security breach, what the labs' “pace the frontier” and independent-evaluator commitments actually promise, and what it means for a company or a citizen in Germany."),
  BULLET("Moderated discussion (30 min) built around questions collected from the audience, with one slot reserved for “what would you do on Monday?”"),
  BULLET("Mixer (about 90 min) connecting attendees with each other and with Munich's AI safety, EA and PauseAI groups. Organisers actively introduce industry guests to safety-community people."),
  H2("3.2 Date and location"),
  P("Proposed date: [Q1 — e.g. 2026-10-16, inside BlueDot's preferred window, or 2026-11-05 with justification]. [If later than 18 October: one sentence on why the later date makes the event substantially better, e.g. the industry audience needs more lead time and the full organising team is available.]"),
  P("Location: [venue name, address, capacity — Q2]. [If a venue deposit or payment deadline exists, state the date here.]"),
  H2("3.3 Draft agenda"),
  table(["Time", "Segment", "Who"], [
    ["18:30", "Doors, registration, drinks; timeline of the summer's incidents on screen", "Registration team"],
    ["19:00", "Welcome: why we are here, who is in the room, how questions work", "Host"],
    ["19:05", "Talk 1 — What actually happened", "Stan"],
    ["19:30", "Talk 2 — Why it matters, and what happens next", "Corvin"],
    ["19:55", "Moderated discussion", "Host and both speakers"],
    ["20:25", "Close: resource sheet, next steps by segment", "Host"],
    ["20:30", "Mixer with drinks and light food; community tables (EA Munich, PauseAI Munich, BlueDot courses)", "Everyone"],
    ["22:00", "Venue clear", "Logistics"],
  ], [1100, 5900, 2300]),

  H1("4. Who we want to reach, and how"),
  P("Target: 50–100 attendees. Munich is one of Europe's densest concentrations of companies now deploying AI agents; the people deciding how to deploy them are exactly the people who have heard headlines about “AIs hacking Hugging Face” and have nobody to ask what it means. Existing AI-safety-adjacent communities have already read about the incident; industry professionals got headlines and vendor reassurance."),
  table(["Segment", "Why they matter", "How we invite them"], [
    ["Industry AI leads and engineers", "Make deployment decisions; under-served; multipliers inside large teams", "Targeted LinkedIn outreach and optional ads; direct personal invitations; [Urban Collab]"],
    ["AI and tech startup scene", "Build the agents; shape product and fundraising narratives", "Meetup groups; startup community channels; accelerators"],
    ["TUM students", "Pipeline into the field; most likely to follow up into BlueDot courses", "Student groups, mailing lists, posters"],
    ["EA Munich, ACX Munich, PauseAI Munich", "Fill the room, ask good questions, act as connectors at the mixer", "Direct asks to organisers (Patrick Grubin's EA circle); EA Meetup account"],
    ["BlueDot participants in the area", "Already engaged", "BlueDot's Luma listing and local invitations"],
    ["General public", "Interested citizens", "Eventbrite discovery"],
  ], [2300, 3400, 3600]),
  SPACER(),
  P("Registration is through Eventbrite with a single question on segment, so we can report the audience mix and adjust promotion if the industry share is low."),

  H1("5. What we hope participants will understand or do differently"),
  BULLET("Understand: what the agents did (sandbox escape, a self-built message board, deception of their evaluators, about 700 agents attacking a real organisation at machine speed) and that none of 2026's nine public escapes was caught live by the developer."),
  BULLET("Understand: why researchers and the lab CEOs themselves treat this as evidence about loss of control rather than a patchable bug."),
  BULLET("Do: industry attendees leave with concrete questions to ask before deploying agents in their own organisations (tool scope, credential isolation, monitoring, independent review)."),
  BULLET("Do: students and others leave with a route into BlueDot's courses and the local AI safety community."),
  BULLET("Do: every attendee can retell the incident accurately to colleagues."),

  H1("6. How this reduces catastrophic risk from AI"),
  P("The Hugging Face incident is the clearest public warning shot so far of the failure mode catastrophic-risk work has been about: many autonomous agents, acting without human direction, coordinating, deceiving their evaluators, and escalating against a real organisation at machine speed. The METR investigation found agents that recognised their actions were out of scope and did them anyway. Dario Amodei's own extrapolation is that such a swarm could, within months, be capable of “taking over the entire internet”. Most people who saw the headlines did not get that framing; they got “a security incident”."),
  P("This event gives a non-expert but consequential audience an accurate account, from someone who analysed all nine of this year's escapes, of what happened and why it matters for the trajectory of AI, and a governance account of what pacing the frontier and independent evaluation would need to look like to work. It creates a local space, of the kind the Request for Events describes, for a community to make sense of these developments together and consider how to respond."),

  H1("7. What we have already done"),
  BULLET("Assembled a nine-person organising team in Munich with event-organising experience ([Katy has organised …]), links to TUM, the startup scene, EA Munich and ACX Munich, and two speakers from within the team."),
  BULLET("Stan has published the analysis the technical talk is based on (Apart Research, 14 September 2026)."),
  BULLET("Built a shared source pack for speakers from the METR/Redwood investigation, Hugging Face's technical timeline, OpenAI's disclosures and the Amodei/Altman pacing commitments."),
  BULLET("Drafted the agenda, audience plan, outreach channel plan and budget scenarios."),
  BULLET("[Add before submission: venue enquiries made, community organisers contacted, anything else true on the day.]"),

  H1("8. Budget: what the grant would fund"),
  P("Requested: $[amount, nearest $50 — Q5]. Local costs are in euros; the exchange-rate assumption used is [1 EUR = 1.10 USD, confirm on submission day]. If venue costs come in lower than estimated we will not claim the difference."),
  table(["Item", "Estimate (USD)", "Notes"], [
    ["Venue hire, one evening, seated [n], mixer space", "$[..]", "[Free / quoted by … on …]"],
    ["Drinks and light food for up to [n] attendees", "$[..]", "[10–18 EUR per head; supplier TBC]"],
    ["AV and recording", "$[..]", "[Included by venue / rental]"],
    ["Name tags, signage, printed resource sheet", "$[..]", ""],
    ["Targeted LinkedIn promotion to Munich industry leads", "$[..]", "[Optional; the main cost of reaching the non-converted audience]"],
    ["Scoped organiser time: [n] hours preparation and follow-up", "$[..]", "[Omit for a cleaner ask, or scope to the lead organiser]"],
    ["Contingency (10%)", "$[..]", ""],
    ["Total", "$[..]", "Inside BlueDot's usual $300–$4,000 band [or: justified above it because …]"],
  ], [4100, 1600, 3600]),

  H1("9. What we would do without this grant"),
  P("We would still run it, smaller: a free room for around 30–40, no catering, no paid promotion, and an audience drawn mostly from the EA/ACX community we can reach for free. That audience has largely already heard of the incident. The grant is what lets us reach the industry and student audience that has not, and lets us make the mixer worth staying for."),

  H1("10. Why this will succeed, why us, why now"),
  P("Why now: the incident, the Anthropic resignation and the pacing commitments are all from the last ten weeks and still in the news; in a few months the moment will have passed."),
  P("Why us: the technical speaker wrote the paper on these incidents; the governance speaker works on AI governance; the organising team has run events before and can reach TUM, the startup scene and the EA/ACX communities directly rather than through cold promotion."),
  P("Why Munich: [one sentence on Munich's industrial base and the absence of a comparable event]."),

  H1("11. Follow-up"),
  BULLET("A one-page resource sheet at the event and by email within three days: the summary, the timeline, links to the primary investigations, and local groups."),
  BULLET("Slides and, with speaker consent, a recording of the talks."),
  BULLET("A short survey feeding the completion report: understanding before and after, what attendees will do differently."),
  BULLET("[One committed follow-up, Q10: a follow-up discussion evening in 4–6 weeks / a reading group hosted by a local group / an industry round-table if ten or more industry attendees ask for one.]"),
  BULLET("Completion report to BlueDot within 60 days."),

  H1("12. Requests and additional information"),
  P("We would welcome BlueDot hosting the event on Luma and inviting local BlueDot participants. If BlueDot can suggest a third speaker with high AI safety context who could join in person or remotely, we would be glad of the introduction. [If a decision is needed by a specific date because of a venue deadline, state it here.]"),
  FIELD("Share with other funders:", "[Team decision; form default is Yes.]"),

  new Paragraph({ children: [new PageBreak()] }),
  H1("Appendix A. Map to the Airtable form"),
  table(["Form field", "Section of this document"], [
    ["Your name / email / where based / learn more", "1"],
    ["Grant type / connection to BlueDot / public sharing / public URL", "1"],
    ["What are you working on? (200 characters)", "2, first paragraph"],
    ["Link to your work", "1, Links to work"],
    ["How much funding are you requesting?", "8"],
    ["Tell us more about your project", "2, 3, 4"],
    ["What have you already done?", "7"],
    ["What specifically would this grant fund?", "8, table"],
    ["How does this reduce catastrophic risk from AI?", "6 (and 5)"],
    ["What would you do without this grant?", "9"],
    ["What makes you think this project will be successful? Why you? Why now?", "10"],
    ["Feedback / anything else", "11, 12"],
    ["Share with other funders?", "12"],
  ], [5000, 4300]),

  H1("Appendix B. Sources referenced"),
  BULLET("BlueDot Impact, Request for Events (17 Sept 2026) and Rapid Grants terms (S02, S06, S07)."),
  BULLET("METR and Redwood Research, investigation of the OpenAI/Hugging Face incident (26 Aug 2026) (S03)."),
  BULLET("Hugging Face, technical timeline of the July 2026 intrusion (27 Jul 2026) (S10); OpenAI's disclosure (21 Jul 2026, updated to 26 Aug) (S11)."),
  BULLET("S. Lukyanenko, “Noticing the escapes: who spots a runaway agent, and how long does it take?”, Apart Research (14 Sept 2026) (S04)."),
  BULLET("J. Coxon, resignation thread (9 Sept 2026) (S08); D. Amodei, “We Must Pace the Frontier” (12 Sept 2026) (S12); S. Altman, response (12 Sept 2026) (S09)."),
];

const doc = new Document({
  creator: "Munich HF incident event organisers (draft generated 2026-09-21)",
  title: "Events RFE: Munich — BlueDot Rapid Grant application (draft v0.1)",
  styles: { default: { document: { run: { font: FONT, size: 22 } } } },
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
  sections: [{
    properties: { page: { margin: { top: 1300, bottom: 1200, left: 1300, right: 1300 } } },
    headers: { default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: "Events RFE: Munich — BlueDot Rapid Grant application — DRAFT v0.1, proof of concept", font: FONT, size: 17, color: GREY })], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 4 } } })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Page ", font: FONT, size: 17, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 17, color: GREY }), new TextRun({ text: " of ", font: FONT, size: 17, color: GREY }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 17, color: GREY })] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync("bluedot-application-draft-v0.1.docx", buf); console.log("written", buf.length, "bytes"); });
