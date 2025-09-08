import ChatBox from "@/componnets/ui/ChatBot"

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <header className="p-4 bg-blue-700 text-white text-xl font-bold shadow">
        Metaxoft AI Assistant 🤖
      </header>
      <ChatBox />
    </main>
  );
}
