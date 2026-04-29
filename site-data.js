const STORAGE_KEY = "business_site_content_v1";

const defaultSiteData = {
  businessName: "BusinessPro",
  heroTitle: "Grow Your Business With Confidence",
  heroSubtitle: "We help companies build modern digital experiences that convert visitors into long-term customers.",
  footerText: "© 2026 BusinessPro. All rights reserved.",
  pages: [
    {
      key: "home",
      label: "Home",
      sections: [
        {
          title: "Welcome",
          content: "<p>Welcome to <strong>BusinessPro</strong>. We provide strategy, design, and development solutions for growing companies.</p>"
        },
        {
          title: "Why Choose Us",
          content: "<ul><li>Experienced team</li><li>Proven delivery model</li><li>Transparent communication</li></ul>"
        }
      ]
    },
    {
      key: "services",
      label: "Services",
      sections: [
        {
          title: "Consulting",
          content: "<p>Business and technical consulting tailored to your goals.</p>"
        },
        {
          title: "Web Development",
          content: "<p>Custom websites, portals, and dashboards with maintainable architecture.</p>"
        }
      ]
    },
    {
      key: "about",
      label: "About",
      sections: [
        {
          title: "Who We Are",
          content: "<p>We are a multidisciplinary team focused on practical outcomes and business impact.</p>"
        }
      ]
    },
    {
      key: "contact",
      label: "Contact Us",
      sections: [
        {
          title: "Get in Touch",
          content: "<p>Email: hello@businesspro.com</p><p>Phone: +1 (555) 010-2026</p><p>Address: 100 Market Street, San Francisco, CA</p>"
        }
      ]
    }
  ]
};

function loadSiteData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultSiteData);
    const parsed = JSON.parse(raw);
    return parsed?.pages ? parsed : structuredClone(defaultSiteData);
  } catch {
    return structuredClone(defaultSiteData);
  }
}

function saveSiteData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function resetSiteData() {
  localStorage.removeItem(STORAGE_KEY);
}
