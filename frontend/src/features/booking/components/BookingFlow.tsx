import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Event } from "../../../types";
import { cn } from "../../../lib/cn";
import { baht, spotsLeft } from "../../../lib/format";
import { ROUTES } from "../../../lib/constants";
import { Button, Field, Modal, Select, Input, Textarea } from "../../../components/ui";
import { Icon } from "../../../components/icons/Icon";
import { useAuth } from "../../auth/hooks/useAuth";
import { useBooking } from "../hooks/useBooking";
import { RoomSelector } from "./RoomSelector";
import { DIET_OPTIONS } from "../types";

const SERVICE_FEE = 2500;
const STEPS = ["Room", "Details", "Review"];

interface BookingFlowProps {
  ev: Event;
  open: boolean;
  onClose: () => void;
  onBooked: () => void;
}

export function BookingFlow({ ev, open, onClose, onBooked }: BookingFlowProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { create, creating, error, result, reset } = useBooking();

  const full = spotsLeft(ev.capacity, ev.booked) === 0;
  const [step, setStep] = useState(0);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [diet, setDiet] = useState("None");
  const [notes, setNotes] = useState("");

  // Reset the flow each time the modal opens.
  useEffect(() => {
    if (open) {
      setStep(0);
      setRoomId(ev.rooms[0]?.id ?? null);
      setDiet("None");
      setNotes("");
      reset();
    }
  }, [open, ev, reset]);

  const room = ev.rooms.find((r) => r.id === roomId) ?? null;
  const total = room ? room.price + SERVICE_FEE : 0;

  async function confirm() {
    if (!roomId) return;
    try {
      await create({ eventId: ev.id, roomId, diet, notes: notes.trim() || undefined });
      onBooked();
    } catch {
      // error surfaced via the hook's `error`
    }
  }

  const title = result
    ? result.status === "waitlisted"
      ? "You're on the waitlist"
      : "You're going!"
    : "Reserve your spot";

  return (
    <Modal open={open} onClose={onClose} title={title} size="lg">
      {result ? (
        <div className="py-2 text-center">
          <span className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-jade-100 text-jade-700">
            <Icon name="check-circle" size={44} />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">
            {result.status === "waitlisted" ? "First in line" : "Confirmed"}
          </p>
          <h3 className="mt-2 font-display text-3xl text-jade-900">{ev.name}</h3>
          <p className="mx-auto mt-3 max-w-md text-ink-500">
            {result.status === "waitlisted"
              ? "This retreat is full, so you're first in line if a spot opens. We'll email you the moment it does."
              : `A confirmation email is on its way to ${user?.email ?? "your inbox"}.`}
          </p>

          <div className="mx-auto mt-6 inline-flex flex-col gap-1 rounded-lg border border-sand-200 bg-sand-50 px-7 py-5">
            <span className="text-xs uppercase tracking-[0.1em] text-ink-400">Confirmation code</span>
            <span className="font-display text-3xl font-semibold tracking-wide text-gold-600">
              {result.ref}
            </span>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => { onClose(); navigate(ROUTES.myBookings); }}>
              View my bookings
            </Button>
            <Button variant="ghost" size="lg" onClick={() => { onClose(); navigate(ROUTES.events); }}>
              Browse more retreats
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {/* Stepper */}
          <div className="mb-6 flex items-center">
            {STEPS.map((label, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div key={label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "grid h-7.5 w-7.5 shrink-0 place-items-center rounded-full text-sm font-bold",
                        done && "bg-jade-700 text-white",
                        active && "bg-gold-500 text-jade-900",
                        !done && !active && "bg-sand-200 text-ink-400",
                      )}
                    >
                      {done ? <Icon name="check" size={16} strokeWidth={2.6} /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        "whitespace-nowrap text-sm",
                        active ? "font-bold text-jade-900" : "font-medium text-ink-400",
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={cn("mx-3.5 h-0.5 flex-1 rounded", done ? "bg-jade-500" : "bg-sand-300")} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step content */}
          {step === 0 && (
            <div className="fade-in">
              <p className="mb-4 text-sm text-ink-500">
                All rooms are all-inclusive — meals, transfers, desks and excursions.
              </p>
              <RoomSelector rooms={ev.rooms} value={roomId} onChange={setRoomId} />
            </div>
          )}

          {step === 1 && (
            <div className="fade-in grid gap-4">
              <p className="text-sm text-ink-500">So we know who's coming and how to look after you.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  {(id) => <Input id={id} value={user?.name ?? ""} readOnly icon="user" />}
                </Field>
                <Field label="Email">
                  {(id) => <Input id={id} value={user?.email ?? ""} readOnly icon="mail" />}
                </Field>
              </div>
              <Field label="Dietary needs">
                {(id) => (
                  <Select id={id} value={diet} onChange={(e) => setDiet(e.target.value)}>
                    {DIET_OPTIONS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </Select>
                )}
              </Field>
              <Field label="Arrival notes" hint="Flight times, early/late arrival, etc.">
                {(id) => (
                  <Textarea
                    id={id}
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Landing 23:40 at HKT"
                  />
                )}
              </Field>
            </div>
          )}

          {step === 2 && room && (
            <div className="fade-in">
              <p className="mb-4 text-sm text-ink-500">No payment is due today. You're reserving your spot.</p>
              <div className="grid gap-3">
                {[
                  ["Retreat", ev.name],
                  ["Villa", `${ev.villa}, ${ev.island}`],
                  ["Room", room.name],
                  ["Guest", user?.name ?? "—"],
                  ["Dietary", diet],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-5 border-b border-sand-200 pb-3">
                    <span className="text-sm text-ink-400">{k}</span>
                    <span className="text-right text-sm font-semibold text-jade-900">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-2 rounded-md bg-sand-50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">{room.name}</span>
                  <span className="font-semibold">{baht(room.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">Service fee</span>
                  <span className="font-semibold">{baht(SERVICE_FEE)}</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between border-t border-sand-200 pt-2">
                  <span className="font-bold text-jade-900">Total</span>
                  <span className="font-display text-2xl font-semibold text-jade-900">{baht(total)}</span>
                </div>
                <p className="text-right text-xs text-ink-400">due closer to the date</p>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-md bg-sand-50 p-4">
                <Icon name="info" size={18} className="mt-px shrink-0 text-gold-600" />
                <p className="text-[13px] leading-relaxed text-ink-500">
                  Free cancellation up to 30 days before arrival. Within 30 days, your deposit
                  rolls over to the next season.
                </p>
              </div>
            </div>
          )}

          {error && <p className="mt-4 text-sm font-medium text-coral-600">{error}</p>}

          {/* Footer nav */}
          <div className="mt-7 flex justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
              disabled={creating}
            >
              <Icon name="arrow-left" size={16} /> Back
            </Button>
            {step < 2 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={step === 0 && !roomId}>
                Continue <Icon name="arrow-right" size={16} />
              </Button>
            ) : (
              <Button variant="gold" size="lg" onClick={confirm} disabled={creating}>
                {creating ? "Reserving…" : full ? "Join waitlist" : "Confirm reservation"}
                <Icon name="check-circle" size={18} />
              </Button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
