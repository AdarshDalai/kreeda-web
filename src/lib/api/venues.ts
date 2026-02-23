import { apiClient } from "./client";
import type { VenueOut, CreateVenueRequest, VenueUpdateRequest } from "../types/common";

export function createVenue(data: CreateVenueRequest) { return apiClient<VenueOut>("/api/v1/venues", { method: "POST", body: JSON.stringify(data) }); }
export function getVenue(venueId: string) { return apiClient<VenueOut>(`/api/v1/venues/${venueId}`); }
export function updateVenue(venueId: string, data: VenueUpdateRequest) { return apiClient<VenueOut>(`/api/v1/venues/${venueId}`, { method: "PATCH", body: JSON.stringify(data) }); }
export function searchVenues(q?: string, city?: string) { return apiClient<VenueOut[]>(`/api/v1/venues?${q ? `q=${encodeURIComponent(q)}&` : ""}${city ? `city=${encodeURIComponent(city)}` : ""}`); }
export function nearbyVenues(lat: number, lng: number, radiusKm = 10) { return apiClient<VenueOut[]>(`/api/v1/venues/nearby?lat=${lat}&lng=${lng}&radius_km=${radiusKm}`); }
