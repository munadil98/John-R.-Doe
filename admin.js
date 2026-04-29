let data = loadSiteData();
let selectedPageKey = data.pages[0]?.key || "home";

const businessNameInput = document.getElementById("businessNameInput");
const heroTitleInput = document.getElementById("heroTitleInput");
const heroSubtitleInput = document.getElementById("heroSubtitleInput");
const footerTextInput = document.getElementById("footerTextInput");

const pageSelect = document.getElementById("pageSelect");
const sectionList = document.getElementById("sectionList");
const saveGlobalBtn = document.getElementById("saveGlobalBtn");
const addSectionBtn = document.getElementById("addSectionBtn");
const savePageBtn = document.getElementById("savePageBtn");
const resetBtn = document.getElementById("resetBtn");

function renderGlobalSettings() {
  businessNameInput.value = data.businessName;
  heroTitleInput.value = data.heroTitle;
  heroSubtitleInput.value = data.heroSubtitle;
  footerTextInput.value = data.footerText;
}

function renderPageSelect() {
  pageSelect.innerHTML = "";
  data.pages.forEach((page) => {
    const option = document.createElement("option");
    option.value = page.key;
    option.textContent = page.label;
    if (page.key === selectedPageKey) option.selected = true;
    pageSelect.appendChild(option);
  });
}

function getSelectedPage() {
  return data.pages.find((page) => page.key === selectedPageKey);
}

function createSectionEditor(section, index) {
  const wrapper = document.createElement("div");
  wrapper.className = "section-editor";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = section.title;
  titleInput.placeholder = "Section title";

  const contentEditor = document.createElement("div");
  contentEditor.className = "rich-editor";
  contentEditor.contentEditable = "true";
  contentEditor.innerHTML = section.content;

  const controls = document.createElement("div");
  controls.className = "section-controls";

  const upBtn = document.createElement("button");
  upBtn.type = "button";
  upBtn.textContent = "↑ Move Up";
  upBtn.disabled = index === 0;
  upBtn.addEventListener("click", () => moveSection(index, -1));

  const downBtn = document.createElement("button");
  downBtn.type = "button";
  downBtn.textContent = "↓ Move Down";
  downBtn.disabled = index === getSelectedPage().sections.length - 1;
  downBtn.addEventListener("click", () => moveSection(index, 1));

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteSection(index));

  controls.append(upBtn, downBtn, deleteBtn);

  wrapper.append(titleInput, contentEditor, controls);

  return {
    wrapper,
    read() {
      return {
        title: titleInput.value.trim() || "Untitled Section",
        content: contentEditor.innerHTML
      };
    }
  };
}

let sectionEditors = [];

function renderSections() {
  sectionList.innerHTML = "";
  sectionEditors = [];

  const page = getSelectedPage();
  page.sections.forEach((section, index) => {
    const editor = createSectionEditor(section, index);
    sectionEditors.push(editor);
    sectionList.appendChild(editor.wrapper);
  });
}

function persistPageEdits() {
  const page = getSelectedPage();
  page.sections = sectionEditors.map((editor) => editor.read());
}

function moveSection(index, direction) {
  persistPageEdits();
  const page = getSelectedPage();
  const target = index + direction;
  if (target < 0 || target >= page.sections.length) return;
  [page.sections[index], page.sections[target]] = [page.sections[target], page.sections[index]];
  renderSections();
}

function deleteSection(index) {
  persistPageEdits();
  const page = getSelectedPage();
  page.sections.splice(index, 1);
  renderSections();
}

pageSelect.addEventListener("change", () => {
  persistPageEdits();
  selectedPageKey = pageSelect.value;
  renderSections();
});

saveGlobalBtn.addEventListener("click", () => {
  data.businessName = businessNameInput.value.trim() || "BusinessPro";
  data.heroTitle = heroTitleInput.value.trim();
  data.heroSubtitle = heroSubtitleInput.value.trim();
  data.footerText = footerTextInput.value.trim();
  saveSiteData(data);
  alert("Global settings saved.");
});

addSectionBtn.addEventListener("click", () => {
  persistPageEdits();
  getSelectedPage().sections.push({
    title: "New Section",
    content: "<p>Write section content here.</p>"
  });
  renderSections();
});

savePageBtn.addEventListener("click", () => {
  persistPageEdits();
  saveSiteData(data);
  alert("Page sections saved.");
});

resetBtn.addEventListener("click", () => {
  resetSiteData();
  data = loadSiteData();
  selectedPageKey = data.pages[0]?.key || "home";
  renderGlobalSettings();
  renderPageSelect();
  renderSections();
  alert("Website reset to default content.");
});

renderGlobalSettings();
renderPageSelect();
renderSections();
