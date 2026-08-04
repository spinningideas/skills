---
name: company-research
description: This skill should be used when the user provides a company name or website URL and asks for a deep company diligence report. It researches products, leadership, competition, market position, financials, locations, employee ratings, benefits, and company history and emits a single source-cited markdown report.
---

# Company Research

## Purpose

To research a specific company from public sources and produce a single, structured markdown diligence report.

## When to use this skill

Use this skill whenever the user:
- Provides a company name, such as "Acme Corp", and asks for research or a report.
- Provides a website URL, such as "https://acme.com", and asks for research.
- Requests a diligence, overview, due-diligence, or job-fit analysis of a company.

Always produce the report in the format defined below, even if the user does not explicitly request it.

## Input handling

1. Extract the company name and primary website URL from the user's message.
2. If only a name is given, search the web for the company's official website and use the most authoritative result as the primary URL.
3. If only a URL is given, infer the company name from the page title, About page, or domain.
4. Record the homepage, the About page, the Careers page URL, and the primary locations as soon as they are known; these are required for the top summary.

## Research workflow

1. Open and read the company's homepage, About, Products/Solutions, Pricing, Leadership/Team, Careers, Press/News, and Blog pages.
2. Run targeted web searches for the company name plus each of the following:
   - "mission statement"
   - "products" or "services"
   - "pricing"
   - "leadership team" or "executives"
   - "competitors"
   - "market position" or "industry"
   - "revenue" or "financials"
   - "funding"
   - "locations" or "offices"
   - "Glassdoor" or "employee reviews"
   - "Indeed jobs"
   - "careers"
   - "founded" or "company history"
   - "acquisitions"
   - "lawsuit" or "labor dispute"
   - "CEO" or "C-suite"
   - "benefits"
3. Use authoritative third-party sources as needed, including LinkedIn, Glassdoor, Indeed, Crunchbase, Google Finance, Yahoo Finance, The Business Journals, D&B Hoovers, and the company's social media accounts.
4. Note the source for every major claim. Use numbered citations such as `[1]`, `[2]`, and so on.
5. If information is missing, write "Not found" or "Not publicly disclosed" rather than guessing.

## Diligence areas

Collect enough information to write the following:

- **Mission statement**: The company's stated mission, vision, or values, plus an assessment of how clearly the company communicates them.
- **Products and services**: Details on each major product or service, including pricing if available, with subsections for each major offering.
- **Leadership / C-suite stability**: Names and roles of the top executives or owners. Include recent hiring, departures, tenure, and any scandals.
- **Competition**: Main competitors and how the company compares.
- **Market position**: The company's position in its industry, including market share, reputation, and customer segments.
- **Financials**: Revenue, growth, funding, profitability, stock performance if public, and other key financial health indicators.
- **Locations**: Headquarters and other offices, or remote-first status.
- **Employee ratings and open positions**: Overall ratings from Glassdoor, Indeed, etc., number of open positions, link to the careers page, and any signs of churn or frequently relisted roles.
- **Benefits and compensation**: Vacation/PTO, retirement, healthcare, bonuses, and notable perks.
- **Company history**: From formation to the present, including ownership changes, major acquisitions, and notable news events.
- **Public image and news**: Significant recent headlines, lawsuits, labor disputes, social media activity, and any red flags.

## Output format

Produce one markdown report with these sections in this order, followed by a numbered source list:

1. Top summary (company name, website, locations, careers page link, one-paragraph overview)
2. Table of contents
3. Mission statement
4. Products and services
5. Leadership / C-suite stability
6. Competition
7. Market position
8. Financials
9. Locations
10. Employee ratings and open positions
11. Benefits and compensation
12. Company history
13. Public image and news
14. Sources

Use clear headings and subheadings. Use numbered citations for all claims. Keep each section specific and concise.

## Citation format

- Insert `[n]` immediately after each claim that comes from an external source.
- Add a `## Sources` section at the end that maps each `[n]` to its title and URL.
- If no URL is available, use the page or source name, including the access date.

## Notes

- Do not copy large blocks of marketing text without citation.
- For private companies, describe the funding stage and last known valuation when exact financials are not public.
- Prioritize data from the last 12-24 months where possible.
- If a section cannot be completed, state why instead of omitting it.
