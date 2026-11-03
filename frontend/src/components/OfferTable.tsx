import { useState, type FormEvent } from "react";
import type { Offer } from "../models/offer.ts";
import { OFFER_STATUS_LABELS, OFFER_STATUS_TONES, PERIOD_LABELS } from "../utils/labels.ts";
import StatusBadge from "./StatusBadge.tsx";

interface OfferTableProps {
  offers: Offer[];
  onApply?: (offerId: number, message: string) => Promise<void>;
}

interface OfferApplicationFormProps {
  offer: Offer;
  onApply: (offerId: number, message: string) => Promise<void>;
}

const OfferApplicationForm = ({ offer, onApply }: OfferApplicationFormProps) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setWasSubmitted(false);
    setIsSubmitting(true);
    try {
      await onApply(offer.id, message);
      setMessage("");
      setWasSubmitted(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="offer-application-form" onSubmit={(event) => void handleSubmit(event)}>
      <label>
        Message facultatif pour « {offer.title} »
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        Candidater
      </button>
      {wasSubmitted && <p role="status">Candidature envoyée.</p>}
      {error !== null && <p role="alert">{error}</p>}
    </form>
  );
};

const OfferTable = ({ offers, onApply }: OfferTableProps) => (
  <div className="table-wrapper">
    <table className="data-table">
      <thead>
        <tr>
          <th scope="col">Titre</th>
          <th scope="col">Entreprise</th>
          <th scope="col">Année</th>
          <th scope="col">Période</th>
          <th scope="col">Statut</th>
          {onApply !== undefined && <th scope="col">Candidature</th>}
        </tr>
      </thead>
      <tbody>
        {offers.map((offer) => (
          <tr key={offer.id}>
            <td>{offer.title}</td>
            <td>{offer.companyShortName}</td>
            <td>{offer.academicYear}</td>
            <td>{PERIOD_LABELS[offer.period]}</td>
            <td>
              <StatusBadge
                label={OFFER_STATUS_LABELS[offer.status]}
                tone={OFFER_STATUS_TONES[offer.status]}
              />
            </td>
            {onApply !== undefined && (
              <td>
                {offer.status === "PUBLISHED" && (
                  <OfferApplicationForm offer={offer} onApply={onApply} />
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OfferTable;
