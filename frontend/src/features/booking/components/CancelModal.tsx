import type { Booking } from "../../../types";
import { Button, Modal } from "../../../components/ui";

interface CancelModalProps {
  booking: Booking | null;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function CancelModal({ booking, onClose, onConfirm, loading }: CancelModalProps) {
  return (
    <Modal open={!!booking} onClose={onClose} title="Cancel this booking?" size="sm">
      {booking && (
        <>
          <p className="text-sm leading-relaxed text-ink-500">
            You're cancelling <b className="text-jade-900">{booking.event.name}</b> ({booking.ref}).
            Free cancellation applies — you're well outside the 30-day window.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Keep booking
            </Button>
            <Button
              className="bg-coral-500 text-white hover:bg-coral-600"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? "Cancelling…" : "Yes, cancel"}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
