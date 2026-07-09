/**
 * Redux slice for AI chat state.
 * Connects to FastAPI backend via Axios chatService.
 */
import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { chatService } from "../services/api";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (content, { dispatch }) => {
    // 1. Add user message immediately
    dispatch(
      chatSlice.actions.addMessage({
        id: nanoid(),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      })
    );

    // 2. Add empty AI message shell
    const aiMsgId = nanoid();
    dispatch(
      chatSlice.actions.addMessage({
        id: aiMsgId,
        role: "assistant",
        content: "",
        progress: "Thinking...",
        timestamp: new Date().toISOString(),
      })
    );

    // 3. Native fetch for SSE stream
    return new Promise((resolve, reject) => {
      fetch(`http://127.0.0.1:8000/chat/?message=${encodeURIComponent(content)}`, {
        method: "POST",
        headers: { Accept: "text/event-stream" },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let done = false;
          let fullText = "";
          let buffer = "";

          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            if (value) {
              const chunk = decoder.decode(value, { stream: true });
              buffer += chunk;
              
              const lines = buffer.split("\n");
              buffer = lines.pop(); // Keep the last partial line in the buffer
              
              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  try {
                    const data = JSON.parse(line.substring(6));
                    if (data.type === "token") {
                      fullText += data.content;
                      dispatch(
                        chatSlice.actions.updateMessageContent({
                          id: aiMsgId,
                          content: fullText,
                        })
                      );
                      dispatch(
                        chatSlice.actions.updateMessageProgress({
                          id: aiMsgId,
                          progress: "",
                        })
                      );
                    } else if (data.type === "progress") {
                      dispatch(
                        chatSlice.actions.updateMessageProgress({
                          id: aiMsgId,
                          progress: data.content,
                        })
                      );
                    } else if (data.type === "error") {
                      reject(new Error(data.content));
                      return;
                    }
                  } catch (e) {
                    console.error("Error parsing SSE data line", e, "Line:", line);
                  }
                }
              }
            }
          }
          resolve({ id: aiMsgId, content: fullText });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your AI assistant. I can help you log, search, edit, or summarize HCP interactions. How can I help today?",
        timestamp: new Date().toISOString(),
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMessageContent: (state, action) => {
      const msg = state.messages.find((m) => m.id === action.payload.id);
      if (msg) {
        msg.content = action.payload.content;
      }
    },
    updateMessageProgress: (state, action) => {
      const msg = state.messages.find((m) => m.id === action.payload.id);
      if (msg) {
        msg.progress = action.payload.progress;
      }
    },
    clearChat: (state) => {
      state.messages = [
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hello! I'm your AI assistant. I can help you log, search, edit, or summarize HCP interactions. How can I help today?",
          timestamp: new Date().toISOString(),
        },
      ];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        
        // Format Groq rate limit errors professionally
        const errMsg = action.error.message || "";
        if (errMsg.includes("429") || errMsg.toLowerCase().includes("rate limit")) {
          state.error = "API Rate Limit reached. Please wait 10 seconds before your next message.";
        } else {
          state.error = errMsg;
        }
        
        // Remove the empty AI message shell if it failed
        const lastMsg = state.messages[state.messages.length - 1];
        if (lastMsg && lastMsg.role === "assistant" && !lastMsg.content) {
          state.messages.pop();
        }
      });
  },
});

export const { addMessage, updateMessageContent, updateMessageProgress, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
