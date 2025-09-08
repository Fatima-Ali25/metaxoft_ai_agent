import ChatWidget from "@/componnets/ui/ChatWidget";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="w-full h-full text-center text-7xl items-center justify-center font-bold">
          Metaxoft AI Assistant
        </h1>
        <p className="text-gray-600 text-center text-2xl">
          Ask me anything about Metaxoft and I&apos;ll do my best to answer.
        </p>
        <ChatWidget />
      </div>
    </>
  );
}
