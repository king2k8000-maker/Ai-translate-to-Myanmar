const startBtn = document.getElementById('startBtn');
const audioInput = document.getElementById('audioInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const outputArea = document.getElementById('outputArea');
const srtOutput = document.getElementById('srtOutput');

// ဖိုင်ရွေးလိုက်တဲ့အခါ အမည်ပြခြင်း
audioInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) fileNameDisplay.innerText = `Selected: ${file.name}`;
};

// Start Processing နှိပ်တဲ့အခါ
startBtn.onclick = () => {
    startBtn.innerText = "Processing...";
    // ဒီနေရာမှာ သင့်ရဲ့ Gemini API Call logic ကို ထည့်ရပါမယ်
    
    // စမ်းသပ်ရန် (Demo Output)
    setTimeout(() => {
        outputArea.classList.remove('hidden');
        srtOutput.innerText = `1\n00:00:01,000 --> 00:00:03,000\nမင်္ဂလာပါ ခင်ဗျာ။\n\n2\n00:00:03,500 --> 00:00:06,000\nကျွန်တော်ကတော့ AI ဖြစ်ပါတယ်။`;
        startBtn.innerText = "COMPLETED ✅";
    }, 2000);
};

// SRT Download ဆွဲရန်
function downloadSRT() {
    const text = srtOutput.innerText;
    const blob = new Blob([text], { type: 'text/srt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "myanmar_subtitle.srt";
    a.click();
}

// MP3 Download ဆွဲရန်
document.getElementById('downloadMp3Btn').onclick = () => {
    alert("MP3 ဖိုင်ကို Download ဆွဲနေပါပြီ...");
};
