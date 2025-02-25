import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import Footer from "../components/Footer";
import { Image, Mic,} from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! Welcome to Stardust", isSent: false },
  { id: 2, content: "Hii, Its amazing ,I'm Exploring", isSent: true },
];

const SettingsPage = () => {
  const { selectedUser } = useChatStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      A
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Abhiyendru</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                      
                    </div>
                  
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 w-full bg-primarys backdrop-blur-md shadow-lg rounded-lg">
      {  (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
           
           
          </div>
        </div>
      )}

      <form  className="flex items-center gap-3">
        
        {/* Voice Note Button */}
        <button
          type="button"
          className="btn btn-circle bg-base-100/80 hover:bg-base-200 text-base-content shadow-lg"
        >
          <Mic size={20} />
        </button>

        {/* Input Field */}
        <div className="flex-1">
          <input
            type="text"
            className="w-full input input-bordered bg-base-100/80 backdrop-blur-md text-base-content rounded-lg placeholder:text-base-content/70"
            placeholder="Type a message..."
            
            
          />
        </div>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          
        />
        <button
          type="button"
          className="btn btn-circle bg-base-100/60 hover:bg-base-200 text-base-content shadow-lg"
        
        >
          <Image size={20} />
        </button>
        {/* Send Button */}
        <button
          type="submit"
          className="btn btn-circle bg-base-100/60 hover:bg-base-200 text-base-content shadow-lg"
        >
          <Send size={20} />
        </button>

      </form>
    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`md:hidden fixed bottom-0 left-0 right-0`}>
        {!selectedUser && <Footer />}
      </div>
    </div>
  );
};
export default SettingsPage;
