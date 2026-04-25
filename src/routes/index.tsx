import { createFileRoute } from "@tanstack/react-router";
import { Invitation } from "@/components/Invitation";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Gṛha Praveśa · Invitation to our House Warming" },
      {
        name: "description",
        content:
          "With heartfelt joy, the Sharma family invites you to grace our new home with your blessings on this auspicious Griha Pravesh ceremony.",
      },
      { property: "og:title", content: "Gṛha Praveśa · House Warming Invitation" },
      {
        property: "og:description",
        content: "Open the doors and step into a sacred celebration of home, family, and blessings.",
      },
    ],
  }),
});

function Index() {
  return <Invitation />;
}
