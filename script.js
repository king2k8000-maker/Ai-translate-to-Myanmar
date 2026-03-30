const API_KEY = "ဒီနေရာမှာ_သင့်ရဲ့_API_KEY_ကို_ထည့်ပါ"; 

async function startProcessing() {
    const fileInput = document.getElementById('audioFile');
    const outputDiv = document.getElementById('outputArea');
    
    if (fileInput.files.length === 0) {
        alert("ကျေးဇူးပြု၍ အသံဖိုင်အရင်ရွေးချယ်ပါ");
        return;
    }

    const file = fileInput.files[0];
    outputDiv.innerText = "ဘာသာပြန်နေပါပြီ... ခဏစောင့်ပေးပါ...";

    try {
        const base64Data = await fileToBase64(file);
        
        // AI ကို အစအဆုံး အပြည့်အစုံ ပြန်ခိုင်းသည့် ညွှန်ကြားချက်
        const prompt = "Transcribe the ENTIRE audio file from start to finish. Provide a word-for-word Myanmar translation in SRT format. Do not skip any parts. Include every spoken sentence with accurate timestamps.";

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt },
                        { inline_data: { mime_type: file.type, data: base64Data } }
                    ]
                }],
                generationConfig: {
                    maxOutputTokens: 8192,
                    temperature: 0.1
                }
            })
        });

        const result = await response.json();
        const translatedText = result.candidates[0].content.parts[0].text;
        
        // Website မျက်နှာပြင်ပေါ်တွင် အဖြေထုတ်ပေးခြင်း
        outputDiv.innerText = translatedText;
        document.getElementById('srtOutput').innerText = translatedText;
        document.getElementById('statusLabel').innerText = "COMPLETED ✅";

    } catch (error) {
        outputDiv.innerText = "အမှားတစ်ခုရှိနေပါသည်: " + error.message;
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}
