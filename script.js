// ========================================
// Navigation Toggle for Mobile
// ========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// Smooth Scrolling
// ========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Navbar Background on Scroll
// ========================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Scroll Animation for Sections
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Removed automatic skill bar animation on scroll
            // Now skill bars animate on click
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections and cards
const sections = document.querySelectorAll('section');
const cards = document.querySelectorAll('.project-card, .achievement-card, .education-card');

sections.forEach(section => {
    observer.observe(section);
});

cards.forEach(card => {
    observer.observe(card);
});

// ========================================
// Skill Bars Animation - Hover to Fill
// ========================================

function animateSkillBar(skillItem) {
    const skillBar = skillItem.querySelector('.skill-progress');
    const progress = skillBar.getAttribute('data-progress');
    skillBar.style.transition = 'width 0.8s ease-out';
    skillBar.style.width = progress + '%';
    skillItem.classList.add('skill-filled');
}

function resetSkillBar(skillItem) {
    const skillBar = skillItem.querySelector('.skill-progress');
    skillBar.style.transition = 'width 0.4s ease-in';
    skillBar.style.width = '0%';
    skillItem.classList.remove('skill-filled');
}

// Initialize skill bar events
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach((skillItem) => {
        skillItem.addEventListener('mouseenter', function() {
            animateSkillBar(this);
        });

        skillItem.addEventListener('mouseleave', function() {
            resetSkillBar(this);
        });

        // For mobile - tap to toggle
        skillItem.addEventListener('click', function() {
            if (this.classList.contains('skill-filled')) {
                resetSkillBar(this);
            } else {
                animateSkillBar(this);
            }
        });
    });
}

// Make child elements not steal mouse events from parent
const skillStyle = document.createElement('style');
skillStyle.textContent = `
    .skill-item * { pointer-events: none; }
    .skill-item { cursor: pointer; }
`;
document.head.appendChild(skillStyle);

// Call function when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
});

// Old automatic animation function (kept for reference but not used)
function animateSkillBarsOld() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, index * 150);
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        // Removed automatic animation - now click-based
        // if (isVisible) {
        //     animateSkillBars();
        // }
    }
});

// ========================================
// Active Navigation Link Highlighting
// ========================================

function highlightActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const navHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// ========================================
// Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ========================================
// Scroll to Top on Page Load
// ========================================

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ========================================
// Image Loading Animation
// ========================================

const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            img.style.opacity = '1';
        }, 100);
    });
});

// ========================================
// Button Hover Effects
// ========================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// Card Hover Effects
// ========================================

const allCards = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .education-card');

allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// Prevent Default Behavior for Download Links
// ========================================

const downloadLinks = document.querySelectorAll('a[download]');

downloadLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Check if file exists (optional)
        const href = link.getAttribute('href');
        console.log(`Attempting to download: ${href}`);
    });
});

// ========================================
// Responsive Text Sizing
// ========================================

function adjustTextSize() {
    const width = window.innerWidth;
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (width < 480) {
        if (heroTitle) heroTitle.style.fontSize = '32px';
        if (heroSubtitle) heroSubtitle.style.fontSize = '18px';
    } else if (width < 768) {
        if (heroTitle) heroTitle.style.fontSize = '36px';
        if (heroSubtitle) heroSubtitle.style.fontSize = '20px';
    } else if (width < 1024) {
        if (heroTitle) heroTitle.style.fontSize = '40px';
        if (heroSubtitle) heroSubtitle.style.fontSize = '22px';
    } else {
        if (heroTitle) heroTitle.style.fontSize = '48px';
        if (heroSubtitle) heroSubtitle.style.fontSize = '22px';
    }
}

window.addEventListener('resize', adjustTextSize);
window.addEventListener('load', adjustTextSize);

// ========================================
// Performance Optimization
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedHighlight = debounce(highlightActiveLink, 100);
window.addEventListener('scroll', debouncedHighlight);

// ========================================
// Initialize on Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('fade-in');
    }
    
    // Set initial active link
    highlightActiveLink();
    
    // Adjust text sizes
    adjustTextSize();
    
    // Initialize project card flip for mobile
    initializeProjectFlip();
    
    console.log('Portfolio website loaded successfully!');
});

// ========================================
// Project Card Flip for Mobile/Touch
// ========================================

