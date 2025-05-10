// Sample career data (would normally come from an API)
const careerData = {
    programming: {
        safe: ["AI/ML Engineer", "Cybersecurity Specialist", "DevOps Engineer"],
        risky: ["Basic Web Developer", "Entry-Level Data Entry"],
        emerging: ["Quantum Computing Specialist", "AI Ethics Consultant"]
    },
    design: {
        safe: ["UX/UI Designer", "AR/VR Designer", "Design Strategist"],
        risky: ["Basic Graphic Designer", "Print Layout Artist"],
        emerging: ["Metaverse Designer", "Generative AI Art Director"]
    },
    writing: {
        safe: ["Technical Writer", "Content Strategist", "SEO Specialist"],
        risky: ["Basic Copywriter", "Content Mill Writer"],
        emerging: ["AI Prompt Engineer", "Interactive Story Designer"]
    },
    analysis: {
        safe: ["Data Scientist", "Business Intelligence Analyst"],
        risky: ["Basic Data Entry", "Excel Specialist"],
        emerging: ["AI Training Data Curator", "Predictive Analytics Specialist"]
    },
    management: {
        safe: ["Product Manager", "Innovation Manager"],
        risky: ["Middle Management", "Administrative Coordinator"],
        emerging: ["AI Implementation Lead", "Remote Team Culture Designer"]
    },
    creative: {
        safe: ["Creative Director", "Experience Designer"],
        risky: ["Stock Photographer", "Basic Video Editor"],
        emerging: ["NFT Content Creator", "Virtual World Architect"]
    }
};

// DOM Elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const results = document.getElementById('results');
const next1 = document.getElementById('next1');
const next2 = document.getElementById('next2');
const getResults = document.getElementById('get-results');
const restartBtn = document.getElementById('restart-btn');
const skillButtons = document.querySelectorAll('.skill-btn');
const safeCareersList = document.getElementById('safe-careers');
const riskyCareersList = document.getElementById('risky-careers');
const emergingCareersList = document.getElementById('emerging-careers');

// State
let selectedSkills = [];

// Event Listeners
skillButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
        const skill = button.dataset.skill;

        if (button.classList.contains('selected')) {
            selectedSkills.push(skill);
        } else {
            selectedSkills = selectedSkills.filter(s => s !== skill);
        }
    });
});

next1.addEventListener('click', () => {
    if (selectedSkills.length === 0) {
        alert('Please select at least one skill');
        return;
    }
    step1.classList.remove('active');
    step2.classList.add('active');
});

next2.addEventListener('click', () => {
    step2.classList.remove('active');
    step3.classList.add('active');
});

getResults.addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (!location) {
        alert('Please enter your location');
        return;
    }

    generateResults();
    step3.classList.remove('active');
    results.classList.add('active');
});

restartBtn.addEventListener('click', () => {
    // Reset everything
    selectedSkills = [];
    skillButtons.forEach(btn => btn.classList.remove('selected'));
    document.getElementById('location').value = '';

    results.classList.remove('active');
    step1.classList.add('active');
});

// Generate results based on selected skills
function generateResults() {
    // Clear previous results
    safeCareersList.innerHTML = '';
    riskyCareersList.innerHTML = '';
    emergingCareersList.innerHTML = '';

    // Aggregate careers from all selected skills
    const aggregated = {
        safe: [],
        risky: [],
        emerging: []
    };

    selectedSkills.forEach(skill => {
        if (careerData[skill]) {
            aggregated.safe.push(...careerData[skill].safe);
            aggregated.risky.push(...careerData[skill].risky);
            aggregated.emerging.push(...careerData[skill].emerging);
        }
    });

    // Remove duplicates
    const unique = {
        safe: [...new Set(aggregated.safe)],
        risky: [...new Set(aggregated.risky)],
        emerging: [...new Set(aggregated.emerging)]
    };

    // Display results
    unique.safe.forEach(career => {
        const li = document.createElement('li');
        li.textContent = career;
        safeCareersList.appendChild(li);
    });

    unique.risky.forEach(career => {
        const li = document.createElement('li');
        li.textContent = career;
        riskyCareersList.appendChild(li);
    });

    unique.emerging.forEach(career => {
        const li = document.createElement('li');
        li.textContent = career;
        emergingCareersList.appendChild(li);
    });
}