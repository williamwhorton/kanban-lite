const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers ?? {}),
        },
        ...options,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return await response.json() as Promise<T>;
}