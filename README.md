# Aarya Consultants — Corporate Financial Advisory Redesign

A multi-page modern redesign for **Aarya Consultants (AGC)** — Kolkata Headquartered corporate advisory and fiduciary wealth firm operating pan-India with 42+ associates and serving 2,000+ clients across India and abroad.

Live Reference: [https://aaryaconsultants.com](https://aaryaconsultants.com)  
Repository: [https://github.com/shayanbasuroy/aarya_consultants](https://github.com/shayanbasuroy/aarya_consultants)

---

## 🏛️ Project Overview

This repository contains the complete standalone static website build for Aarya Consultants, featuring:
- **Zero build toolchain dependencies**: Clean, performant, standards-compliant HTML5, CSS3, and modern vanilla JavaScript.
- **Deep Corporate Visual Identity**: Navy (`#081b45`), Signal Accent Red (`#e31e24`), and Platinum Paper (`#f8fbff`).
- **Typography**: Manrope (Headings), DM Sans (Body), Playfair Display (Serif Editorial Accents).
- **Fully Responsive Architecture**: Dedicated mobile and tablet breakpoints across 1024px, 992px, 768px, and 580px/360px.
- **Media Optimization**: Integrated S3-backed WebP images and responsive desktop (1600x640) & mobile portrait (1080x1920) MP4 hero videos.

---

## 📄 Site Structure & Pages

| File | Page Name | Description |
|---|---|---|
| [`index.html`](index.html) | **Homepage** | Complete brand overview, video hero, fiduciary pillars, 8 capabilities, wall of awards & frames, leadership profiles (Sanjay K. Gupta & Aarya Gupta), pan-India presence (8 city hubs & interactive locator), client marquee, and consultation CTA. |
| [`about-agc.html`](about-agc.html) | **About AGC** | 24-year heritage story ("Since 2000"), 42 associates, milestone journey timeline (2000–2024+), mission/vision/values, leadership portraits, key team members (Ruchita Kapoor, Swapnil Yadav, CA Shyam Sundar Lohia, Karishma Gupta), wall of frames, and regulatory registration badges (AMFI, IRDAI, ICAI, Legal). |
| [`services.html`](services.html) | **All Services Overview** | Catalog of advisory verticals: Financial Planning, Wealth Advisory, Taxation, Legal Services, and HR Solutions. |
| [`financial-planning.html`](financial-planning.html) | **Financial Planning** | Fiduciary cash flow management, retirement structuring, education corpus, risk mitigation, and debt management. |
| [`financial-services.html`](financial-services.html) | **Financial Services** | Equity, mutual funds, portfolio rebalancing, bond distribution, and institutional treasury. |
| [`taxation.html`](taxation.html) | **Taxation Advisory** | Direct/Indirect tax, GST audit, corporate return filing, cross-border NRI tax, and appellate representation. |
| [`legal-services.html`](legal-services.html) | **Legal Services** | Commercial contracts, succession & family trusts, ROC compliance, dispute resolution, and regulatory advisory. |
| [`hr-solutions.html`](hr-solutions.html) | **HR Solutions** | Talent acquisition, payroll structuring, POSH compliance, HR audit, and executive placement. |
| [`career.html`](career.html) | **Careers** | Career openings, firm culture, mentorship opportunities, and job application form. |
| [`contact.html`](contact.html) | **Contact & Consult** | Office addresses (Kolkata HO & Gurugram Hub), direct hotline (`+91 90386 20055`), emails, and interactive inquiry form. |

---

## 🎨 Design System

- **Primary Navy**: `#081b45`
- **Signal Red (Accent)**: `#e31e24` (Hover: `#c0141a`)
- **Background Tones**: `#ffffff`, `#f8fbff` (Platinum Paper), `#eef4fc`
- **Border & Line**: `rgba(8, 27, 69, 0.08)` / `#e2e8f0`
- **Dark Footers**: `#050f26` with `#6d83a1` subtext
- **Typography**: 
  - `font-family: 'Manrope', sans-serif;`
  - `font-family: 'DM Sans', sans-serif;`
  - `font-family: 'Playfair Display', serif;`

---

## 📍 Locations & Contact

- **Kolkata Head Office**: 73C, Shyama Prasad Mukherjee Road, Kolkata - 700026
- **Gurugram Corporate Office**: Regus, Welldone Tech Park, Badshahpur Sohna Road, Sector 48/49, Gurugram - 122018
- **Direct Phone**: `+91 90386 20055`
- **General Inquiries**: `connect@aaryaconsultants.com`
- **Gurgaon Regional Desk**: `gurgaon@aaryaconsultants.com`
- **Presence**: Kolkata HO, Entire NCR, Mumbai, Bengaluru, Patna, Ranchi, Siliguri, Guwahati.

---

## 🚀 Running Locally or Deploying

### Local Preview
Open any HTML file directly in any modern browser:
```bash
# macOS
open index.html

# or serve with Python
python3 -m http.server 8000
```

### GitHub Pages Deployment
1. Go to your repository on GitHub: `https://github.com/shayanbasuroy/aarya_consultants/settings/pages`
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select `main` branch and `/ (root)` folder, then click **Save**.
4. Your site will be live at `https://shayanbasuroy.github.io/aarya_consultants/`.
