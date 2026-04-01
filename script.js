import { GoogleGenerativeAI } from "@google/generative-ai";

async function handleProcess() {
    const apiKeyInput = document.getElementById("apiKey").value.trim();
    const fileInput = document.getElementById("fileInput");
    const output = document.getElementById("output");
    const btn = document.getElementById("actionBtn");
    const modelId = document.getElementById("modelSelect").value;
    const task = document.getElementById("taskType").value;

    if (!apiKeyInput) return alert("ကျေးဇူးပြု၍ API Key ထည့်ပါ။");
    if (!fileInput.files[0]) return alert("ဖိုင်အရင်ရွေးပါ။");

    try {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> AI is thinking...';
        output.value = `[System]: Connecting to ${modelId}...\n[System]: Reading media data...`;

        const genAI = new GoogleGenerativeAI(apiKeyInput);
        const model = genAI.getGenerativeModel({ model: modelId });

        const file = fileInput.files[0];
        const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });

        let promptText = "";
        if (task === "srt-translate") {
            promptText = "Translate this SRT file to Myanmar language. Keep exactly the same SRT timing and format. Output only the translated SRT content.";
        } else {
            promptText = "Transcribe this media file accurately. If it's in Burmese, use Myanmar Unicode. Return only the transcription.";
        }

        const result = await model.generateContent([
            {
                inlineData: {
                    data: base64Data,
                    mimeType: file.type || "application/octet-stream"
                }
            },
            promptText
        ]);

        const response = await result.response;
        output.value = response.text();

    } catch (err) {
        console.error(err);
        let errorMsg = err.message;
        if (errorMsg.includes("404")) {
            errorMsg = "Error 404: ရွေးချယ်ထားသော Model ID ကို ရှာမတွေ့ပါ။ Gemini 1.5 Flash ကို ပြန်ရွေးကြည့်ပါ။";
        } else if (errorMsg.includes("API key not valid")) {
            errorMsg = "API Key မှားယွင်းနေပါသည်။ ပြန်စစ်ပေးပါ။";
        }
        output.value = "[Error]: " + errorMsg;
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-play mr-2"></i> Start Process';
    }
}

document.getElementById("actionBtn").addEventListener("click", handleProcess);

window.copyText = function() {
    const area = document.getElementById("output");
    area.select();
    document.execCommand("copy");
    alert("Copied! ✅");
};
