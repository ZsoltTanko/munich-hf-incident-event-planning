---
title: BlueDot Rapid Grant application form — every field
source_id: S07
url: https://airtable.com/appMVNtdBtvtJvu5E/pag9G3oF4DYAyassX/form
author: BlueDot Impact
published: n/a (live form)
fetched: 2026-09-21
fetched_by: claude-fable-5-1 (Claude Code session 4f946fee)
method: browser get_page_text and accessibility tree
fidelity: verbatim field labels and helper text; dropdown option lists were not expanded (four combobox fields exist)
referenced_from: S02 ("Apply through the Rapid Grants form")
status: confirmed
owner: Dave
created: 2026-09-21
created_by: claude-fable-5-1 (Claude Code session 4f946fee)
updated: 2026-09-21
updated_by: claude-fable-5-1 (Claude Code session 4f946fee)
sources: []
---

# Rapid Grant Application form (S07)

Header text: "You are applying for a Rapid Grant. If you have any questions, email
joshua@bluedot.org." Fields marked * are required. The RFE (S02) adds: choose **Events &
community** as grant type and start the project title with **Events RFE: [your city/group]**;
if new to BlueDot, select **Other** for your connection and explain briefly; a short draft
agenda is fine for the work-link field.

| # | Field | Required | Type | Helper text |
|---|---|---|---|---|
| 1 | Your name | * | text | |
| 2 | Your email | * | text | "This should match the email you receive course communications to, and sign in to the Course Hub with." |
| 3 | Where are you based? | * | text | "We are currently unable to fund people based in Russia, China or India. We cannot fund individuals or organizations where doing so would breach applicable sanctions or local laws." |
| 4 | Where can we learn more about you? | * | text | "LinkedIn or personal website preferred." |
| 5 | Grant type | * | dropdown | (options not captured; S02 says choose "Events & community") |
| 6 | What are you working on? | * | text, **200 character limit** | |
| 7 | Link to your work | * | text | "GitHub repo, demo, draft document, or other evidence of work in progress. You can add multiple links." |
| 8 | If we approve your grant, can we share details about it publicly? | * | dropdown | default shown: "Can share publicly with my name" |
| 9 | Public URL | | text | "Provide one URL which we will link on our website" |
| 10 | How are you connected to the BlueDot community? | * | dropdown | (options not captured; S02 says "Other" if new) |
| — | **Grant details** (section) | | | |
| 11 | How much funding are you requesting? | * | currency ($) | "Your best estimate, to the nearest $50." |
| 12 | Tell us more about your project. | * | long text | |
| 13 | What have you already done? | * | long text | "Describe concrete progress: code written, pilots run, drafts completed, data collected. If you haven't started, explain what you've done to validate the idea." |
| 14 | What specifically would this grant fund? | * | long text | "List the specific items or services and estimated cost for each. Examples: '$200 Colab Pro+ (2 months), $150 Anthropic API credits for evaluation runs' · '$500 venue hire for 4 monthly meetups, $200 catering' · '$750 conference registration, $600 flights, $400 accommodation.' If you are requesting stipend or living expense support, explain what you would be doing and why this role needs funding." |
| 15 | How does this reduce catastrophic risk from AI and/or contribute to AI going well for humanity? | * | long text | |
| 16 | What would you do without this grant? | * | long text | "Would you abandon the project, reduce scope, use slower/free alternatives, or fund it yourself? What would the impact of this be?" |
| 17 | What makes you think this project will be successful? Why you? Why now? | * | long text | |
| — | **Feedback** (section) | | | |
| 18 | How could we make this process better, or otherwise help you succeed with your project? Also add any other information you feel we should consider here. | | long text | |
| 19 | Can we share your application with other funders and organizations as relevant? | | dropdown | default shown: "Yes" |

Footer: "Do not submit passwords through this form."

The field-by-field draft lives in `grant/application-draft.md`.
