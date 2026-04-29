const siteData = loadSiteData();

const brandName = document.getElementById("brandName");
const menuList = document.getElementById("menuList");
const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");
const footerText = document.getElementById("footerText");
const pageSections = document.getElementById("pageSections");

function getCurrentPageKey() {
  const hash = window.location.hash.replace("#", "").trim();
  return hash || "home";
}

function renderMenu() {
  menuList.innerHTML = "";
  const active = getCurrentPageKey();
  siteData.pages.forEach((page) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${page.key}`;
    a.textContent = page.label;
    if (page.key === active) a.classList.add("active");
    li.appendChild(a);
    menuList.appendChild(li);
  });
}

function renderPage() {
  const key = getCurrentPageKey();
  const page = siteData.pages.find((item) => item.key === key) || siteData.pages[0];

  pageSections.innerHTML = "";
  page.sections.forEach((section) => {
    const card = document.createElement("article");
    card.className = "content-card";

    const title = document.createElement("h2");
    title.textContent = section.title;

    const content = document.createElement("div");
    content.className = "rich-content";
    content.innerHTML = section.content;

    card.append(title, content);
    pageSections.appendChild(card);
  });
}

function renderGlobal() {
  brandName.textContent = siteData.businessName;
  heroTitle.textContent = siteData.heroTitle;
  heroSubtitle.textContent = siteData.heroSubtitle;
  footerText.textContent = siteData.footerText;
}

window.addEventListener("hashchange", () => {
  renderMenu();
  renderPage();
});

renderGlobal();
renderMenu();
renderPage();
