import { Avatar, Box, Button, Chip, Divider, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";

type Props = {
    profile: Profile
}

export default function ProfileHeader({ profile }: Props) {
    const { id } = useParams()
    const { isCurrentUser, updateFollowing } = useProfile(id)

    if (!profile) return null

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 3,
            }}
        >
            <Grid2 container
                spacing={2}>
                <Grid2
                    size={8}
                >
                    <Stack
                        direction="row"
                        spacing={3}
                        alignItems="center"
                    >
                        <Avatar
                            src={profile.imageUrl}
                            alt={profile.displayName + " image"}
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            gap={2}
                        >
                            <Typography variant="h4">{profile.displayName}</Typography>

                            {profile.isFollowing && <Chip
                                variant="outlined"
                                color="secondary"
                                label="Following"
                                sx={{
                                    borderRadius: 1,
                                }}
                            />}
                        </Box>
                    </Stack>
                </Grid2>
                <Grid2
                    size={4}
                >
                    <Stack
                        spacing={2}
                        alignItems="center"
                    >
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            width={"100%"}
                        >
                            <Box textAlign={"center"}>
                                <Typography variant="h6"> Followers </Typography>
                                <Typography variant="h3"> {profile.followersCount} </Typography>
                            </Box>
                            <Box textAlign={"center"}>
                                <Typography variant="h6"> Following </Typography>
                                <Typography variant="h3"> {profile.followingsCount} </Typography>
                            </Box>
                        </Box>
                        {!isCurrentUser && <>
                            <Divider sx={{
                                width: "100%",
                            }} />
                            <Button
                                fullWidth
                                variant="outlined"
                                color={profile.isFollowing ? "error" : "success"}
                                onClick={() => updateFollowing.mutate()}
                                disabled={updateFollowing.isPending}
                            >
                                {profile.isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </>}
                    </Stack>
                </Grid2>
            </Grid2>
        </Paper>
    )
}
