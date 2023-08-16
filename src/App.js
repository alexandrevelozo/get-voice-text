import React, { useState, useEffect } from "react";

function App() {
  const [textInput, setTextInput] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    // Obtém a lista de vozes disponíveis no navegador
    const getVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const ptBRVoices = allVoices.filter((voice) => voice.lang === "pt-BR");
      setVoices(ptBRVoices);
    };

    // Atualiza a lista de vozes sempre que houver alterações
    window.speechSynthesis.onvoiceschanged = getVoices;

    getVoices();
  }, []);

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleVoiceChange = (event) => {
    const selectedVoiceURI = event.target.value;
    const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    setSelectedVoice(voice);
  };

  const handleSpeak = () => {
    if (textInput && selectedVoice) {
      const speech = new SpeechSynthesisUtterance(textInput);
      speech.voice = selectedVoice;
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="App">
      <h1>Dublagem de Voz</h1>
      <textarea
        value={textInput}
        onChange={handleChange}
        placeholder="Digite seu texto aqui..."
      />
      <select onChange={handleVoiceChange}>
        <option value="">Selecione uma voz...</option>
        {voices.map((voice) => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name}
          </option>
        ))}
      </select>
      <button onClick={handleSpeak} disabled={!textInput || !selectedVoice}>
        Fazer Dublagem de Voz
      </button>
      {!voices.length && (
        <p>Seu navegador não suporta vozes em português do Brasil.</p>
      )}
    </div>
  );
}

export default App;
