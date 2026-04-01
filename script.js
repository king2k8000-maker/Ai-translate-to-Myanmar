import streamlit as st
import google.generativeai as genai

# 1. UI Setup (GitHub က style အတိုင်း Dark Mode ဖြစ်အောင်)
st.set_page_config(page_title="AI Translate Myanmar", layout="wide")

st.markdown("""
    <style>
    .stApp { background-color: #0d1117; color: white; }
    .main-card { background-color: #161b22; padding: 20px; border-radius: 10px; border: 1px solid #30363d; }
    </style>
    """, unsafe_allow_html=True)

# 2. Sidebar Navigation (GitHub က ပုံစံအတိုင်း Tab များခွဲခြင်း)
with st.sidebar:
    st.title("Menu")
    choice = st.radio("Select Tool", ["Home", "Translation", "Transcription", "TTS"])
    api_key = st.text_input("Enter Gemini API Key", type="password")

# 3. Logic - API ချိတ်ဆက်မှု
if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')

# 4. Content Sections
if choice == "Home":
    st.title("AI Translate to Myanmar")
    st.write("GitHub မှ Project ကို Hugging Face တွင် အသုံးပြုရန် ပြင်ဆင်ထားခြင်းဖြစ်သည်။")

elif choice == "Translation":
    st.header("🌐 AI Translation")
    text_to_translate = st.text_area("ဘာသာပြန်မည့်စာသား ရိုက်ထည့်ပါ...")
    if st.button("Translate to Myanmar"):
        if api_key and text_to_translate:
            prompt = f"Translate this to Myanmar language naturally: {text_to_translate}"
            response = model.generate_content(prompt)
            st.success(response.text)
        else:
            st.warning("API Key နှင့် စာသား လိုအပ်ပါသည်။")

elif choice == "Transcription":
    st.header("🎙️ Transcript AI")
    st.write("Audio ဖိုင်များကို စာသားအဖြစ် ပြောင်းလဲခြင်း (Gemini API ဖြင့်)")
    audio_file = st.file_uploader("Upload Audio", type=['mp3', 'wav'])
    # ဒီနေရာမှာ Audio logic ထပ်ထည့်လို့ရပါတယ်

elif choice == "TTS":
    st.header("🔊 Text to Speech")
    st.write("စာသားများကို အသံထွက်ဖတ်ပေးမည့် Tool")
    # TTS logic ထပ်ထည့်ရန်
