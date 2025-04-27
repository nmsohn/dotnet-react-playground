import { useQuery } from "@tanstack/react-query"
import agent from "../agent"

export const useProfile = (id?: string) => {
    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(
                `/profile/${id}`
            )
            return response.data
        }
    })

    const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(
                `/profile/${id}/photos`
            )
            return response.data
        }
    })

    return {
        profile,
        loadingProfile,
        photos,
        loadingPhotos
    }
}

