const API_KEY = "ဒီနေရာမှာ_သင့်ရဲ့_API_KEY_ကိုထည့်ပါ"; 

async function startProcessing() {
    const fileInput = document.getElementById('audioFile'); // HTML ထဲက id နဲ့ တူရပါမယ်
    const outputArea = document.getElementById('outputArea');

    if (fileInput.files.length === 0) {
        alert("ကျေးဇူးပြု၍ အသံဖိုင် သို့မဟုတ် ဗီဒီယိုဖိုင် အရင်ရွေးချယ်ပါ။");
        return;
    }

    const file = fileInput.files[0];
    outputArea.value = "ဘာသာပြန်နေပါပြီ... ခဏစောင့်ပေးပါ... ⏳";

    try {
        const base64Data = await fileToBase64(file);
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Please transcribe this audio and translate it into Burmese (Myanmar) accurately." },
                        { inline_data: { mime_type: file.type, data: base64Data } }
                    ]
                }]
            })
        });

        const data = await response.json();
        const translatedText = data.candidates[0].content.parts[0].text;
        outputArea.value = translatedText;

    } catch (error) {
        console.error(error);
        outputArea.value = "အမှားအယွင်းတစ်ခု ရှိနေပါတယ်။ API Key မှန်မမှန် ပြန်စစ်ပေးပါ။";
    }
}

// File ကို AI ဖတ်နိုင်တဲ့ format ပြောင်းပေးတဲ့ function
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}
