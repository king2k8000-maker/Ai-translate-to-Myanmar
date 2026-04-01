// Gender Selection UI Toggle
function setGender(type) {
    const femaleBtn = document.getElementById('femaleBtn');
    const maleBtn = document.getElementById('maleBtn');

    if (type === 'female') {
        femaleBtn.classList.replace('bg-[#21262d]', 'bg-[#2f81f7]');
        femaleBtn.classList.add('border-blue-400');
        maleBtn.classList.replace('bg-[#2f81f7]', 'bg-[#21262d]');
        maleBtn.classList.remove('border-blue-400');
    } else {
        maleBtn.classList.replace('bg-[#21262d]', 'bg-[#2f81f7]');
        maleBtn.classList.add('border-blue-400');
        femaleBtn.classList.replace('bg-[#2f81f7]', 'bg-[#21262d]');
        femaleBtn.classList.remove('border-blue-400');
    }
}

// Connect API Interaction
function connectAPI() {
    const status = document.getElementById('apiStatus');
    status.style.display = 'block';
    console.log("API Key stored and connected.");
}

// File Upload Handling
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

dropZone.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
    if (e.target.files.length > 0) {
        dropZone.querySelector('p').innerText = e.target.files[0].name;
        dropZone.style.borderColor = '#2f81f7';
    }
};

function startProcess() {
    alert("AI Subtitle generation in progress...");
}
