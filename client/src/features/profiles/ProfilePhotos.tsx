import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile"
import { Box, Button, ImageList, ImageListItem, Typography } from "@mui/material"
import { useState } from "react"
import PhotoUploadWidget from "../../shared/components/PhotoUploadWidget"
import StarButton from "../../shared/components/StarButton"

export default function ProfilePhotos() {
    const { id } = useParams()
    const { photos, loadingPhotos, isCurrentUser, uploadPhoto, profile, setMainPhoto } = useProfile(id)
    const [editMode, setEditMode] = useState(false)

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditMode(false)
            }
        })
    }

    if (loadingPhotos) return <Typography>Loading photos</Typography>

    if (!photos || photos.length === 0) return <Typography>No photos</Typography>

    return (
        <Box>
            {isCurrentUser && (
                <Box>
                    <Button
                        onClick={() => setEditMode(!editMode)}
                    >
                        {editMode ? "Cancel" : "Add Photo"}
                    </Button>
                </Box>
            )}
            {
                editMode ? (
                    <PhotoUploadWidget
                        uploadPhoto={handlePhotoUpload}
                        loading={uploadPhoto.isPending}
                    />
                ) : (
                    <ImageList sx={{ height: 450 }} cols={3} rowHeight={164}>
                        {photos.map((item) => (
                            <ImageListItem key={item.id}>
                                <img
                                    srcSet={`${item.url.replace(
                                        '/upload/',
                                        '/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/'
                                    )}`}
                                    src={`${item.url.replace(
                                        '/upload/',
                                        '/upload/w_164,h_164,c_fill,f_auto,g_face/'
                                    )}`}
                                    alt={"user profile image"}
                                    loading="lazy"
                                />
                                {isCurrentUser && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0
                                        }}
                                        onClick={() => setMainPhoto.mutate(item)}
                                    >
                                        <StarButton selected={item.url === profile?.imageUrl} />
                                    </Box>
                                )}
                            </ImageListItem>
                        ))}
                    </ImageList>
                )
            }
        </Box>

    )
}
