import { GoogleGenerativeAI } from "@google/generative-ai";

async function runTask() {
    const key = document.getElementById("apiKey").value.trim();
    const fileInput = document.getElementById("fileInput");
    const output = document.getElementById("output");
    const btn = document.getElementById("actionBtn");
    const modelName = document.getElementById("modelSelect").value;
    const task = document.getElementById("taskType").value;

    if (!key) return alert("ကျေးဇူးပြု၍ API Key အရင်ထည့်ပေးပါ 🔑");
    if (!fileInput.files[0]) return alert("Video၊ Audio သို့မဟုတ် SRT ဖိုင်တစ်ခုခု ရွေးပေးပါ 📁");

    try {
        // UI Loading State
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        output.value = "[System]: AI သို့ ဖိုင်ပေးပို့နေပါသည်။ ခေတ္တစောင့်ဆိုင်းပေးပါ...";

        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: modelName });

        const file = fileInput.files[0];
        
        // Convert file to Base64
        const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        let prompt = "";
        if (task === "srt-translate") {
            prompt = "You are an expert SRT subtitle translator. Translate the following SRT content into Myanmar Language (Unicode). Keep the EXACT SRT format including index numbers and timecodes. Do NOT modify the timecodes. Translate only the text content.";
        } else {
            prompt = "Transcribe the following media file content accurately. If speech is in Burmese, use Myanmar Unicode. Provide only the text transcript.";
        }

        // Call Gemini API
        const result = await model.generateContent([
            {
                inlineData: {
                    data: base64Data,
                    mimeType: file.type || "application/octet-stream"
                }
            },
            prompt,
        ]);

        const response = await result.response;
        const resultText = response.text();
        
        output.value = resultText || "ရလဒ် မတွေ့ရှိပါ။ ဖိုင်ကို ပြန်စစ်ဆေးပါ။";

    } catch (error) {
        console.error(error);
        output.value = "Error Occurred: " + error.message + "\n\n(Tip: Model ID မှားယွင်းခြင်း သို့မဟုတ် API Key သက်တမ်းကုန်နေခြင်း ဖြစ်နိုင်ပါသည်။)";
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-magic mr-2"></i> Start Process';
    }
}

// Click Event Listener
document.getElementById("actionBtn").addEventListener("click", runTask);

// Copy Tool
window.copyText = function() {
    const output = document.getElementById("output");
    if (!output.value) return;
    output.select();
    document.execCommand("copy");
    alert("Copied to clipboard! ✅");
}
