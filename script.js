function openResumeBuilder() {
  const resumeBuilderHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Resume Builder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f0f4f8;
      padding: 20px;
      margin: 0;
      color: #333;
    }
    h2 {
      text-align: center;
      color: #1e88e5;
      margin-bottom: 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .form-section, .preview-section {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 20px;
      flex: 1 1 400px;
      min-width: 300px;
    }
    label {
      font-weight: 600;
      display: block;
      margin-top: 10px;
    }
    input[type="text"], input[type="email"], input[type="tel"], textarea, select {
      width: 100%;
      padding: 10px;
      margin-top: 6px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
      resize: vertical;
    }
    textarea {
      min-height: 70px;
    }
    input[type="file"] {
      margin-top: 10px;
    }
    button {
      margin-top: 20px;
      background-color: #1e88e5;
      border: none;
      color: white;
      padding: 12px 25px;
      font-size: 1rem;
      border-radius: 6px;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #1565c0;
    }
    .preview {
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 8px;
      background-color: #fafafa;
      min-height: 450px;
      overflow-y: auto;
      font-family: 'Georgia', serif;
      color: #222;
    }
    .resume-header {
      display: flex;
      align-items: center;
      gap: 20px;
      border-bottom: 2px solid #1e88e5;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .profile-pic {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #1e88e5;
      background: #ddd;
    }
    .resume-name {
      font-size: 2rem;
      font-weight: 700;
      color: #1e88e5;
    }
    .section-title {
      color: #1e88e5;
      font-weight: 700;
      margin-top: 20px;
      margin-bottom: 8px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }
    .list-item {
      margin-left: 15px;
      margin-bottom: 8px;
    }
    select {
      max-width: 200px;
    }
  </style>
</head>
<body>
  <h2>🎓 Build Your Resume</h2>
  <div class="container">
    <div class="form-section">
      <label for="profilePic">Profile Photo</label>
      <input type="file" id="profilePic" accept="image/*" />

      <label for="fullName">Full Name</label>
      <input type="text" id="fullName" placeholder="Your full name" />

      <label for="email">Email Address</label>
      <input type="email" id="email" placeholder="example@mail.com" />

      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" placeholder="+91 12345 67890" />

      <label for="summary">Summary / Objective</label>
      <textarea id="summary" placeholder="Brief about yourself"></textarea>

      <label for="education">Education (List your degrees)</label>
      <textarea id="education" placeholder="E.g. B.Tech Computer Science, 2021 - Present"></textarea>

      <label for="experience">Internships / Projects</label>
      <textarea id="experience" placeholder="Describe your experience or projects"></textarea>

      <label for="skills">Skills (comma separated)</label>
      <textarea id="skills" placeholder="E.g. JavaScript, Python, SQL"></textarea>

      <label for="template">Choose Template</label>
      <select id="template">
        <option value="template1">Clean Blue</option>
        <option value="template2">Modern Green</option>
      </select>

      <button onclick="generateResume()">Generate Resume</button>
    </div>

    <div class="preview-section">
      <h3>📄 Resume Preview</h3>
      <div id="preview" class="preview">Fill the form and click "Generate Resume" to see preview here.</div>
      <button onclick="window.print()">Print / Download PDF</button>
    </div>
  </div>

  <script>
    const preview = document.getElementById('preview');
    const profilePicInput = document.getElementById('profilePic');
    let profilePicDataURL = '';

    profilePicInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicDataURL = e.target.result;
        if (preview.innerHTML !== 'Fill the form and click "Generate Resume" to see preview here.') {
          generateResume();
        }
      };
      reader.readAsDataURL(file);
    });

    function generateResume() {
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const summary = document.getElementById('summary').value.trim();
      const education = document.getElementById('education').value.trim();
      const experience = document.getElementById('experience').value.trim();
      const skillsRaw = document.getElementById('skills').value.trim();
      const template = document.getElementById('template').value;

      if (!fullName) {
        alert('Please enter your full name.');
        return;
      }

      const skillsArr = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

      if (template === 'template1') {
        preview.innerHTML = \`
          <div style="font-family: Arial, sans-serif; color:#1e3a8a;">
            <div class="resume-header">
              <img src="\${profilePicDataURL || 'https://via.placeholder.com/90?text=Profile'}" alt="Profile Picture" class="profile-pic" />
              <div>
                <div class="resume-name">\${fullName}</div>
                <div>Email: <a href="mailto:\${email}">\${email}</a></div>
                <div>Phone: \${phone}</div>
              </div>
            </div>

            <div>
              <div class="section-title">Summary</div>
              <p>\${summary || 'N/A'}</p>
            </div>

            <div>
              <div class="section-title">Education</div>
              <p>\${education || 'N/A'}</p>
            </div>

            <div>
              <div class="section-title">Experience</div>
              <p>\${experience || 'N/A'}</p>
            </div>

            <div>
              <div class="section-title">Skills</div>
              <ul>\${skillsArr.length ? skillsArr.map(skill => '<li class="list-item">' + skill + '</li>').join('') : '<li>N/A</li>'}</ul>
            </div>
          </div>
        \`;
      } else if (template === 'template2') {
        preview.innerHTML = \`
          <div style="font-family: 'Georgia', serif; color:#2e7d32; border: 2px solid #2e7d32; padding: 20px; border-radius: 15px;">
            <div style="display:flex; align-items:center; gap: 20px; border-bottom: 3px solid #2e7d32; padding-bottom: 15px; margin-bottom: 20px;">
              <img src="\${profilePicDataURL || 'https://via.placeholder.com/90?text=Profile'}" alt="Profile Picture" style="border-radius: 50%; width: 90px; height: 90px; object-fit: cover; border: 3px solid #2e7d32;" />
              <div>
                <h1 style="margin:0;">\${fullName}</h1>
                <p style="margin:0;">📧 <a href="mailto:\${email}" style="color:#2e7d32; text-decoration:none;">\${email}</a></p>
                <p style="margin:0;">📞 \${phone}</p>
              </div>
            </div>

            <section>
              <h3>Objective</h3>
              <p>\${summary || 'N/A'}</p>
            </section>

            <section>
              <h3>Education</h3>
              <p>\${education || 'N/A'}</p>
            </section>

            <section>
              <h3>Experience</h3>
              <p>\${experience || 'N/A'}</p>
            </section>

            <section>
              <h3>Skills</h3>
              <p>\${skillsArr.length ? skillsArr.join(', ') : 'N/A'}</p>
            </section>
          </div>
        \`;
      }
    }
  </script>
</body>
</html>
`;

  const newTab = window.open('', '_blank');
  if (newTab) {
    newTab.document.open();
    newTab.document.write(resumeBuilderHtml);
    newTab.document.close();
  } else {
    alert("Popup blocked! Please allow popups to use the Resume Builder.");
  }
}
