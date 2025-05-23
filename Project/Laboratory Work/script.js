/*Local Storage Functions*/
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

/*Contact Section*/
function toggleContactSection() {
  const content = document.getElementById("contact-section-content");
  const toggleBtn = document.querySelector(
    ".contact-collapse-toggle .contact-toggle-icon"
  );

  content.classList.toggle("collapsed");

  if (content.classList.contains("collapsed")) {
    toggleBtn.textContent = "+";
  } else {
    toggleBtn.textContent = "−";
  }

  saveToLocalStorage(
    "contactCollapsed",
    content.classList.contains("collapsed")
  );
}

function saveContactData() {
  const contactItems = [];
  document.querySelectorAll("#contact-list li").forEach((item) => {
    contactItems.push({
      icon: item.querySelector(".icon-contact-section i").className,
      text: item.querySelector(".text-contact-section").textContent,
    });
  });
  saveToLocalStorage("contactData", contactItems);
}

function loadContactData() {
  const savedData = getFromLocalStorage("contactData");
  if (savedData) {
    const contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";

    savedData.forEach((item) => {
      const li = document.createElement("li");
      const iconSpan = document.createElement("span");
      iconSpan.className = "icon-contact-section";
      iconSpan.innerHTML = `<i class="${item.icon}" aria-hidden="true"></i>`;
      const textSpan = document.createElement("span");
      textSpan.className = "text-contact-section";
      textSpan.textContent = item.text;
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn-contact-section";
      removeBtn.textContent = "REMOVE";
      removeBtn.style.display = "none";
      removeBtn.onclick = () => li.remove();

      li.appendChild(iconSpan);
      li.appendChild(textSpan);
      li.appendChild(removeBtn);
      contactList.appendChild(li);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadContactData();

  const contactCollapsed = getFromLocalStorage("contactCollapsed");
  const content = document.getElementById("contact-section-content");
  const toggleBtn = document.querySelector(
    ".contact-collapse-toggle .contact-toggle-icon"
  );

  if (contactCollapsed) {
    content.classList.add("collapsed");
    toggleBtn.textContent = "+";
  } else {
    content.classList.remove("collapsed");
    toggleBtn.textContent = "−";
  }

  toggleBtn.addEventListener("click", toggleContactSection);

  const addBtn = document.getElementById("edit-btn-contact-section");
  const saveBtn = document.getElementById("save-btn-contact-section");
  const cancelBtn = document.getElementById("cancel-btn-contact-section");
  const formContainer = document.getElementById(
    "form-container-contact-section"
  );
  const buttonContainer = document.getElementById("button-container-contact");
  const iconInput = document.getElementById("icon-input-contact-section");
  const contactInput = document.getElementById("contact-input");
  const contactList = document.getElementById("contact-list");

  function toggleRemoveButtons(show) {
    const removeButtons = document.querySelectorAll(
      ".remove-btn-contact-section"
    );
    removeButtons.forEach((btn) => {
      btn.style.display = show ? "inline-block" : "none";
    });
  }

  function attachRemoveListeners() {
    const removeButtons = document.querySelectorAll(
      ".remove-btn-contact-section"
    );
    removeButtons.forEach((btn) => {
      btn.onclick = () => {
        const li = btn.closest("li");
        if (li) li.remove();
        saveContactData();
      };
    });
  }

  function initializeRemoveButtons() {
    const items = contactList.querySelectorAll("li");
    items.forEach((li) => {
      if (!li.querySelector(".remove-btn-contact-section")) {
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn-contact-section";
        removeBtn.textContent = "REMOVE";
        removeBtn.style.display = "none";
        li.appendChild(removeBtn);
      }
    });
    attachRemoveListeners();
  }

  initializeRemoveButtons();

  addBtn.addEventListener("click", () => {
    formContainer.style.display = "flex";
    buttonContainer.style.display = "none";
    toggleRemoveButtons(true);
    iconInput.value = "";
    contactInput.value = "";
    iconInput.focus();
  });

  cancelBtn.addEventListener("click", () => {
    formContainer.style.display = "none";
    buttonContainer.style.display = "block";
    toggleRemoveButtons(false);
    loadContactData();
  });

  saveBtn.addEventListener("click", () => {
    const iconVal = iconInput.value.trim();
    const contactVal = contactInput.value.trim();

    if (!iconVal || !contactVal) {
      alert("Please enter both icon class and contact info.");
      return;
    }

    const li = document.createElement("li");
    const iconSpan = document.createElement("span");
    iconSpan.className = "icon-contact-section";
    iconSpan.innerHTML = `<i class="${iconVal}" aria-hidden="true"></i>`;
    const textSpan = document.createElement("span");
    textSpan.className = "text-contact-section";
    textSpan.textContent = contactVal;
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn-contact-section";
    removeBtn.textContent = "REMOVE";
    removeBtn.style.display = "none";
    removeBtn.onclick = () => {
      li.remove();
      saveContactData();
    };

    li.appendChild(iconSpan);
    li.appendChild(textSpan);
    li.appendChild(removeBtn);
    contactList.appendChild(li);

    formContainer.style.display = "none";
    buttonContainer.style.display = "block";
    iconInput.value = "";
    contactInput.value = "";
    toggleRemoveButtons(false);

    saveContactData();
  });
});

/*Education Section*/
function toggleSection(contentId) {
  const content = document.getElementById(contentId);
  const toggleBtn = content.parentElement.querySelector(
    ".collapse-toggle .toggle-icon"
  );

  content.classList.toggle("collapsed");

  if (content.classList.contains("collapsed")) {
    toggleBtn.textContent = "+";
  } else {
    toggleBtn.textContent = "−";
  }

  saveToLocalStorage(
    `${contentId}Collapsed`,
    content.classList.contains("collapsed")
  );
}

function saveEducationData() {
  const educationItems = [];
  document
    .querySelectorAll("#education-list .education-item")
    .forEach((item) => {
      const degrees = [];
      item.querySelectorAll("ul li h6").forEach((degree) => {
        degrees.push(degree.textContent);
      });

      educationItems.push({
        years: item.querySelector(".h5-container h5").textContent,
        university: item.querySelector("h4").textContent,
        degrees: degrees,
      });
    });
  saveToLocalStorage("educationData", educationItems);
}

function loadEducationData() {
  const savedData = getFromLocalStorage("educationData");
  if (savedData) {
    const educationList = document.getElementById("education-list");
    educationList.innerHTML = "";

    savedData.forEach((item) => {
      const li = document.createElement("li");
      li.className = "education-item";

      const div = document.createElement("div");
      div.className = "education-entry";

      const h5Container = document.createElement("div");
      h5Container.className = "h5-container";

      const h5 = document.createElement("h5");
      h5.textContent = item.years;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "REMOVE";
      removeBtn.className = "remove-btn-education-section";
      removeBtn.style.display = "none";
      removeBtn.onclick = function () {
        li.remove();
        saveEducationData();
      };

      h5Container.appendChild(h5);
      h5Container.appendChild(removeBtn);

      const h4 = document.createElement("h4");
      h4.textContent = item.university;

      const ul = document.createElement("ul");
      item.degrees.forEach((degree) => {
        const degreeLi = document.createElement("li");
        const h6 = document.createElement("h6");
        h6.textContent = degree;
        degreeLi.appendChild(h6);
        ul.appendChild(degreeLi);
      });

      div.appendChild(h5Container);
      div.appendChild(h4);
      div.appendChild(ul);
      li.appendChild(div);

      educationList.appendChild(li);
    });
  }
}

function enterEditMode() {
  document.getElementById("editButton-education-section").style.display =
    "none";
  document.getElementById("saveButton-education-section").style.display =
    "inline-block";
  document.getElementById("cancelButton-education-section").style.display =
    "inline-block";
  document.querySelector(".new-education-form").style.display = "block";

  document.querySelectorAll(".remove-btn-education-section").forEach((btn) => {
    btn.style.display = "inline-block";
  });
}

function cancelEdit() {
  loadEducationData();
  document.getElementById("editButton-education-section").style.display =
    "inline-block";
  document.getElementById("saveButton-education-section").style.display =
    "none";
  document.getElementById("cancelButton-education-section").style.display =
    "none";
  document.querySelector(".new-education-form").style.display = "none";
  document.querySelectorAll(".remove-btn-education-section").forEach((btn) => {
    btn.style.display = "none";
  });
}

function removeEntry(button) {
  const entry = button.closest(".education-item");
  entry.remove();
  saveEducationData();
}

function addDegreeField() {
  const container = document.getElementById("degrees-container");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "degree-input";
  input.placeholder = "Degree or Note";
  container.appendChild(input);
}

function saveNewEducation() {
  const years = document.getElementById("new-years").value.trim();
  const university = document.getElementById("new-university").value.trim();
  const degreeInputs = document.querySelectorAll(".degree-input");
  const degrees = Array.from(degreeInputs)
    .map((input) => input.value.trim())
    .filter(Boolean);

  if (!years || !university || degrees.length === 0) {
    alert("Please fill in all fields to add new education.");
    return;
  }

  const li = document.createElement("li");
  li.className = "education-item";

  const div = document.createElement("div");
  div.className = "education-entry";

  const h5Container = document.createElement("div");
  h5Container.className = "h5-container";

  const h5 = document.createElement("h5");
  h5.textContent = years;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "REMOVE";
  removeBtn.className = "remove-btn-education-section";
  removeBtn.style.display = "none";
  removeBtn.onclick = function () {
    removeEntry(removeBtn);
  };

  h5Container.appendChild(h5);
  h5Container.appendChild(removeBtn);

  const h4 = document.createElement("h4");
  h4.textContent = university;

  const ul = document.createElement("ul");
  degrees.forEach((degree) => {
    const li = document.createElement("li");
    const h6 = document.createElement("h6");
    h6.textContent = degree;
    li.appendChild(h6);
    ul.appendChild(li);
  });

  div.appendChild(h5Container);
  div.appendChild(h4);
  div.appendChild(ul);
  li.appendChild(div);

  document.getElementById("education-list").appendChild(li);

  document.getElementById("new-years").value = "";
  document.getElementById("new-university").value = "";
  document.getElementById("degrees-container").innerHTML =
    '<input type="text" class="degree-input" placeholder="Degree or Note" />';

  document.getElementById("editButton-education-section").style.display =
    "inline-block";
  document.getElementById("saveButton-education-section").style.display =
    "none";
  document.getElementById("cancelButton-education-section").style.display =
    "none";
  document.querySelector(".new-education-form").style.display = "none";
  document.querySelectorAll(".remove-btn-education-section").forEach((btn) => {
    btn.style.display = "none";
  });

  saveEducationData();
}

/*Skills Section*/
function toggleSkillsSection() {
  const content = document.getElementById("skills-section-content");
  const toggleBtn = document.querySelector(
    ".skills-collapse-toggle .skills-toggle-icon"
  );

  content.classList.toggle("collapsed");

  if (content.classList.contains("collapsed")) {
    toggleBtn.textContent = "+";
  } else {
    toggleBtn.textContent = "−";
  }

  saveToLocalStorage(
    "skillsCollapsed",
    content.classList.contains("collapsed")
  );
}

function saveSkillsData() {
  const skills = [];
  document.querySelectorAll(".skills-section ul li h5").forEach((skill) => {
    skills.push(skill.textContent);
  });
  saveToLocalStorage("skillsData", skills);
}

function loadSkillsData() {
  const savedData = getFromLocalStorage("skillsData");
  if (savedData) {
    const ul = document.querySelector(".skills-section ul");
    ul.innerHTML = "";

    savedData.forEach((skill) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h5>${skill}</h5>
        <button class="remove-btn-skills-section">REMOVE</button>
      `;
      ul.appendChild(li);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadSkillsData();

  const skillsCollapsed = getFromLocalStorage("skillsCollapsed");
  const content = document.getElementById("skills-section-content");
  const toggleBtn = document.querySelector(
    ".skills-collapse-toggle .skills-toggle-icon"
  );

  if (skillsCollapsed) {
    content.classList.add("collapsed");
    toggleBtn.textContent = "+";
  } else {
    content.classList.remove("collapsed");
    toggleBtn.textContent = "−";
  }

  const skillsDiv = document.querySelector(".skills-section");
  const skillsEditBtn = skillsDiv.querySelector(".edit-btn-skills-section");
  const skillsSaveBtn = skillsDiv.querySelector(".save-btn-skills-section");
  const skillsCancelBtn = skillsDiv.querySelector(".cancel-btn-skills-section");
  const newSkillInput = skillsDiv.querySelector(".new-skill-input");

  skillsEditBtn.addEventListener("click", function () {
    skillsEditBtn.style.display = "none";
    skillsDiv.classList.add("edit-mode");
    newSkillInput.focus();
  });

  skillsSaveBtn.addEventListener("click", function () {
    skillsEditBtn.style.display = "initial";
    const newSkill = newSkillInput.value.trim();
    if (newSkill) {
      const ul = skillsDiv.querySelector("ul");
      const li = document.createElement("li");
      li.innerHTML = `
        <h5>${newSkill}</h5>
        <button class="remove-btn-skills-section">REMOVE</button>
      `;
      ul.appendChild(li);
      newSkillInput.value = "";
      saveSkillsData();
    }
    skillsDiv.classList.remove("edit-mode");
  });

  skillsCancelBtn.addEventListener("click", function () {
    skillsEditBtn.style.display = "initial";
    skillsDiv.classList.remove("edit-mode");
    newSkillInput.value = "";
    loadSkillsData();
  });

  skillsDiv.querySelector("ul").addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn-skills-section")) {
      e.target.parentElement.remove();
      saveSkillsData();
    }
  });

  /*Languages Section*/
  function saveLanguagesData() {
    const languages = [];
    document.querySelectorAll(".languages-section ul li h5").forEach((lang) => {
      languages.push(lang.textContent);
    });
    saveToLocalStorage("languagesData", languages);
  }

  function loadLanguagesData() {
    const savedData = getFromLocalStorage("languagesData");
    if (savedData) {
      const ul = document.querySelector(".languages-section ul");
      ul.innerHTML = "";

      savedData.forEach((language) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <h5>${language}</h5>
        <button class="remove-btn-languages-section">REMOVE</button>
      `;
        ul.appendChild(li);
      });
    }
  }

  function toggleLanguagesSection() {
    const content = document.getElementById("languages-section-content");
    const toggleBtn = document.querySelector(
      ".languages-collapse-toggle .languages-toggle-icon"
    );

    content.classList.toggle("collapsed");

    if (content.classList.contains("collapsed")) {
      toggleBtn.textContent = "+";
    } else {
      toggleBtn.textContent = "−";
    }

    saveToLocalStorage(
      "languagesCollapsed",
      content.classList.contains("collapsed")
    );
  }

  loadLanguagesData();

  const languagesCollapsed = getFromLocalStorage("languagesCollapsed");
  const langContent = document.getElementById("languages-section-content");
  const langToggleBtn = document.querySelector(
    ".languages-collapse-toggle .languages-toggle-icon"
  );

  
  langToggleBtn.addEventListener("click", toggleLanguagesSection);

  if (languagesCollapsed) {
    langContent.classList.add("collapsed");
    langToggleBtn.textContent = "+";
  } else {
    langContent.classList.remove("collapsed");
    langToggleBtn.textContent = "−";
  }

  const languagesDiv = document.querySelector(".languages-section");
  const langEditBtn = languagesDiv.querySelector(".edit-btn-languages-section");
  const langSaveBtn = languagesDiv.querySelector(".save-btn-languages-section");
  const langCancelBtn = languagesDiv.querySelector(
    ".cancel-btn-languages-section"
  );
  const newLanguageInput = languagesDiv.querySelector(".new-language-input");

  langEditBtn.addEventListener("click", function () {
    languagesDiv.classList.add("edit-mode");
    newLanguageInput.focus();
    langEditBtn.style.display = "none";
  });

  langSaveBtn.addEventListener("click", function () {
    langEditBtn.style.display = "initial";
    const newLanguage = newLanguageInput.value.trim();
    if (newLanguage) {
      const ul = languagesDiv.querySelector(".languages-list");
      const li = document.createElement("li");
      li.className = "language-item";
      li.innerHTML = `
      <h5>${newLanguage}</h5>
      <button class="remove-btn-languages-section">REMOVE</button>
    `;
      ul.appendChild(li);
      newLanguageInput.value = "";
      saveLanguagesData();
    }
    languagesDiv.classList.remove("edit-mode");
  });

  langCancelBtn.addEventListener("click", function () {
    langEditBtn.style.display = "initial";
    languagesDiv.classList.remove("edit-mode");
    newLanguageInput.value = "";
    loadLanguagesData();
  });

  languagesDiv
    .querySelector(".languages-list")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-btn-languages-section")) {
        e.target.parentElement.remove();
        saveLanguagesData();
      }
    });
});

