const handleSend = async () => {
  if (input.trim() || image) {
    setMessages([
      ...messages,
      { text: input, image: image ? URL.createObjectURL(image) : null },
    ]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { text: "Bot: " + data.reply, image: null },
      ]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { text: "Bot: Error connecting to backend", image: null },
      ]);
    }

    setInput("");
    setImage(null);
  }
};
