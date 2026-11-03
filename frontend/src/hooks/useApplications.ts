import { useCallback, useEffect, useState } from "react";
import type { ApplicationListItem } from "../models/application.ts";
import { getApplications, withdrawApplication as withdrawApplicationRequest } from "../services/applications.service.ts";
import { isUnauthorized } from "../utils/api.ts";

export const useApplications = (token: string, onUnauthorized: () => void) => {
  const [applications, setApplications] = useState<ApplicationListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getApplications(token, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setApplications(data);
          setError(null);
        }
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        if (isUnauthorized(reason)) {
          onUnauthorized();
        } else {
          setError(reason instanceof Error ? reason.message : "Erreur inconnue");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [token, onUnauthorized]);

  const withdrawApplication = useCallback(
    async (applicationId: number): Promise<void> => {
      try {
        const updated = await withdrawApplicationRequest(token, applicationId);
        setApplications((current) =>
          current.map((application) =>
            application.id === updated.id ? { ...application, status: updated.status } : application,
          ),
        );
      } catch (reason) {
        if (isUnauthorized(reason)) onUnauthorized();
        throw reason;
      }
    },
    [token, onUnauthorized],
  );

  return { applications, isLoading, error, withdrawApplication };
};