function initializeProjectFlip() {
    const projectCards = document.querySelectorAll('.project-card-flip');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle flip class for mobile
            this.classList.toggle('flipped');
        });
    });
    
    // Initialize achievement card flips
    const achievementCards = document.querySelectorAll('.achievement-card-flip');
    
    achievementCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle flip class for mobile
            this.classList.toggle('flipped');
        });
    });
}


// Add CSS class for manual flip
const style = document.createElement('style');
style.textContent = `
    .project-card-flip.flipped,
    .achievement-card-flip.flipped {
        transform: rotateY(180deg);
    }
`;
document.head.appendChild(style);

// ========================================
// Blog Modal
// ========================================

const blogPosts = [
    {
        tag: "Data Analysis",
        title: "Python for Data Analysis: A Beginner's Complete Guide",
        date: "📅 January 2026",
        read: "⏱ 5 min read",
        content: `
            <p>Python is the most in-demand skill in the data analytics world today. When I first started learning it as a Mathematics student, I was amazed at how quickly I could analyze large datasets. Here is everything you need to get started.</p>

            <h3>🐍 Why Python for Data Analysis?</h3>
            <p>Python is the go-to language for data analysts because of three powerful libraries:</p>
            <ul>
                <li><strong>Pandas</strong> — Load, clean, filter, and transform data in tables</li>
                <li><strong>NumPy</strong> — Fast mathematical operations on large arrays</li>
                <li><strong>Matplotlib / Seaborn</strong> — Create beautiful charts and visualizations</li>
            </ul>

            <h3>📦 Step 1: Setup Your Environment</h3>
            <p>Download Anaconda — it installs Python along with all essential data science libraries. Then open Jupyter Notebook to write and run your code interactively.</p>
            <div class="code-block">pip install pandas numpy matplotlib seaborn</div>

            <h3>📊 Step 2: Load and Explore Your Data</h3>
            <div class="code-block">import pandas as pd

df = pd.read_csv('data.csv')
print(df.head())        # First 5 rows
print(df.shape)         # Rows and columns
print(df.describe())    # Statistical summary</div>

            <h3>🔍 Step 3: Clean Your Data</h3>
            <p>Real-world data is messy. Missing values, duplicates, and wrong data types are very common:</p>
            <div class="code-block">df.isnull().sum()            # Check missing values
df.dropna(inplace=True)     # Remove missing rows
df.drop_duplicates()        # Remove duplicates</div>

            <h3>📈 Step 4: Visualize Your Findings</h3>
            <div class="code-block">import matplotlib.pyplot as plt
import seaborn as sns

sns.histplot(df['column'], kde=True)
plt.title('Data Distribution')
plt.show()</div>

            <h3>💡 My Advice</h3>
            <p>Do not just read about Python — practice with real datasets. Kaggle offers hundreds of free datasets. Start small, analyze something you are genuinely curious about, and the learning will happen naturally!</p>
        `
    },
    {
        tag: "Excel Tips",
        title: "10 Excel Formulas Every Data Analyst Must Know",
        date: "📅 January 2026",
        read: "⏱ 6 min read",
        content: `
            <p>Excel was my first data analysis tool and remains one of the most powerful. With 90% proficiency, I can say most people only scratch the surface of what Excel can do. Here are my top 10 formulas that will change how you work with data.</p>

            <h3>1. XLOOKUP — The Modern VLOOKUP</h3>
            <div class="code-block">=XLOOKUP(lookup_value, lookup_array, return_array, "Not Found")</div>

            <h3>2. SUMIFS — Sum with Multiple Conditions</h3>
            <div class="code-block">=SUMIFS(sum_range, range1, criteria1, range2, criteria2)</div>

            <h3>3. COUNTIFS — Count with Multiple Conditions</h3>
            <div class="code-block">=COUNTIFS(range1, "criteria1", range2, ">100")</div>

            <h3>4. TEXT — Format Numbers and Dates</h3>
            <div class="code-block">=TEXT(A1, "DD-MMM-YYYY")   →   15-Jan-2026</div>

            <h3>5. IFERROR — Handle Errors Gracefully</h3>
            <div class="code-block">=IFERROR(your_formula, "N/A")</div>

            <h3>6. TEXTJOIN — Combine Text from a Range</h3>
            <div class="code-block">=TEXTJOIN(", ", TRUE, A1:A10)</div>

            <h3>7. UNIQUE — Extract Unique Values</h3>
            <div class="code-block">=UNIQUE(A2:A100)</div>

            <h3>8. FILTER — Dynamic Conditional Filtering</h3>
            <div class="code-block">=FILTER(A2:C100, B2:B100="Pakistan")</div>

            <h3>9. SEQUENCE — Generate Number Series</h3>
            <div class="code-block">=SEQUENCE(10, 1, 1, 2)   →   1, 3, 5, 7 ... (odd numbers)</div>

            <h3>10. LET — Define Variables Inside a Formula</h3>
            <div class="code-block">=LET(revenue, B2*C2, tax, revenue*0.1, revenue - tax)</div>

            <h3>💡 Pro Tip</h3>
            <p>Create a personal practice file and try every formula on a sample dataset. Combine these formulas together and you will be amazed at what you can build — dynamic reports, automated summaries, and professional dashboards — all inside Excel!</p>
        `
    },
    {
        tag: "Career",
        title: "From Mathematics Graduate to Data Analyst: My Roadmap",
        date: "📅 February 2026",
        read: "⏱ 7 min read",
        content: `
            <p>When I joined BS Mathematics at Bahauddin Zakariya University, I had no idea it would lead me into the world of data analytics. Today, with a CGPA of 3.54, experience in Python, MATLAB, and Excel, and participation in BZU Olympiad 2024 and Codes Meet 2025, I want to share my roadmap with everyone.</p>

            <h3>🎓 Why Mathematics is Perfect for Data Analytics</h3>
            <ul>
                <li>Statistics and probability come naturally from your coursework</li>
                <li>Mathematical reasoning makes you an excellent problem solver</li>
                <li>Linear Algebra and Calculus are the backbone of machine learning</li>
                <li>Your logical thinking is already trained to handle complex patterns</li>
            </ul>

            <h3>🛣️ My Step-by-Step Roadmap</h3>
            <ul>
                <li><strong>Step 1:</strong> Master Excel — formulas, pivot tables, data cleaning, charts</li>
                <li><strong>Step 2:</strong> Learn Python — Pandas, NumPy, Matplotlib, Seaborn</li>
                <li><strong>Step 3:</strong> Refresh Statistics — descriptive stats, regression, hypothesis testing</li>
                <li><strong>Step 4:</strong> Learn SQL basics — querying databases to extract data</li>
                <li><strong>Step 5:</strong> Pick a BI Tool — Power BI or Tableau for dashboards</li>
                <li><strong>Step 6:</strong> Build Projects and publish them on GitHub or your portfolio</li>
            </ul>

            <h3>📚 Free Resources I Recommend</h3>
            <ul>
                <li>Kaggle — Free datasets, courses, and competitions</li>
                <li>Google Data Analytics Certificate on Coursera</li>
                <li>Alex The Analyst on YouTube — Excellent practical tutorials</li>
                <li>StatQuest — Statistics explained visually and clearly</li>
            </ul>

            <h3>💬 My Final Message</h3>
            <p>Do not compare your journey to others. Start with what you have, learn consistently, build real projects, and your opportunities will grow. Progress beats perfection every single time.</p>
        `
    },
    {
        tag: "Statistics",
        title: "Statistics for Data Analysis: Key Concepts Explained Simply",
        date: "📅 February 2026",
        read: "⏱ 6 min read",
        content: `
            <p>Statistics is the true language of data analysis. As a Mathematics student, I had a strong foundation in statistics, but applying it to real datasets was a completely different experience. Here are the essential concepts every analyst needs to understand.</p>

            <h3>📊 Descriptive Statistics — Summarizing Your Data</h3>
            <ul>
                <li><strong>Mean</strong> — The average value. Sensitive to outliers.</li>
                <li><strong>Median</strong> — The middle value. Better for skewed data.</li>
                <li><strong>Mode</strong> — The most frequently occurring value.</li>
                <li><strong>Standard Deviation</strong> — How spread out the data is from the mean.</li>
                <li><strong>Range</strong> — Difference between maximum and minimum values.</li>
            </ul>

            <h3>📉 Understanding Distributions</h3>
            <p>Most real-world data follows recognizable patterns. The Normal Distribution (bell curve) shows that most values cluster around the mean. Skewed distributions indicate outliers or unusual patterns worth investigating.</p>

            <h3>🔗 Correlation vs Causation</h3>
            <p>This is the most important concept to understand. Two variables can be correlated without one causing the other. Always question the "why" behind correlations.</p>
            <div class="code-block">correlation = df['A'].corr(df['B'])
# +1 = perfect positive, 0 = no relation, -1 = perfect negative</div>

            <h3>🧪 Hypothesis Testing</h3>
            <p>When making a claim about data, hypothesis testing tells you if your finding is statistically significant or just random chance. A p-value less than 0.05 means the result is statistically significant.</p>

            <h3>📈 Linear Regression</h3>
            <p>Regression helps you understand relationships between variables and make predictions — the foundation of predictive analytics.</p>
            <div class="code-block">from scipy import stats
slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)
print(f"R-squared: {r_value**2:.3f}")</div>

            <h3>💡 Key Takeaway</h3>
            <p>You do not need to memorize every formula — you need to understand what each concept tells you about your data. Strong statistical intuition is what separates a good analyst from a great one.</p>
        `
    },
    {
        tag: "Data Visualization",
        title: "How to Tell a Story with Data: Visualization Best Practices",
        date: "📅 February 2026",
        read: "⏱ 5 min read",
        content: `
            <p>Data without visualization is just numbers. The real power of data analysis is in communicating your findings clearly. After working on academic posters for BZU Olympiad and designing visual reports, here is what I have learned about effective visualization.</p>

            <h3>🎯 Choose the Right Chart Type</h3>
            <ul>
                <li><strong>Bar Chart</strong> — Comparing categories (e.g., sales by region)</li>
                <li><strong>Line Chart</strong> — Showing trends over time (e.g., monthly revenue)</li>
                <li><strong>Pie Chart</strong> — Showing proportions — use sparingly, max 4-5 slices</li>
                <li><strong>Scatter Plot</strong> — Showing relationships between two numeric variables</li>
                <li><strong>Heatmap</strong> — Showing correlations between multiple variables</li>
                <li><strong>Histogram</strong> — Showing the distribution of a single variable</li>
            </ul>

            <h3>🎨 Use Color with Purpose</h3>
            <p>Color should communicate information, not decorate. Use a single color for neutral data and reserve red/green for positive/negative values. Too many colors confuse the viewer and dilute your message.</p>

            <h3>✂️ Eliminate Chart Junk</h3>
            <p>Remove everything that does not add meaning: unnecessary gridlines, 3D effects, decorative borders, and redundant labels. Every element should earn its place by communicating something useful.</p>

            <h3>🛠️ My Recommended Tools</h3>
            <ul>
                <li><strong>Python (Matplotlib + Seaborn)</strong> — Full control and customization</li>
                <li><strong>Power BI</strong> — Interactive dashboards for business reporting</li>
                <li><strong>Tableau Public</strong> — Stunning visuals, free for public projects</li>
                <li><strong>Excel Charts</strong> — Quick and effective for simple reports</li>
            </ul>

            <h3>💡 The Golden Rule</h3>
            <p>If someone cannot understand your chart in 5 seconds, it needs to be simplified. Your job is not to show how much data you have — it is to make insights immediately obvious to your audience.</p>
        `
    },
    {
        tag: "MATLAB",
        title: "MATLAB vs Python: Which Should You Learn for Data Analysis?",
        date: "📅 February 2026",
        read: "⏱ 8 min read",
        content: `
            <p>This is one of the most common questions I get from fellow Mathematics students. I have used both MATLAB (85% proficiency) and Python (80% proficiency) throughout my academic journey. Here is my honest, experience-based comparison.</p>

            <h3>🔬 What is MATLAB?</h3>
            <p>MATLAB (Matrix Laboratory) is a high-performance environment by MathWorks, designed specifically for mathematical and engineering computations, matrix operations, and simulations. It is widely used in academia and engineering industries.</p>

            <h3>🐍 What is Python?</h3>
            <p>Python is a general-purpose programming language that has become the dominant tool in data science and analytics. It is open-source, free, and supported by a massive global community.</p>

            <h3>⚡ Head-to-Head Comparison</h3>
            <ul>
                <li><strong>Cost:</strong> MATLAB requires an expensive license — Python is completely free</li>
                <li><strong>Syntax:</strong> MATLAB is intuitive for math students — Python is cleaner for programming</li>
                <li><strong>Matrix Operations:</strong> MATLAB is superior — it was built for this</li>
                <li><strong>Data Analysis Libraries:</strong> Python wins — Pandas, Scikit-learn, TensorFlow have no real MATLAB equivalent</li>
                <li><strong>Job Market:</strong> Python dominates — most data analyst roles require Python, not MATLAB</li>
                <li><strong>Community:</strong> Python has a vastly larger community and free learning resources</li>
            </ul>

            <h3>🏆 My Verdict</h3>
            <p>For simulations, signal processing, or control systems in academia — MATLAB is excellent. For a career in data analytics or data science — Python is the clear winner.</p>

            <h3>🤝 Why Not Both?</h3>
            <p>That is exactly what I did. MATLAB gave me a strong mathematical programming foundation, and Python expanded my capabilities into real-world data analysis. Learning both makes you a stronger analyst because you understand the underlying mathematics more deeply.</p>

            <h3>💡 My Recommendation</h3>
            <p>Start with Python if your goal is a data analytics career. Learn MATLAB alongside it if you are in an engineering or pure mathematics program. The habits you build in one will directly strengthen your skills in the other.</p>
        `
    },
    {
        tag: "AI & Machine Learning",
        title: "How I Built My First AI Chatbot: A Step-by-Step Journey",
        date: "📅 March 2026",
        read: "⏱ 7 min read",
        content: `
            <p>Building my first AI-powered application — the Career Assistant Chatbot — was one of the most rewarding experiences of my academic journey. I want to share exactly how I did it, because I wish someone had written this guide when I was starting out.</p>

            <h3>💡 Why I Built It</h3>
            <p>As a final-year Mathematics student, I realized that many of my peers had no clear direction after graduation. Career decisions were being made without data, without research, and without structured guidance. I thought: what if I could build an AI that provides that guidance instantly?</p>

            <h3>🛠️ Tools I Used</h3>
            <ul>
                <li><strong>Python</strong> — Core language for the backend logic</li>
                <li><strong>OpenAI / Gemini API</strong> — The intelligence behind the chatbot responses</li>
                <li><strong>Gradio / Streamlit</strong> — For building the interactive UI quickly</li>
                <li><strong>Hugging Face Spaces</strong> — Free hosting for the deployed app</li>
                <li><strong>GitHub</strong> — Version control and code management</li>
            </ul>

            <h3>🧠 The Architecture</h3>
            <p>The chatbot works by taking user input, constructing a well-engineered prompt that includes career context, and sending it to the language model API. The response is formatted and returned to the user in a clean, conversational interface.</p>

            <div class="code-block">def career_chat(user_input, history):
    messages = [{"role": "system", "content": CAREER_SYSTEM_PROMPT}]
    for msg in history:
        messages.append(msg)
    messages.append({"role": "user", "content": user_input})
    response = client.chat(model="gemini-pro", messages=messages)
    return response.text</div>

            <h3>⚠️ Mistakes I Made (So You Don't Have To)</h3>
            <ul>
                <li>Not writing a strong system prompt early — this determines 80% of output quality</li>
                <li>Over-engineering the UI before the core logic worked properly</li>
                <li>Not handling API rate limits and errors gracefully</li>
                <li>Skipping user testing — always test with real users before publishing</li>
            </ul>

            <h3>🚀 My Advice to You</h3>
            <p>Start simple. Build one feature, make it work perfectly, then add more. Your first AI app does not need to be complex — it needs to solve one real problem well. The skills you gain from shipping your first app will be more valuable than any course.</p>
        `
    },
    {
        tag: "AI Tools",
        title: "Top AI Tools Every Student Should Know in 2026",
        date: "📅 March 2026",
        read: "⏱ 6 min read",
        content: `
            <p>We are living through an extraordinary moment in technology. AI tools that would have required a research team two years ago are now available to any student with an internet connection. Here are the tools I use daily — and why you should start using them too.</p>

            <h3>📊 For Data Analysis</h3>
            <ul>
                <li><strong>ChatGPT / Claude</strong> — Explain datasets, write Python code, debug errors instantly</li>
                <li><strong>Julius AI</strong> — Upload your CSV and get instant analysis and charts</li>
                <li><strong>Google Gemini</strong> — Great for research synthesis and document analysis</li>
            </ul>

            <h3>🎨 For Design & Presentations</h3>
            <ul>
                <li><strong>Canva AI</strong> — Create professional presentations with AI-generated designs</li>
                <li><strong>Gamma.app</strong> — Turn text outlines into beautiful slide decks automatically</li>
                <li><strong>Adobe Firefly</strong> — AI image generation for academic posters and visuals</li>
            </ul>

            <h3>📝 For Writing & Research</h3>
            <ul>
                <li><strong>Perplexity AI</strong> — AI search engine that cites sources; far better than Google for research</li>
                <li><strong>Elicit</strong> — Find and summarize academic papers automatically</li>
                <li><strong>Grammarly</strong> — AI-powered grammar, clarity, and tone correction</li>
            </ul>

            <h3>💻 For Coding</h3>
            <ul>
                <li><strong>GitHub Copilot</strong> — AI that writes code alongside you in real time</li>
                <li><strong>Replit AI</strong> — Build, run, and deploy code with AI assistance in the browser</li>
                <li><strong>Hugging Face</strong> — Deploy your own AI models and apps for free</li>
            </ul>

            <h3>💡 The Real Advantage</h3>
            <p>Students who learn to work alongside AI tools will not be replaced by AI — they will be hired over students who refuse to learn. The skill is not just using the tools, but knowing when to use them, how to verify their output, and how to add your own critical thinking on top.</p>
        `
    },
    {
        tag: "Neural Networks",
        title: "CNN + LSTM: How Neural Networks Can Detect Heart Disease",
        date: "📅 March 2026",
        read: "⏱ 8 min read",
        content: `
            <p>Cardiovascular disease is the leading cause of death worldwide. Yet many people die because their abnormal heart rhythms went undetected until it was too late. For my BS research project at CASPAM BZU, I worked on an AI-powered expert system to change that — using CNN and LSTM neural networks to analyze ECG signals automatically.</p>

            <h3>❤️ What is an ECG?</h3>
            <p>An Electrocardiogram (ECG) records the electrical activity of your heart over time. A normal ECG has recognizable wave patterns — the P wave, QRS complex, and T wave. Abnormalities in these patterns reveal conditions like arrhythmia, myocardial infarction (heart attack), and heart blockages.</p>

            <h3>🤖 Why AI?</h3>
            <p>Traditional ECG interpretation requires a trained cardiologist — time-consuming, expensive, and prone to human error, especially in rural areas of Pakistan where specialist access is limited. An AI system can analyze thousands of ECGs per second with consistent accuracy.</p>

            <h3>🏗️ The Architecture: CNN + LSTM</h3>
            <ul>
                <li><strong>CNN (Convolutional Neural Network)</strong> — Extracts spatial features from the ECG signal: R-peaks, QRS width, ST-segment deviations. It learns the "shape" of the heartbeat.</li>
                <li><strong>LSTM (Long Short-Term Memory)</strong> — Processes temporal patterns across time. It learns how heart rhythms evolve from one beat to the next.</li>
                <li><strong>Combined</strong> — The CNN extracts features, the LSTM learns the sequence, and a final dense layer classifies the heartbeat as normal or abnormal.</li>
            </ul>

            <div class="code-block">model = Sequential([
    Conv1D(64, kernel_size=3, activation='relu'),
    MaxPooling1D(pool_size=2),
    LSTM(128, return_sequences=False),
    Dense(64, activation='relu'),
    Dense(1, activation='sigmoid')  # Normal / Abnormal
])</div>

            <h3>📊 What I Learned</h3>
            <p>The hardest part was not the model — it was the data. ECG datasets are highly imbalanced (far more normal heartbeats than abnormal ones). Handling this required careful use of weighted loss functions and data augmentation techniques.</p>

            <h3>🌍 Why This Matters</h3>
            <p>AI in healthcare is not science fiction — it is happening right now. As a Mathematics student, I realized that the equations I studied — linear algebra, probability, calculus — were not abstract. They are the literal foundation of systems that can save lives. That realization changed how I view my degree.</p>
        `
    }
];

function openBlog(index) {
    const post = blogPosts[index];
    const overlay = document.getElementById('blogModalOverlay');
    const content = document.getElementById('blogModalContent');

    content.innerHTML = `
        <span class="modal-tag">${post.tag}</span>
        <h2>${post.title}</h2>
        <div class="modal-meta">
            <span>${post.date}</span>
            <span>${post.read}</span>
        </div>
        ${post.content}
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBlog() {
    const overlay = document.getElementById('blogModalOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBlog();
});
