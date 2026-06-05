import { useState } from "react";
import {
  Button,
  Badge,
  Card,
  Input,
  Field,
  Avatar,
  AvatarStack,
  CapacityBar,
  Accordion,
  Modal,
  Stat,
  StatusBadge,
  SectionTitle,
} from "./components/ui";
import { HavenLogo, KarstScene, Icon } from "./components/icons";

// Temporary design-system showcase — replaced by routing in Step 7.
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-sand-50">
      <header className="site-container flex items-center gap-2 py-6">
        <HavenLogo size={32} className="text-jade-700" />
        <span className="font-display text-2xl text-jade-900">The Hub</span>
      </header>

      <div className="site-container flex flex-col gap-12 pb-24">
        <div className="overflow-hidden rounded-xl shadow-lg">
          <KarstScene className="h-64 w-full" />
        </div>

        <SectionTitle
          eyebrow="Design System"
          title="Component preview"
          subtitle="A quick check that every UI primitive renders correctly."
        />

        <section className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="gold">Gold</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
        </section>

        <section className="flex flex-wrap gap-2">
          <Badge tone="jade">Jade</Badge>
          <Badge tone="gold">Gold</Badge>
          <Badge tone="coral">Coral</Badge>
          <Badge tone="neutral">Neutral</Badge>
          <StatusBadge status="confirmed" />
          <StatusBadge status="pending" />
          <StatusBadge status="waitlisted" />
          <StatusBadge status="cancelled" />
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Stat icon="users" value={42} label="Total bookings" />
          <Stat icon="calendar" value={3} label="Upcoming events" />
          <Stat icon="star" value="86%" label="Fill rate" />
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <Card className="p-6">
            <Field label="Email" hint="We'll never share it.">
              {(id) => <Input id={id} icon="mail" type="email" placeholder="you@example.com" />}
            </Field>
            <div className="mt-4 flex items-center gap-4">
              <Avatar name="Maya Chen" hue={168} />
              <AvatarStack
                people={[
                  { name: "Maya Chen", hue: 168 },
                  { name: "Sam Okafor", hue: 30 },
                  { name: "Priya Nair", hue: 280 },
                  { name: "Leon Hartmann", hue: 60 },
                  { name: "Alex Rivera", hue: 220 },
                  { name: "Jo Park", hue: 120 },
                ]}
              />
            </div>
          </Card>

          <Card className="p-6">
            <p className="mb-2 flex items-center gap-2 text-sm text-ink-700">
              <Icon name="map-pin" size={16} /> Koh Yao Noi
            </p>
            <CapacityBar capacity={20} booked={17} />
          </Card>
        </section>

        <Accordion
          items={[
            { question: "What's the WiFi like?", answer: "1 Gbps fibre with a 4G backup." },
            { question: "Can I come solo?", answer: "Yes — most attendees do." },
          ]}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Hello from the Modal">
        <p className="text-sm text-ink-500">
          Press <kbd className="rounded bg-sand-200 px-1.5 py-0.5 text-xs">Esc</kbd>, click the
          backdrop, or the ✕ to close.
        </p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setModalOpen(false)}>Got it</Button>
        </div>
      </Modal>
    </div>
  );
}
