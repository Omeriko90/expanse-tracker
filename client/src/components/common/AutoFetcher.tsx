import React, { useEffect, useRef } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { State } from "../../types";
import useGetNextPage from "../../hooks/useGetNextPage";
import useGetIssues from "../../hooks/useGetIssues";

const AutoFetcher: React.FC = () => {
  const { data: articles, isLoading: initIsLoading } = useGetIssues();
  const { mutate: getNextPage, isLoading } = useGetNextPage();
  const currentPageNumber = useSelector((state: State) => state.global.page);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          !initIsLoading &&
          (articles?.length || 0) > 0
        ) {
          getNextPage(currentPageNumber + 1);
        }
      },
      {
        threshold: 0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, observerRef.current]);

  return (
    <Box ref={observerRef}>
      <Button variant="text" color="inherit" fullWidth disabled={isLoading}>
        {isLoading ? <CircularProgress /> : "Load More"}
      </Button>
    </Box>
  );
};

export default AutoFetcher;
