"use client";

import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { SignIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  <Container maxWidth="sm">
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Flashcard SaaS
        </Typography>
        <Button color="inherit">
          <Link href="/login" passHref>
            Login
          </Link>
        </Button>
      </Toolbar>
    </AppBar>

    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ textAlign: "center", my: 4 }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      <SignIn path="/" routing="path" />
    </Box>
  </Container>;
}
