"use client";

import { db } from "@/firebase";
import getRandomColor from "@/utils/getRandomCardColor";
import { useUser } from "@clerk/nextjs";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [cardColors, setCardColors] = useState({});
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      setLoading(true);

      const colRef = doc(db, "users", user.id, "flashcardSets", search);

      const docs = await getDoc(colRef);

      if (docs.exists()) {
        const flashcardSet = docs.data();
        const flashcardsArray = flashcardSet.flashcards || [];

        // Generate a color for each flashcard and store it in state
        const colors = {};
        flashcardsArray.forEach((_, index) => {
          colors[index] = getRandomColor();
        });
        setCardColors(colors);

        setFlashcards(flashcardsArray);
      } else {
        console.log("No such document!");
      }

      setLoading(false);
    }
    getFlashcard();
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxWidth>
      <Box sx={{ my: 3 }}>
        <Typography variant="h2" textAlign="center">
          {search}
        </Typography>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            size={80}
            thickness={5}
            sx={{
              color: getRandomColor(),
            }}
          />
        </Box>
      ) : (
        flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
              {flashcards.map((flashcard, index) => {
                const randomColor = cardColors[index];

                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardActionArea
                        onClick={() => {
                          handleCardClick(index);
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              perspective: "1000px",
                              "& > div": {
                                transition: "transform 0.6s",
                                transformStyle: "preserve-3d",
                                position: "relative",
                                width: "100%",
                                height: "200px",
                                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                transform: flipped[index]
                                  ? "rotateY(180deg)"
                                  : "rotateY(0deg)",
                              },
                              "& > div > div": {
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                boxSizing: "border-box",
                                backgroundColor: randomColor,
                              },
                              "& > div > div:nth-of-type(2)": {
                                transform: "rotateY(180deg)",
                              },
                            }}
                          >
                            <div>
                              <div>
                                <Typography variant="h5" component="div">
                                  {flashcard.front}
                                </Typography>
                              </div>
                              <div>
                                <Typography variant="h5" component="div">
                                  {flashcard.back}
                                </Typography>
                              </div>
                            </div>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )
      )}
    </Container>
  );
}
