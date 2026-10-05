window.RESUME_DATA = {
  "person": {
    "name": "Amelia Eckard",
    "location": "Charlotte, NC",
    "website": "ameliaeckard.com",
    "websiteUrl": "https://ameliaeckard.com",
    "github": "github.com/ameliaeckard",
    "githubUrl": "https://github.com/ameliaeckard",
    "linkedin": "linkedin.com/in/ameliaeckard",
    "linkedinUrl": "https://linkedin.com/in/ameliaeckard"
  },
  "defaultProfile": "ai-ml",
  "profileOrder": [
    "ai-ml",
    "research",
    "software",
    "xr",
    "creative",
    "teaching",
    "master"
  ],
  "profiles": {
    "ai-ml": {
      "label": "AI / ML",
      "shortLabel": "AI / ML",
      "summary": "Machine learning, computer vision, model evaluation, explainability, and AI-backed systems.",
      "pdf": "pdfs/ai-ml.pdf",
      "tex": "latex/ai-ml.tex",
      "downloadName": "Amelia-Eckard-ai-ml-Resume.pdf",
      "pages": 1,
      "recipe": "% selected profile: AI / ML\n\\profile{ai-ml}\n\\includeexperience{Research Intern, Undergraduate Researcher, Lead Instructional Assistant, ITSC 1213}\n\\includeprojects{CNN Scene Classification, Emergency Fund Predictor, Resolve – LPL Financial University Hackathon, Vision Lab: ASCII Reconstruction}\n\\includeinvolvement{Kode With Klossy × Goldman Sachs Machine Learning Challenge, UR2PhD Training Course, Computing Research Association}\n\\compileResume{Amelia-Eckard-ai-ml.pdf}",
      "education": [
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "M.S. in Artificial Intelligence | Early Entry Program",
          "date": "Expected May 2028",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software"
          ]
        },
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "B.S. in Computer Science | Concentration: AI, Robotics, & Gaming",
          "date": "Expected May 2027",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software",
            "xr"
          ]
        }
      ],
      "experience": [
        {
          "kind": "experience",
          "title": "Research Intern",
          "location": "Remote",
          "subtitle": "Stevens Institute of Technology, Dr. Jina Huh-Yoo",
          "date": "June 2026 – Present",
          "bullets": [
            "Engineered rq-system/LEAF, an AI-assisted literature-analysis pipeline using PubMed E-utilities, CrossRef, and LLM APIs to screen, classify, and extract structured evidence from 345 papers; processed 256 included, 80 excluded, and 9 review-flagged papers.",
            "Implemented dataset tagging, a seven-category research-question taxonomy, explicit screening/classification/extraction gates, and gold-sample validation using precision, recall, F1, accuracy, and confusion matrices."
          ],
          "tags": [
            "ai-ml",
            "research",
            "nlp",
            "data",
            "llm"
          ]
        },
        {
          "kind": "experience",
          "title": "Undergraduate Researcher",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte, Dr. Todd Dobbs",
          "date": "August 2025 – May 2026",
          "bullets": [
            "Developed an Apple Vision Pro indoor-navigation prototype for visually impaired users using Swift, ARKit, RealityKit, ObjectTrackingProvider, Core ML, HRTF spatial audio, and distance-based pitch cues.",
            "Investigated object tracking, on-device recognition, and spatial-audio guidance as complementary modalities for accessible indoor navigation. Designed evaluation protocols for object identification, tracking reliability, navigation performance, and spatial-audio feedback workflows."
          ],
          "tags": [
            "research",
            "xr",
            "computer-vision",
            "accessibility",
            "ai-ml",
            "swift"
          ]
        },
        {
          "kind": "experience",
          "title": "Lead Instructional Assistant, ITSC 1213",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte College of Computing and Informatics",
          "date": "August 2026 – Present",
          "bullets": [
            "Serve as lead instructional assistant for an asynchronous Python programming course, coordinating grading, rubrics, office hours, student support, and course logistics with the instructor."
          ],
          "tags": [
            "teaching",
            "python",
            "software",
            "leadership"
          ]
        }
      ],
      "projects": [
        {
          "kind": "project",
          "title": "CNN Scene Classification",
          "subtitle": "Python, PyTorch, torchvision, CUDA",
          "date": "2026",
          "bullets": [
            "Trained and evaluated convolutional neural networks for 16-class scene recognition on 2,400 images.",
            "Improved validation accuracy from 42.25% to 51.46% through image augmentation while comparing preprocessing choices, training behavior, and model performance."
          ],
          "tags": [
            "ai-ml",
            "computer-vision",
            "research",
            "python"
          ]
        },
        {
          "kind": "project",
          "title": "Emergency Fund Predictor",
          "subtitle": "Python, scikit-learn, pandas, SHAP",
          "date": "2025",
          "bullets": [
            "Built an 11-feature machine-learning pipeline using 12,295 Federal Reserve SHED respondents enriched with BEA indicators to study emergency-fund vulnerability.",
            "Compared three classifiers and applied SHAP explainability to identify the strongest drivers of financial fragility and model predictions."
          ],
          "tags": [
            "ai-ml",
            "data-science",
            "explainability",
            "python"
          ]
        },
        {
          "kind": "project",
          "title": "Resolve – LPL Financial University Hackathon",
          "subtitle": "AI/ML, Workflow Intelligence, FinTech",
          "date": "2026",
          "bullets": [
            "Developing a proactive exception-intelligence layer that predicts likely blockers before financial-service requests visibly stall."
          ],
          "tags": [
            "ai-ml",
            "product",
            "fintech",
            "hackathon"
          ]
        },
        {
          "kind": "project",
          "title": "Vision Lab: ASCII Reconstruction",
          "subtitle": "JavaScript, HTML/CSS, Image Processing",
          "date": "2026 – Present",
          "bullets": [
            "Developed an image-to-ASCII reconstruction experiment for a web-based computer-vision lab connected to ameliaeckard.com."
          ],
          "tags": [
            "computer-vision",
            "web",
            "creative-tech",
            "javascript"
          ]
        }
      ],
      "skills": [
        [
          "Languages",
          "Python, SQL, Java, JavaScript, Swift"
        ],
        [
          "AI/Data",
          "PyTorch, torchvision, scikit-learn, NumPy, pandas, OpenCV, SHAP, Core ML, Ollama"
        ],
        [
          "Tools/APIs",
          "CUDA, Git, Docker, Railway, PubMed E-utilities, CrossRef, Perplexity API"
        ]
      ],
      "involvement": [
        {
          "kind": "activity",
          "title": "Kode With Klossy × Goldman Sachs Machine Learning Challenge",
          "date": "December 2025",
          "bullets": [],
          "tags": [
            "ai-ml",
            "program"
          ]
        },
        {
          "kind": "activity",
          "title": "UR2PhD Training Course, Computing Research Association",
          "date": "December 2025",
          "bullets": [],
          "tags": [
            "research",
            "program"
          ]
        }
      ]
    },
    "research": {
      "label": "AI Research",
      "shortLabel": "Research",
      "summary": "Research pipelines, evaluation methodology, literature intelligence, accessible computing, and computer vision.",
      "pdf": "pdfs/research.pdf",
      "tex": "latex/research.tex",
      "downloadName": "Amelia-Eckard-research-Resume.pdf",
      "pages": 1,
      "recipe": "% selected profile: AI Research\n\\profile{research}\n\\includeexperience{Research Intern, Undergraduate Researcher}\n\\includeprojects{CNN Scene Classification, Emergency Fund Predictor, Resolve – LPL Financial University Hackathon}\n\\includeinvolvement{UR2PhD Training Course, Computing Research Association, Social and Behavioral Research, CITI Program, Kode With Klossy × Goldman Sachs Machine Learning Challenge}\n\\compileResume{Amelia-Eckard-research.pdf}",
      "education": [
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "M.S. in Artificial Intelligence | Early Entry Program",
          "date": "Expected May 2028",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software"
          ]
        },
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "B.S. in Computer Science | Concentration: AI, Robotics, & Gaming",
          "date": "Expected May 2027",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software",
            "xr"
          ]
        }
      ],
      "experience": [
        {
          "kind": "experience",
          "title": "Research Intern",
          "location": "Remote",
          "subtitle": "Stevens Institute of Technology, Dr. Jina Huh-Yoo",
          "date": "June 2026 – Present",
          "bullets": [
            "Engineered rq-system/LEAF, an AI-assisted literature-analysis pipeline using PubMed E-utilities, CrossRef, and LLM APIs to screen, classify, and extract structured evidence from 345 papers; processed 256 included, 80 excluded, and 9 review-flagged papers.",
            "Implemented dataset tagging, a seven-category research-question taxonomy, explicit screening/classification/extraction gates, and gold-sample validation using precision, recall, F1, accuracy, and confusion matrices."
          ],
          "tags": [
            "ai-ml",
            "research",
            "nlp",
            "data",
            "llm"
          ]
        },
        {
          "kind": "experience",
          "title": "Undergraduate Researcher",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte, Dr. Todd Dobbs",
          "date": "August 2025 – May 2026",
          "bullets": [
            "Developed an Apple Vision Pro indoor-navigation prototype for visually impaired users using Swift, ARKit, RealityKit, ObjectTrackingProvider, Core ML, HRTF spatial audio, and distance-based pitch cues.",
            "Investigated object tracking, on-device recognition, and spatial-audio guidance as complementary modalities for accessible indoor navigation. Designed evaluation protocols for object identification, tracking reliability, navigation performance, and spatial-audio feedback workflows."
          ],
          "tags": [
            "research",
            "xr",
            "computer-vision",
            "accessibility",
            "ai-ml",
            "swift"
          ]
        }
      ],
      "projects": [
        {
          "kind": "project",
          "title": "CNN Scene Classification",
          "subtitle": "Python, PyTorch, torchvision, CUDA",
          "date": "2026",
          "bullets": [
            "Trained and evaluated convolutional neural networks for 16-class scene recognition on 2,400 images.",
            "Improved validation accuracy from 42.25% to 51.46% through image augmentation while comparing preprocessing choices, training behavior, and model performance."
          ],
          "tags": [
            "ai-ml",
            "computer-vision",
            "research",
            "python"
          ]
        },
        {
          "kind": "project",
          "title": "Emergency Fund Predictor",
          "subtitle": "Python, scikit-learn, pandas, SHAP",
          "date": "2025",
          "bullets": [
            "Built an 11-feature machine-learning pipeline using 12,295 Federal Reserve SHED respondents enriched with BEA indicators to study emergency-fund vulnerability."
          ],
          "tags": [
            "ai-ml",
            "data-science",
            "explainability",
            "python"
          ]
        },
        {
          "kind": "project",
          "title": "Resolve – LPL Financial University Hackathon",
          "subtitle": "AI/ML, Workflow Intelligence, FinTech",
          "date": "2026",
          "bullets": [
            "Developing a proactive exception-intelligence layer that predicts likely blockers before financial-service requests visibly stall."
          ],
          "tags": [
            "ai-ml",
            "product",
            "fintech",
            "hackathon"
          ]
        }
      ],
      "skills": [
        [
          "Research/AI",
          "PyTorch, scikit-learn, NumPy, pandas, OpenCV, SHAP, Core ML, LLM APIs"
        ],
        [
          "Methods",
          "Precision, recall, F1, accuracy, confusion matrices, structured extraction, taxonomy design"
        ],
        [
          "Tools/APIs",
          "Python, Git, CUDA, PubMed E-utilities, CrossRef, Perplexity API"
        ]
      ],
      "involvement": [
        {
          "kind": "activity",
          "title": "UR2PhD Training Course, Computing Research Association",
          "date": "December 2025",
          "bullets": [],
          "tags": [
            "research",
            "program"
          ]
        },
        {
          "kind": "activity",
          "title": "Social and Behavioral Research, CITI Program",
          "date": "September 2025",
          "bullets": [],
          "tags": [
            "research",
            "compliance"
          ]
        },
        {
          "kind": "activity",
          "title": "Kode With Klossy × Goldman Sachs Machine Learning Challenge",
          "date": "December 2025",
          "bullets": [],
          "tags": [
            "ai-ml",
            "program"
          ]
        }
      ]
    },
    "software": {
      "label": "Software Engineering",
      "shortLabel": "Software",
      "summary": "Backend systems, automation, databases, deployment, real-time collaboration, and persistent applications.",
      "pdf": "pdfs/software.pdf",
      "tex": "latex/software.tex",
      "downloadName": "Amelia-Eckard-software-Resume.pdf",
      "pages": 1,
      "recipe": "% selected profile: Software Engineering\n\\profile{software}\n\\includeexperience{Lead Instructional Assistant, ITSC 1213, Instructional Assistant, ITSC 3160}\n\\includeprojects{RoomCode, Scout Opportunity Notifier, Hera's Garden, Iris}\n\\includeinvolvement{none}\n\\compileResume{Amelia-Eckard-software.pdf}",
      "education": [
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "M.S. in Artificial Intelligence | Early Entry Program",
          "date": "Expected May 2028",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software"
          ]
        },
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "B.S. in Computer Science | Concentration: AI, Robotics, & Gaming",
          "date": "Expected May 2027",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software",
            "xr"
          ]
        }
      ],
      "experience": [
        {
          "kind": "experience",
          "title": "Lead Instructional Assistant, ITSC 1213",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte College of Computing and Informatics",
          "date": "August 2026 – Present",
          "bullets": [
            "Serve as lead instructional assistant for an asynchronous Python programming course, coordinating grading, rubrics, office hours, student support, and course logistics with the instructor.",
            "Build and debug Python autograders and test suites for programming assignments, emphasizing executable behavior, edge cases, and clear feedback for students. Review submission patterns and course analytics to identify recurring implementation errors and improve assignment guidance, testing instructions, and pre-submission checks."
          ],
          "tags": [
            "teaching",
            "python",
            "software",
            "leadership"
          ]
        },
        {
          "kind": "experience",
          "title": "Instructional Assistant, ITSC 3160",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte College of Computing and Informatics",
          "date": "August 2026 – Present",
          "bullets": [
            "Support database-design students through grading, office hours, and targeted assistance with relational modeling, normalization, SQL, and semester project requirements."
          ],
          "tags": [
            "teaching",
            "databases",
            "sql"
          ]
        }
      ],
      "projects": [
        {
          "kind": "project",
          "title": "RoomCode",
          "subtitle": "Python, Flask, JavaScript",
          "date": "2026 – Present",
          "bullets": [
            "Built a multi-session collaborative coding environment with real-time synchronization, host-controlled execution, and isolated file trees.",
            "Deployed the platform across 20+ lab sessions with concurrent users, supporting collaborative programming and classroom workflows."
          ],
          "tags": [
            "software",
            "web",
            "collaboration",
            "education"
          ]
        },
        {
          "kind": "project",
          "title": "Scout Opportunity Notifier",
          "subtitle": "Python, Discord API, SQLite, Railway",
          "date": "2026 – Present",
          "bullets": [
            "Built and deployed an opt-in internship and hackathon aggregator with automated ingestion, deduplication, persistent subscriber preferences, and restart-safe SQLite storage.",
            "Implemented personalized daily/weekly Discord digests, category-specific subscriptions, preference controls, unsubscribe flows, paginated listings, administrative broadcasts, and scheduled delivery windows."
          ],
          "tags": [
            "software",
            "automation",
            "data",
            "discord",
            "deployment"
          ]
        },
        {
          "kind": "project",
          "title": "Hera's Garden",
          "subtitle": "Node.js, Express, MariaDB, Discord.js, Java, Paper API, Railway",
          "date": "2024 – Present",
          "bullets": [
            "Built and maintain a persistent creative-community platform spanning a full-stack website, Discord automation, and a custom Minecraft server ecosystem with scheduled releases, rank-gated access, OAuth2 administration, moderation, and persistent progression systems.",
            "Designed Java/Paper systems for claims, territories, governments, housing, shops, mail, events, NPC societies, and economy features while integrating identity and progression across web, Discord, and game services."
          ],
          "tags": [
            "software",
            "web",
            "backend",
            "systems",
            "discord",
            "java"
          ]
        },
        {
          "kind": "project",
          "title": "Iris",
          "subtitle": "Electron, Node.js, Discord.js, SQLite, sqlite-vec, Ollama, MariaDB",
          "date": "2025 – Present",
          "bullets": [
            "Developed a local-first personal-memory and community-automation system combining desktop tooling, persistent memory, local language models, and Discord operations."
          ],
          "tags": [
            "ai",
            "software",
            "local-first",
            "llm",
            "discord"
          ]
        }
      ],
      "skills": [
        [
          "Languages",
          "Python, Java, JavaScript, SQL, C++, HTML/CSS"
        ],
        [
          "Frameworks",
          "Flask, Node.js, Express, Discord.js"
        ],
        [
          "Systems",
          "SQLite, MariaDB, Git, Docker, Railway, REST APIs"
        ]
      ],
      "involvement": []
    },
    "xr": {
      "label": "XR / Spatial Computing",
      "shortLabel": "XR",
      "summary": "Apple Vision Pro, ARKit, RealityKit, object tracking, spatial audio, and accessible navigation.",
      "pdf": "pdfs/xr.pdf",
      "tex": "latex/xr.tex",
      "downloadName": "Amelia-Eckard-xr-Resume.pdf",
      "pages": 1,
      "recipe": "% selected profile: XR / Spatial Computing\n\\profile{xr}\n\\includeexperience{Undergraduate Researcher, Research Intern}\n\\includeprojects{CNN Scene Classification, Vision Lab: ASCII Reconstruction}\n\\includeinvolvement{UR2PhD Training Course, Computing Research Association}\n\\compileResume{Amelia-Eckard-xr.pdf}",
      "education": [
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "M.S. in Artificial Intelligence | Early Entry Program",
          "date": "Expected May 2028",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software"
          ]
        },
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "B.S. in Computer Science | Concentration: AI, Robotics, & Gaming",
          "date": "Expected May 2027",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software",
            "xr"
          ]
        }
      ],
      "experience": [
        {
          "kind": "experience",
          "title": "Undergraduate Researcher",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte, Dr. Todd Dobbs",
          "date": "August 2025 – May 2026",
          "bullets": [
            "Developed an Apple Vision Pro indoor-navigation prototype for visually impaired users using Swift, ARKit, RealityKit, ObjectTrackingProvider, Core ML, HRTF spatial audio, and distance-based pitch cues.",
            "Investigated object tracking, on-device recognition, and spatial-audio guidance as complementary modalities for accessible indoor navigation. Designed evaluation protocols for object identification, tracking reliability, navigation performance, and spatial-audio feedback workflows."
          ],
          "tags": [
            "research",
            "xr",
            "computer-vision",
            "accessibility",
            "ai-ml",
            "swift"
          ]
        },
        {
          "kind": "experience",
          "title": "Research Intern",
          "location": "Remote",
          "subtitle": "Stevens Institute of Technology, Dr. Jina Huh-Yoo",
          "date": "June 2026 – Present",
          "bullets": [
            "Engineered rq-system/LEAF, an AI-assisted literature-analysis pipeline using PubMed E-utilities, CrossRef, and LLM APIs to screen, classify, and extract structured evidence from 345 papers; processed 256 included, 80 excluded, and 9 review-flagged papers."
          ],
          "tags": [
            "ai-ml",
            "research",
            "nlp",
            "data",
            "llm"
          ]
        }
      ],
      "projects": [
        {
          "kind": "project",
          "title": "CNN Scene Classification",
          "subtitle": "Python, PyTorch, torchvision, CUDA",
          "date": "2026",
          "bullets": [
            "Trained and evaluated convolutional neural networks for 16-class scene recognition on 2,400 images."
          ],
          "tags": [
            "ai-ml",
            "computer-vision",
            "research",
            "python"
          ]
        },
        {
          "kind": "project",
          "title": "Vision Lab: ASCII Reconstruction",
          "subtitle": "JavaScript, HTML/CSS, Image Processing",
          "date": "2026 – Present",
          "bullets": [
            "Developed an image-to-ASCII reconstruction experiment for a web-based computer-vision lab connected to ameliaeckard.com.",
            "Designed reconstruction logic around luminance mapping, local contrast, detail preservation, and edge-aware character selection to retain recognizable image structure."
          ],
          "tags": [
            "computer-vision",
            "web",
            "creative-tech",
            "javascript"
          ]
        }
      ],
      "skills": [
        [
          "Languages",
          "Swift, Python, C++, JavaScript"
        ],
        [
          "Spatial/AI",
          "ARKit, RealityKit, Core ML, OpenCV, ObjectTrackingProvider, HRTF spatial audio"
        ],
        [
          "Tools",
          "Git, CUDA, NumPy, PyTorch, HTML/CSS"
        ]
      ],
      "involvement": [
        {
          "kind": "activity",
          "title": "UR2PhD Training Course, Computing Research Association",
          "date": "December 2025",
          "bullets": [],
          "tags": [
            "research",
            "program"
          ]
        }
      ]
    },
    "creative": {
      "label": "Creative Technology",
      "shortLabel": "Creative Tech",
      "summary": "Interactive web experiences, creative systems, computer vision, spatial computing, and community platforms.",
      "pdf": "pdfs/creative.pdf",
      "tex": "latex/creative.tex",
      "downloadName": "Amelia-Eckard-creative-Resume.pdf",
      "pages": 1,
      "recipe": "% selected profile: Creative Technology\n\\profile{creative}\n\\includeexperience{Undergraduate Researcher}\n\\includeprojects{Hera's Garden, Vision Lab: ASCII Reconstruction, Iris, RoomCode}\n\\includeinvolvement{Formal Committee Head, Alpha Omega Epsilon – Beta Kappa}\n\\compileResume{Amelia-Eckard-creative.pdf}",
      "education": [
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "M.S. in Artificial Intelligence | Early Entry Program",
          "date": "Expected May 2028",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software"
          ]
        },
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "B.S. in Computer Science | Concentration: AI, Robotics, & Gaming",
          "date": "Expected May 2027",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software",
            "xr"
          ]
        }
      ],
      "experience": [
        {
          "kind": "experience",
          "title": "Undergraduate Researcher",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte, Dr. Todd Dobbs",
          "date": "August 2025 – May 2026",
          "bullets": [
            "Developed an Apple Vision Pro indoor-navigation prototype for visually impaired users using Swift, ARKit, RealityKit, ObjectTrackingProvider, Core ML, HRTF spatial audio, and distance-based pitch cues.",
            "Investigated object tracking, on-device recognition, and spatial-audio guidance as complementary modalities for accessible indoor navigation. Designed evaluation protocols for object identification, tracking reliability, navigation performance, and spatial-audio feedback workflows."
          ],
          "tags": [
            "research",
            "xr",
            "computer-vision",
            "accessibility",
            "ai-ml",
            "swift"
          ]
        }
      ],
      "projects": [
        {
          "kind": "project",
          "title": "Hera's Garden",
          "subtitle": "Node.js, Express, MariaDB, Discord.js, Java, Paper API, Railway",
          "date": "2024 – Present",
          "bullets": [
            "Built and maintain a persistent creative-community platform spanning a full-stack website, Discord automation, and a custom Minecraft server ecosystem with scheduled releases, rank-gated access, OAuth2 administration, moderation, and persistent progression systems.",
            "Designed Java/Paper systems for claims, territories, governments, housing, shops, mail, events, NPC societies, and economy features while integrating identity and progression across web, Discord, and game services."
          ],
          "tags": [
            "software",
            "web",
            "backend",
            "systems",
            "discord",
            "java"
          ]
        },
        {
          "kind": "project",
          "title": "Vision Lab: ASCII Reconstruction",
          "subtitle": "JavaScript, HTML/CSS, Image Processing",
          "date": "2026 – Present",
          "bullets": [
            "Developed an image-to-ASCII reconstruction experiment for a web-based computer-vision lab connected to ameliaeckard.com.",
            "Designed reconstruction logic around luminance mapping, local contrast, detail preservation, and edge-aware character selection to retain recognizable image structure."
          ],
          "tags": [
            "computer-vision",
            "web",
            "creative-tech",
            "javascript"
          ]
        },
        {
          "kind": "project",
          "title": "Iris",
          "subtitle": "Electron, Node.js, Discord.js, SQLite, sqlite-vec, Ollama, MariaDB",
          "date": "2025 – Present",
          "bullets": [
            "Developed a local-first personal-memory and community-automation system combining desktop tooling, persistent memory, local language models, and Discord operations."
          ],
          "tags": [
            "ai",
            "software",
            "local-first",
            "llm",
            "discord"
          ]
        },
        {
          "kind": "project",
          "title": "RoomCode",
          "subtitle": "Python, Flask, JavaScript",
          "date": "2026 – Present",
          "bullets": [
            "Built a multi-session collaborative coding environment with real-time synchronization, host-controlled execution, and isolated file trees."
          ],
          "tags": [
            "software",
            "web",
            "collaboration",
            "education"
          ]
        }
      ],
      "skills": [
        [
          "Languages",
          "JavaScript, HTML/CSS, Python, Java, Swift"
        ],
        [
          "Creative Tech",
          "ARKit, RealityKit, OpenCV, Core ML, image processing"
        ],
        [
          "Web/Systems",
          "Node.js, Express, Flask, SQLite, MariaDB, Git, Railway"
        ]
      ],
      "involvement": [
        {
          "kind": "activity",
          "title": "Formal Committee Head, Alpha Omega Epsilon – Beta Kappa",
          "date": "August 2025 – May 2026",
          "bullets": [
            "Coordinated formal-event planning, logistics, communication, and committee execution for the professional and social sorority."
          ],
          "tags": [
            "leadership",
            "community"
          ]
        }
      ]
    },
    "teaching": {
      "label": "Teaching / Mentorship",
      "shortLabel": "Teaching",
      "summary": "Python instruction, autograding, database support, course operations, mentoring, and technical communication.",
      "pdf": "pdfs/teaching.pdf",
      "tex": "latex/teaching.tex",
      "downloadName": "Amelia-Eckard-teaching-Resume.pdf",
      "pages": 1,
      "recipe": "% selected profile: Teaching / Mentorship\n\\profile{teaching}\n\\includeexperience{Lead Instructional Assistant, ITSC 1213, Instructional Assistant, ITSC 3160, Instructional Assistant, ITSC 1212, Peer Mentor}\n\\includeprojects{RoomCode}\n\\includeinvolvement{Volunteer Judge & Field Reset, FIRST Robotics}\n\\compileResume{Amelia-Eckard-teaching.pdf}",
      "education": [
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "M.S. in Artificial Intelligence | Early Entry Program",
          "date": "Expected May 2028",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software"
          ]
        },
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "B.S. in Computer Science | Concentration: AI, Robotics, & Gaming",
          "date": "Expected May 2027",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software",
            "xr"
          ]
        }
      ],
      "experience": [
        {
          "kind": "experience",
          "title": "Lead Instructional Assistant, ITSC 1213",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte College of Computing and Informatics",
          "date": "August 2026 – Present",
          "bullets": [
            "Serve as lead instructional assistant for an asynchronous Python programming course, coordinating grading, rubrics, office hours, student support, and course logistics with the instructor.",
            "Build and debug Python autograders and test suites for programming assignments, emphasizing executable behavior, edge cases, and clear feedback for students. Review submission patterns and course analytics to identify recurring implementation errors and improve assignment guidance, testing instructions, and pre-submission checks."
          ],
          "tags": [
            "teaching",
            "python",
            "software",
            "leadership"
          ]
        },
        {
          "kind": "experience",
          "title": "Instructional Assistant, ITSC 3160",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte College of Computing and Informatics",
          "date": "August 2026 – Present",
          "bullets": [
            "Support database-design students through grading, office hours, and targeted assistance with relational modeling, normalization, SQL, and semester project requirements.",
            "Provide debugging and design feedback that connects conceptual database models to working queries and implementation decisions."
          ],
          "tags": [
            "teaching",
            "databases",
            "sql"
          ]
        },
        {
          "kind": "experience",
          "title": "Instructional Assistant, ITSC 1212",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte College of Computing and Informatics",
          "date": "June 2026 – August 2026",
          "bullets": [
            "Led introductory programming lab support covering control flow, functions, data structures, debugging, and foundational problem-solving.",
            "Reviewed student code, graded assignments, and provided individualized explanations to help students translate programming concepts into working solutions."
          ],
          "tags": [
            "teaching",
            "python",
            "software"
          ]
        },
        {
          "kind": "experience",
          "title": "Peer Mentor",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte",
          "date": "August 2025 – Present",
          "bullets": [
            "Support first-year students through individual check-ins, group discussions, events, study-strategy guidance, and navigation of university resources."
          ],
          "tags": [
            "leadership",
            "mentorship"
          ]
        }
      ],
      "projects": [
        {
          "kind": "project",
          "title": "RoomCode",
          "subtitle": "Python, Flask, JavaScript",
          "date": "2026 – Present",
          "bullets": [
            "Built a multi-session collaborative coding environment with real-time synchronization, host-controlled execution, and isolated file trees.",
            "Deployed the platform across 20+ lab sessions with concurrent users, supporting collaborative programming and classroom workflows."
          ],
          "tags": [
            "software",
            "web",
            "collaboration",
            "education"
          ]
        }
      ],
      "skills": [
        [
          "Programming",
          "Python, Java, SQL, JavaScript"
        ],
        [
          "Teaching/Testing",
          "Autograders, unit tests, edge-case design, debugging, rubric design, technical feedback"
        ],
        [
          "Data/Tools",
          "SQLite, MariaDB, Git, Flask"
        ]
      ],
      "involvement": [
        {
          "kind": "activity",
          "title": "Volunteer Judge & Field Reset, FIRST Robotics",
          "date": "2025 – Present",
          "bullets": [
            "Support robotics competitions through judging and field operations, helping maintain organized and fair event execution."
          ],
          "tags": [
            "robotics",
            "outreach",
            "service"
          ]
        }
      ]
    },
    "master": {
      "label": "Master Resume",
      "shortLabel": "Master",
      "summary": "The complete canonical resume with all experience, projects, technical skills, certifications, and involvement.",
      "pdf": "pdfs/master.pdf",
      "tex": "latex/master.tex",
      "downloadName": "Amelia-Eckard-Master-Resume.pdf",
      "pages": 2,
      "pageBreakBefore": "RoomCode",
      "recipe": "% canonical source\n\\profile{master}\n\\include{all-experience}\n\\include{all-projects}\n\\include{all-skills}\n\\compileResume{Amelia-Eckard-Master-Resume.pdf}",
      "education": [
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "M.S. in Artificial Intelligence | Early Entry Program",
          "date": "Expected May 2028",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software"
          ]
        },
        {
          "kind": "experience",
          "title": "University of North Carolina at Charlotte",
          "location": "Charlotte, NC",
          "subtitle": "B.S. in Computer Science | Concentration: AI, Robotics, & Gaming",
          "date": "Expected May 2027",
          "bullets": [],
          "tags": [
            "ai-ml",
            "research",
            "software",
            "xr"
          ]
        }
      ],
      "experience": [
        {
          "kind": "experience",
          "title": "Research Intern",
          "location": "Remote",
          "subtitle": "Stevens Institute of Technology, Dr. Jina Huh-Yoo",
          "date": "June 2026 – Present",
          "bullets": [
            "Engineered rq-system/LEAF, an AI-assisted literature-analysis pipeline using PubMed E-utilities, CrossRef, and LLM APIs to screen, classify, and extract structured evidence from 345 papers; processed 256 included, 80 excluded, and 9 review-flagged papers.",
            "Implemented dataset tagging, a seven-category research-question taxonomy, explicit screening/classification/extraction gates, and gold-sample validation using precision, recall, F1, accuracy, and confusion matrices."
          ],
          "tags": [
            "ai-ml",
            "research",
            "nlp",
            "data",
            "llm"
          ]
        },
        {
          "kind": "experience",
          "title": "Undergraduate Researcher",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte, Dr. Todd Dobbs",
          "date": "August 2025 – May 2026",
          "bullets": [
            "Developed an Apple Vision Pro indoor-navigation prototype for visually impaired users using Swift, ARKit, RealityKit, ObjectTrackingProvider, Core ML, HRTF spatial audio, and distance-based pitch cues.",
            "Investigated object tracking, on-device recognition, and spatial-audio guidance as complementary modalities for accessible indoor navigation. Designed evaluation protocols for object identification, tracking reliability, navigation performance, and spatial-audio feedback workflows."
          ],
          "tags": [
            "research",
            "xr",
            "computer-vision",
            "accessibility",
            "ai-ml",
            "swift"
          ]
        },
        {
          "kind": "experience",
          "title": "Lead Instructional Assistant, ITSC 1213",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte College of Computing and Informatics",
          "date": "August 2026 – Present",
          "bullets": [
            "Serve as lead instructional assistant for an asynchronous Python programming course, coordinating grading, rubrics, office hours, student support, and course logistics with the instructor.",
            "Build and debug Python autograders and test suites for programming assignments, emphasizing executable behavior, edge cases, and clear feedback for students. Review submission patterns and course analytics to identify recurring implementation errors and improve assignment guidance, testing instructions, and pre-submission checks."
          ],
          "tags": [
            "teaching",
            "python",
            "software",
            "leadership"
          ]
        },
        {
          "kind": "experience",
          "title": "Instructional Assistant, ITSC 3160",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte College of Computing and Informatics",
          "date": "August 2026 – Present",
          "bullets": [
            "Support database-design students through grading, office hours, and targeted assistance with relational modeling, normalization, SQL, and semester project requirements.",
            "Provide debugging and design feedback that connects conceptual database models to working queries and implementation decisions."
          ],
          "tags": [
            "teaching",
            "databases",
            "sql"
          ]
        },
        {
          "kind": "experience",
          "title": "Instructional Assistant, ITSC 1212",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte College of Computing and Informatics",
          "date": "June 2026 – August 2026",
          "bullets": [
            "Led introductory programming lab support covering control flow, functions, data structures, debugging, and foundational problem-solving.",
            "Reviewed student code, graded assignments, and provided individualized explanations to help students translate programming concepts into working solutions."
          ],
          "tags": [
            "teaching",
            "python",
            "software"
          ]
        },
        {
          "kind": "experience",
          "title": "Peer Mentor",
          "location": "Charlotte, NC",
          "subtitle": "UNC Charlotte",
          "date": "August 2025 – Present",
          "bullets": [
            "Support first-year students through individual check-ins, group discussions, events, study-strategy guidance, and navigation of university resources."
          ],
          "tags": [
            "leadership",
            "mentorship"
          ]
        }
      ],
      "projects": [
        {
          "kind": "project",
          "title": "CNN Scene Classification",
          "subtitle": "Python, PyTorch, torchvision, CUDA",
          "date": "2026",
          "bullets": [
            "Trained and evaluated convolutional neural networks for 16-class scene recognition on 2,400 images.",
            "Improved validation accuracy from 42.25% to 51.46% through image augmentation while comparing preprocessing choices, training behavior, and model performance."
          ],
          "tags": [
            "ai-ml",
            "computer-vision",
            "research",
            "python"
          ]
        },
        {
          "kind": "project",
          "title": "Emergency Fund Predictor",
          "subtitle": "Python, scikit-learn, pandas, SHAP",
          "date": "2025",
          "bullets": [
            "Built an 11-feature machine-learning pipeline using 12,295 Federal Reserve SHED respondents enriched with BEA indicators to study emergency-fund vulnerability.",
            "Compared three classifiers and applied SHAP explainability to identify the strongest drivers of financial fragility and model predictions."
          ],
          "tags": [
            "ai-ml",
            "data-science",
            "explainability",
            "python"
          ]
        },
        {
          "kind": "project",
          "title": "RoomCode",
          "subtitle": "Python, Flask, JavaScript",
          "date": "2026 – Present",
          "bullets": [
            "Built a multi-session collaborative coding environment with real-time synchronization, host-controlled execution, and isolated file trees.",
            "Deployed the platform across 20+ lab sessions with concurrent users, supporting collaborative programming and classroom workflows."
          ],
          "tags": [
            "software",
            "web",
            "collaboration",
            "education"
          ]
        },
        {
          "kind": "project",
          "title": "Scout Opportunity Notifier",
          "subtitle": "Python, Discord API, SQLite, Railway",
          "date": "2026 – Present",
          "bullets": [
            "Built and deployed an opt-in internship and hackathon aggregator with automated ingestion, deduplication, persistent subscriber preferences, and restart-safe SQLite storage.",
            "Implemented personalized daily/weekly Discord digests, category-specific subscriptions, preference controls, unsubscribe flows, paginated listings, administrative broadcasts, and scheduled delivery windows."
          ],
          "tags": [
            "software",
            "automation",
            "data",
            "discord",
            "deployment"
          ]
        },
        {
          "kind": "project",
          "title": "Hera's Garden",
          "subtitle": "Node.js, Express, MariaDB, Discord.js, Java, Paper API, Railway",
          "date": "2024 – Present",
          "bullets": [
            "Built and maintain a persistent creative-community platform spanning a full-stack website, Discord automation, and a custom Minecraft server ecosystem with scheduled releases, rank-gated access, OAuth2 administration, moderation, and persistent progression systems.",
            "Designed Java/Paper systems for claims, territories, governments, housing, shops, mail, events, NPC societies, and economy features while integrating identity and progression across web, Discord, and game services."
          ],
          "tags": [
            "software",
            "web",
            "backend",
            "systems",
            "discord",
            "java"
          ]
        },
        {
          "kind": "project",
          "title": "Iris",
          "subtitle": "Electron, Node.js, Discord.js, SQLite, sqlite-vec, Ollama, MariaDB",
          "date": "2025 – Present",
          "bullets": [
            "Developed a local-first personal-memory and community-automation system combining desktop tooling, persistent memory, local language models, and Discord operations.",
            "Built verification, moderation, private-channel, XP/ranking, and notification workflows using SQLite/sqlite-vec and Ollama-based local retrieval and model components."
          ],
          "tags": [
            "ai",
            "software",
            "local-first",
            "llm",
            "discord"
          ]
        },
        {
          "kind": "project",
          "title": "Iris Calliope",
          "subtitle": "Python, discord.py, SQLite, Fernet, LLMs, Railway",
          "date": "2026 – Present",
          "bullets": [
            "Built a privacy-conscious Discord roleplay chronicle system that summarizes approved bot-generated activity without publicly ranking or profiling users.",
            "Implemented encrypted storage, configurable retention, weekly summaries, channel watchlists, character lookup, and deletion of short-lived raw records while preserving higher-level continuity summaries."
          ],
          "tags": [
            "ai",
            "nlp",
            "software",
            "privacy",
            "discord"
          ]
        },
        {
          "kind": "project",
          "title": "Vision Lab: ASCII Reconstruction",
          "subtitle": "JavaScript, HTML/CSS, Image Processing",
          "date": "2026 – Present",
          "bullets": [
            "Developed an image-to-ASCII reconstruction experiment for a web-based computer-vision lab connected to ameliaeckard.com.",
            "Designed reconstruction logic around luminance mapping, local contrast, detail preservation, and edge-aware character selection to retain recognizable image structure."
          ],
          "tags": [
            "computer-vision",
            "web",
            "creative-tech",
            "javascript"
          ]
        },
        {
          "kind": "project",
          "title": "Resolve – LPL Financial University Hackathon",
          "subtitle": "AI/ML, Workflow Intelligence, FinTech",
          "date": "2026",
          "bullets": [
            "Developing a proactive exception-intelligence layer that predicts likely blockers before financial-service requests visibly stall.",
            "Designing case-history and document understanding, workflow-state comparison, anomaly and stall-risk detection, causal explanations, and next-best-action recommendations."
          ],
          "tags": [
            "ai-ml",
            "product",
            "fintech",
            "hackathon"
          ]
        }
      ],
      "skills": [
        [
          "Languages",
          "Python, Java, JavaScript, Swift, SQL, C++, HTML/CSS"
        ],
        [
          "AI/Data",
          "PyTorch, torchvision, scikit-learn, NumPy, pandas, OpenCV, SHAP, Core ML, Ollama"
        ],
        [
          "Frameworks",
          "Flask, Node.js, Express, Discord.js, ARKit, RealityKit"
        ],
        [
          "Infrastructure/APIs",
          "SQLite, MariaDB, Git, Docker, Railway, CUDA, PubMed E-utilities, CrossRef, Perplexity API"
        ]
      ],
      "involvement": [
        {
          "kind": "activity",
          "title": "Formal Committee Head, Alpha Omega Epsilon – Beta Kappa",
          "date": "August 2025 – May 2026",
          "bullets": [
            "Coordinated formal-event planning, logistics, communication, and committee execution for the professional and social sorority."
          ],
          "tags": [
            "leadership",
            "community"
          ]
        },
        {
          "kind": "activity",
          "title": "Volunteer Judge & Field Reset, FIRST Robotics",
          "date": "2025 – Present",
          "bullets": [
            "Support robotics competitions through judging and field operations, helping maintain organized and fair event execution."
          ],
          "tags": [
            "robotics",
            "outreach",
            "service"
          ]
        },
        {
          "kind": "activity",
          "title": "Kode With Klossy × Goldman Sachs Machine Learning Challenge",
          "date": "December 2025",
          "bullets": [],
          "tags": [
            "ai-ml",
            "program"
          ]
        },
        {
          "kind": "activity",
          "title": "UR2PhD Training Course, Computing Research Association",
          "date": "December 2025",
          "bullets": [],
          "tags": [
            "research",
            "program"
          ]
        },
        {
          "kind": "activity",
          "title": "Social and Behavioral Research, CITI Program",
          "date": "September 2025",
          "bullets": [],
          "tags": [
            "research",
            "compliance"
          ]
        }
      ]
    }
  }
};