/*Form Section*/
document.addEventListener("DOMContentLoaded", function () {
  const savedFormData = getFromLocalStorage("formData");
  if (savedFormData) {
    document.getElementById("name-form-section").value =
      savedFormData.name || "";
    document.getElementById("email-form-section").value =
      savedFormData.email || "";
    document.getElementById("date-form-section").value =
      savedFormData.date || "";
    document.getElementById("description-form-section").value =
      savedFormData.description || "";
  }

  document
    .getElementById("saveBtn-form-section")
    .addEventListener("click", function () {
      document.querySelectorAll(".error-form-section").forEach(function (el) {
        el.style.display = "none";
      });
      document.getElementById("successMessage-form-section").style.display =
        "none";

      const name = document.getElementById("name-form-section").value.trim();
      const email = document.getElementById("email-form-section").value.trim();
      const date = document.getElementById("date-form-section").value;
      const description = document
        .getElementById("description-form-section")
        .value.trim();

      let isValid = true;
      let formData = {};

      if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        document.getElementById("nameError-form-section").style.display =
          "block";
        isValid = false;
      } else {
        formData.name = name;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
      if (!email || !emailRegex.test(email)) {
        document.getElementById("emailError-form-section").style.display =
          "block";
        isValid = false;
      } else {
        formData.email = email;
      }

      if (!date) {
        document.getElementById("dateError-form-section").style.display =
          "block";
        isValid = false;
      } else {
        formData.date = date;
      }

      if (!description) {
        document.getElementById("descriptionError-form-section").style.display =
          "block";
        isValid = false;
      } else {
        formData.description = description;
      }

      if (isValid) {
        saveToLocalStorage("formData", formData);
        console.log("Form data saved:", formData);
        document.getElementById("successMessage-form-section").style.display =
          "block";

        document.getElementById("successMessage-form-section").scrollIntoView({
          behavior: "smooth",
        });
      }
    });
});

