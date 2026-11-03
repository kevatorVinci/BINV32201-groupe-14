import { toApplication, toApplicationListItem } from "../mappers/application.mapper.ts";
import type { Application, ApplicationListItem } from "../models/application.ts";
import type { ApplicationsRepository } from "../repositories/applications.repository.ts";
import { HttpError } from "../utils/httpError.ts";

export const createApplicationsService = (repository: ApplicationsRepository) => ({
  listApplications: (
    studentId: number,
  ): ApplicationListItem[] => repository.findForStudent(studentId).map(toApplicationListItem),
  createApplication: (
    studentId: number,
    offerId: number,
    message: string | null,
  ): Application => {
    const offerStatus = repository.findOfferStatus(offerId);
    if (offerStatus === undefined) {
      throw new HttpError(404, "NOT_FOUND", "Cette offre n'existe pas");
    }
    if (offerStatus !== "PUBLISHED") {
      throw new HttpError(409, "OFFER_NOT_PUBLISHED", "Cette offre n'est pas publiée");
    }
    return toApplication(repository.create({ offerId, studentId, message }));
  },
  withdrawApplication: (studentId: number, applicationId: number): Application => {
    const { application, wasWithdrawn } = repository.withdraw({ id: applicationId, studentId });
    if (application === undefined) {
      throw new HttpError(404, "NOT_FOUND", "Cette candidature n'existe pas");
    }
    if (!wasWithdrawn) {
      throw new HttpError(
        409,
        "APPLICATION_NOT_WITHDRAWABLE",
        "Cette candidature a déjà été traitée ou retirée",
      );
    }
    return toApplication(application);
  },
});

export type ApplicationsService = ReturnType<typeof createApplicationsService>;
