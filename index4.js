const toggleLanguageButton = document.getElementById("lang-toggle");
let currentLanguage = "en"; 

toggleLanguageButton.addEventListener("click", () => {
    
    document.querySelectorAll("[data-en]").forEach(element => {
        const newText = currentLanguage === "en" 
            ? element.getAttribute("data-ru") 
            : currentLanguage === "ru"
            ? element.getAttribute("data-kz") 
            : element.getAttribute("data-en");
        element.textContent = newText;
    });

    toggleLanguageButton.textContent = currentLanguage === "en" ? "Қазақша 🇰🇿" 
                                    : currentLanguage === "ru" ? "English" 
                                    : "Русский 🇷🇺";

    currentLanguage = currentLanguage === "en" ? "ru" : currentLanguage === "ru" ? "kz" : "en";
});

const themeSwitchButton = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark mode

document.body.classList.toggle("light-mode", savedTheme === "light");

themeSwitchButton.addEventListener("click", () => {
   
    const isLightMode = document.body.classList.toggle("light-mode");
    
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

const contactForm = document.getElementById("contact-form");
const submissionStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault(); 
        
        const formDetails = new FormData(contactForm);
        const jsonData = JSON.stringify(Object.fromEntries(formDetails.entries()));

        submissionStatus.textContent = "Processing..."; 

        try {
            const apiResponse = await fetch("https://your-api-url.com", {
                method: "POST",
                body: jsonData,
                headers: { "Content-Type": "application/json" }
            });

            if (apiResponse.ok) {
                submissionStatus.textContent = "🎉 Message delivered!";
                contactForm.reset(); 
            } else {
                submissionStatus.textContent = "⚠️ Failed to send message.";
            }
        } catch (error) {
            submissionStatus.textContent = "❌ Connection error!";
            console.error("Submission Error:", error); 
        }
    });
}
