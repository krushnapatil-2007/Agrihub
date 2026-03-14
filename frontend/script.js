// ================= AUTH SESSION CONTROL =================

// Check login on page load
document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("agriUser");

    const loginBtn = document.querySelector(".btn-login a[href='./login.html']")?.parentElement;
    const registerBtn = document.querySelector(".btn-login a[href='./register.html']")?.parentElement;

    if (user) {
        // Hide Login/Register buttons
        if (loginBtn) loginBtn.style.display = "none";
        if (registerBtn) registerBtn.style.display = "none";

        // Create Logout button
        const navControls = document.querySelector(".controls");
        const logoutBtn = document.createElement("button");
        logoutBtn.className = "btn-login";
        logoutBtn.innerHTML = `<a style="color: aliceblue;text-decoration:none" href="#">Logout</a>`;
        logoutBtn.onclick = logoutUser;
        navControls.appendChild(logoutBtn);
    }
});

function logoutUser() {
    localStorage.removeItem("agriUser");
    window.location.href = "login.html";
}

// ================= TRANSLATION DATA (UNCHANGED) =================

// ================= LANGUAGE SWITCH =================
function changeLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
}

// ================= THEME TOGGLE =================
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun theme-toggle';
        icon.style.color = "#fbbf24";
    } else {
        icon.className = 'fas fa-moon theme-toggle';
        icon.style.color = "var(--text-dark)";
    }
}

// ================= MODAL AUTH =================
function openModal(tab = 'login') { document.getElementById('authModal').style.display = 'flex'; switchTab(tab); }
function closeModal() { document.getElementById('authModal').style.display = 'none'; }
function switchTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('tab-login');
    const registerBtn = document.getElementById('tab-register');
    if (tabName === 'login') {
        loginForm.classList.add('active'); registerForm.classList.remove('active');
        loginBtn.classList.add('active'); registerBtn.classList.remove('active');
    } else {
        loginForm.classList.remove('active'); registerForm.classList.add('active');
        loginBtn.classList.remove('active'); registerBtn.classList.add('active');
    }
}

// ================= LOGIN HANDLER =================
async function handleLogin(e) {
    e.preventDefault();

    const email = document.querySelector("#loginForm input[type='tel']").value;
    const password = document.querySelector("#loginForm input[type='password']").value;

    const res = await fetch("https://agrihub-backend-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const result = await res.text();

    if (result.toLowerCase().includes("successful")) {
        localStorage.setItem("agriUser", email);
        closeModal();
        location.reload();
    } else {
        alert(result);
    }
}

async function handleRegister(e) {
    e.preventDefault();

    const fullName = document.querySelector("#registerForm input[type='text']").value;
    const mobile = document.querySelector("#registerForm input[type='tel']").value;
    const password = document.querySelector("#registerForm input[type='password']").value;

    const res = await fetch("https://agrihub-backend-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fullName: fullName,
            email: mobile,
            password: password
        })
    });

    const result = await res.text();
    alert(result);
    switchTab('login');
}

// ================= SCROLL ANIMATION =================
window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(reveal => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) reveal.classList.add('active');
    });
});
window.dispatchEvent(new Event('scroll'));
window.onclick = function(e) { if (e.target == document.getElementById('authModal')) closeModal(); }

function scrollToFeatures() { document.getElementById('features').scrollIntoView({ behavior: 'smooth' }); }

// ================= SERVICE NAVIGATION =================
function openService(pageId) {
    document.getElementById('main-landing').style.display = 'none';
    document.getElementById(pageId).style.display = 'block';
    window.scrollTo(0, 0);
    if(pageId === 'page-weather') {
        const temp = document.getElementById('weatherTemp').innerText;
        if(temp === '--') initWeather();
    }
}
function closeService() {
    document.querySelectorAll('.service-page').forEach(page => page.style.display = 'none');
    document.getElementById('main-landing').style.display = 'block';
    document.getElementById('features')?.scrollIntoView();
}


