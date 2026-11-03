import EmptyState from "../components/EmptyState.tsx";
import ErrorState from "../components/ErrorState.tsx";
import LoadingState from "../components/LoadingState.tsx";
import StatusBadge from "../components/StatusBadge.tsx";
import { useApplications } from "../hooks/useApplications.ts";
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_TONES, PERIOD_LABELS } from "../utils/labels.ts";

interface MyApplicationsPageProps {
  token: string;
  onUnauthorized: () => void;
}

const MyApplicationsPage = ({ token, onUnauthorized }: MyApplicationsPageProps) => {
  const { applications, isLoading, error } = useApplications(token, onUnauthorized);

  const renderContent = () => {
    if (error !== null) return <ErrorState message={error} />;
    if (isLoading) return <LoadingState />;
    if (applications.length === 0) {
      return <EmptyState message="Vous n’avez pas encore de candidature." />;
    }

    return (
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Offre</th>
              <th scope="col">Entreprise</th>
              <th scope="col">Année</th>
              <th scope="col">Période</th>
              <th scope="col">Date de candidature</th>
              <th scope="col">Message</th>
              <th scope="col">Statut</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.offerTitle}</td>
                <td>{application.companyShortName}</td>
                <td>{application.academicYear}</td>
                <td>{PERIOD_LABELS[application.period]}</td>
                <td>{application.appliedAt}</td>
                <td>{application.message ?? "—"}</td>
                <td>
                  <StatusBadge
                    label={APPLICATION_STATUS_LABELS[application.status]}
                    tone={APPLICATION_STATUS_TONES[application.status]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section>
      <h1>Mes candidatures</h1>
      <p>Consultez le statut de vos candidatures aux offres de stage.</p>
      {renderContent()}
    </section>
  );
};

export default MyApplicationsPage;
