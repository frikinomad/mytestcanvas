import { useEffect, useState } from "react";
import { CanvasClient } from "@dscvr-one/canvas-client-sdk";

export default function Home() {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const canvasClient = new CanvasClient();
        const response = await canvasClient.ready();

        if (response) {
          const user = response.untrusted.user;
          const content = response.untrusted.content;
          console.log(user);
          console.log(content);

          if (user && content) {
            setUser(user);
            setContent(content);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>User: {user?.username || "Not available"}</h1>
        <p>Content: {content?.portalName || "Not available"}</p>
      </div>
    </main>
  );
}