// --- TRANSLATION DATA ---
const translations = {
    en: {
        nav_home: "Home", nav_about: "About", nav_services: "Services", nav_team: "Team", btn_login_nav: "Login / Register",
        hero_title: "Empowering Farmers with <br><span>Digital Innovation</span>",
        hero_desc: "A one-stop solution for crops, fertilizers, and government schemes.",
        btn_explore: "Explore Platform",
        title_about: "Why AgriHub?",
        card_problem_title: "The Problem", card_problem_desc: "Farmers struggle with middlemen taking profits, lack centralized info on schemes.",
        card_objective_title: "Our Objective", card_objective_desc: "To bridge the gap between farmers and technology.",
        card_impact_title: "The Impact", card_impact_desc: "Increased income, better soil quality, and digital literacy.",
        title_services: "Our Services",
        serv_fert_title: "Fertilizer Info", serv_fert_desc: "Get correct dosage, application methods, and real-time prices.", tag_guide: "Crop Guide",
        serv_govt_title: "Govt Schemes", serv_govt_desc: "Latest updates on subsidies and welfare programs.", tag_subsidy: "Subsidies",
        serv_weather_title: "Weather Forecast", serv_weather_desc: "Real-time weather updates to plan your sowing and harvesting activities.", tag_weather: "Live Alerts",
        title_team: "Project Team",
        tab_login: "Login", tab_register: "Register",
        modal_title_login: "Welcome Back", modal_title_reg: "Create Account",
        lbl_mobile: "Mobile Number", lbl_pass: "Password", lbl_fullname: "Full Name",
        btn_login_action: "Login Securely", btn_reg_action: "Register Now"
    },
 hi: {
        nav_home: "गृह", nav_about: "हमारे बारे में", nav_services: "सेवाएं", nav_team: "टीम", btn_login_nav: "लॉगिन / रजिस्टर",
        hero_title: "किसानों का सशक्तिकरण <br><span>डिजिटल नवाचार</span> के साथ",
        hero_desc: "फसल, उर्वरक और सरकारी योजनाओं के लिए एक ही समाधान।",
        btn_explore: "मंच देखें",
        title_about: "एग्रीहब क्यों?",
        card_problem_title: "समस्या", card_problem_desc: "किसानों को बिचौलियों की वजह से नुकसान होता है।",
        card_objective_title: "हमारा उद्देश्य", card_objective_desc: "किसानों और प्रौद्योगिकी के बीच की खाई को पाटना।",
        card_impact_title: "प्रभाव", card_impact_desc: "आय में वृद्धि और डिजिटल साक्षरता।",
        title_services: "हमारी सेवाएं",
        serv_fert_title: "उर्वरक जानकारी", serv_fert_desc: "सही खुराक और रीयल-टाइम कीमतें प्राप्त करें।", tag_guide: "फसल गाइड",
        serv_govt_title: "सरकारी योजनाएं", serv_govt_desc: "सब्सिडी और कल्याणकारी कार्यक्रमों पर अपडेट।", tag_subsidy: "सब्सिडी",
        serv_weather_title: "मौसम पूर्वानुमान", serv_weather_desc: "अपनी बुवाई और कटाई की गतिविधियों की योजना बनाने के लिए रीयल-टाइम मौसम अपडेट।", tag_weather: "लाइव अलर्ट",
        serv_crp_title: "फसल सलाहकार", manthan: "मौसम, मिट्टी और बजट के आधार पर एआई-संचालित सिफारिशें", sumit: "लाभ अधिकतमकरण",
        title_team: "प्रोजेक्ट टीम",
        tab_login: "लॉग इन", tab_register: "रजिस्टर",
        modal_title_login: "वापसी पर स्वागत है", modal_title_reg: "खाता बनाएं",
        lbl_mobile: "मोबाइल नंबर", lbl_pass: "पासवर्ड", lbl_fullname: "पूरा नाम",
        btn_login_action: "सुरक्षित लॉगिन", btn_reg_action: "अभी रजिस्टर करें",
        adi1: "मुख्य पेज पर जाएँ", adi2: "उन्नत उर्वरक कैलकुलेटर", adi3: "अधिक उपज के लिए (फसल के) पोषक तत्वों का सटीक प्रबंधन", adi4: "भूमि का क्षेत्रफल (एकड़)",
        adi5: "फसल श्रेणी चुनें:", adi6: "सिफारिश (प्रति एकड़)", adi7: "प्राथमिक पोषक तत्व (NPK)", adi8: "सूक्ष्म पोषक तत्व और मृदा स्वास्थ्य",
        adi9: "*नोट: ये सामान्य सिफारिशें हैं। सटीक खुराक के लिए, कृपया अपने मृदा स्वास्थ्य कार्ड का परीक्षण करवाएं।",
        adi10: "युरिया खत:", adi11: "डीएपी खत:", adi12: "एमओपी खत:", adi13: "एसएसपी (सिंगल सुपर फॉस्फेट):",
        adi14: "झिंक सल्फेट:", adi15: "सल्फर (बेंटोनाइट):", adi16: "मॅग्नेशियम सल्फेट:", adi17: "सेंद्रिय खत (FYM):",

        // Scheme Translations (Hindi)
        ma1: "केंद्र सरकार की योजनाएं",
        ma2: "भारत सरकार की प्रमुख पहल।",
        btn_apply: "अभी आवेदन करें",
        sch_1_t: " पीएम-किसान सम्मान निधि", sch_1_d: "सभी जमीनधारक किसानों के लिए प्रति वर्ष ₹6,000 आय सहायता।",
        sch_2_t: " प्रधानमंत्री फसल बीमा योजना", sch_2_d: "गैर-रोकथाम योग्य प्राकृतिक जोखिमों के खिलाफ व्यापक फसल बीमा।",
        sch_3_t: " प्रधानमंत्री कृषि सिंचाई योजना", sch_3_d: "\"हर खेत को पानी\" - ड्रिप/स्प्रिंकलर सिंचाई के लिए सब्सिडी।",
        sch_4_t: " ई-नाम (राष्ट्रीय कृषि बाजार)", sch_4_d: "बेहतर मूल्य खोज के लिए अखिल भारतीय इलेक्ट्रॉनिक ट्रेडिंग पोर्टल।",
        sch_5_t: " परंपरागत कृषि विकास योजना", sch_5_d: "जैविक खेती के लिए ₹50,000/हेक्टेयर की वित्तीय सहायता।",
        sch_6_t: " पीएम किसान मान-धन योजना", sch_6_d: "छोटे किसानों के लिए पेंशन योजना (60 वर्ष की आयु के बाद ₹3000/माह)।",
        sch_7_t: " किसान क्रेडिट कार्ड (KCC)", sch_7_d: "कम ब्याज दरों पर फसलों के लिए अल्पकालिक ऋण प्राप्त करें।",
        sch_8_t: " मृदा स्वास्थ्य कार्ड योजना", sch_8_d: "पोषक तत्वों की स्थिति और सिफारिशें जानने के लिए मिट्टी की जांच करवाएं।",
        sch_9_t: " पीएम-कुसुम योजना", sch_9_d: "बंजर भूमि पर सौर जल पंप और सौर ऊर्जा संयंत्र लगाने के लिए सब्सिडी।",
        sch_10_t: " कृषि मशीनीकरण उप-मिशन", sch_10_d: "ट्रैक्टर, ड्रोन और आधुनिक कृषि मशीनरी खरीदने के लिए वित्तीय सहायता।",
        sch_11_t: " कृषि अवसंरचना कोष", sch_11_d: "कटाई बाद प्रबंधन बुनियादी ढांचे के लिए ब्याज छूट के साथ ऋण।",
        sch_12_t: " एनएमएसए (सतत कृषि)", sch_12_d: "जलवायु-लचीली खेती, जल उपयोग दक्षता और मृदा संरक्षण को बढ़ावा देना।",
        sch_13_t: " एकीकृत बागवानी विकास मिशन", sch_13_d: "बागवानी क्षेत्र (फल, सब्जियां, बांस, आदि) का समग्र विकास।",
        sch_14_t: " राष्ट्रीय कृषि विकास योजना", sch_14_d: "राज्यों को अपनी कृषि विकास योजनाएं बनाने के लिए लचीला वित्तपोषण।",
        sch_15_t: " पीएम मत्स्य संपदा योजना", sch_15_d: "मत्स्य पालन क्षेत्र और नीली क्रांति के सतत विकास पर केंद्रित।",kp1:"वास्तविक समय मौसम",
        kp2:"आपके वर्तमान स्थान के आधार पर सटीक मौसम पूर्वानुमान",kp3:"मेरा स्थान पता करें",kp4:"उपग्रह से मौसम डेटा प्राप्त किया जा रहा है...",
        kp5:"शहर की पहचान की जा रही है..."
    },
  mr: {
        nav_home: "मुख्यपृष्ठ", nav_about: "आमच्याबद्दल", nav_services: "सेवा", nav_team: "टीम", btn_login_nav: "लॉगिन / नोंदणी",
        hero_title: "शेतकऱ्यांचे सक्षमीकरण <br><span>डिजिटल क्रांती</span> द्वारे",
        hero_desc: "पिके, खते आणि सरकारी योजनांसाठी एकच ठिकाण.",
        btn_explore: "प्लॅटफॉर्म पहा",
        title_about: "अ‍ॅग्रीहब का?",
        card_problem_title: "समस्या", card_problem_desc: "शेतकऱ्यांना मध्यस्थांमुळे नफा मिळत नाही.",
        card_objective_title: "आमचे उद्दिष्ट", card_objective_desc: "शेतकरी आणि तंत्रज्ञान यांच्यातील अंतर कमी करणे.",
        card_impact_title: "परिणाम", card_impact_desc: "उत्पन्नात वाढ आणि आधुनिक शेती.",
        title_services: "आमच्या सेवा",
        serv_fert_title: "खतांची माहिती", serv_fert_desc: "योग्य प्रमाण आणि सध्याचे भाव मिळवा.", tag_guide: "पीक मार्गदर्शक",
        serv_govt_title: "सरकारी योजना", serv_govt_desc: "अनुदान आणि कल्याणकारी कार्यक्रमांची माहिती.", tag_subsidy: "अनुदान",
        serv_weather_title: "हवामान अंदाज", serv_weather_desc: "पेरणी आणि कापणीच्या कामांचे नियोजन करण्यासाठी ताजी हवामान माहिती.", tag_weather: "थेट सूचना",
        serv_crp_title: "कृषी सल्लागार", manthan: "हंगाम, माती आणि बजेटवर आधारित कृत्रिम बुद्धिमत्ता (AI) द्वारे शिफारसी", sumit: "नफा वाढवणारे",
        title_team: "प्रकल्प टीम",
        tab_login: "लॉगिन", tab_register: "नोंदणी",
        modal_title_login: "स्वागत आहे", modal_title_reg: "खाते तयार करा",
        lbl_mobile: "मोबाईल नंबर", lbl_pass: "पासवर्ड", lbl_fullname: "पूर्ण नाव",
        btn_login_action: "सुरक्षित लॉगिन", btn_reg_action: "आत्ताच नोंदणी करा",
        adi1: "मुख्य पानावर जा", adi2: "सुधारित खत गणक", adi3: "जास्त उत्पादनासाठी (पिकाच्या) पोषक तत्वांचे अचूक व्यवस्थापन", adi4: "जमिनीचे क्षेत्रफळ (एकर)",
        adi5: "पीक श्रेणी निवडा:", adi6: "शिफारस (प्रति एकर)", adi7: "प्राथमिक पोषक घटक (NPK)", adi8: "सूक्ष्म अन्नद्रव्ये आणि मृदा आरोग्याचे महत्त्व",
        adi9: "*टीप: या सामान्य शिफारसी आहेत. अचूक डोससाठी, कृपया तुमच्या मृदा आरोग्य कार्डची चाचणी करून घ्या.",
        adi10: "युरिया खत:", adi11: "डीएपी खत:", adi12: "एमओपी खत:", adi13: "एसएसपी (सिंगल सुपर फॉस्फेट):",
        adi14: "झिंक सल्फेट:", adi15: "सल्फर (बेंटोनाइट):", adi16: "मॅग्नेशियम सल्फेट:", adi17: "सेंद्रिय खत (FYM):",

        // Scheme Translations (Marathi)
        ma1: "केंद्र सरकारच्या योजना",
        ma2: "भारत सरकारचे प्रमुख उपक्रम.",
        btn_apply: "आत्ताच अर्ज करा",
        sch_1_t: " पीएम-किसान सम्मान निधि", sch_1_d: "सर्व जमीनधारक शेतकऱ्यांसाठी वर्षाला ₹6,000 आर्थिक मदत.",
        sch_2_t: " प्रधानमंत्री पीक विमा योजना", sch_2_d: "नैसर्गिक आपत्तींपासून पिकांचे संरक्षण करण्यासाठी व्यापक विमा.",
        sch_3_t: " प्रधानमंत्री कृषी सिंचन योजना", sch_3_d: "\"हर खेत को पानी\" - ठिबक/तुषार सिंचनासाठी अनुदान.",
        sch_4_t: " ई-नाम (राष्ट्रीय कृषी बाजार)", sch_4_d: "शेतमालाला योग्य भाव मिळवून देण्यासाठी इलेक्ट्रॉनिक ट्रेडिंग पोर्टल.",
        sch_5_t: " परंपरागत कृषी विकास योजना", sch_5_d: "सेंद्रिय शेतीसाठी ₹50,000/हेक्टर आर्थिक मदत.",
        sch_6_t: " पीएम किसान मान-धन योजना", sch_6_d: "लहान शेतकऱ्यांसाठी पेन्शन योजना (60 वर्षांनंतर ₹3000/महिना).",
        sch_7_t: " किसान क्रेडिट कार्ड (KCC)", sch_7_d: "कमी व्याजदरात पिकांसाठी अल्पमुदतीचे कर्ज मिळवा.",
        sch_8_t: " मृदा आरोग्य कार्ड योजना", sch_8_d: "जमिनीतील पोषक घटकांचे प्रमाण आणि शिफारसी जाणून घेण्यासाठी माती परीक्षण करा.",
        sch_9_t: " पीएम-कुसुम योजना", sch_9_d: "नापीक जमिनीवर सौर पंप आणि सौर ऊर्जा प्रकल्प उभारण्यासाठी अनुदान.",
        sch_10_t: " कृषी यांत्रिकीकरण उप-अभियान", sch_10_d: "ट्रॅक्टर, ड्रोन आणि आधुनिक कृषी यंत्रसामग्री खरेदीसाठी आर्थिक मदत.",
        sch_11_t: " कृषी पायाभूत सुविधा निधी", sch_11_d: "काढणीपश्चात व्यवस्थापनासाठी कर्जावर व्याजात सवलत.",
        sch_12_t: " एनएमएसए (शाश्वत शेती)", sch_12_d: "हवामान-अनुकूल शेती, पाणी वापर कार्यक्षमता आणि मृदा संवर्धन.",
        sch_13_t: " एकात्मिक फलोत्पादन विकास अभियान", sch_13_d: "फळे, भाज्या, बांबू इत्यादी फलोत्पादन क्षेत्राचा सर्वांगीण विकास.",
        sch_14_t: " राष्ट्रीय कृषी विकास योजना", sch_14_d: "राज्यांना त्यांच्या कृषी विकास योजना तयार करण्यासाठी लवचिक निधी.",
        sch_15_t: " पीएम मत्स्य संपदा योजना", sch_15_d: "मत्स्यपालन क्षेत्र आणि नील क्रांतीच्या शाश्वत विकासावर लक्ष केंद्रित.",
        kp1:"रिअल-टाइम हवामान",kp2:"तुमच्या सध्याच्या स्थानावर आधारित अचूक हवामान अंदाज",kp3:"माझे स्थान शोधा",kp4:"उपग्रहाद्वारे हवामान माहिती घेतली जात आहे...",
        kp5:"शहर शोधले जात आहे..."
    }
};

function changeLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
}
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun theme-toggle';
        icon.style.color = "#fbbf24";
    } else {
        icon.className = 'fas fa-moon theme-toggle';
        icon.style.color = "var(--text-dark)";
    }
}
function openModal(tab = 'login') { document.getElementById('authModal').style.display = 'flex'; switchTab(tab); }
function closeModal() { document.getElementById('authModal').style.display = 'none'; }
function switchTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('tab-login');
    const registerBtn = document.getElementById('tab-register');
    if (tabName === 'login') {
        loginForm.classList.add('active'); registerForm.classList.remove('active');
        loginBtn.classList.add('active'); registerBtn.classList.remove('active');
    } else {
        loginForm.classList.remove('active'); registerForm.classList.add('active');
        loginBtn.classList.remove('active'); registerBtn.classList.add('active');
    }
}

window.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(reveal => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) reveal.classList.add('active');
    });
});
window.dispatchEvent(new Event('scroll'));
window.onclick = function(e) { if (e.target == document.getElementById('authModal')) closeModal(); }

function scrollToFeatures() { document.getElementById('features').scrollIntoView({ behavior: 'smooth' }); }

// --- SERVICE PAGE NAVIGATION ---
function openService(pageId) {
    document.getElementById('main-landing').style.display = 'none';
    document.getElementById(pageId).style.display = 'block';
    window.scrollTo(0, 0);
    
    // Auto Trigger Weather if opening weather page
    if(pageId === 'page-weather') {
        const temp = document.getElementById('weatherTemp').innerText;
        if(temp === '--') {
            initWeather();
        }
    }
}

