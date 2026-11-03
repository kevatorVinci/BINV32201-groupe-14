import { Router } from "express";
import { toApplicationDto, toApplicationListDto } from "../mappers/application.mapper.ts";
import { getCurrentUser } from "../middlewares/authenticate.ts";
import { authorize } from "../middlewares/authorize.ts";
import type { ApplicationsService } from "../services/applications.service.ts";
import { isStudent } from "../services/permissions.ts";
import { HttpError } from "../utils/httpError.ts";

interface CreateApplicationBody {
  offerId: number;
  message?: string;
}

const isCreateApplicationBody = (value: unknown): value is CreateApplicationBody => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const body = value as Record<string, unknown>;
  return (
    typeof body.offerId === "number" &&
    Number.isInteger(body.offerId) &&
    body.offerId > 0 &&
    (body.message === undefined || typeof body.message === "string")
  );
};

const parseApplicationId = (value: unknown): number => {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
    throw new HttpError(400, "INVALID_QUERY", "L'identifiant de candidature doit être positif");
  }
  const id = Number(value);
  if (!Number.isSafeInteger(id)) {
    throw new HttpError(400, "INVALID_QUERY", "L'identifiant de candidature est invalide");
  }
  return id;
};

export const createApplicationsRouter = (applicationsService: ApplicationsService) => {
  const router = Router();

  router.get("/", authorize(isStudent), (req, res) => {
    const user = getCurrentUser(req);
    if (user.kind !== "STUDENT") {
      throw new HttpError(403, "FORBIDDEN", "Seul un étudiant peut consulter ses candidatures");
    }
    res.json(applicationsService.listApplications(user.id).map(toApplicationListDto));
  });

  router.patch("/:id/withdraw", authorize(isStudent), (req, res) => {
    const user = getCurrentUser(req);
    if (user.kind !== "STUDENT") {
      throw new HttpError(403, "FORBIDDEN", "Seul un étudiant peut retirer une candidature");
    }
    const application = applicationsService.withdrawApplication(
      user.id,
      parseApplicationId(req.params.id),
    );
    res.json(toApplicationDto(application));
  });

  router.post("/", authorize(isStudent), (req, res) => {
    const body: unknown = req.body;
    if (!isCreateApplicationBody(body)) {
      throw new HttpError(
        400,
        "INVALID_BODY",
        "Le corps doit contenir offerId (entier positif) et un message facultatif (texte)",
      );
    }

    const message = body.message?.trim() || null;
    const user = getCurrentUser(req);
    if (user.kind !== "STUDENT") {
      throw new HttpError(403, "FORBIDDEN", "Seul un étudiant peut candidater");
    }

    const application = applicationsService.createApplication(user.id, body.offerId, message);
    res.status(201).json(toApplicationDto(application));
  });

  return router;
};
