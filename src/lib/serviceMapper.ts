export type RawService = Record<string, unknown> | null | undefined

export type NormalizedService = {
  id: string
  name: string
  description?: string
  category?: string
  basePrice?: number
  durationMinutes?: number
  imageUrl?: string
}

const fallbackName = (index: number) => `Service ${index + 1}`

export const normalizeServiceResponse = (service: RawService, index = 0): NormalizedService => {
  const idValue = (service?.id as string | number | undefined) ?? (service?.serviceId as string | number | undefined)
  const id = idValue != null ? String(idValue) : `service-${index}`

  const name =
    (service?.name as string | undefined) ??
    (service?.title as string | undefined) ??
    fallbackName(index)

  const basePrice =
    typeof service?.basePrice === "number"
      ? service?.basePrice
      : typeof service?.cost === "number"
        ? service?.cost
        : undefined

  const durationMinutes =
    typeof service?.durationMinutes === "number"
      ? service?.durationMinutes
      : typeof service?.estimatedHours === "number"
        ? Math.round((service?.estimatedHours ?? 0) * 60)
        : undefined

  return {
    id,
    name,
    description: (service?.description as string) ?? undefined,
    category: (service?.category as string) ?? (service?.type as string) ?? "Other",
    basePrice,
    durationMinutes,
    imageUrl: (service?.imageUrl as string) ?? undefined,
  }
}

export const normalizeServiceCollection = (services: RawService[] | undefined | null) => {
  if (!Array.isArray(services)) return []
  return services.map((service, index) => normalizeServiceResponse(service, index))
}