function closeService() {
    const pages = document.querySelectorAll('.service-page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById('main-landing').style.display = 'block';
    // Scroll back to features section
    const features = document.getElementById('features');
    if(features) features.scrollIntoView();
}

// --- FERTILIZER CALCULATOR ---
const cropData = {
    // Cereals
    wheat: { urea: 50, dap: 45, mop: 25, zinc: 5, sulphur: 0, fym: 4 },
    rice: { urea: 55, dap: 50, mop: 30, zinc: 10, sulphur: 0, fym: 5 },
    maize: { urea: 45, dap: 40, mop: 30, zinc: 8, sulphur: 0, fym: 5 },
    bajra: { urea: 30, dap: 25, mop: 20, zinc: 5, sulphur: 0, fym: 3 },
    jowar: { urea: 35, dap: 30, mop: 25, zinc: 5, sulphur: 0, fym: 4 },
    
    // Cash Crops
    cotton: { urea: 65, dap: 50, mop: 40, zinc: 5, sulphur: 10, magnesium: 10, fym: 5 },
    sugarcane: { urea: 125, dap: 80, mop: 80, zinc: 10, sulphur: 20, fym: 10 },
    
    // Pulses
    soybean: { urea: 15, dap: 50, mop: 20, zinc: 5, sulphur: 15, fym: 4 },
    chana: { urea: 10, dap: 40, mop: 0, zinc: 0, sulphur: 10, fym: 3 },
    tur: { urea: 10, dap: 40, mop: 0, zinc: 5, sulphur: 10, fym: 3 },
    moong: { urea: 8, dap: 35, mop: 0, zinc: 0, sulphur: 5, fym: 2 },
    urad: { urea: 8, dap: 35, mop: 0, zinc: 0, sulphur: 5, fym: 2 },
    
    // Oilseeds
    groundnut: { urea: 15, dap: 45, mop: 25, zinc: 5, sulphur: 15, fym: 4 },
    mustard: { urea: 35, dap: 40, mop: 20, zinc: 0, sulphur: 15, fym: 4 },
    sunflower: { urea: 30, dap: 45, mop: 40, zinc: 0, sulphur: 15, fym: 5 },
    
    // Vegetables
    potato: { urea: 60, dap: 60, mop: 60, zinc: 10, sulphur: 0, fym: 8 },
    onion: { urea: 45, dap: 40, mop: 50, zinc: 5, sulphur: 10, fym: 8 },
    tomato: { urea: 50, dap: 45, mop: 50, zinc: 5, sulphur: 0, fym: 10 },
    chili: { urea: 45, dap: 40, mop: 40, zinc: 0, sulphur: 0, fym: 8 },
    brinjal: { urea: 50, dap: 45, mop: 40, zinc: 0, sulphur: 0, fym: 10 },
    okra: { urea: 40, dap: 35, mop: 30, zinc: 0, sulphur: 0, fym: 8 },
    cabbage: { urea: 55, dap: 40, mop: 50, zinc: 0, sulphur: 0, fym: 10 },
    
    // Spices & Fruits
    ginger: { urea: 50, dap: 60, mop: 60, zinc: 5, sulphur: 0, fym: 10 },
    turmeric: { urea: 50, dap: 60, mop: 60, zinc: 5, sulphur: 0, fym: 10 },
    banana: { urea: 150, dap: 100, mop: 200, zinc: 15, sulphur: 0, fym: 15 },
    pomegranate: { urea: 75, dap: 70, mop: 100, zinc: 10, sulphur: 0, fym: 10 }
};
function calculateFertilizer() {
    const land = document.getElementById('landSize').value;
    const crop = document.getElementById('cropType').value;
    const resultBox = document.getElementById('fertResult');
    
    // HTML Elements
    const ureaVal = document.getElementById('ureaVal');
    const dapVal = document.getElementById('dapVal');
    const mopVal = document.getElementById('mopVal');
    const sspVal = document.getElementById('sspVal');
    
    const zincVal = document.getElementById('zincVal');
    const sulphurVal = document.getElementById('sulphurVal');
    const magnesiumVal = document.getElementById('magnesiumVal');
    const fymVal = document.getElementById('fymVal');

    // Visibility Toggles
    const zincRow = document.getElementById('zincRow');
    const sulphurRow = document.getElementById('sulphurRow');
    const magnesiumRow = document.getElementById('magnesiumRow');

    if(land > 0 && cropData[crop]) {
        const data = cropData[crop];
        
        // Primary Nutrients
        ureaVal.innerText = (land * data.urea).toFixed(1);
        dapVal.innerText = (land * data.dap).toFixed(1);
        mopVal.innerText = (land * data.mop).toFixed(1);
        sspVal.innerText = (land * data.dap * 3).toFixed(1); // Approximation

        // Micronutrients
        if(data.zinc) {
            zincVal.innerText = (land * data.zinc).toFixed(1);
            zincRow.style.display = 'flex';
        } else {
            zincRow.style.display = 'none';
        }

        if(data.sulphur) {
            sulphurVal.innerText = (land * data.sulphur).toFixed(1);
            sulphurRow.style.display = 'flex';
        } else {
            sulphurRow.style.display = 'none';
        }

        if(data.magnesium) {
            magnesiumVal.innerText = (land * data.magnesium).toFixed(1);
            magnesiumRow.style.display = 'flex';
        } else {
            magnesiumRow.style.display = 'none';
        }

        // Organic Manure
        fymVal.innerText = (land * data.fym).toFixed(1);

        resultBox.style.display = 'block';
    } else {
        resultBox.style.display = 'none';
    }
}

// --- REAL-TIME WEATHER LOGIC ---
function initWeather() {
    const loader = document.getElementById('weather-loader');
    const display = document.getElementById('weather-display');
    
    loader.style.display = 'block';
    display.style.display = 'none';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeather, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
        loader.style.display = 'none';
    }
}

function fetchWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // 1. Get City Name (Reverse Geocoding)
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('weatherCity').innerText = data.city || data.locality || "Unknown Location";
    });

    // 2. Get Weather Data (Open-Meteo)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        updateWeatherUI(data);
    })
    .catch(error => console.error("Error fetching weather:", error));
}

function updateWeatherUI(data) {
    const current = data.current;
    
    // Update Current
    document.getElementById('weatherTemp').innerText = current.temperature_2m;
    document.getElementById('weatherHum').innerText = current.relative_humidity_2m;
    document.getElementById('weatherWind').innerText = current.wind_speed_10m;
    
    const condition = getWeatherInfo(current.weather_code);
    document.getElementById('weatherDesc').innerText = condition.desc;
    document.getElementById('weatherIconMain').className = condition.icon;

    // Update Forecast
    const container = document.getElementById('forecast-container');
    container.innerHTML = "";
    
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date().getDay();

    for(let i=1; i<=4; i++) { // Next 4 days
        const code = data.daily.weather_code[i];
        const maxTemp = data.daily.temperature_2m_max[i];
        const info = getWeatherInfo(code);
        const dayName = days[(today + i) % 7];

        const div = `
            <div class="weather-day">
                <p>${dayName}</p>
                <i class="${info.icon}"></i>
                <h3>${Math.round(maxTemp)}°C</h3>
            </div>
        `;
        container.innerHTML += div;
    }

    document.getElementById('weather-loader').style.display = 'none';
    document.getElementById('weather-display').style.display = 'block';
}

