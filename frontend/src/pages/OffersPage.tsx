import { useState } from "react";
import EmptyState from "../components/EmptyState.tsx";
import ErrorState from "../components/ErrorState.tsx";
import LoadingState from "../components/LoadingState.tsx";
import OfferTable from "../components/OfferTable.tsx";
import SearchField from "../components/SearchField.tsx";
import { useOffers } from "../hooks/useOffers.ts";
import { useApplyToOffer } from "../hooks/useApplyToOffer.ts";
import type { PeriodCode } from "../models/offer.ts";
import type { User } from "../models/user.ts";

interface OffersPageProps {
  user: User;
  token: string;
  onUnauthorized: () => void;
}

const DESCRIPTIONS = {
  ADMIN: "Toutes les offres, tous statuts confondus.",
  STUDENT: "Les offres publiées.",
  CONTACT: "Les offres que vous avez déposées.",
} as const;

const PERIOD_OPTIONS: { value: PeriodCode | ""; label: string }[] = [
  { value: "", label: "Toutes les périodes" },
  { value: "P1", label: "P1" },
  { value: "P2", label: "P2" },
  { value: "OTHER", label: "Autre" },
];

const isPeriodSelection = (value: string): value is PeriodCode | "" =>
  PERIOD_OPTIONS.some((option) => option.value === value);

const OffersPage = ({ user, token, onUnauthorized }: OffersPageProps) => {
  const [period, setPeriod] = useState<PeriodCode | "">("");
  const [search, setSearch] = useState("");
  const { offers, isLoading, error } = useOffers(token, period, onUnauthorized);
  const applyToOffer = useApplyToOffer(token, onUnauthorized);
  const searchTerm = search.trim().toLowerCase();
  const filteredOffers =
    searchTerm === ""
      ? offers
      : offers.filter((offer) => offer.title.toLowerCase().includes(searchTerm));

  const renderContent = () => {
    if (error) return <ErrorState message={error} />;
    if (isLoading) return <LoadingState />;
    if (filteredOffers.length === 0) {
      return (
        <EmptyState
          message={
            searchTerm === ""
              ? "Aucune offre à afficher."
              : "Aucune offre ne correspond à votre recherche."
          }
        />
      );
    }
    return (
      <>
        <p className="result-count">
          {filteredOffers.length} offre{filteredOffers.length > 1 ? "s" : ""}
        </p>
        <OfferTable
          offers={filteredOffers}
          onApply={user.kind === "STUDENT" ? applyToOffer : undefined}
        />
      </>
    );
  };

  return (
    <section>
      <h1>Offres de stage</h1>
      <p>{DESCRIPTIONS[user.kind]}</p>
      <SearchField label="Rechercher une offre" value={search} onChange={setSearch} />
      <label>
        Période
        <select
          aria-label="Période"
          value={period}
          onChange={(event) => {
            if (isPeriodSelection(event.target.value)) setPeriod(event.target.value);
          }}
        >
          {PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {renderContent()}
    </section>
  );
};

export default OffersPage;