/*Profile Section*/
document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById("profileEditBtn");
  const saveBtn = document.getElementById("profileSaveBtn");
  const profileText = document.getElementById("profileText");
  editBtn.addEventListener("click", function () {
    profileText.contentEditable = "true";
    profileText.focus();
    editBtn.style.display = "none";
    saveBtn.style.display = "block";
  });
  saveBtn.addEventListener("click", function () {
    profileText.contentEditable = "false";
    saveBtn.style.display = "none";
    editBtn.style.display = "block";
  });
});

/*Work Experience Section*/
document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.querySelector(".edit-btn");
  const saveBtn = document.querySelector(".save-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const saveCancelGroup = document.querySelector(".save-cancel");
  const newForm = document.querySelector(".new-experience-form");
  const addBtn = document.querySelector(".add-btn");
  const experienceList = document.querySelector(".experience-list");

  editBtn.addEventListener("click", () => {
    editBtn.style.display = "none";
    saveCancelGroup.style.display = "flex";
    newForm.style.display = "block";
    document
      .querySelectorAll(".remove-btn")
      .forEach((btn) => (btn.style.display = "inline-block"));
  });

  cancelBtn.addEventListener("click", () => {
    editBtn.style.display = "inline-block";
    saveCancelGroup.style.display = "none";
    newForm.style.display = "none";
    document
      .querySelectorAll(".remove-btn")
      .forEach((btn) => (btn.style.display = "none"));
  });

  saveBtn.addEventListener("click", () => {
    editBtn.style.display = "inline-block";
    saveCancelGroup.style.display = "none";
    newForm.style.display = "none";
    document
      .querySelectorAll(".remove-btn")
      .forEach((btn) => (btn.style.display = "none"));
  });

  addBtn.addEventListener("click", () => {
    const years = document.querySelector(".input-years").value.trim();
    const company = document.querySelector(".input-company").value.trim();
    const title = document.querySelector(".input-title").value.trim();
    const desc = document.querySelector(".input-description").value.trim();

    if (!years || !company || !title || !desc) return;

    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
      <div class="year_company">
        <h5>${years}</h5>
        <h5>${company}</h5>
      </div>
      <div class="job_detail">
        <h4>${title}</h4>
        <p>${desc}</p>
      </div>
      <button class="remove-btn" style="display: inline-block;">REMOVE</button>
    `;
    experienceList.appendChild(box);

    document.querySelector(".input-years").value = "";
    document.querySelector(".input-company").value = "";
    document.querySelector(".input-title").value = "";
    document.querySelector(".input-description").value = "";
  });

  experienceList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest(".box").remove();
    }
  });
});

/*JSON File*/
function populateContactSection(contactArray) {
  const list = document.getElementById("contact-list");
  list.innerHTML = "";

  contactArray.forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="icon-contact-section">
        <i class="${entry.icon}" aria-hidden="true"></i>
      </span>
      <span class="text-contact-section">${entry.text}</span>
    `;
    list.appendChild(li);
  });
}