function getWeatherInfo(code) {
    if(code === 0) return { icon: "fas fa-sun", desc: "Clear Sky" };
    if(code >= 1 && code <= 3) return { icon: "fas fa-cloud-sun", desc: "Partly Cloudy" };
    if(code >= 45 && code <= 48) return { icon: "fas fa-smog", desc: "Foggy" };
    if(code >= 51 && code <= 67) return { icon: "fas fa-cloud-rain", desc: "Drizzle/Rain" };
    if(code >= 71 && code <= 77) return { icon: "fas fa-snowflake", desc: "Snow" };
    if(code >= 80 && code <= 82) return { icon: "fas fa-cloud-showers-heavy", desc: "Heavy Rain" };
    if(code >= 95) return { icon: "fas fa-bolt", desc: "Thunderstorm" };
    return { icon: "fas fa-cloud", desc: "Cloudy" };
}

function showError(error) {
    alert("Error getting location: " + error.message);
    document.getElementById('weather-loader').style.display = 'none';
}

// --- NEW FEATURE: PROFITABLE CROP ADVISOR LOGIC ---
const advisorData = [
    { 
        name: "Cotton", 
        season: "kharif", 
        soil: "black", 
        budget: "medium", 
        profit: "High", 
        duration: "150-180 days", 
        img: "https://media.istockphoto.com/id/589121090/photo/branch-of-ripe-cotton.jpg?s=612x612&w=0&k=20&c=eGlf6UISNaZRIKxnoesMIIpOqzevDWtb_OoU_0KVN_M=" 
        
    },
    { 
        name: "Soybean", 
        season: "kharif", 
        soil: "black", 
        budget: "low", 
        profit: "Medium", 
        duration: "90-100 days", 
        img: "https://www.shutterstock.com/shutterstock/photos/1467898517/display_1500/stock-photo-soy-bean-mature-seeds-with-immature-soybeans-in-the-pod-soy-bean-close-up-open-green-soybean-pod-1467898517.jpg" 
    },
    { 
        name: "Rice (Paddy)", 
        season: "kharif", 
        soil: "alluvial", 
        budget: "medium", 
        profit: "Medium", 
        duration: "120-150 days", 
        img: "https://thumbs.dreamstime.com/b/rice-grain-23269119.jpg" 
    },
    { 
        name: "Wheat", 
        season: "rabi", 
        soil: "alluvial", 
        budget: "medium", 
        profit: "Stable", 
        duration: "120-140 days", 
        img: "https://m.media-amazon.com/images/I/71xuH19n5YL._AC_UF1000,1000_QL80_.jpg" 
    },
    { 
        name: "Mustard", 
        season: "rabi", 
        soil: "alluvial", 
        budget: "low", 
        profit: "High", 
        duration: "100-110 days", 
        img: "https://siyagro.in/wp-content/uploads/2021/09/output-onlinepngtools-3.png" 
    },
    { 
        name: "Gram (Chana)", 
        season: "rabi", 
        soil: "black", 
        budget: "low", 
        profit: "Medium", 
        duration: "100-120 days", 
        img: "https://5.imimg.com/data5/QQ/AU/MY-17256771/gram.jpg" 
    },
    { 
        name: "Watermelon", 
        season: "zaid", 
        soil: "alluvial", 
        budget: "medium", 
        profit: "Very High", 
        duration: "80-90 days", 
        img: "https://png.pngtree.com/png-vector/20250408/ourmid/pngtree-watermelon-png-image_15963963.png" 
    },
    { 
        name: "Groundnut", 
        season: "kharif", 
        soil: "red", 
        budget: "medium", 
        profit: "High", 
        duration: "120-130 days", 
        img: "https://www.shutterstock.com/image-photo/farmer-holding-freshly-harvested-peanuts-260nw-2519232685.jpg" 
    }
];

function recommendCrop() {
    const season = document.getElementById('advSeason').value;
    const soil = document.getElementById('advSoil').value;
    const container = document.getElementById('advisorResult');
    
    container.innerHTML = ""; // Clear previous

    // Simple filtering logic
    const results = advisorData.filter(crop => 
        crop.season === season && 
        (crop.soil === soil || crop.soil === 'alluvial') // Alluvial is versatile
    );

    if(results.length === 0) {
        container.innerHTML = `<p style="text-align:center; grid-column:1/-1;">No specific match found. Try changing soil type.</p>`;
        return;
    }

    results.forEach(crop => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
            <img src="${crop.img}" style="width:100%; height:150px; object-fit:cover; border-radius:10px; margin-bottom:10px;">
            <h4>${crop.name}</h4>
            <p><strong>Duration:</strong> ${crop.duration}</p>
            <p><strong>Exp. Profit:</strong> <span style="color:var(--primary-solid)">${crop.profit}</span></p>
            <p style="font-size:0.8rem; color:#666;">Best for ${crop.budget} budget</p>
        `;
        container.appendChild(div);
    });
}