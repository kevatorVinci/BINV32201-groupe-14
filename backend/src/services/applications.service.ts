import { toApplication } from "../mappers/application.mapper.ts";
import type { Application } from "../models/application.ts";
import type { User } from "../models/user.ts";
import type { ApplicationsRepository } from "../repositories/applications.repository.ts";
import { HttpError } from "../utils/httpError.ts";

export const createApplicationsService = (repository: ApplicationsRepository) => ({
  createApplication: (
    student: Extract<User, { kind: "STUDENT" }>,
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
    return toApplication(repository.create({ offerId, studentId: student.id, message }));
  },
});

export type ApplicationsService = ReturnType<typeof createApplicationsService>;