function populateEducationSection(educationArray) {
  const list = document.getElementById("education-list");
  list.innerHTML = "";

  educationArray.forEach(item => {
    const li = document.createElement("li");
    li.className = "education-item";

    const degreesHTML = item.degrees.map(degree => `<li><h6>${degree}</h6></li>`).join("");

    li.innerHTML = `
      <div class="education-entry">
        <div class="h5-container">
          <h5>${item.years}</h5>
          <button class="remove-btn-education-section" style="display: none" onclick="removeEntry(this)">REMOVE</button>
        </div>
        <h4>${item.university}</h4>
        <ul>${degreesHTML}</ul>
      </div>
    `;
    list.appendChild(li);
  });
}

function populateSkillsSection(skillsArray) {
  const list = document.querySelector(".skills-list");
  list.innerHTML = "";

  skillsArray.forEach(skill => {
    const li = document.createElement("li");
    li.className = "skill-item";
    li.innerHTML = `
      <h5>${skill}</h5>
      <button class="remove-btn-skills-section">REMOVE</button>
    `;
    list.appendChild(li);
  });
}

function populateLanguagesSection(languagesArray) {
  const list = document.querySelector(".languages-list");
  list.innerHTML = "";

  languagesArray.forEach(language => {
    const li = document.createElement("li");
    li.className = "language-item";
    li.innerHTML = `
      <h5>${language}</h5>
      <button class="remove-btn-languages-section">REMOVE</button>
    `;
    list.appendChild(li);
  });
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    populateContactSection(data.contact);
    populateEducationSection(data.education);
    populateSkillsSection(data.skills);
    populateLanguagesSection(data.languages);
  })
  .catch(error => console.error("Error loading data:", error));
